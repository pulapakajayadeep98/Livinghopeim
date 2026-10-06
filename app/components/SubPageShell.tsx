"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoVideo from "./LogoVideo";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Today's Promise", href: "/promises" },
  { label: "Updates", href: "/updates" },
  { label: "Watch Live", href: "/watch-live" },
  { label: "Gallery", href: "/gallery" },
  { label: "Donate", href: "/#donate" },
  { label: "Contact", href: "/#contact" },
];

export default function SubPageShell({
  eyebrow,
  title,
  subtitle,
  heroImages,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  heroImages?: string[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const slideCount = heroImages?.length ?? 0;

  useEffect(() => {
    if (slideCount < 2) return;
    const timer = window.setInterval(
      () => setSlide((current) => (current + 1) % slideCount),
      4000
    );
    return () => window.clearInterval(timer);
  }, [slideCount]);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] text-white">
        {heroImages?.length ? (
          <>
            {heroImages.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className={`object-cover transition-opacity duration-1000 ${
                  index === slide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a3a]/85 via-[#241246]/75 to-[#4b2a7a]/70" />
          </>
        ) : null}

        <div className="relative z-10">
        <header className="flex items-center justify-between px-8 py-4">
          <Link href="/" aria-label="Living Hope Organisation home">
            <LogoVideo className="h-16 w-auto rounded-xl" />
          </Link>

          <nav className="hidden items-center gap-4 whitespace-nowrap text-xs font-semibold uppercase tracking-widest text-white/80 lg:flex xl:gap-6 xl:text-sm">
            {navLinks
              .filter((link) => link.href !== "/watch-live")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[#5ab4f0] ${
                    pathname === link.href ? "text-[#5ab4f0]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}

            <Link
              href="/watch-live"
              className="rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-black/20 transition-all hover:-translate-y-0.5"
            >
              Watch Live
            </Link>

            <a
              href="tel:9100067779"
              className="rounded-full bg-[#d4af37] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5"
            >
              Request Prayer
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full border border-white/40 p-2 text-white transition-colors hover:border-[#f1d27a] hover:text-[#f1d27a] lg:hidden"
            aria-label="Open navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b1a3a]/95 backdrop-blur-sm lg:hidden">
            <div className="flex items-center justify-end px-6 pt-6">
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/40 p-2 text-white transition-colors hover:border-[#f1d27a] hover:text-[#f1d27a]"
                aria-label="Close navigation menu"
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
            <nav className="mt-8 flex flex-col gap-6 px-6 pb-10 text-xl font-semibold uppercase tracking-widest text-white/90">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`transition-colors hover:text-[#5ab4f0] ${
                    pathname === link.href ? "text-[#5ab4f0]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}

        <div
          className={`mx-auto w-full max-w-6xl px-6 text-center ${
            slideCount ? "pb-14 pt-14 sm:pb-16 sm:pt-16" : "pb-16 pt-10"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#f1d27a]">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-semibold sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              {subtitle}
            </p>
          ) : null}

          {heroImages && slideCount > 1 ? (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {heroImages.map((src, index) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSlide(index)}
                  aria-label={`Show photo ${index + 1}`}
                  className={`relative h-14 w-20 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-24 ${
                    index === slide
                      ? "ring-[#5ab4f0]"
                      : "opacity-70 ring-white/30 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        </div>
      </div>

      <div className="flex-1">{children}</div>

      <footer className="bg-[#081329] text-white">
        <div className="h-1 w-full bg-[#d4af37]" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-lg font-semibold text-white">
              Living Hope Organisation
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/60">
              Giving hope to the hopeless
            </p>
          </div>
          <div className="flex flex-col gap-1 md:items-end">
            <a
              href="tel:+919100067779"
              className="transition hover:text-[#f1d27a]"
            >
              9100067779
            </a>
            <a
              href="mailto:livinghopemission@outlook.com"
              className="transition hover:text-[#f1d27a]"
            >
              livinghopemission@outlook.com
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
          2026 Living Hope Organisation. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
