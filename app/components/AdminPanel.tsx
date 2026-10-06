"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Poster = { name: string; url: string; date: string; label: string };
type Kind = "promises" | "updates" | "gallery";

const MAX_SIDE = 1800;

// Shrinks and converts the chosen picture to JPEG in the browser, so uploads
// stay small and every image is stored in one format.
async function toJpeg(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext("2d");
  if (!context) throw new Error("This browser cannot prepare the image.");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) =>
        blob ? resolve(blob) : reject(new Error("Could not prepare the image.")),
      "image/jpeg",
      0.88
    );
  });
}

function UploadCard({
  kind,
  title,
  help,
  today,
  posters,
  onChanged,
  onSignedOut,
}: {
  kind: Kind;
  title: string;
  help: string;
  today: string;
  posters: Poster[];
  onChanged: () => Promise<void>;
  onSignedOut: () => void;
}) {
  const isGallery = kind === "gallery";
  const noun = isGallery ? "photo" : "poster";

  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [date, setDate] = useState(today);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(
    null
  );
  const [inputKey, setInputKey] = useState(0);

  const chooseFiles = (chosen: File[]) => {
    if (preview) URL.revokeObjectURL(preview);
    setFiles(chosen);
    setPreview(chosen.length ? URL.createObjectURL(chosen[0]) : null);
    setMessage(null);
  };

  const errorText = async (response: Response) => {
    const data = await response.json().catch(() => null);
    return (data?.error as string | undefined) ?? "Something went wrong.";
  };

  const handleUpload = async (event: React.FormEvent) => {
    event.preventDefault();
    if (files.length === 0) return;
    setBusy(true);
    setMessage(null);

    let uploaded = 0;
    let failure: string | null = null;

    for (const file of files) {
      try {
        const form = new FormData();
        form.set("kind", kind);
        if (kind === "promises") form.set("date", date);
        form.set("file", await toJpeg(file), "image.jpg");

        const response = await fetch("/api/admin/posters", {
          method: "POST",
          body: form,
        });
        if (response.status === 401) {
          onSignedOut();
          return;
        }
        if (!response.ok) {
          failure = `${file.name}: ${await errorText(response)}`;
          break;
        }
        uploaded += 1;
      } catch (error) {
        failure = `${file.name}: ${
          error instanceof Error ? error.message : "could not be uploaded."
        }`;
        break;
      }
    }

    if (uploaded > 0) {
      chooseFiles([]);
      setInputKey((key) => key + 1);
      await onChanged();
    }
    if (failure) {
      setMessage({
        ok: false,
        text:
          uploaded > 0 ? `${uploaded} uploaded, then stopped. ${failure}` : failure,
      });
    } else {
      setMessage({
        ok: true,
        text: uploaded === 1 ? `1 ${noun} uploaded.` : `${uploaded} ${noun}s uploaded.`,
      });
    }
    setBusy(false);
  };

  const handleDelete = async (poster: Poster) => {
    const question = isGallery
      ? "Delete this photo from the gallery?"
      : `Delete the poster for ${poster.label}?`;
    if (!window.confirm(question)) return;
    setBusy(true);
    setMessage(null);

    try {
      const response = await fetch(
        `/api/admin/posters?kind=${kind}&name=${encodeURIComponent(poster.name)}`,
        { method: "DELETE" }
      );
      if (response.status === 401) {
        onSignedOut();
        return;
      }
      if (response.ok) {
        await onChanged();
        setMessage({ ok: true, text: `The ${noun} was deleted.` });
      } else {
        setMessage({ ok: false, text: await errorText(response) });
      }
    } catch {
      setMessage({ ok: false, text: `Could not delete the ${noun}.` });
    }
    setBusy(false);
  };

  const replacing =
    kind === "promises" && posters.some((poster) => poster.date === date);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-[0_15px_35px_rgba(11,26,58,0.12)] sm:p-8">
      <h2 className="font-serif text-2xl font-semibold text-[#0b1a3a]">
        {title}
      </h2>
      <p className="mt-2 text-slate-600">{help}</p>

      <form onSubmit={handleUpload} className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="space-y-5">
          {kind === "promises" ? (
            <div>
              <label
                htmlFor={`${kind}-date`}
                className="block text-xs font-semibold uppercase tracking-wide text-[#4b2a7a]"
              >
                Date of this promise
              </label>
              <input
                id={`${kind}-date`}
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-[#0b1a3a] outline-none focus:border-[#4b2a7a]"
              />
              {replacing ? (
                <p className="mt-2 text-sm font-semibold text-[#b8901f]">
                  A poster already exists for this date. Uploading replaces it.
                </p>
              ) : date > today ? (
                <p className="mt-2 text-sm text-slate-500">
                  This poster stays hidden until that day.
                </p>
              ) : null}
            </div>
          ) : null}

          <div>
            <label
              htmlFor={`${kind}-file`}
              className="block text-xs font-semibold uppercase tracking-wide text-[#4b2a7a]"
            >
              {isGallery ? "Photos (you can choose several)" : "Poster image"}
            </label>
            <input
              key={inputKey}
              id={`${kind}-file`}
              type="file"
              accept="image/*"
              multiple={isGallery}
              onChange={(event) =>
                chooseFiles(Array.from(event.target.files ?? []))
              }
              required
              className="mt-2 block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#f1ecfb] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wide file:text-[#4b2a7a]"
            />
          </div>

          <button
            type="submit"
            disabled={busy || files.length === 0}
            className="rounded-full bg-[#d4af37] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5 disabled:opacity-60"
          >
            {busy
              ? "Please wait..."
              : files.length > 1
                ? `Upload ${files.length} photos`
                : `Upload ${noun}`}
          </button>

          {message ? (
            <p
              className={`text-sm font-semibold ${
                message.ok ? "text-green-700" : "text-red-600"
              }`}
              role="status"
            >
              {message.text}
            </p>
          ) : null}
        </div>

        <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-[#f8f5ff]">
          {preview ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt={`Preview of the chosen ${noun}`}
                className="max-h-72 w-auto max-w-full"
              />
              {files.length > 1 ? (
                <span className="absolute bottom-3 right-3 rounded-full bg-[#0b1a3a] px-3 py-1 text-xs font-semibold text-white">
                  +{files.length - 1} more
                </span>
              ) : null}
            </>
          ) : (
            <p className="px-4 text-center text-sm text-slate-400">
              The {noun} preview appears here.
            </p>
          )}
        </div>
      </form>

      <h3 className="mt-10 text-xs font-semibold uppercase tracking-[0.25em] text-[#4b2a7a]">
        Uploaded {noun}s ({posters.length})
      </h3>
      {posters.length === 0 ? (
        <p className="mt-3 text-slate-500">Nothing uploaded yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {posters.map((poster) => (
            <div
              key={poster.name}
              className="overflow-hidden rounded-xl bg-[#f8f5ff] ring-1 ring-slate-200"
            >
              <a href={poster.url} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={poster.url}
                  alt={`Uploaded ${noun}, ${poster.label}`}
                  loading="lazy"
                  className="block aspect-[4/5] w-full object-cover"
                />
              </a>
              <div className="p-3">
                <p className="text-xs font-semibold text-[#0b1a3a]">
                  {poster.label}
                </p>
                {kind === "promises" && poster.date > today ? (
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-[#b8901f]">
                    Scheduled
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => handleDelete(poster)}
                  disabled={busy}
                  className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-600 hover:underline disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AdminPanel({
  today,
  initialPromises,
  initialUpdates,
  initialGallery,
}: {
  today: string;
  initialPromises: Poster[];
  initialUpdates: Poster[];
  initialGallery: Poster[];
}) {
  const router = useRouter();
  const [promises, setPromises] = useState(initialPromises);
  const [updates, setUpdates] = useState(initialUpdates);
  const [gallery, setGallery] = useState(initialGallery);

  const reload = async () => {
    const response = await fetch("/api/admin/posters", { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    setPromises(data.promises);
    setUpdates(data.updates);
    setGallery(data.gallery);
  };

  const signOut = async () => {
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => null);
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={signOut}
          className="rounded-full border border-[#0b1a3a]/20 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] transition-colors hover:border-[#4b2a7a] hover:text-[#4b2a7a]"
        >
          Sign out
        </button>
      </div>

      <UploadCard
        kind="promises"
        title="Today's Promise"
        help="Upload one poster per day. The latest poster shows at the top of the Today's Promise page and in the popup; the six before it show underneath. Only seven posters are kept: when a new day's poster goes live, the oldest one is deleted automatically."
        today={today}
        posters={promises}
        onChanged={reload}
        onSignedOut={() => router.refresh()}
      />

      <UploadCard
        kind="updates"
        title="Updates"
        help="Upload announcement posters. They appear on the Updates page, newest first, until you delete them."
        today={today}
        posters={updates}
        onChanged={reload}
        onSignedOut={() => router.refresh()}
      />

      <UploadCard
        kind="gallery"
        title="Gallery"
        help="Upload photos for the Gallery page. New photos appear first, in the slideshow at the top and in the grid below, until you delete them."
        today={today}
        posters={gallery}
        onChanged={reload}
        onSignedOut={() => router.refresh()}
      />
    </div>
  );
}
