"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble, { type Message } from "@/components/MessageBubble";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";

export default function MessageBox({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Socket Connected ", socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Socket transported: ", transport.name);
      });
    }

    function onDisconnect() {
      console.log("Socket Disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("new-message", (data) => console.log(data));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

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
