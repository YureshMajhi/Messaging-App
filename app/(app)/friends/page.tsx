"use client";

import { searchUsers, showFriends } from "@/app/lib/actions/data";
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

  useEffect(() => {
    const friendsList = async () => {
      const allFriends = await showFriends();
      if (allFriends.length > 0) setFriendsList(allFriends);
    };

    const newPeople = async () => {
      const allPeople = await searchUsers(query);
      setFriendsList(allPeople);
    };

    if (query) {
      newPeople();
      return;
    }

    friendsList();
  }, [query]);

  return (
    <>
      <Tabs defaultValue="my-friends" className="w-full">
        <TabsContent value="my-friends" className="space-y-4">
          {friendsList.length > 0 ? (
            friendsList.map((person, i) => (
              <PeopleCard key={person.id + i} person={person} />
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

function PeopleCard({ person }: { person: Friend }) {
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
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              data-testid={`button-accept-friend-${person.id}`}
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
