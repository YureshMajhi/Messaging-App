"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((text) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (text) {
      params.set("query", text);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <>
      <input
        type="text"
        placeholder="Search for user"
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
}
