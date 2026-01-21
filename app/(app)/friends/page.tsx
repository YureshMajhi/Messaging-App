"use client";

import { acceptFriendRequest, sendFriendRequest } from "@/app/lib/actions/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend, FriendList } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, UserCheck, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Friends() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const query = params.get("query") ?? "";

  const [friendsList, setFriendsList] = useState<Friend[]>([]);

  const allFriendsList = async () => {
    const res = await fetch("/api/friends");

    if (!res.ok) return [];

    const allFriends = await res.json();
    setFriendsList(allFriends);
  };

  const newPeople = async () => {
    const res = await fetch(`/api/users/search?query=${query}`);
    if (!res.ok) return [];

    const allPeople = await res.json();
    setFriendsList(allPeople);
  };

  useEffect(() => {
    if (query) {
      newPeople();
      return;
    }

    allFriendsList();
  }, [query]);

  return (
    <>
      <Tabs defaultValue="my-friends" className="w-full">
        <TabsContent value="my-friends" className="space-y-4">
          {friendsList.length > 0 ? (
            friendsList.map((person, i) => (
              <PeopleCard
                key={person.id + i}
                person={person}
                newPeople={newPeople}
                allFriendsList={allFriendsList}
              />
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No friends found.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

function PeopleCard({
  person,
  newPeople,
  allFriendsList,
}: {
  person: Friend;
  newPeople: () => void;
  allFriendsList: () => void;
}) {
  const handleClick = {
    sendRequest: async (id: string) => {
      const result = await sendFriendRequest(id);
      if (result.message) {
        newPeople();
      }
    },
    acceptRequest: async (requestId: string, accept: boolean = true) => {
      const result = await acceptFriendRequest(requestId, accept);
      if (result?.message) {
        newPeople();
      }
    },
    declineRequest: async (requestId: string, accept: boolean = false) => {
      const result = await acceptFriendRequest(requestId, accept);
      if (result?.message) {
        allFriendsList();
      }
    },
  };

  return (
    <Card className="hover-elevate">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border">
            {/* <AvatarImage src={person.avatar} /> */}
            <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{person.name}</p>
            <p className="text-sm text-muted-foreground">
              @{person.username.split(" ").join("").toLocaleLowerCase()}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {person.status === "friend" ? (
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive/10"
              data-testid={`button-remove-friend-${person.id}`}
              onClick={() => handleClick.declineRequest(person.requestId, false)}
            >
              <UserMinus className="w-4 h-4 mr-2" />
              Remove
            </Button>
          ) : person.status === "requested" ? (
            <Button
              variant="secondary"
              size="sm"
              disabled
              data-testid={`status-pending-${person.id}`}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Sent
            </Button>
          ) : person.status === "none" ? (
            <Button
              variant="default"
              size="sm"
              data-testid={`button-add-friend-${person.id}`}
              type="submit"
              onClick={() => handleClick.sendRequest(person.id)}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              data-testid={`button-accept-friend-${person.id}`}
              onClick={() => handleClick.acceptRequest(person.requestId)}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Accept
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
