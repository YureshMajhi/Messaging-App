import { signout } from "../lib/actions/auth";
import { verifySession } from "../lib/dal";
import Search from "../ui/search";
import Table from "../ui/table";

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

  return (
    <>
      <div>
        <Search />
        <Table query={query} currentPage={currentPage} />
        <div>
          <button onClick={signout}>Log Out</button>
        </div>
      </div>
    </>
  );
}
