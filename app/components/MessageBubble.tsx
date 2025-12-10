import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar: string | null;
  timestamp: string;
  isOwn: boolean;
}

interface MessageBubbleProps {
  message: Message;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, showAvatar = true }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        'flex gap-2',
        message.isOwn ? 'flex-row-reverse' : 'flex-row'
      )}
      data-testid={`message-${message.id}`}
    >
      {showAvatar && !message.isOwn ? (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src={message.senderAvatar || undefined} alt={message.senderName} />
          <AvatarFallback className="text-xs">{message.senderName.charAt(0)}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-8 flex-shrink-0" />
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2',
          message.isOwn
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-muted rounded-tl-sm'
        )}
      >
        <p className="text-sm break-words">{message.content}</p>
        <p className={cn(
          'text-xs mt-1',
          message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
        )}>
          {message.timestamp}
        </p>
      </div>
    </div>
  );
}
