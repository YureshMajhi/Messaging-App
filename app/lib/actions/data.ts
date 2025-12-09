"use server";

import { redirect } from "next/navigation";
import { verifySession } from "../dal";
import clientPromise from "../database/mongodb";
import { ObjectId } from "mongodb";
import { updateSession } from "../session";
import { FriendList, User } from "../definitions";

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
          return { error: "FRIEND_REQUEST_HAS_ALREADY_BEEN_SENT" };
        case "accepted":
          return { error: "FRIEND_REQUEST_HAS_ALREADY_BEEN_ACCEPTED" };
        case "rejected":
          return { error: "FRIEND_REQUEST_HAS_BEEN_REJECTED" };
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

export async function acceptFriendRequest(senderId: string) {
  const session = await verifySession();
  if (!session) redirect("/login");

  await updateSession();

  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const sender = await db.collection("users").findOne({
      _id: new ObjectId(senderId),
    });
    if (!sender) {
      return { error: "USER_DOESNOT_EXIST" };
    }

    const friendRequestExists = await db.collection("friendRequests").findOne({
      senderId,
      receiverId: session.userId,
    });

    if (friendRequestExists) {
      switch (friendRequestExists.status) {
        case "pending":
          await db.collection("friendRequests").updateOne(
            {
              senderId,
              receiverId: session.userId,
            },
            { $set: { status: "accepted" } }
          );
          return { message: "Friend request accepted successfully." };

        case "accepted":
          return { error: "FRIEND_REQUEST_HAS_ALREADY_BEEN_ACCEPTED" };
        case "rejected":
          return { error: "FRIEND_REQUEST_HAS_BEEN_REJECTED" };
      }
    }

    return { message: "Friend request sent to user successfully." };
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}

export async function showFriends(userId: string): Promise<FriendList> {
  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const requests = await db
      .collection("friendRequests")
      .find({
        status: "accepted",
        $or: [{ senderId: userId }, { receiverId: userId }],
      })
      .toArray();

    const mapped = requests.map((req) => {
      return req.receiverId === userId ? req.senderId : req.receiverId;
    });

    return mapped;
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}

export async function showPendingRequests(userId: string): Promise<FriendList> {
  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const requests = await db
      .collection("friendRequests")
      .find({
        status: "pending",
        receiverId: userId,
      })
      .map((req) => req.senderId)
      .toArray();

    return requests;
  } catch (error) {
    const client = await clientPromise;
    const db = client.db("authDB");
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}
