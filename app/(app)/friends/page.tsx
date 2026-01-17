import { showFriends } from "@/app/lib/actions/data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Friends() {
  const friendList = await showFriends();

  return (
    <>
      <Tabs defaultValue="my-friends" className="w-full">
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="my-friends">My Friends ({friendList.length})</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
}
