export async function notify(db, notification) {
  await db.collection('notifications').insertOne({ ...notification, readAt: null, createdAt: new Date() });
}

export async function notifyMany(db, notifications) {
  if (notifications.length) await db.collection('notifications').insertMany(notifications.map((notification) => ({ ...notification, readAt: null, createdAt: new Date() })));
}
