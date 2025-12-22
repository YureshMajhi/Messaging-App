import { verifySession } from "@/lib/dal";
import Navbar from "@/components/Navbar";
import fetchConversations from "../lib/actions/data";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await verifySession();
  const test = await fetchConversations();

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        {children}
      </div>
    </>
  );
}
