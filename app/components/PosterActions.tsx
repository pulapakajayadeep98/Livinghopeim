"use client";

import { useState } from "react";

type ShareTarget = "whatsapp" | "facebook" | "instagram";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition-all hover:-translate-y-0.5";

function Icon({ name }: { name: "download" | ShareTarget }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "download") {
    return (
      <svg {...common}>
        <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
      </svg>
    );
  }
  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path d="M4 20l1.4-4.2A8 8 0 1 1 8.3 18.7L4 20Z" />
        <path d="M9.5 9c0 3 2.5 5.500 5.500 5.500" />
      </svg>
    );
  }
  if (name === "facebook") {
    return (
      <svg {...common}>
        <path d="M14 21v-8h3l.5-3.500H14V7.500c0-1 .5-1.500 1.600-1.500H17.500V3h-2.600C12.400 3 11 4.600 11 7v2.500H8V13h3v8" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <rect x="4" y="4" width="16" height="16" rx="4.500" />
      <circle cx="12" cy="12" r="3.500" />
      <path d="M16.800 7.200h.01" />
    </svg>
  );
}

export default function PosterActions({
  url,
  title,
  sharePath,
  compact = false,
}: {
  url: string;
  title: string; // e.g. "Today's Promise - Monday, 5 October 2026"
  sharePath: string; // page to link to when only a link can be shared
  compact?: boolean;
}) {
  const [note, setNote] = useState<string | null>(null);

  const size = compact ? "px-3 py-2 text-[10px]" : "px-5 py-2.5 text-xs";
  const downloadUrl = `${url}?download=1`;

  const showNote = (message: string) => {
    setNote(message);
    window.setTimeout(() => setNote(null), 6000);
  };

  // On phones this opens the system share sheet with the poster image itself,
  // where WhatsApp status, Instagram story and Facebook story can be chosen.
  const shareImage = async () => {
    if (typeof navigator.share !== "function") return false;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], "living-hope-poster.jpg", {
        type: "image/jpeg",
      });
      if (!navigator.canShare?.({ files: [file] })) return false;
      await navigator.share({ files: [file], title, text: title });
      return true;
    } catch (error) {
      // The visitor closed the share sheet; that still counts as handled.
      return error instanceof DOMException && error.name === "AbortError";
    }
  };

  const handleShare = async (target: ShareTarget) => {
    if (await shareImage()) return;

    // Computers cannot hand an image to these apps, so fall back to a link.
    const pageUrl = `${window.location.origin}${sharePath}`;
    if (target === "whatsapp") {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(`${title}\n${pageUrl}`)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else if (target === "facebook") {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      window.location.href = downloadUrl;
      showNote(
        "Poster downloaded. Open Instagram, tap + and choose Story, then pick this poster."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={downloadUrl}
          download
          className={`${buttonBase} ${size} bg-[#d4af37] text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40`}
        >
          <Icon name="download" />
          Download
        </a>
        <button
          type="button"
          onClick={() => handleShare("whatsapp")}
          className={`${buttonBase} ${size} bg-[#25d366] text-white`}
        >
          <Icon name="whatsapp" />
          WhatsApp
        </button>
        <button
          type="button"
          onClick={() => handleShare("facebook")}
          className={`${buttonBase} ${size} bg-[#1877f2] text-white`}
        >
          <Icon name="facebook" />
          Facebook
        </button>
        <button
          type="button"
          onClick={() => handleShare("instagram")}
          className={`${buttonBase} ${size} bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] text-white`}
        >
          <Icon name="instagram" />
          Instagram
        </button>
      </div>
      {note ? (
        <p className="mt-3 text-center text-sm text-slate-600" role="status">
          {note}
        </p>
      ) : null}
    </div>
  );
}
