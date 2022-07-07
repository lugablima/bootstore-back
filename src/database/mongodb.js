import "../setup.js";
import { MongoClient, ObjectId } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

const db = mongoClient.db(process.env.MONGO_DATABASE);

export { db, ObjectId };
