import { searchUsers } from "@/app/lib/actions/data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const users = await searchUsers(query);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
