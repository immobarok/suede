import type { MeasurementStep } from "./types";

type ConsultationLandingProps = {
  steps: MeasurementStep[];
  onStart: () => void;
};

export function ConsultationLanding({
  steps,
  onStart,
}: ConsultationLandingProps) {
  return (
    <main className="min-h-screen bg-[#F8F6F3] pt-24">
      <div className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#E8E4DF] px-4 py-1.5">
            <span className="text-sm">✨</span>
            <span className="text-xs tracking-wide text-[#1A1A1A]/60 uppercase">
              AI-Powered
            </span>
          </div>
          <h1
            className="mb-6 text-5xl leading-tight text-[#1A1A1A] md:text-6xl"
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            Your Personal
            <br />
            Measurement Guide
          </h1>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#1A1A1A]/50">
            Our AI stylist will walk you through taking your body measurements
            step by step. No guesswork, no confusion — just accurate numbers in
            about 5 minutes.
          </p>
        </div>

        <div className="mb-6 rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <h3 className="text-xs tracking-[0.2em] text-[#1A1A1A]/40 uppercase">
              What You&apos;ll Need
            </h3>
          </div>
          <div className="space-y-5">
            <div className="group flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F6F3] text-lg transition-all group-hover:scale-105">
                📏
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  A soft tape measure
                </p>
                <p className="text-xs text-[#1A1A1A]/40">
                  The flexible fabric kind. A piece of string + ruler works too.
                </p>
              </div>
            </div>
            <div className="group flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F6F3] text-lg transition-all group-hover:scale-105">
                👗
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  Fitted clothing or undergarments
                </p>
                <p className="text-xs text-[#1A1A1A]/40">
                  Loose clothing can add inches. Wear something snug.
                </p>
              </div>
            </div>
            <div className="group flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F8F6F3] text-lg transition-all group-hover:scale-105">
                🪞
              </div>
              <div>
                <p className="text-sm font-medium text-[#1A1A1A]">
                  A mirror (optional but helpful)
                </p>
                <p className="text-xs text-[#1A1A1A]/40">
                  Helps you check that the tape is level and positioned
                  correctly.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xs tracking-[0.2em] text-[#1A1A1A]/40 uppercase">
              9 Measurements
            </h3>
            <span className="text-xs text-[#1A1A1A]/30">~5 minutes</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {steps.map((step, i) => (
              <div
                key={step.field}
                className="group rounded-lg bg-[#F8F6F3] p-3 text-center transition-all hover:bg-[#E8E4DF]"
              >
                <p className="mb-1 text-[10px] text-[#1A1A1A]/30">{i + 1}</p>
                <p className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#1A1A1A]/80">
                  {step.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#1A1A1A] px-10 py-4 text-xs tracking-[0.2em] text-[#F8F6F3] uppercase transition-all hover:px-12 hover:tracking-[0.3em]"
          >
            <span>Start Consultation</span>
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </button>
          <p className="mt-4 text-xs text-[#1A1A1A]/25">
            Your measurements are private and only visible to you.
          </p>
        </div>
      </div>
    </main>
  );
}
