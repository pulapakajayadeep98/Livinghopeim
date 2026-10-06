"use client";

import Image from "next/image";
import { useState } from "react";
import type { TestimonyImage as TestimonyImageData } from "../data/testimonies";

export default function TestimonyImage({
  image,
  className = "",
}: {
  image: TestimonyImageData;
  className?: string;
}) {
  const [revealed, setRevealed] = useState(!image.sensitive);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-[#f1ecfb] shadow-[0_15px_35px_rgba(11,26,58,0.18)] ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className={`object-cover transition duration-500 ${
          revealed ? "" : "scale-110 blur-2xl"
        }`}
      />

      {!revealed ? (
        <button
          type="button"
          onClick={() => setRevealed(true)}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#0b1a3a]/55 p-4 text-center text-white"
        >
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f1d27a]">
            Sensitive photo
          </span>
          <span className="text-sm text-white/90">
            Shows the wound during his illness
          </span>
          <span className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a]">
            Tap to view
          </span>
        </button>
      ) : null}
    </div>
  );
}
