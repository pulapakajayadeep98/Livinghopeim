import "server-only";
import { deletePoster, listPosterNames } from "./posterStore";
import type { PosterKind } from "./posterStore";

export type Poster = {
  name: string; // file name, e.g. "2026-10-05.jpg"
  url: string;
  date: string; // YYYY-MM-DD
  label: string; // e.g. "Monday, 5 October 2026"
};

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

// How many earlier promise posters are shown under the current one.
export const PREVIOUS_PROMISE_COUNT = 6;

export function isDateString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    DATE_PATTERN.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  );
}

// The church's calendar date (India Standard Time, UTC+5:30 all year).
export function indiaDateString(time = Date.now()) {
  return new Date(time + IST_OFFSET_MS).toISOString().slice(0, 10);
}

export function formatDateLabel(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-IN", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function posterUrl(kind: PosterKind, name: string) {
  return `/api/poster-file/${kind}/${name}`;
}

function toPoster(kind: PosterKind, name: string, date: string): Poster {
  return { name, url: posterUrl(kind, name), date, label: formatDateLabel(date) };
}

// Every stored promise poster, newest first, including ones dated in the
// future. Only seven posters dated today or earlier are kept: once an eighth
// becomes current, the oldest is deleted from storage for good.
export async function getAllPromisePosters(): Promise<Poster[]> {
  const today = indiaDateString();
  const names = await listPosterNames("promises");
  const posters = names
    .map((name) => ({ name, date: name.replace(/\.jpg$/, "") }))
    .filter((item) => isDateString(item.date))
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((item) => toPoster("promises", item.name, item.date));

  const expired = posters
    .filter((poster) => poster.date <= today)
    .slice(PREVIOUS_PROMISE_COUNT + 1);
  if (expired.length === 0) return posters;

  // A failed delete is retried the next time the posters are listed.
  await Promise.allSettled(
    expired.map((poster) => deletePoster("promises", poster.name))
  );
  const expiredNames = new Set(expired.map((poster) => poster.name));
  return posters.filter((poster) => !expiredNames.has(poster.name));
}

// What visitors see: the latest poster dated today or earlier, then the
// previous six. A poster dated in the future stays hidden until its day.
export async function getPromisePosters(): Promise<Poster[]> {
  const today = indiaDateString();
  const posters = await getAllPromisePosters();
  return posters.filter((poster) => poster.date <= today);
}

// Update posters and gallery photos are named by their upload time, e.g.
// "1791193978364-042.jpg", and are listed newest first.
async function getUploadsByTime(kind: PosterKind): Promise<Poster[]> {
  const names = await listPosterNames(kind);
  return names
    .map((name) => ({ name, time: Number(name.split(/[-.]/)[0]) }))
    .filter((item) => Number.isFinite(item.time) && item.time > 0)
    .sort((a, b) => b.time - a.time || b.name.localeCompare(a.name))
    .map((item) => toPoster(kind, item.name, indiaDateString(item.time)));
}

export function getUpdatePosters() {
  return getUploadsByTime("updates");
}

export function getGalleryUploads() {
  return getUploadsByTime("gallery");
}
