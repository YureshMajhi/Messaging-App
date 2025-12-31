"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatTimeAgo } from "@/lib/utils";
import { Conversation } from "../lib/definitions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ConversationItemProps {
  conversation: Conversation;
}

export default function ConversationItem({ conversation }: ConversationItemProps) {
  const params = useParams();
  const activeId = params?.id;

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!activeId) return;

    if (activeId === conversation.id.toString()) {
      setIsActive(true);
      return;
    }
    setIsActive(false);
  }, [activeId]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer hover-elevate active-elevate-2",
        isActive && "bg-muted"
      )}
      data-testid={`conversation-${conversation.id}`}
    >
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage
            src={conversation.user.avatar || undefined}
            alt={conversation.user.name}
          />
          <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        {conversation.user.online && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-status-online rounded-full border-2 border-background" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "font-semibold text-sm truncate",
              conversation.unreadCount > 0 && "font-bold"
            )}
          >
            {conversation.user.name}
          </p>
          <span className="text-xs text-muted-foreground flex-shrink-0">
            {formatTimeAgo(conversation.lastMessageTime)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p
            className={cn(
              "text-xs truncate",
              conversation.unreadCount > 0
                ? "text-foreground font-medium"
                : "text-muted-foreground"
            )}
          >
            {conversation?.lastMessage || "Send a message"}
          </p>
          {conversation.unreadCount > 0 && (
            <Badge variant="default" className="h-5 min-w-5 px-1.5 text-xs flex-shrink-0">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
