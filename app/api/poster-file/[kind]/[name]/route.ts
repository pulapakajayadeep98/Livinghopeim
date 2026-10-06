import { isPosterKind, isPosterName, readPoster } from "../../../../lib/posterStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ kind: string; name: string }> }
) {
  const { kind, name } = await params;

  if (!isPosterKind(kind) || !isPosterName(name)) {
    return new Response("Not found", { status: 404 });
  }

  const data = await readPoster(kind, name);
  if (!data) return new Response("Not found", { status: 404 });

  const headers: Record<string, string> = {
    "Content-Type": "image/jpeg",
    "Content-Length": String(data.length),
    // Short cache so a replaced poster shows up within a few minutes.
    "Cache-Control": "public, max-age=300",
  };

  if (new URL(request.url).searchParams.has("download")) {
    headers["Content-Disposition"] =
      `attachment; filename="living-hope-${kind}-${name}"`;
  }

  return new Response(new Uint8Array(data), { headers });
}
