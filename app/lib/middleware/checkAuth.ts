import { NextResponse } from "next/server";
import { decrypt, updateSession } from "../session";

export async function checkAuth(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const match = cookie.match(/session=([^;]+)/);
  const session = match ? match[1] : null;

  if (!session) {
    return NextResponse.json({ error: "NOT_AUTHENTICATED" }, { status: 401 });
  }

  const payload = await decrypt(session);
  if (!payload?.userId) {
    return NextResponse.json({ error: "SESSION_INVALID_OR_EXPIRED" }, { status: 401 });
  }

  await updateSession();

  (req as any).user = payload;

  return NextResponse.next();
}
