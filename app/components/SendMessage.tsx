"use client";

import { useActionState } from "react";
import { sendMessage } from "@/lib/actions/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function SendMessage({ activeId }: { activeId: string }) {
  const [state, action, pending] = useActionState(sendMessage, undefined);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pending) return;

    const form = e.currentTarget;
    action(new FormData(form));
    form.reset();
  };

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
