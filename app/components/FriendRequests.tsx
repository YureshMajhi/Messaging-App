"use client";

import { useTransition } from "react";
import { acceptFriendRequest } from "../lib/actions/data";

export default function FriendRequests({
  pendingRequestsList,
}: {
  pendingRequestsList: string[];
}) {
  if (pendingRequestsList?.length === 0) return;

  const [isPending, startTransition] = useTransition();

  const handleClick = (id: string) => {
    startTransition(async () => {
      const result = await acceptFriendRequest(id);

      if (result?.error) {
        console.error(result.error);
      } else if (result?.message) {
        console.log(result.message);
      }
    });
  };
  return (
    <div>
      <div>pending requests</div>
      {pendingRequestsList.map((friend) => (
        <div key={friend} className="flex gap-1">
          <div>{friend}</div>
          <button onClick={() => handleClick(friend)}>accept request</button>
        </div>
      ))}
    </div>
  );
}
