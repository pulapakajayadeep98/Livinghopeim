import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { del, list, put } from "@vercel/blob";

export type PosterKind = "promises" | "updates" | "gallery";

export const posterKinds: PosterKind[] = ["promises", "updates", "gallery"];

// Uploaded files are always JPEGs named by the admin API, e.g. "2026-10-05.jpg".
const NAME_PATTERN = /^[0-9A-Za-z-]+\.jpg$/;

export function isPosterKind(value: unknown): value is PosterKind {
  return posterKinds.includes(value as PosterKind);
}

export function isPosterName(value: unknown): value is string {
  return typeof value === "string" && NAME_PATTERN.test(value);
}

// On Vercel the disk is read-only, so posters go to Vercel Blob when its token
// is configured. Everywhere else they are kept in the project's data folder.
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const LOCAL_ROOT = path.join(process.cwd(), "data", "posters");

function blobPath(kind: PosterKind, name = "") {
  return `posters/${kind}/${name}`;
}

async function listBlobs(prefix: string) {
  const blobs = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  return blobs;
}

export async function listPosterNames(kind: PosterKind): Promise<string[]> {
  if (useBlob) {
    const blobs = await listBlobs(blobPath(kind));
    return blobs
      .map((blob) => blob.pathname.slice(blobPath(kind).length))
      .filter(isPosterName);
  }

  try {
    const names = await fs.readdir(path.join(LOCAL_ROOT, kind));
    return names.filter(isPosterName);
  } catch {
    return [];
  }
}

export async function savePoster(
  kind: PosterKind,
  name: string,
  data: Buffer
): Promise<void> {
  if (useBlob) {
    await put(blobPath(kind, name), data, {
      access: "public",
      contentType: "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  const dir = path.join(LOCAL_ROOT, kind);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), data);
}

export async function deletePoster(
  kind: PosterKind,
  name: string
): Promise<void> {
  if (useBlob) {
    const blobs = await listBlobs(blobPath(kind, name));
    const match = blobs.find((blob) => blob.pathname === blobPath(kind, name));
    if (match) await del(match.url);
    return;
  }

  await fs.rm(path.join(LOCAL_ROOT, kind, name), { force: true });
}

export async function readPoster(
  kind: PosterKind,
  name: string
): Promise<Buffer | null> {
  if (useBlob) {
    const blobs = await listBlobs(blobPath(kind, name));
    const match = blobs.find((blob) => blob.pathname === blobPath(kind, name));
    if (!match) return null;
    const response = await fetch(match.url, { cache: "no-store" });
    if (!response.ok) return null;
    return Buffer.from(await response.arrayBuffer());
  }

  try {
    return await fs.readFile(path.join(LOCAL_ROOT, kind, name));
  } catch {
    return null;
  }
}
