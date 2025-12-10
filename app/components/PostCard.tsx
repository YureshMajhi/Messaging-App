import { useState } from 'react';
import { Heart, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar: string | null;
  };
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Array<{
    id: string;
    author: { name: string; avatar: string | null };
    content: string;
    time: string;
  }>;
  liked: boolean;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string, comment: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(post.comments);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
    onLike?.(post.id);
  };

  const handleComment = () => {
    if (commentText.trim()) {
      // todo: remove mock functionality
      const newComment = {
        id: Date.now().toString(),
        author: { name: 'You', avatar: null },
        content: commentText,
        time: 'now',
      };
      setComments([...comments, newComment]);
      setCommentText('');
      onComment?.(post.id, commentText);
    }
  };

  return (
    <Card data-testid={`post-${post.id}`}>
      <CardHeader className="flex flex-row items-center gap-3 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={post.author.avatar || undefined} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-sm">{post.author.name}</p>
          <p className="text-xs text-muted-foreground">@{post.author.username} · {post.createdAt}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" data-testid={`post-menu-${post.id}`}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="px-4 pb-3">
        <p className="text-sm mb-3">{post.content}</p>
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden bg-muted">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col p-0">
        <div className="flex items-center gap-4 px-4 py-2 border-t w-full">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={handleLike}
            data-testid={`like-${post.id}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            <span className="text-sm">{likesCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => setShowComments(!showComments)}
            data-testid={`comment-toggle-${post.id}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{comments.length}</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full border-t p-4 space-y-3">
            {comments.slice(0, 3).map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarImage src={comment.author.avatar || undefined} />
                  <AvatarFallback className="text-xs">{comment.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{comment.author.name}</span>
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
            {comments.length > 3 && (
              <Button variant="ghost" size="sm" className="text-xs">
                View all {comments.length} comments
              </Button>
            )}
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                className="flex-1"
                data-testid={`comment-input-${post.id}`}
              />
              <Button size="icon" onClick={handleComment} data-testid={`comment-submit-${post.id}`}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
