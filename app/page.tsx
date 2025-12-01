import { signout } from "./lib/actions/auth";
import { verifySession } from "./lib/dal";

export default async function Home() {
  const session = await verifySession();

  return (
    <div>
      <div>chat app</div>
      <div>
        <button onClick={signout}>Log Out</button>
      </div>
    </div>
  );
}
