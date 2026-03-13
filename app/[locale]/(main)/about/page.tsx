import type { Metadata } from "next";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SUEDE, our mission, and how we curate fashion for a better fit experience.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <LoadingSpinner className="mb-6" />
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="text-muted-foreground mt-4">Learn more about SUEDE.</p>
    </main>
  );
}
