import type { Metadata } from "next";
import PosterActions from "../components/PosterActions";
import SubPageShell from "../components/SubPageShell";
import { getPromisePosters, indiaDateString } from "../lib/posters";

// Posters are uploaded from the admin panel, so this page is built per request.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [current] = await getPromisePosters();
  const description =
    "A new promise from God's Word every day from Living Hope Organisation, Vijayawada.";

  return {
    title: "Today's Promise | Living Hope Organisation",
    description,
    alternates: { canonical: "https://livinghopein.org/promises" },
    openGraph: {
      title: "Today's Promise | Living Hope Organisation",
      description,
      url: "https://livinghopein.org/promises",
      // Lets Facebook and WhatsApp show the poster when the page link is shared.
      images: current ? [{ url: current.url }] : undefined,
    },
  };
}

export default async function PromisesPage() {
  const [current, ...previous] = await getPromisePosters();
  const isToday = current?.date === indiaDateString();

  return (
    <SubPageShell
      eyebrow="Daily Word"
      title="Today's Promise"
      subtitle="A new promise from God's Word every day to strengthen your faith."
    >
      {!current ? (
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <p className="py-10 text-center text-lg text-slate-500">
            No promise has been posted yet. Please check back soon.
          </p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
              {isToday ? "Today" : "Latest Promise"}
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-[#0b1a3a] sm:text-3xl">
              {current.label}
            </h2>

            <div className="mt-8 overflow-hidden rounded-3xl bg-[#f8f5ff] shadow-[0_18px_40px_rgba(11,26,58,0.2)] ring-2 ring-[#d4af37]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.url}
                alt={`Promise poster for ${current.label}`}
                className="block h-auto w-full"
              />
            </div>

            <div className="mt-8">
              <PosterActions
                url={current.url}
                title={`Today's Promise - ${current.label}`}
                sharePath="/promises"
              />
            </div>
          </div>

          {previous.length ? (
            <>
              <div className="mt-20 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
                  Previous Days
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
                  Recent Promises
                </h2>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {previous.map((poster) => (
                  <div
                    key={poster.name}
                    className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_15px_35px_rgba(11,26,58,0.12)]"
                  >
                    <p className="bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#f1d27a]">
                      {poster.label}
                    </p>
                    <a
                      href={poster.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block flex-1 bg-[#f8f5ff]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={poster.url}
                        alt={`Promise poster for ${poster.label}`}
                        loading="lazy"
                        className="block h-auto w-full"
                      />
                    </a>
                    <div className="p-4">
                      <PosterActions
                        url={poster.url}
                        title={`Promise - ${poster.label}`}
                        sharePath="/promises"
                        compact
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </SubPageShell>
  );
}
