import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage listings, users, reviews, and settings in the SUEDE admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return (
    <section className="space-y-6">
      <h2 className="font-cormorant text-4xl">Welcome, Admin</h2>
      <p className="font-darker max-w-2xl text-black/60">
        Manage platform content from one place. Use the About Control section to
        add or publish About page items.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/admin/about"
          className="block border border-black/10 bg-white p-6 transition hover:border-black/30"
        >
          <h3 className="font-cormorant text-2xl">About Page Control</h3>
          <p className="font-darker mt-2 text-sm text-black/60">
            Create, update, and publish Hero, Mission, Story, Values, and Quote
            content.
          </p>
        </Link>
      </div>
    </section>
  );
};

export default page;
