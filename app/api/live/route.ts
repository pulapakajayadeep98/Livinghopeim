import { NextResponse } from "next/server";
import { getLiveData } from "../../lib/youtube";

export const dynamic = "force-dynamic";

// Polled by the Watch Live page so it switches to the broadcast on its own.
export async function GET() {
  return NextResponse.json(await getLiveData(), {
    headers: { "Cache-Control": "no-store" },
  });
}
