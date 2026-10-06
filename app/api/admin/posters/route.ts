import { NextResponse } from "next/server";
import { isAdmin } from "../../../lib/adminAuth";
import {
  deletePoster,
  isPosterKind,
  isPosterName,
  savePoster,
} from "../../../lib/posterStore";
import {
  getAllPromisePosters,
  getGalleryUploads,
  getUpdatePosters,
  isDateString,
} from "../../../lib/posters";

const MAX_BYTES = 8 * 1024 * 1024;

function unauthorized() {
  return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
}

export async function GET() {
  if (!(await isAdmin())) return unauthorized();

  const [promises, updates, gallery] = await Promise.all([
    getAllPromisePosters(),
    getUpdatePosters(),
    getGalleryUploads(),
  ]);
  return NextResponse.json({ promises, updates, gallery });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return unauthorized();

  const form = await request.formData().catch(() => null);
  const kind = form?.get("kind");
  const file = form?.get("file");

  if (!isPosterKind(kind) || !(file instanceof File)) {
    return NextResponse.json({ error: "Missing poster." }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "The poster must be smaller than 8 MB." },
      { status: 400 }
    );
  }

  const data = Buffer.from(await file.arrayBuffer());
  // The admin page converts every poster to JPEG before sending it.
  const isJpeg = data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  if (!isJpeg) {
    return NextResponse.json(
      { error: "The poster must be an image." },
      { status: 400 }
    );
  }

  let name: string;
  if (kind === "promises") {
    const date = form?.get("date");
    if (!isDateString(date)) {
      return NextResponse.json(
        { error: "Choose the date for this promise." },
        { status: 400 }
      );
    }
    name = `${date}.jpg`; // one poster per day; a new upload replaces it
  } else {
    // The suffix keeps photos uploaded in the same instant from colliding.
    const suffix = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
    name = `${Date.now()}-${suffix}.jpg`;
  }

  await savePoster(kind, name, data);
  return NextResponse.json({ ok: true, name });
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return unauthorized();

  const { searchParams } = new URL(request.url);
  const kind = searchParams.get("kind");
  const name = searchParams.get("name");

  if (!isPosterKind(kind) || !isPosterName(name)) {
    return NextResponse.json({ error: "Unknown poster." }, { status: 400 });
  }

  await deletePoster(kind, name);
  return NextResponse.json({ ok: true });
}
