import type { Metadata } from "next";
import GalleryGrid from "../components/GalleryGrid";
import SubPageShell from "../components/SubPageShell";
import { galleryImages } from "../data/gallery";
import { getGalleryUploads } from "../lib/posters";

export const metadata: Metadata = {
  title: "Gallery | Living Hope Organisation",
  description:
    "Moments of worship, prayer, training, and community life at Living Hope Organisation, Vijayawada.",
  alternates: { canonical: "https://livinghopein.org/gallery" },
};

// Photos can be added from the admin panel, so this page is built per request.
export const dynamic = "force-dynamic";

// The hero shows every photo as a thumbnail, so it is capped to stay tidy.
const HERO_PHOTO_LIMIT = 12;

export default async function GalleryPage() {
  const uploads = await getGalleryUploads();
  // Photos uploaded from the admin panel come first, then the built-in ones.
  const images = [...uploads.map((photo) => photo.url), ...galleryImages];

  return (
    <SubPageShell
      eyebrow="Gallery"
      title="Moments Of Faith & Fellowship"
      subtitle="Celebrating worship, prayer, training, and community life through powerful moments captured in ministry."
      heroImages={images.slice(0, HERO_PHOTO_LIMIT)}
    >
      <div className="bg-[#f9f7ff]">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <GalleryGrid images={images} />
        </div>
      </div>
    </SubPageShell>
  );
}
