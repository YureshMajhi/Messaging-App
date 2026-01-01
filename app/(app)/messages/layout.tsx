// import { useState, useRef, useEffect } from "react";
import { Send, Search, ArrowLeft } from "lucide-react";
import ConversationItem from "@/components/ConversationItem";
// import MessageBubble, { type Message } from "@/components/MessageBubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import fetchConversations from "@/app/lib/actions/data";
import Link from "next/link";

// const mockMessages: Record<string, Message[]> = {
//   c1: [
//     {
//       id: "m1",
//       content: "Hey! How are you doing?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:30 AM",
//       isOwn: false,
//     },
//     {
//       id: "m2",
//       content: "I'm doing great! Just finished work.",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:32 AM",
//       isOwn: true,
//     },
//     {
//       id: "m3",
//       content: "Nice! Want to grab coffee later?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:33 AM",
//       isOwn: false,
//     },
//     {
//       id: "m4",
//       content: "Sure! Let's meet at the usual place around 3?",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:35 AM",
//       isOwn: true,
//     },
//     {
//       id: "m5",
//       content: "That sounds great! See you soon.",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:36 AM",
//       isOwn: false,
//     },
//     {
//       id: "m131",
//       content: "Hey! How are you doing?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:30 AM",
//       isOwn: false,
//     },
//     {
//       id: "m231",
//       content: "I'm doing great! Just finished work.",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:32 AM",
//       isOwn: true,
//     },
//     {
//       id: "m331",
//       content: "Nice! Want to grab coffee later?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:33 AM",
//       isOwn: false,
//     },
//     {
//       id: "m134",
//       content: "Sure! Let's meet at the usual place around 3?",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:35 AM",
//       isOwn: true,
//     },
//     {
//       id: "m351",
//       content: "That sounds great! See you soon.",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:36 AM",
//       isOwn: false,
//     },
//     {
//       id: "m1314",
//       content: "Hey! How are you doing?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:30 AM",
//       isOwn: false,
//     },
//     {
//       id: "m2431",
//       content: "I'm doing great! Just finished work.",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:32 AM",
//       isOwn: true,
//     },
//     {
//       id: "m3341",
//       content: "Nice! Want to grab coffee later?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:33 AM",
//       isOwn: false,
//     },
//     {
//       id: "m1344",
//       content: "Sure! Let's meet at the usual place around 3?",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:35 AM",
//       isOwn: true,
//     },
//     {
//       id: "m5314",
//       content: "That sounds great! See you soon.",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:36 AM",
//       isOwn: false,
//     },
//   ],
//   c2: [
//     {
//       id: "m6",
//       content: "Here are the photos from the trip!",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "9:00 AM",
//       isOwn: true,
//     },
//     {
//       id: "m7",
//       content: "Thanks for the photos!",
//       senderId: "u2",
//       senderName: "Michael Chen",
//       senderAvatar: null,
//       timestamp: "9:15 AM",
//       isOwn: false,
//     },
//     {
//       id: "m17",
//       content: "Hey! How are you doing?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:30 AM",
//       isOwn: false,
//     },
//     {
//       id: "m27",
//       content: "I'm doing great! Just finished work.",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:32 AM",
//       isOwn: true,
//     },
//     {
//       id: "m37",
//       content: "Nice! Want to grab coffee later?",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:33 AM",
//       isOwn: false,
//     },
//     {
//       id: "m47",
//       content: "Sure! Let's meet at the usual place around 3?",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "10:35 AM",
//       isOwn: true,
//     },
//     {
//       id: "m57",
//       content: "That sounds great! See you soon.",
//       senderId: "u1",
//       senderName: "Sarah Wilson",
//       senderAvatar: null,
//       timestamp: "10:36 AM",
//       isOwn: false,
//     },
//   ],
//   c22: [
//     {
//       id: "m67",
//       content: "Here are the photos from the trip!",
//       senderId: "me",
//       senderName: "You",
//       senderAvatar: null,
//       timestamp: "9:00 AM",
//       isOwn: true,
//     },
//     {
//       id: "m99",
//       content: "Thanks for the photos!",
//       senderId: "u2",
//       senderName: "Michael Chen",
//       senderAvatar: null,
//       timestamp: "9:15 AM",
//       isOwn: false,
//     },
//   ],
// };

export default async function Layout({ children }: { children: React.ReactNode }) {
  // const [conversations, setConversations] = useState(mockConversations);
  // const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [searchQuery, setSearchQuery] = useState("");
  // const messagesEndRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (activeConversation) {
  //     const convMessages = mockMessages[activeConversation.id] || [];
  //     setMessages(convMessages);
  //     setConversations((prev) =>
  //       prev.map((c) => (c.id === activeConversation.id ? { ...c, unreadCount: 0 } : c))
  //     );
  //   }
  // }, [activeConversation]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  // const handleSendMessage = () => {
  //   if (!newMessage.trim() || !activeConversation) return;

  //   const message: Message = {
  //     id: Date.now().toString(),
  //     content: newMessage,
  //     senderId: "me",
  //     senderName: "You",
  //     senderAvatar: null,
  //     timestamp: new Date().toLocaleTimeString([], {
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     }),
  //     isOwn: true,
  //   };

  //   setMessages((prev) => [...prev, message]);
  //   setNewMessage("");

  //   // Update last message in conversation list
  //   setConversations((prev) =>
  //     prev.map((c) =>
  //       c.id === activeConversation.id
  //         ? { ...c, lastMessage: newMessage, lastMessageTime: "now" }
  //         : c
  //     )
  //   );
  // };

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

          {/* <>
            <div className="p-4 border-b flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setActiveConversation(null)}
                data-testid="button-back-to-conversations"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.user.avatar || undefined} />
                  <AvatarFallback>
                    {activeConversation.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {activeConversation.user.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
                )} 
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {activeConversation.user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activeConversation.user.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      showAvatar={
                        index === 0 || messages[index - 1].senderId !== message.senderId
                      }
                    />
                  ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                  data-testid="input-message"
                />
                <Button
                  onClick={handleSendMessage}
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </> */}
        </div>
      </Card>
    </main>
  );
}
