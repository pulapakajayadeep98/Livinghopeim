import { NextResponse } from "next/server";
import { getPromisePosters, indiaDateString } from "../../../lib/posters";

export const dynamic = "force-dynamic";

// The promise poster visitors should see right now, for the site-wide popup.
export async function GET() {
  const [poster] = await getPromisePosters();
  return NextResponse.json(
    poster
      ? { poster, isToday: poster.date === indiaDateString() }
      : { poster: null, isToday: false },
    { headers: { "Cache-Control": "no-store" } }
  );
}
