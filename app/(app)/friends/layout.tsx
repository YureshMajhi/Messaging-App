import { Users } from "lucide-react";
import SearchFriends from "@/app/components/SearchFriends";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-full">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>

        <SearchFriends />

        {children}
      </main>
    </>
  );
}
