"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const POPUP_DELAY_MS = 10000;
const SEEN_KEY = "lh-promise-popup-seen";

type CurrentPoster = {
  poster: { url: string; label: string } | null;
  isToday: boolean;
};

function alreadySeen() {
  try {
    return window.sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    window.sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    // Private windows can block storage; the popup then shows again next load.
  }
}

// Shows the latest promise poster ten seconds after the site is opened,
// once per browser session.
export default function PromisePopup() {
  const [current, setCurrent] = useState<CurrentPoster | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const path = window.location.pathname;
      if (path.startsWith("/admin") || path.startsWith("/promises")) return;
      if (alreadySeen()) return;

      try {
        const response = await fetch("/api/posters/current", {
          cache: "no-store",
        });
        if (!response.ok) return;
        const data: CurrentPoster = await response.json();
        if (!data.poster) return;
        markSeen();
        setCurrent(data);
      } catch {
        // No popup if the poster cannot be loaded.
      }
    }, POPUP_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!current) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCurrent(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current]);

  if (!current?.poster) return null;

  const heading = current.isToday ? "Today's Promise" : "Latest Promise";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={() => setCurrent(null)}
      role="dialog"
      aria-modal="true"
      aria-label={heading}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] px-6 py-4 text-center text-white">
          <p className="font-serif text-2xl font-semibold">{heading}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#f1d27a]">
            {current.poster.label}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setCurrent(null)}
          aria-label="Close"
          className="absolute right-3 top-3 rounded-full border border-white/40 bg-black/30 p-1.5text-white transition-colors hover:border-[#5ab4f0] hover:text-[#5ab4f0]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6l12 12M6 18L18 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#f8f5ff]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.poster.url}
            alt={`${heading} poster`}
            className="mx-auto block h-auto max-h-[62vh] w-auto max-w-full"
          />
        </div>

        <div className="flex items-center justify-center gap-3 px-6 py-4">
          <Link
            href="/promises"
            onClick={() => setCurrent(null)}
            className="rounded-full bg-[#d4af37] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5"
          >
            Download &amp; Share
          </Link>
          <button
            type="button"
            onClick={() => setCurrent(null)}
            className="rounded-full border border-[#0b1a3a]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] transition-colors hover:border-[#4b2a7a] hover:text-[#4b2a7a]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
