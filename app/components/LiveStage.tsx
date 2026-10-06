"use client";

import { useEffect, useRef, useState } from "react";

type Stream = { id: string; title: string };
type LiveData = { live: Stream | null; streams: Stream[] };

const POLL_MS = 60 * 1000;

const iframeAllow =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

export default function LiveStage({
  initial,
  channelUrl,
  children,
}: {
  initial: LiveData;
  channelUrl: string;
  children: React.ReactNode; // shown between the player and the messages
}) {
  const [data, setData] = useState(initial);
  // A previous message the visitor picked; cleared when a broadcast starts.
  const [picked, setPicked] = useState<string | null>(null);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const liveId = data.live?.id ?? null;
  const lastLiveId = useRef(liveId);

  // Checks every minute so the page switches to the broadcast when it starts
  // and back to the recording when it ends, without a refresh.
  useEffect(() => {
    const check = async () => {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/live", { cache: "no-store" });
        if (!response.ok) return;
        const next: LiveData = await response.json();
        // Keep the last good list if YouTube could not be reached.
        if (!next.live && next.streams.length === 0) return;
        if (next.live && next.live.id !== lastLiveId.current) setPicked(null);
        lastLiveId.current = next.live?.id ?? null;
        setData(next);
      } catch {
        // Try again on the next tick.
      }
    };

    const timer = window.setInterval(check, POLL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const latest = data.streams[0];
  const isLive = Boolean(data.live) && picked === null;
  const current =
    data.streams.find((stream) => stream.id === picked) ?? data.live ?? latest;
  // Everything except what is playing; while live, that includes the latest
  // recording.
  const previous = data.streams
    .filter((stream) => stream.id !== current?.id)
    .slice(0, 6);

  const play = (id: string) => {
    setPicked(id);
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <div ref={playerRef} className="scroll-mt-6">
        {current ? (
          <>
            <div className="mb-5 flex flex-wrap items-center justify-center gap-3 text-center">
              {isLive ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                  </span>
                  Live now
                </span>
              ) : (
                <span className="rounded-full bg-[#fff3cc] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#0b1a3a]">
                  {current.id === latest?.id ? "Latest message" : "Message"}
                </span>
              )}
              <h2 className="font-serif text-2xl font-semibold text-[#0b1a3a] sm:text-3xl">
                {current.title}
              </h2>
            </div>

            <div className="overflow-hidden rounded-3xl bg-black shadow-[0_18px_40px_rgba(11,26,58,0.2)]">
              <iframe
                key={current.id}
                className="aspect-video w-full"
                // Browsers only start a video without a tap when it is muted,
                // so the live broadcast begins muted; a picked message
                // follows a tap and plays with sound.
                src={`https://www.youtube.com/embed/${current.id}${
                  isLive ? "?autoplay=1&mute=1" : picked ? "?autoplay=1" : ""
                }`}
                title={current.title}
                allow={iframeAllow}
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            {data.live && !isLive ? (
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => setPicked(null)}
                  className="rounded-full bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-all hover:-translate-y-0.5"
                >
                  We are live now - watch live
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <p className="py-10 text-center text-lg text-slate-500">
            Our messages could not be loaded right now. Please{" "}
            <a
              href={`${channelUrl}/streams`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#4b2a7a] underline"
            >
              watch on YouTube
            </a>
            .
          </p>
        )}
      </div>

      {children}

      {previous.length ? (
        <>
          <div className="mt-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              Media
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
              Previous Messages
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {previous.map((stream) => (
              <button
                key={stream.id}
                type="button"
                onClick={() => play(stream.id)}
                className="group overflow-hidden rounded-2xl bg-white text-left shadow-[0_15px_35px_rgba(11,26,58,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(11,26,58,0.2)]"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${stream.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#0b1a3a] shadow-lg">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </span>
                </div>
                <p className="p-4 font-serif text-lg font-semibold leading-snug text-[#0b1a3a]">
                  {stream.title}
                </p>
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
