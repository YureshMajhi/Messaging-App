"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble, { type Message } from "@/components/MessageBubble";
import { useEffect, useRef } from "react";

export default function MessageBox({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
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
    </>
  );
}
