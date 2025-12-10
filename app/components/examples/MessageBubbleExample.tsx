import MessageBubble, { type Message } from '../MessageBubble';
import { ThemeProvider } from '@/context/ThemeContext';

// todo: remove mock functionality
const mockMessages: Message[] = [
  { id: 'm1', content: 'Hey! How are you doing?', senderId: 'u1', senderName: 'Sarah Wilson', senderAvatar: null, timestamp: '10:30 AM', isOwn: false },
  { id: 'm2', content: "I'm doing great! Just finished work.", senderId: 'me', senderName: 'You', senderAvatar: null, timestamp: '10:32 AM', isOwn: true },
  { id: 'm3', content: 'Nice! Want to grab coffee later?', senderId: 'u1', senderName: 'Sarah Wilson', senderAvatar: null, timestamp: '10:33 AM', isOwn: false },
];

export default function MessageBubbleExample() {
  return (
    <ThemeProvider>
      <div className="max-w-md mx-auto p-4 space-y-3">
        {mockMessages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            showAvatar={index === 0 || mockMessages[index - 1].senderId !== message.senderId}
          />
        ))}
      </div>
    </ThemeProvider>
  );
}
