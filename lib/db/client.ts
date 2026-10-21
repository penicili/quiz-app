import "server-only";
import { MongoClient } from "mongodb";
import { env } from "@/lib/env";

const g = globalThis as unknown as {
  _mongo?: Promise<MongoClient>;
};

g._mongo ??= new MongoClient(env.MONGODB_URI, {
  maxPoolSize: 10,
}).connect();

export const clientPromise = g._mongo;

export const getDb = async () => {
  return (await clientPromise).db(env.MONGODB_DB);
};
