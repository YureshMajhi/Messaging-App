import { showFriends } from "@/app/lib/actions/data";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const friends = await showFriends();
    return NextResponse.json(friends);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
