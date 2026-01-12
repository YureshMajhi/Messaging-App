"use client";

import { startTransition, useActionState, useEffect } from "react";
import { sendMessage } from "@/lib/actions/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { socket } from "@/socket";

export default function SendMessage({ activeId }: { activeId: string }) {
  const [state, action, pending] = useActionState(sendMessage, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = e.currentTarget;

    startTransition(() => {
      action(new FormData(form));
    });

    form.reset();
  };

  useEffect(() => {
    if (!state?.data) return;

    const newMessage = async () =>
      await fetch("http://localhost:3000/emitMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: state.data }),
      });

    newMessage();
  }, [state]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            className="flex-1"
            data-testid="input-message"
            name="new-message"
          />
          <Input type="hidden" name="conversationId" value={activeId} />
          <Button type="submit" disabled={pending} data-testid="button-send-message">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
