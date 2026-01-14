"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble, { type Message } from "@/components/MessageBubble";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/socket";

export default function MessageBox({
  messages,
  userId,
  chatId,
}: {
  messages: Message[];
  userId: String;
  chatId: String;
}) {
  const [currentMessage, setCurrentMessage] = useState<Message[]>(messages);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessage]);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("Socket Connected ", socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        console.log("Socket transported: ", transport.name);
      });

      socket.emit("join-room", chatId);
    }

    function onDisconnect() {
      console.log("Socket Disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    socket.on("new-message", (message) => {
      let newMessage = message;
      if (newMessage.senderId === userId) {
        newMessage.isOwn = true;
      } else {
        newMessage.isOwn = false;
      }

      setCurrentMessage((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {currentMessage.map((message, index) => (
            <MessageBubble
              key={message.id}
              message={message}
              showAvatar={
                index === 0 || currentMessage[index - 1].senderId !== message.senderId
              }
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </>
  );
}
