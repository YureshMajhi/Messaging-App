import { showFriends } from "@/app/lib/actions/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Friend } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, UserMinus, UserCheck, Users } from "lucide-react";

export default async function Friends() {
  const friendsList = await showFriends();

  return (
    <>
      <Tabs defaultValue="my-friends" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="my-friends">My Friends ({friendsList.length})</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-friends" className="space-y-4">
          {friendsList.length > 0 ? (
            friendsList.map((person, i) => (
              <FriendCard key={person.id + i} person={person} />
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

function FriendCard({ person }: { person: Friend }) {
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
          ) : person.status === "pending" ? (
            <Button
              variant="secondary"
              size="sm"
              disabled
              data-testid={`status-pending-${person.id}`}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Sent
            </Button>
          ) : (
            <Button
              variant="default"
              size="sm"
              data-testid={`button-add-friend-${person.id}`}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
