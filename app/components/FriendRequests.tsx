"use client";

import { useTransition } from "react";
import { acceptFriendRequest } from "@/lib/actions/data";
import { UserWithoutEmail } from "@/lib/definitions";

export default function FriendRequests({
  pendingRequestsList,
}: {
  pendingRequestsList: UserWithoutEmail[];
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
        <div key={friend._id} className="flex gap-1">
          <div>{friend.username}</div>
          <button onClick={() => handleClick(friend._id)}>accept request</button>
        </div>
      ))}
    </div>
  );
}
