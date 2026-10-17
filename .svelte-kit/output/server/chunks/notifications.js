async function notify(db, notification) {
  await db.collection("notifications").insertOne({ ...notification, readAt: null, createdAt: /* @__PURE__ */ new Date() });
}
async function notifyMany(db, notifications) {
  if (notifications.length) await db.collection("notifications").insertMany(notifications.map((notification) => ({ ...notification, readAt: null, createdAt: /* @__PURE__ */ new Date() })));
}
export {
  notifyMany as a,
  notify as n
};
