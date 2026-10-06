"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryGrid({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const count = images.length;

  useEffect(() => {
    if (selected === null) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight")
        setSelected((current) =>
          current === null ? current : (current + 1) % count
        );
      if (event.key === "ArrowLeft")
        setSelected((current) =>
          current === null ? current : (current - 1 + count) % count
        );
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected, count]);

  const step = (event: React.MouseEvent, offset: number) => {
    event.stopPropagation();
    setSelected((current) =>
      current === null ? current : (current + offset + count) % count
    );
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 rounded-full border border-white/40 bg-black/40 p-3 text-white transition-colors hover:border-[#5ab4f0] hover:text-[#5ab4f0]";

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(index)}
            aria-label={`Open photo ${index + 1}`}
            className="group relative mb-6 block w-full cursor-pointer overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={`Living Hope Organisation gallery photo ${index + 1}`}
              width={1000}
              height={1200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/40"></div>
          </button>
        ))}
      </div>

      {selected !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <Image
            src={images[selected]}
            alt={`Living Hope Organisation gallery photo ${selected + 1}`}
            width={1600}
            height={1200}
            sizes="95vw"
            className="max-h-[90vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(event) => step(event, -1)}
            aria-label="Previous photo"
            className={`${arrowClass} left-4`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={(event) => step(event, 1)}
            aria-label="Next photo"
            className={`${arrowClass} right-4`}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label="Close photo"
            className="absolute right-4 top-4 rounded-full border border-white/40 bg-black/40 p-2 text-white transition-colors hover:border-[#5ab4f0] hover:text-[#5ab4f0]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </>
  );
}
