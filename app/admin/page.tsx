import type { Metadata } from "next";
import Link from "next/link";
import AdminLogin from "../components/AdminLogin";
import AdminPanel from "../components/AdminPanel";
import { isAdmin, isAdminConfigured } from "../lib/adminAuth";
import {
  getAllPromisePosters,
  getGalleryUploads,
  getUpdatePosters,
  indiaDateString,
} from "../lib/posters";

export const metadata: Metadata = {
  title: "Admin | Living Hope Organisation",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const configured = isAdminConfigured();
  const signedIn = configured && (await isAdmin());

  return (
    <main className="min-h-screen bg-[#f8f5ff]">
      <header className="bg-gradient-to-br from-[#0b1a3a] via-[#241246] to-[#4b2a7a] text-white">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#f1d27a]">
              Living Hope Organisation
            </p>
            <h1 className="mt-1 font-serif text-2xl font-semibold">
              Admin Panel
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-colors hover:border-[#5ab4f0] hover:text-[#5ab4f0]"
          >
            View website
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        {!configured ? (
          <div className="mx-auto max-w-lg rounded-2xl bg-white p-8 text-center shadow-[0_15px_35px_rgba(11,26,58,0.12)]">
            <h2 className="font-serif text-2xl font-semibold text-[#0b1a3a]">
              Admin password not set
            </h2>
            <p className="mt-3 text-slate-600">
              Set ADMIN_PASSWORD (at least 8 characters) in the server
              environment, then reload this page.
            </p>
          </div>
        ) : signedIn ? (
          <AdminPanel
            today={indiaDateString()}
            initialPromises={await getAllPromisePosters()}
            initialUpdates={await getUpdatePosters()}
            initialGallery={await getGalleryUploads()}
          />
        ) : (
          <AdminLogin />
        )}
      </div>
    </main>
  );
}
