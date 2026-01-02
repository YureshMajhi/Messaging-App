"use client";

import { useActionState } from "react";
import { sendMessage } from "@/lib/actions/data";
import { Input } from "@/components/ui/input";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft } from "lucide-react";

export default function SendMessage({ activeId }: { activeId: string }) {
  //   const params = useParams();
  //   const activeId = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [state, action, pending] = useActionState(sendMessage, undefined);

  return (
    <>
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
