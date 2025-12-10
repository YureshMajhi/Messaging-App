import { useState, useRef } from 'react';
import { Image, X, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/context/AuthContext';

interface CreatePostCardProps {
  onPost?: (content: string, imageUrl?: string) => void;
}

export default function CreatePostCard({ onPost }: CreatePostCardProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePost = async () => {
    if (!content.trim() && !imagePreview) return;
    
    setIsPosting(true);
    // todo: remove mock functionality
    await new Promise(resolve => setTimeout(resolve, 500));
    onPost?.(content, imagePreview || undefined);
    setContent('');
    setImagePreview(null);
    setIsPosting(false);
  };

  return (
    <Card data-testid="create-post-card">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={user?.avatarUrl || undefined} alt={user?.displayName} />
            <AvatarFallback>{user?.displayName?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none border-0 focus-visible:ring-0 text-base min-h-[80px]"
              data-testid="create-post-input"
            />
            
            {imagePreview && (
              <div className="relative rounded-lg overflow-hidden">
                <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                  data-testid="remove-image"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 pt-2 border-t">
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  data-testid="image-input"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2"
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="add-image-button"
                >
                  <Image className="w-4 h-4" />
                  <span className="hidden sm:inline">Photo</span>
                </Button>
              </div>
              <Button
                onClick={handlePost}
                disabled={(!content.trim() && !imagePreview) || isPosting}
                data-testid="post-button"
              >
                {isPosting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post'
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
