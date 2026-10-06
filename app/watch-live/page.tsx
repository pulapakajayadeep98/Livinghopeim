import type { Metadata } from "next";
import DonationCard from "../components/DonationCard";
import LiveStage from "../components/LiveStage";
import ServiceSchedule from "../components/ServiceSchedule";
import SubPageShell from "../components/SubPageShell";
import { CHANNEL_URL, getLiveData } from "../lib/youtube";

export const metadata: Metadata = {
  title: "Watch Live | Living Hope Organisation",
  description:
    "Join Living Hope Organisation services live online from anywhere in the world.",
  alternates: { canonical: "https://livinghopein.org/watch-live" },
};

// The live state is read from YouTube on each visit.
export const dynamic = "force-dynamic";

export default async function WatchLivePage() {
  const initial = await getLiveData();

  return (
    <SubPageShell
      eyebrow="Online Church"
      title="Watch Live"
      subtitle="Join our worship and the Word from wherever you are."
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-20">
        <LiveStage initial={initial} channelUrl={CHANNEL_URL}>
          <div className="mt-16">
            <DonationCard />
          </div>
        </LiveStage>

        <div className="mt-20 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#4b2a7a]">
            Service Times
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#0b1a3a] sm:text-4xl">
            When We Go Live
          </h2>
        </div>
        <ServiceSchedule />
      </div>
    </SubPageShell>
  );
}
