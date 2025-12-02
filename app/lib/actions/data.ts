"use server";

import clientPromise from "../database/mongodb";

export async function searchUsers(query: string, currentPage: number) {
  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const users = await db
      .collection("users")
      .find({
        isVerified: true,
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })
      .project({ _id: 1, name: 1, email: 1 })
      .toArray();

    return users;
  } catch (error) {
    console.error(error);
  }
}
