import { NewsletterContent } from "./NewsletterContent";

export function NewsletterSection() {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.ibb.co/60VFJ4YV/Section-2.png')",
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <NewsletterContent />
      </div>
    </section>
  );
}
