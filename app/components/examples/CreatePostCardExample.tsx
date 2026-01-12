import CreatePostCard from "../CreatePostCard";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function CreatePostCardExample() {
  const handlePost = (content: string, imageUrl?: string) => {
    console.log("New post created:", { content, imageUrl });
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="max-w-xl mx-auto p-4">
          {/* <CreatePostCard onPost={handlePost} /> */}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
