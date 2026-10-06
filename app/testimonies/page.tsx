import { existsSync } from "fs";
import path from "path";
import type { Metadata } from "next";
import SubPageShell from "../components/SubPageShell";
import TestimonyImage from "../components/TestimonyImage";
import { testimonies } from "../data/testimonies";

export const metadata: Metadata = {
  title: "Testimonies | Living Hope Organisation",
  description:
    "Stories of lives changed by Jesus Christ, shared by the Living Hope Organisation family in Vijayawada.",
  alternates: { canonical: "https://livinghopein.org/testimonies" },
};

// Read on each visit so a photo added to the public folder shows up at once.
export const dynamic = "force-dynamic";

const PHOTO_EXTENSIONS = [".jpeg", ".jpg", ".png", ".webp"];

// Finds a testimony photo in the public folder, whatever its extension, so a
// story can be published before its photo has been added.
function resolvePhoto(src: string) {
  const base = src.replace(/\.[^.]+$/, "");
  const candidates = [src, ...PHOTO_EXTENSIONS.map((ext) => `${base}${ext}`)];
  return (
    candidates.find((candidate) =>
      existsSync(path.join(process.cwd(), "public", candidate))
    ) ?? null
  );
}

export default function TestimoniesPage() {
  const stories = testimonies.map((testimony) => ({
    ...testimony,
    images: testimony.images.flatMap((image) => {
      const src = resolvePhoto(image.src);
      return src ? [{ ...image, src }] : [];
    }),
  }));

  return (
    <SubPageShell
      eyebrow="Stories Of Faith"
      title="Testimonies"
      subtitle="Lives changed by the love and power of Jesus Christ."
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        {testimonies.length === 0 ? (
          <p className="py-10 text-center text-lg text-slate-500">
            No testimonies have been posted yet. Please check back soon.
          </p>
        ) : (
          <div className="space-y-12">
            {stories.map((testimony) => (
              <article
                key={`${testimony.name}-${testimony.title}`}
                className="overflow-hidden rounded-3xl bg-white shadow-[0_25px_60px_rgba(11,26,58,0.18)] ring-1 ring-slate-100"
              >
                <div className="bg-gradient-to-br from-[#241246] to-[#0b1a3a] px-6 py-6 text-white sm:px-10">
                  <p className="text-sm uppercase tracking-[0.4em] text-[#f1d27a]">
                    Testimony
                  </p>
                  <h2 className="mt-1 font-serif text-3xl font-semibold">
                    {testimony.title}
                  </h2>
                  <p className="mt-2 text-white/80">
                    <span className="font-semibold text-[#f1d27a]">
                      {testimony.name}
                    </span>
                    {testimony.detail ? `, ${testimony.detail}` : ""}
                  </p>
                </div>

                <div
                  className={`grid gap-8 p-6 sm:p-10 lg:gap-12 ${
                    testimony.images.length && !testimony.stacked
                      ? "lg:grid-cols-[0.8fr_1.2fr]"
                      : ""
                  }`}
                >
                  {/* Left: photos (above the text for a stacked testimony) */}
                  {/* On desktop the photos stretch to the full height of the text */}
                  {testimony.images.length ? (
                    <div
                      className={`grid gap-4 lg:grid-cols-1 ${
                        testimony.images.length > 1
                          ? "grid-cols-2 lg:grid-rows-[1.6fr_1fr]"
                          : "grid-cols-1"
                      }`}
                    >
                      {testimony.images.map((image) => (
                        <TestimonyImage
                          key={image.src}
                          image={image}
                          sizes={
                            testimony.stacked
                              ? "(max-width: 768px) 100vw, 768px"
                              : undefined
                          }
                          className={
                            testimony.stacked
                              ? "mx-auto aspect-video w-full max-w-3xl"
                              : testimony.images.length > 1
                              ? "aspect-[4/5] lg:aspect-auto lg:min-h-[260px]"
                              : "aspect-[4/3] lg:aspect-auto lg:min-h-[260px]"
                          }
                        />
                      ))}
                    </div>
                  ) : null}

                  {/* Right: the testimony in Telugu and English */}
                  <div>
                    <div lang="te">
                      <div className="space-y-4">
                        {testimony.telugu.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-lg leading-9 text-slate-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 border-t border-slate-200 pt-8">
                      <div className="space-y-4">
                        {testimony.english.map((paragraph, index) => (
                          <p
                            key={index}
                            className="text-lg leading-8 text-slate-700"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {stories.length ? (
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              And Many More
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a]">
              These are only a few of the stories
            </h2>
            <p lang="te" className="mt-5 text-lg leading-9 text-slate-700">
              ఇవి కొన్ని సాక్ష్యాలు మాత్రమే. లివింగ్ హోప్ ద్వారా దేవుడు
              తాకిన ఇలాంటి జీవితాలు ఇంకా ఎన్నో ఉన్నాయి.
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              There are many more stories like these - children, widows and
              families whose lives God has touched through Living Hope.
            </p>
          </div>
        ) : null}

        <div className="mx-auto mt-16 max-w-4xl rounded-3xl border border-[#f1d27a]/50 bg-[#fff8e1] p-8 text-center">
          <h2 className="font-serif text-2xl font-semibold text-[#0b1a3a]">
            Has God done something in your life?
          </h2>
          <p className="mt-3 text-lg text-slate-600">
            We would love to hear your testimony and share it to encourage
            others.
          </p>
          <a
            href="https://wa.me/917997167779"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full bg-[#d4af37] px-6 py-3 text-xs font-semibold uppercase tracking-wide text-[#0b1a3a] shadow-lg shadow-[#d4af37]/40 transition-all hover:-translate-y-0.5"
          >
            WhatsApp 7997167779
          </a>
        </div>
      </div>
    </SubPageShell>
  );
}
