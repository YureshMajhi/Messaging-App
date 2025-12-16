import FeedClient from "@/components/FeedClient";
import { verifySession } from "../lib/dal";

export default async function FeedPage() {
  const session = await verifySession();

  return <FeedClient session={session} />;
}
