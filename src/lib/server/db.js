import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const uri = env.MONGODB_URI;
const dbName = env.MONGODB_DB || "owe_easy";
let database;
export async function getDb() {
  if (!uri)
    throw new Error(
      "MONGODB_URI is not configured. Copy .env.example to .env and add your MongoDB connection string.",
    );
  if (!database) {
    const client = new MongoClient(uri);
    await client.connect();
    database = client.db(dbName);
    await Promise.all([
      database.collection("users").createIndex({ email: 1 }, { unique: true }),
      database.collection('users').createIndex(
        { googleSub: 1 },
        { unique: true, sparse: true }),
      database
        .collection("sessions")
        .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      database.collection("groups").createIndex({ memberIds: 1 }),
      database.collection("groups").createIndex({ name: 1 }),
      database
        .collection("groupJoinRequests")
        .createIndex({ groupId: 1, userId: 1 }, { unique: true }),
      database
        .collection("groupJoinRequests")
        .createIndex({ groupId: 1, status: 1 }),
      database.collection("expenses").createIndex({ groupId: 1, deletedAt: 1 }),
      database.collection("settlements").createIndex({ groupId: 1 }),
      database
        .collection("notifications")
        .createIndex({ userId: 1, readAt: 1, createdAt: -1 }),
    ]);
  }
  return database;
}

