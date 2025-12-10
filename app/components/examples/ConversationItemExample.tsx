import ConversationItem, { type Conversation } from '../ConversationItem';
import { ThemeProvider } from '@/context/ThemeContext';

// todo: remove mock functionality
const mockConversations: Conversation[] = [
  { id: 'c1', user: { id: 'u1', name: 'Sarah Wilson', avatar: null, online: true }, lastMessage: 'That sounds great! See you soon.', lastMessageTime: '2m', unreadCount: 2 },
  { id: 'c2', user: { id: 'u2', name: 'Michael Chen', avatar: null, online: false }, lastMessage: 'Thanks for the photos!', lastMessageTime: '1h', unreadCount: 0 },
];

export default function ConversationItemExample() {
  return (
    <ThemeProvider>
      <div className="max-w-xs mx-auto p-4 space-y-2">
        {mockConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onClick={() => console.log('Selected:', conversation.id)}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}
