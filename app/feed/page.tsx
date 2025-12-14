"use client";

import { FriendRequest, Post } from "@/lib/definitions";
// import { useState } from "react";
import Navbar from "@/components/Navbar";
import CreatePostCard from "@/components/CreatePostCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "@/components/PostCard";
import FriendRequestCard from "@/components/FriendRequestCard";
import { acceptFriendRequest, showPendingRequests } from "../lib/actions/data";
import { verifySession } from "../lib/dal";
import { useEffect, useState } from "react";

const mockPosts: Post[] = [
  {
    id: "1",
    author: { id: "2", name: "Sarah Wilson", username: "sarahw", avatar: null },
    content:
      "Just had the most amazing brunch with the family! Nothing beats quality time together.",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: { name: "Mike", avatar: null },
        content: "Looks delicious!",
        time: "1h ago",
      },
      {
        id: "c2",
        author: { name: "Emma", avatar: null },
        content: "Where is this place?",
        time: "45m ago",
      },
    ],
    liked: false,
    createdAt: "2h ago",
  },
  {
    id: "2",
    author: { id: "3", name: "Michael Chen", username: "mikechen", avatar: null },
    content:
      "Grateful for another beautiful sunset. Sometimes you just need to stop and appreciate the moment.",
    imageUrl:
      "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&h=600&fit=crop",
    likes: 42,
    comments: [
      {
        id: "c3",
        author: { name: "Lisa", avatar: null },
        content: "Stunning!",
        time: "3h ago",
      },
    ],
    liked: true,
    createdAt: "5h ago",
  },
  {
    id: "3",
    author: { id: "4", name: "Emma Thompson", username: "emmat", avatar: null },
    content:
      "Weekend hiking trip was absolutely worth it! The views from the top were breathtaking.",
    imageUrl:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop",
    likes: 67,
    comments: [],
    liked: false,
    createdAt: "1d ago",
  },
];

const mockFriendRequests: FriendRequest[] = [
  {
    id: "fr1",
    user: {
      id: "u5",
      name: "Alex Rivera",
      username: "alexr",
      avatar: null,
      mutualFriends: 3,
    },
  },
  {
    id: "fr2",
    user: {
      id: "u6",
      name: "Jordan Lee",
      username: "jordanl",
      avatar: null,
      mutualFriends: 1,
    },
  },
];

export default function Feed() {
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await showPendingRequests();
      setRequests(data);
    }
    fetchData();
  }, []);

  const fetchRequests = async () => {
    const data = await showPendingRequests();
    setRequests(data);
  };

  const handleRefresh = async () => {
    await fetchRequests();
  };
  // const [posts, setPosts] = useState<Post[]>(mockPosts);

  // const [isLoading] = useState(false);

  // const handleNewPost = (content: string, imageUrl?: string) => {
  //   const newPost: Post = {
  //     id: Date.now().toString(),
  //     author: { id: "1", name: "John Doe", username: "johndoe", avatar: null },
  //     content,
  //     imageUrl,
  //     likes: 0,
  //     comments: [],
  //     liked: false,
  //     createdAt: "now",
  //   };
  //   setPosts([newPost, ...posts]);
  // };

  // const handleAcceptRequest = (requestId: string) => {
  //   console.log("Accepted friend request:", requestId);
  //   setTimeout(() => {
  //     setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
  //   }, 2000);
  // };

  // const handleRejectRequest = (requestId: string) => {
  //   console.log("Rejected friend request:", requestId);
  //   setTimeout(() => {
  //     setFriendRequests((prev) => prev.filter((r) => r.id !== requestId));
  //   }, 2000);
  // };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* <CreatePostCard onPost={handleNewPost} /> */}

            {/* {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="w-24 h-4" />
                          <Skeleton className="w-16 h-3" />
                        </div>
                      </div>
                      <Skeleton className="w-full h-4" />
                      <Skeleton className="w-3/4 h-4" />
                      <Skeleton className="w-full h-48 rounded-lg" />
                    </CardContent>
                  </Card>
                ))
              : posts.map((post) => <PostCard key={post.id} post={post} />)} */}
          </div>

          <div className="space-y-4 hidden lg:block">
            {requests.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold">Friend Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {requests.map((request) => (
                    <FriendRequestCard
                      key={request.id}
                      request={request}
                      onFinished={handleRefresh}
                      // onAccept={() => friendRequestAction.handleAccept(request.id)}
                      // onReject={async () => friendRequestAction.handleReject(request.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold">Suggested Friends</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  No suggestions right now. Invite your friends to join!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
