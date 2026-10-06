import type { Metadata } from "next";
import PosterActions from "../components/PosterActions";
import SubPageShell from "../components/SubPageShell";
import { getUpdatePosters } from "../lib/posters";

export const metadata: Metadata = {
  title: "Updates | Living Hope Organisation",
  description:
    "Latest news, announcements, and service information from Living Hope Organisation, Vijayawada.",
  alternates: { canonical: "https://livinghopein.org/updates" },
};

// Posters are uploaded from the admin panel, so this page is built per request.
export const dynamic = "force-dynamic";

export default async function UpdatesPage() {
  const posters = await getUpdatePosters();

  return (
    <SubPageShell
      eyebrow="News"
      title="Updates"
      subtitle="Announcements, service information, and news from our church family."
    >
      {posters.length === 0 ? (
        <div className="mx-auto w-full max-w-4xl px-6 py-20">
          <p className="py-10 text-center text-lg text-slate-500">
            No updates right now. Please check back soon.
          </p>
        </div>
      ) : (
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posters.map((poster) => (
              <div
                key={poster.name}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_15px_35px_rgba(11,26,58,0.12)]"
              >
                <p className="bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-[#f1d27a]">
                  Posted {poster.label}
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
                    alt={`Update posted ${poster.label}`}
                    loading="lazy"
                    className="block h-auto w-full"
                  />
                </a>
                <div className="p-4">
                  <PosterActions
                    url={poster.url}
                    title="Living Hope Organisation update"
                    sharePath="/updates"
                    compact
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </SubPageShell>
  );
}
