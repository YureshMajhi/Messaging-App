import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchMessages } from "@/app/lib/actions/data";
import SendMessage from "@/app/components/SendMessage";
import MessageBox from "@/app/components/MessageBox";
import { verifySession } from "@/app/lib/dal";

export default async function Messages(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const conversationId = params.id;

  const session = await verifySession();
  const messages = await fetchMessages(conversationId);

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

      <MessageBox messages={messages} userId={session.userId} chatId={conversationId} />

      <SendMessage activeId={conversationId} />
    </>
  );
}
