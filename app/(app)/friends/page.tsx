import { Search, UserPlus, UserMinus, UserCheck, Users } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Friends() {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-full">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Friends</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search people..."
            className="pl-10"
            data-testid="input-search-friends"
          />
        </div>
      </main>
    </>
  );
}
