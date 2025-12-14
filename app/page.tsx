import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

export default async function Home() {
  return (
    <div>
      <Toaster />

      <div>chat app</div>
      <div>
        <Link href={"/dashboard"}>Go to Dashboard {">>"}</Link>
      </div>
    </div>
  );
}
