import PostCard, { type Post } from '../PostCard';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

// todo: remove mock functionality
const mockPost: Post = {
  id: 'example1',
  author: { id: '2', name: 'Sarah Wilson', username: 'sarahw', avatar: null },
  content: 'Just had the most amazing brunch with the family! Nothing beats quality time together.',
  imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
  likes: 24,
  comments: [
    { id: 'c1', author: { name: 'Mike', avatar: null }, content: 'Looks delicious!', time: '1h ago' },
    { id: 'c2', author: { name: 'Emma', avatar: null }, content: 'Where is this place?', time: '45m ago' },
  ],
  liked: false,
  createdAt: '2h ago',
};

export default function PostCardExample() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="max-w-xl mx-auto p-4">
          <PostCard post={mockPost} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
