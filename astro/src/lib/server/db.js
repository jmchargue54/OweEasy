import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || import.meta.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || import.meta.env.MONGODB_DB;

let database;

export async function getDb() {
  if (!uri || !dbName) {
    throw new Error('MONGODB_URI and MONGODB_DB are required.');
  }

  if (!database) {
    // Atlas database users are authenticated against the admin database unless
    // a different authSource is explicitly configured in the connection URI.
    const client = new MongoClient(uri, {
      authSource: 'admin',
      appName: 'OweEasy Astro',
      serverSelectionTimeoutMS: 10000
    });
    try {
      await client.connect();
    } catch (error) {
      throw new Error(
        'MongoDB authentication failed. Check the Database Access username/password, URL-encode special password characters, and confirm the current IP is allowed in Atlas Network Access.',
        { cause: error }
      );
    }
    database = client.db(dbName);

    await Promise.all([
      database.collection('users').createIndex({ email: 1 }, { unique: true }),
      database.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
      database.collection('groups').createIndex({ memberIds: 1 }),
      database.collection('groupJoinRequests').createIndex(
        { groupId: 1, userId: 1 },
        { unique: true }
      ),
      database.collection('expenses').createIndex({
        groupId: 1,
        deletedAt: 1
      }),
      database.collection('settlements').createIndex({ groupId: 1 }),
      database.collection('notifications').createIndex({
        userId: 1,
        readAt: 1,
        createdAt: -1
      })
    ]);
  }

  return database;
}
