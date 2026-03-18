import ConsignContent from "./ConsignContent";
import ConsignVisualCards from "./ConsignVisualCards";

export function PreLovedSection() {
  return (
    <section className="overflow-hidden bg-[#f8f7f4] px-4 py-24 md:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid min-h-150 grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <ConsignVisualCards />
          <ConsignContent />
        </div>
      </div>
    </section>
  );
}
