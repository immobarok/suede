import { NewsletterContent } from "./NewsletterContent";

export function NewsletterSection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/newsletter.png')"
        }}
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterContent />
      </div>
    </section>
  );
}