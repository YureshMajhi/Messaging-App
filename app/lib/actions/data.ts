"use server";

import { redirect } from "next/navigation";
import { verifySession } from "../dal";
import clientPromise from "../database/mongodb";
import { ObjectId } from "mongodb";
import { updateSession } from "../session";
import { User } from "../definitions";

export async function searchUsers(
  query: string,
  currentPage: number,
  userId: string
): Promise<User[]> {
  if (!query) return [];

  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const users = await db
      .collection("users")
      .find({
        isVerified: true,
        _id: { $ne: new ObjectId(userId) },
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
        ],
      })
      .project({ _id: 1, name: 1, email: 1 })
      .toArray();

    const userList = users.map((user) => ({ ...user, _id: user._id.toString() }));

    return userList as User[];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function sendFriendRequest(receiverId: string) {
  const session = await verifySession();
  if (!session) redirect("/login");

  await updateSession();

  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const receiver = await db.collection("users").findOne({
      _id: new ObjectId(receiverId),
    });
    if (!receiver) {
      return { error: "USER_DOESNOT_EXIST" };
    }

    const friendRequestExists = await db.collection("friendRequests").findOne({
      senderId: session.userId,
      receiverId,
    });
    if (friendRequestExists) {
      switch (friendRequestExists.status) {
        case "pending":
          return { error: "Friend request is already sent." };
        case "accepted":
          return { error: "Friend request is already accepted." };
        case "rejected":
          return { error: "Friend request has already been rejected." };
      }
    }

    await db.collection("friendRequests").insertOne({
      senderId: session.userId,
      receiverId: receiverId,
      status: "pending",
    });

    return { message: "Friend request sent to user successfully." };
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}
