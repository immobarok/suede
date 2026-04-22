import type { Metadata } from "next";
import Image from "next/image";
import SubmitReviewForm from "./components/SubmitReviewForm";

export const metadata: Metadata = {
  title: "Submit a Review | SUEDE",
  description:
    "Share how clothing fits on your body and help others shop with confidence.",
};

export default function SubmitReviewPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F0]">
      <Image
        src="https://i.ibb.co/JWpSj3rb/Image-With-Fallback-4.png"
        alt="Background"
        fill
        className="object-cover opacity-20 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/40 to-white/10" />

      <SubmitReviewForm />
    </main>
  );
}
