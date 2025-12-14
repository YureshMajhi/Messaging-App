"use client";

import { useTransition } from "react";
import { UserTable } from "../lib/definitions";
import { sendFriendRequest } from "../lib/actions/data";

export default function Table({ users }: UserTable) {
  const [isPending, startTransition] = useTransition();

  const handleClick = (id: string) => {
    startTransition(async () => {
      const result = await sendFriendRequest(id);

      if (result?.error) {
        console.error(result.error);
      } else if (result?.message) {
        console.log(result.message);
      }
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id.toString()}>
            <td>{user.username}</td>
            <td>
              <button onClick={() => handleClick(user._id)}>Send Friend Request</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
