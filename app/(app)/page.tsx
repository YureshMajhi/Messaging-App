import { verifySession } from "@/lib/dal";
import FeedClient from "@/components/FeedClient";

export default async function Home() {
  const session = await verifySession();

  return (
    <>
      <FeedClient session={session} />
    </>
  );
}
