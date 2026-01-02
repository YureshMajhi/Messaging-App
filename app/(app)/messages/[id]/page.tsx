"use client";

import { Button } from "@/components/ui/button";
import MessageBubble, { type Message } from "@/components/MessageBubble";
import { Send, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { sendMessage } from "@/app/lib/actions/data";
import { useParams } from "next/navigation";

export default function Messages() {
  const params = useParams();
  const activeId = params?.id;

  const [state, action, pending] = useActionState(sendMessage, undefined);

  return (
    <>
      <div className="p-4 border-b flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          data-testid="button-back-to-conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="relative">
          <Avatar className="h-10 w-10">
            {/* <AvatarImage src={activeConversation.user.avatar || undefined} /> */}
            <AvatarFallback>
              {/* {activeConversation.user.name.charAt(0)} */}U
            </AvatarFallback>
          </Avatar>
          {/* {activeConversation.user.online && ( */}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
          {/* )} */}
        </div>
        <div>
          <p className="font-semibold text-sm">{/* {activeConversation.user.name} */}</p>
          <p className="text-xs text-muted-foreground">
            {/* {activeConversation.user.online ? "Online" : "Offline"} */}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {/* {messages.map((message, index) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      showAvatar={
                        index === 0 || messages[index - 1].senderId !== message.senderId
                      }
                    />
                  ))} */}
          {/* <div ref={messagesEndRef} /> */}
        </div>
      </ScrollArea>

      <form action={action}>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              className="flex-1"
              data-testid="input-message"
              name="new-message"
            />
            <Input
              type="hidden"
              placeholder="Type a message..."
              name="conversationId"
              value={activeId}
            />
            <Button type="submit" data-testid="button-send-message">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
