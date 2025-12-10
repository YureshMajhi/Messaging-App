import { Check, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export interface FriendRequest {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
    mutualFriends: number;
  };
}

interface FriendRequestCardProps {
  request: FriendRequest;
  onAccept?: (requestId: string) => void;
  onReject?: (requestId: string) => void;
}

export default function FriendRequestCard({ request, onAccept, onReject }: FriendRequestCardProps) {
  const [status, setStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');

  const handleAccept = () => {
    setStatus('accepted');
    onAccept?.(request.id);
  };

  const handleReject = () => {
    setStatus('rejected');
    onReject?.(request.id);
  };

  if (status !== 'pending') {
    return (
      <Card className="bg-muted/50" data-testid={`friend-request-${request.id}`}>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-muted-foreground">
            {status === 'accepted' ? `You are now friends with ${request.user.name}` : 'Request removed'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid={`friend-request-${request.id}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={request.user.avatar || undefined} alt={request.user.name} />
            <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{request.user.name}</p>
            <p className="text-xs text-muted-foreground">@{request.user.username}</p>
            {request.user.mutualFriends > 0 && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {request.user.mutualFriends} mutual friend{request.user.mutualFriends > 1 ? 's' : ''}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" onClick={handleAccept} data-testid={`accept-request-${request.id}`}>
              <Check className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReject} data-testid={`reject-request-${request.id}`}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
