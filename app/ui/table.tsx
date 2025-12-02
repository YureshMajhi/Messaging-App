import { searchUsers } from "../lib/actions/data";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await searchUsers(query, currentPage);
  console.log(users);

  return (
    <table>
      <thead>
        <tr>
          <th>User Name</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user._id}>
            <td>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
