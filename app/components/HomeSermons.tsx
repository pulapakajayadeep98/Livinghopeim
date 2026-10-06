"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Stream = { id: string; title: string };
type LiveData = { live: Stream | null; streams: Stream[] };

const POLL_MS = 60 * 1000;
const VIDEO_COUNT = 3;

const iframeAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

// The current broadcast (when the channel is live) followed by the most
// recent messages, kept up to date from the YouTube channel.
export default function HomeSermons() {
  const [data, setData] = useState<LiveData | null>(null);
  // YouTube's heavy player is only loaded for a video the visitor taps;
  // until then each video is a lightweight thumbnail.
  const [playing, setPlaying] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (!response.ok) return;
        const next: LiveData = await response.json();
        // Keep the last good list if YouTube could not be reached.
        if (cancelled || (!next.live && next.streams.length === 0)) return;
        setData(next);
      } catch {
        // Try again on the next tick.
      }
    };

    load();
    const timer = window.setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const liveId = data?.live?.id ?? null;
  const videos = data
    ? [...(data.live ? [data.live] : []), ...data.streams].slice(0, VIDEO_COUNT)
    : [];

  return (
    <>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {videos.length === 0
          ? Array.from({ length: VIDEO_COUNT }, (_, index) => (
              <div
                key={index}
                className="aspect-video animate-pulse rounded-2xl bg-slate-200"
              />
            ))
          : videos.map((video, index) => {
              const isLive = video.id === liveId;
              return (
                <div key={video.id}>
                  <div
                    className={`overflow-hidden rounded-2xl bg-black shadow-[0_15px_35px_rgba(11,26,58,0.12)] ${
                      isLive ? "ring-4 ring-red-600" : ""
                    }`}
                  >
                    {playing.includes(video.id) ? (
                      <iframe
                        className="aspect-video w-full"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                        title={video.title}
                        allow={iframeAllow}
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setPlaying((current) => [...current, video.id])
                        }
                        aria-label={`Play ${video.title}`}
                        className="group relative block aspect-video w-full"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/35">
                          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                            <svg
                              width="26"
                              height="26"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    {isLive ? (
                      <span className="mt-0.5 inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                        </span>
                        Live now
                      </span>
                    ) : index === 0 ? (
                      <span className="mt-0.5 shrink-0 rounded-full bg-[#fff3cc] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0b1a3a]">
                        Latest
                      </span>
                    ) : null}
                    <p className="font-serif text-lg font-semibold leading-snug text-[#0b1a3a]">
                      {video.title}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/watch-live"
          className="inline-block rounded-full bg-[#d4af37] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5"
        >
          {liveId ? "Watch live with us" : "See more messages"}
        </Link>
      </div>
    </>
  );
}
