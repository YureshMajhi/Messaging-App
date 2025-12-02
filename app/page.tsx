import Link from "next/link";
import { verifySession } from "./lib/dal";

export default async function Home() {
  return (
    <div>
      <div>chat app</div>
      <div>
        <Link href={"/dashboard"}>Go to Dashboard {">>"}</Link>
      </div>
    </div>
  );
}
