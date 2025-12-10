import { Bell, Heart, MessageCircle, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

// todo: remove mock functionality
interface Notification {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'message';
  user: { name: string; avatar: string | null };
  content: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  { id: '1', type: 'like', user: { name: 'Sarah', avatar: null }, content: 'liked your photo', time: '2m ago', read: false },
  { id: '2', type: 'comment', user: { name: 'Mike', avatar: null }, content: 'commented on your post', time: '15m ago', read: false },
  { id: '3', type: 'friend_request', user: { name: 'Emma', avatar: null }, content: 'sent you a friend request', time: '1h ago', read: false },
  { id: '4', type: 'message', user: { name: 'Alex', avatar: null }, content: 'sent you a message', time: '2h ago', read: true },
  { id: '5', type: 'like', user: { name: 'Lisa', avatar: null }, content: 'liked your photo', time: '3h ago', read: true },
];

const getIcon = (type: Notification['type']) => {
  switch (type) {
    case 'like': return Heart;
    case 'comment': return MessageCircle;
    case 'friend_request': return UserPlus;
    case 'message': return MessageCircle;
  }
};

const getIconColor = (type: Notification['type']) => {
  switch (type) {
    case 'like': return 'text-red-500';
    case 'comment': return 'text-blue-500';
    case 'friend_request': return 'text-green-500';
    case 'message': return 'text-purple-500';
  }
};

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" data-testid="button-notifications">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <span className="font-semibold text-sm">Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs h-auto py-1" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">
              No notifications yet
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = getIcon(notification.type);
              return (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 cursor-pointer ${!notification.read ? 'bg-muted/50' : ''}`}
                  data-testid={`notification-${notification.id}`}
                >
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarImage src={notification.user.avatar || undefined} />
                    <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">
                      <span className="font-semibold">{notification.user.name}</span>{' '}
                      <span className="text-muted-foreground">{notification.content}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Icon className={`w-3 h-3 ${getIconColor(notification.type)}`} />
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                  )}
                </DropdownMenuItem>
              );
            })
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
