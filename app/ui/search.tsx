"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (e) {
      params.set("query", e);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  };
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
