import { signout } from "../lib/actions/auth";
import { searchUsers, showFriends, showPendingRequests } from "../lib/actions/data";
import { verifySession } from "../lib/dal";
import Search from "../ui/search";
import Table from "../ui/table";
// import FriendRequests from "../components/FriendRequests";

export default async function Dashboard(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const session = await verifySession();

  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const users = await searchUsers(query, currentPage, session.userId);
  const friends = await showFriends(session.userId);
  const pendingRequests = await showPendingRequests(session.userId);

  const friendList = "error" in friends ? [] : friends;
  const pendingRequestsList = "error" in pendingRequests ? [] : pendingRequests;

  return (
    <>
      <div className="flex flex-col gap-8">
        <div>
          <h2>Welcome {session?.userName}</h2>
          <Search />
          <Table users={users} />
          <div>
            <button onClick={signout}>Log Out</button>
          </div>
        </div>

        {/* <FriendRequests pendingRequestsList={pendingRequestsList} /> */}

        <div className="flex gap-2">
          <div>
            <div>friends</div>
            {/* {friendList.map((friend) => (
              <div key={friend}>{friend}</div>
            ))} */}
          </div>
        </div>
      </div>
    </>
  );
}
