import { RefObject, useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Play,
  Check,
  Loader2,
  Ruler,
  Weight,
  Activity,
  Move,
  ArrowUpDown,
  Armchair,
  Shirt,
  User,
  SkipForward,
} from "lucide-react";

import type { MeasurementStep, Message } from "./types";

function getYouTubeEmbedId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function TutorialVideo({ video, label }: { video: string; label: string }) {
  const [open, setOpen] = useState(false);
  const youtubeId = getYouTubeEmbedId(video);
  const isYouTube = !!youtubeId;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2 text-xs font-medium text-[#1A1A1A]/50 transition-all hover:text-[#1A1A1A]"
      >
        <Play className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
        <span className="border-b border-dashed border-[#1A1A1A]/30 pb-px">
          {open ? "Hide tutorial" : "Watch measuring tutorial"}
        </span>
      </button>
      {open && (
        <div className="mt-3 overflow-hidden rounded-lg shadow-md transition-all">
          {isYouTube ? (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                title={`How to measure your ${label.toLowerCase()}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <video
                className="absolute inset-0 h-full w-full object-contain"
                src={video}
                controls
                playsInline
                preload="metadata"
              >
                <source src={video} />
              </video>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper to get icon for measurement type
function getMeasurementIcon(field: string) {
  const icons: Record<string, any> = {
    height: Ruler,
    weight: Weight,
    bust: Activity,
    waist: Move,
    hips: ArrowUpDown,
    inseam: Ruler,
    shoulder_width: Armchair,
    arm_length: Shirt,
    torso_length: User,
  };
  const Icon = icons[field];
  return Icon ? <Icon className="h-4 w-4" /> : null;
}

// Custom Stepper Component
function CustomStepper({
  steps,
  currentStep,
  isTyping,
}: {
  steps: MeasurementStep[];
  currentStep: number;
  isTyping: boolean;
}) {
  return (
    <div className="w-full">
      {/* Desktop Stepper - Hidden on mobile */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-5 right-0 left-0 h-0.5 bg-[#E8E4DF]" />

          {/* Progress Bar Fill */}
          <div
            className="absolute top-5 left-0 h-0.5 bg-[#1A1A1A] transition-all duration-500"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              const isUpcoming = idx > currentStep;

              return (
                <div key={step.field} className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${isCompleted ? "bg-[#1A1A1A] text-white" : ""} ${isActive ? "scale-110 bg-[#1A1A1A] text-white ring-4 ring-[#1A1A1A]/20" : ""} ${isUpcoming ? "bg-[#E8E4DF] text-[#1A1A1A]/40" : ""} `}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : isActive && isTyping ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      getMeasurementIcon(step.field) || idx + 1
                    )}
                  </div>

                  {/* Step Label - Hidden on mobile */}
                  <div className="mt-2 hidden md:block">
                    <p
                      className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"} `}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Stepper - Visible on mobile */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between gap-2">
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E8E4DF]">
              <div
                className="h-full rounded-full bg-[#1A1A1A] transition-all duration-500"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep < steps.length ? "bg-[#1A1A1A] text-white" : "bg-[#E8E4DF] text-[#1A1A1A]/40"} `}
            >
              {currentStep < steps.length ? (
                getMeasurementIcon(steps[currentStep]?.field) || currentStep + 1
              ) : (
                <Check className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium text-[#1A1A1A]">
                {steps[currentStep]?.label || "Complete"}
              </p>
              <p className="text-xs text-[#1A1A1A]/40">
                Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type ConsultationChatViewProps = {
  currentStep: number;
  currentStepData: MeasurementStep | null;
  steps: MeasurementStep[];
  messages: Message[];
  isTyping: boolean;
  chatEndRef: RefObject<HTMLDivElement | null>;
  completed: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  heightFeet: string;
  setHeightFeet: (value: string) => void;
  heightInches: string;
  setHeightInches: (value: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSubmitMeasurement: () => void;
  saving: boolean;
  onSaveMeasurements: () => void;
};

export function ConsultationChatView({
  currentStep,
  currentStepData,
  steps,
  messages,
  isTyping,
  chatEndRef,
  completed,
  inputRef,
  heightFeet,
  setHeightFeet,
  heightInches,
  setHeightInches,
  inputValue,
  setInputValue,
  onKeyDown,
  onSubmitMeasurement,
  saving,
  onSaveMeasurements,
}: ConsultationChatViewProps) {
  return (
    <main className="min-h-screen bg-[#F8F6F3] pt-24 pb-52 md:pb-56">
      {/* Custom Stepper Navigation */}
      <div className="fixed top-18 right-0 left-0 z-40 border-b border-[#1A1A1A]/8 bg-[#F8F6F3]/95 backdrop-blur supports-backdrop-filter:bg-[#F8F6F3]/80">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <CustomStepper
            steps={steps}
            currentStep={currentStep}
            isTyping={isTyping}
          />
        </div>
      </div>

      {/* Chat Messages */}
      <div className="mx-auto max-w-2xl px-4 pt-28 pb-14 md:px-6 md:pb-20">
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{ animation: "fadeIn 0.3s ease-out" }}
            >
              {msg.role === "assistant" ? (
                <div className="flex max-w-[85%] items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] shadow-sm">
                    <span
                      className="text-xs font-medium text-[#F8F6F3]"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      S
                    </span>
                  </div>
                  <div className="flex-1">
                    {msg.type === "measurement-confirm" ? (
                      <div className="overflow-hidden rounded-2xl border border-[#1A1A1A]/8 bg-white shadow-sm">
                        <div className="border-b border-[#1A1A1A]/8 bg-[#F8F6F3] px-5 py-3">
                          <p className="text-xs tracking-[0.15em] text-[#1A1A1A]/50 uppercase">
                            Your Measurements
                          </p>
                        </div>
                        <div className="divide-y divide-[#1A1A1A]/5 p-4">
                          {msg.content.split("\n").map((line, j) => (
                            <div
                              key={j}
                              className="flex justify-between py-2.5 first:pt-0 last:pb-0"
                            >
                              <span className="text-sm text-[#1A1A1A]/50">
                                {line.split(":")[0]}
                              </span>
                              <span className="text-sm font-medium text-[#1A1A1A]">
                                {line.split(":")[1]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {msg.content.split("\n").map((line, j) =>
                          line ? (
                            <p
                              key={j}
                              className="text-sm leading-relaxed text-[#1A1A1A]"
                            >
                              {line}
                            </p>
                          ) : (
                            <br key={j} />
                          ),
                        )}
                        {msg.tip && (
                          <div className="mt-4 rounded-xl bg-[#E8E4DF]/40 px-4 py-3">
                            <p className="text-xs leading-relaxed text-[#1A1A1A]/60">
                              <span className="font-medium text-[#1A1A1A]">
                                💡 Tip:
                              </span>{" "}
                              {msg.tip}
                            </p>
                          </div>
                        )}
                        {msg.video && (
                          <TutorialVideo
                            video={msg.video}
                            label={msg.label || ""}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-2xl rounded-br-md bg-[#1A1A1A] px-5 py-3 shadow-sm">
                    <p className="text-sm text-[#F8F6F3]">{msg.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex max-w-[85%] items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] shadow-sm">
                <span
                  className="text-xs font-medium text-[#F8F6F3]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  S
                </span>
              </div>
              <div className="rounded-2xl rounded-bl-md bg-white px-5 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-[#1A1A1A]/30"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-[#1A1A1A]/30"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="h-2 w-2 animate-bounce rounded-full bg-[#1A1A1A]/30"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {!completed ? (
        <div className="fixed right-0 bottom-0 left-0 z-50 px-4 pb-4 md:px-8 md:pb-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#1A1A1A]/8 bg-[#F8F6F3]/95 p-4 shadow-lg backdrop-blur supports-backdrop-filter:bg-[#F8F6F3]/90">
            {currentStepData?.inputType === "height" ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex flex-1 items-center justify-center gap-3">
                  <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
                    <input
                      ref={inputRef}
                      type="number"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="5"
                      min="3"
                      max="8"
                      className="w-16 text-center text-lg text-[#1A1A1A] focus:outline-none"
                      disabled={isTyping}
                    />
                    <span className="text-sm text-[#1A1A1A]/40">ft</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-sm">
                    <input
                      type="number"
                      value={heightInches}
                      onChange={(e) => setHeightInches(e.target.value)}
                      onKeyDown={onKeyDown}
                      placeholder="0"
                      min="0"
                      max="11"
                      className="w-16 text-center text-lg text-[#1A1A1A] focus:outline-none"
                      disabled={isTyping}
                    />
                    <span className="text-sm text-[#1A1A1A]/40">in</span>
                  </div>
                </div>
                <button
                  onClick={onSubmitMeasurement}
                  disabled={!heightFeet || isTyping}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-8 py-3 text-xs tracking-[0.15em] text-[#F8F6F3] uppercase transition-all hover:bg-[#3D3D3D] hover:px-10 disabled:opacity-30"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={
                      currentStepData?.unit
                        ? `Enter ${currentStepData.label.toLowerCase()} in ${currentStepData.unit}`
                        : `Enter ${currentStepData?.label.toLowerCase() || "value"}`
                    }
                    className="w-full rounded-xl border-0 bg-white px-5 py-3.5 pr-16 text-base text-[#1A1A1A] shadow-sm focus:ring-2 focus:ring-[#1A1A1A]/10 focus:outline-none"
                    disabled={isTyping}
                  />
                  {currentStepData?.unit && (
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 text-sm font-medium text-[#1A1A1A]/30">
                      {currentStepData.unit}
                    </span>
                  )}
                </div>
                <button
                  onClick={onSubmitMeasurement}
                  disabled={!inputValue || isTyping}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] px-8 py-3.5 text-xs tracking-[0.15em] text-[#F8F6F3] uppercase transition-all hover:bg-[#3D3D3D] hover:px-10 disabled:opacity-30"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  setInputValue("skip");
                  onSubmitMeasurement();
                }}
                className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/30 transition hover:text-[#1A1A1A]/60"
              >
                <SkipForward className="h-3 w-3" />
                <span>Skip this measurement</span>
              </button>
              <span className="text-xs text-[#1A1A1A]/20">•</span>
              <span className="text-xs text-[#1A1A1A]/25">
                Press ↵ Enter to submit
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed right-0 bottom-0 left-0 z-50 px-4 pb-4 md:px-8 md:pb-8">
          <div className="mx-auto flex max-w-2xl flex-col gap-3 rounded-2xl border border-[#1A1A1A]/8 bg-[#F8F6F3]/95 p-4 shadow-lg backdrop-blur supports-backdrop-filter:bg-[#F8F6F3]/90 sm:flex-row">
            <button
              onClick={onSaveMeasurements}
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-4 text-xs tracking-[0.2em] text-[#F8F6F3] uppercase transition-all hover:bg-[#3D3D3D] disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save to My Profile"
              )}
            </button>
            <Link
              href="/profile/measurements"
              className="rounded-full border border-[#1A1A1A]/20 px-6 py-4 text-center text-xs tracking-[0.15em] text-[#1A1A1A]/60 uppercase transition-all hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
            >
              Edit Manually
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
