"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchFriends() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((text) => {
    const params = new URLSearchParams(searchParams);

    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search people..."
          className="pl-10"
          data-testid="input-search-friends"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
}
