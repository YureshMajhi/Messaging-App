import { Search } from "lucide-react";
import ConversationItem from "@/components/ConversationItem";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchConversations } from "@/app/lib/actions/data";
import Link from "next/link";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const conversations = await fetchConversations();

  const filteredConversations = conversations.map((c) => ({
    id: c.id,
    user: c.user,
    lastMessage: c.lastMessage,
    lastMessageTime: c.lastMessageTime,
    unreadCount: c.unreadCount,
  }));

  const activeConversation = null;

  return (
    <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-4">
      <Card className="h-[calc(100vh-8rem)] flex overflow-hidden">
        <div
          className={`w-full md:w-80 border-r flex flex-col ${
            activeConversation ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                data-testid="input-search-conversations"
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No conversations found
                </p>
              ) : (
                filteredConversations.map((conversation) => (
                  <Link
                    key={conversation.id.toString()}
                    href={`/messages/${conversation.id.toString()}`}
                  >
                    <ConversationItem conversation={conversation} />
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div
          className={`flex-1 flex flex-col ${
            !activeConversation ? "hidden md:flex" : "flex"
          }`}
        >
          {children}
        </div>
      </Card>
    </main>
  );
}
