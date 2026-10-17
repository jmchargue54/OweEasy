import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import { OAuth2Client } from "google-auth-library";
import { g as getDb } from "./db.js";
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);
async function createUser(name, email, password) {
  const db = await getDb();
  const normalizedEmail = email.trim().toLowerCase();
  if (!name.trim() || !normalizedEmail.includes("@") || password.length < 8) {
    throw new Error(
      "Enter a name, valid email, and password of at least 8 characters."
    );
  }
  const user = {
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 12),
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  };
  const result = await db.collection("users").insertOne(user);
  return {
    id: result.insertedId.toString(),
    name: user.name,
    email: user.email
  };
}
async function login(email, password) {
  const db = await getDb();
  const user = await db.collection("users").findOne({
    email: email.trim().toLowerCase()
  });
  if (!user || !user.passwordHash) {
    throw new Error("Email or password is incorrect.");
  }
  if (!await bcrypt.compare(password, user.passwordHash)) {
    throw new Error("Email or password is incorrect.");
  }
  return createSession(user);
}
function getGoogleAuthorizationUrl(state) {
  return googleClient.generateAuthUrl({
    access_type: "online",
    scope: ["openid", "email", "profile"],
    state,
    prompt: "select_account"
  });
}
async function loginWithGoogle(code) {
  const { tokens } = await googleClient.getToken(code);
  if (!tokens.id_token) {
    throw new Error("Google did not return an identity token.");
  }
  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email || !payload.email_verified) {
    throw new Error("Google account information is incomplete.");
  }
  const db = await getDb();
  const email = payload.email.trim().toLowerCase();
  let user = await db.collection("users").findOne({
    $or: [
      { googleSub: payload.sub },
      { email }
    ]
  });
  if (!user) {
    const name = payload.name || email.split("@")[0];
    const result = await db.collection("users").insertOne({
      name,
      email,
      googleSub: payload.sub,
      avatarUrl: payload.picture || null,
      passwordHash: null,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    });
    user = {
      _id: result.insertedId,
      name,
      email
    };
  } else if (user.googleSub && user.googleSub !== payload.sub) {
    throw new Error("This email is already linked to another Google account.");
  } else if (!user.googleSub) {
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          googleSub: payload.sub,
          avatarUrl: payload.picture || null,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
  }
  return createSession(user);
}
async function createSession(user) {
  const db = await getDb();
  const sessionId = randomUUID();
  await db.collection("sessions").insertOne({
    _id: sessionId,
    userId: user._id,
    expiresAt: new Date(Date.now() + 1e3 * 60 * 60 * 24 * 14)
  });
  return {
    sessionId,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email
    }
  };
}
async function getUserBySession(sessionId) {
  const db = await getDb();
  const session = await db.collection("sessions").findOne({
    _id: sessionId,
    expiresAt: { $gt: /* @__PURE__ */ new Date() }
  });
  if (!session) {
    return null;
  }
  const user = await db.collection("users").findOne({
    _id: session.userId
  });
  return user ? {
    id: user._id.toString(),
    name: user.name,
    email: user.email
  } : null;
}
async function deleteSession(sessionId) {
  if (sessionId) {
    const db = await getDb();
    await db.collection("sessions").deleteOne({
      _id: sessionId
    });
  }
}
export {
  getGoogleAuthorizationUrl as a,
  login as b,
  createUser as c,
  deleteSession as d,
  getUserBySession as g,
  loginWithGoogle as l
};
