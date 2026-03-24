import { MongoClient } from "mongodb";

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getMongoClient() {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    throw new Error("MONGO_URL is missing at runtime");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    return client.connect();
  }
}
