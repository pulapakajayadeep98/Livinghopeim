"use client";

import { useEffect, useRef } from "react";

const PAUSE_MS = 10000;

// The animated header logo: plays once, rests on its last frame for ten
// seconds, then plays again.
export default function LogoVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  const handleEnded = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      const video = videoRef.current;
      if (!video) return;
      video.currentTime = 0;
      video.play().catch(() => {
        // The browser refused to autoplay; the logo stays on its last frame.
      });
    }, PAUSE_MS);
  };

  return (
    <video
      ref={videoRef}
      src="/lhlogo3.mp4"
      autoPlay
      muted
      playsInline
      onEnded={handleEnded}
      aria-label="Living Hope Organisation"
      className={className}
    />
  );
}
