import { verifySession } from "@/lib/dal";
import Navbar from "@/components/Navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await verifySession();

  return (
    <>
      <div className="min-h-screen bg-background">
        <Navbar />
        {children}
      </div>
    </>
  );
}
