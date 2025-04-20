// lib/mongodb.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI: string | undefined = process.env.NEXT_MONGODB;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend global object to store cache
declare global {
  // This has to be a `var` to avoid TypeScript errors in module scope
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache;

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
cached = global.mongoose;

async function dbConnect(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect("mongodb+srv://midhunpallampetty:NNjuuXREtT3g7Sd6@cluster0.tcoq3yj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
