"use server";

import { redirect } from "next/navigation";
import { verifySession } from "../dal";
import clientPromise from "../database/mongodb";
import { ObjectId } from "mongodb";
import { updateSession } from "../session";
import { Conversation, FriendList, FriendRequest, User } from "../definitions";

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
      .project({ _id: 1, username: 1, email: 1 })
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
      createdAt: new Date(),
    });

    return { message: "Friend request sent to user successfully." };
  } catch (error) {
    console.error(error);
    return { error: "SOMETHING_WENT_WRONG" };
  }
}

export async function acceptFriendRequest(requestId: string, accept: boolean) {
  const session = await verifySession();
  if (!session) redirect("/login");

  await updateSession();

  try {
    const client = await clientPromise;
    const db = client.db("authDB");

    const friendRequestExists = await db.collection("friendRequests").findOne({
      _id: new ObjectId(requestId),
    });
    if (!friendRequestExists) {
      return { error: "USER_DOESNOT_EXIST" };
    }

    if (friendRequestExists && !accept) {
      await db.collection("friendRequests").updateOne(
        {
          _id: new ObjectId(requestId),
        },
        { $set: { status: "declined" } }
      );
      return { message: "Request Declined" };
    }

    if (friendRequestExists && accept) {
      switch (friendRequestExists.status) {
        case "pending":
          await db.collection("friendRequests").updateOne(
            {
              _id: new ObjectId(requestId),
            },
            { $set: { status: "accepted" } }
          );

          await db.collection("conversations").insertOne({
            users: [
              new ObjectId(friendRequestExists.senderId),
              new ObjectId(friendRequestExists.receiverId),
            ],
            updatedAt: new Date(),
            createdAt: new Date(),
          });

          return {
            message: `OK`,
          };

        case "accepted":
          return { error: "FRIEND_REQUEST_HAS_ALREADY_BEEN_ACCEPTED" };
        case "declined":
          return { error: "FRIEND_REQUEST_HAS_BEEN_DECLINED" };
      }
    }
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

export async function showPendingRequests(): Promise<FriendRequest[]> {
  try {
    const session = await verifySession();

    const client = await clientPromise;
    const db = client.db("authDB");

    const requests = await db
      .collection("friendRequests")
      .find({
        status: "pending",
        receiverId: session.userId,
      })
      .toArray();

    const senderIds = requests.map((r) => new ObjectId(r.senderId));

    const users = await db
      .collection("users")
      .find({ _id: { $in: senderIds } })
      .project({ username: 1, avatar: 1 })
      .toArray();

    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    return requests.map((req) => {
      const user = userMap.get(req.senderId);

      return {
        id: req._id.toString(),
        user: {
          id: req.senderId,
          name: user?.username ?? "Unknown",
          username: user?.username ?? "unknown",
          avatar: user?.avatar ?? null,
          mutualFriends: 3,
        },
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function fetchConversations(): Promise<Conversation[]> {
  try {
    const session = await verifySession();

    const client = await clientPromise;
    const db = client.db("authDB");

    const conversations = await db
      .collection("conversations")
      .aggregate<Conversation>([
        {
          $match: {
            users: new ObjectId(session.userId),
          },
        },

        {
          $addFields: {
            otherUserId: {
              $first: {
                $filter: {
                  input: "$users",
                  cond: { $ne: ["$$this", new ObjectId(session.userId)] },
                },
              },
            },
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "otherUserId",
            foreignField: "_id",
            as: "otherUser",
          },
        },

        {
          $unwind: "$otherUser",
        },

        {
          $project: {
            id: { $toString: "$_id" },
            user: {
              id: { $toString: "$otherUser._id" },
              name: "$otherUser.username",
              avatar: "$otherUser.avatar",
              online: "$otherUser.online",
            },
            lastMessage: { $ifNull: ["$lastMessage", ""] },
            lastMessageTime: "$updatedAt",
            unreadCount: { $literal: 0 },
          },
        },
      ])
      .toArray();

    return conversations;
  } catch (error) {
    console.error(error);
    return [];
  }
}
