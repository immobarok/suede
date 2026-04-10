"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { saveConsultationMeasurements } from "./actions";
import { ConsultationLanding } from "./_components/ConsultationLanding";
import { ConsultationChatView } from "./_components/ConsultationChatView";
import type { MeasurementStep } from "./_components/types";
import type { Message } from "./_components/types";

const MEASUREMENT_STEPS: MeasurementStep[] = [
  {
    field: "height",
    label: "Height",
    inputType: "height" as const,
    unit: "",
    intro: "Let's start with the basics! What's your height?",
    tip: "Stand barefoot against a wall for the most accurate reading.",
    video: "",
    followUp:
      "Got it! Height is the foundation for understanding how garments will fall on your body.",
  },
  {
    field: "weight",
    label: "Weight",
    inputType: "number" as const,
    unit: "lbs",
    intro: "What's your weight? This helps us understand overall fit.",
    tip: "This is optional but helps brands and reviewers give more accurate comparisons. Type 'skip' if you'd rather not share.",
    video: "",
    followUp:
      "Noted. Weight combined with measurements gives a much fuller picture than either alone.",
  },
  {
    field: "bust",
    label: "Bust",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Now let's get into the key measurements. First up — bust.\n\nWrap a soft tape measure around the fullest part of your bust, keeping it parallel to the floor. Don't pull too tight — you want it snug but comfortable.",
    tip: "Wear a non-padded bra for accuracy. The tape should sit across the nipple line.",
    video: "https://www.youtube.com/watch?v=05AMPRSNZ_E",
    followUp:
      "Perfect. Your bust measurement is one of the most important for tops, dresses, and anything fitted through the chest.",
  },
  {
    field: "waist",
    label: "Waist",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Next — your natural waist.\n\nThis is the narrowest part of your torso, usually about an inch above your belly button. Wrap the tape around and breathe normally — don't suck in!",
    tip: "Try bending sideways — the crease that forms is your natural waistline.",
    video: "https://www.youtube.com/watch?v=FB7uJFhkoKU",
    followUp:
      "Great. Your waist measurement is essential for skirts, pants, and anything with a defined waistline.",
  },
  {
    field: "hips",
    label: "Hips",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Now your hips.\n\nMeasure around the fullest part of your hips and buttocks. Keep the tape parallel to the floor and don't compress.",
    tip: "Stand with your feet together. The widest point is usually 7-9 inches below your waist.",
    video: "https://www.youtube.com/watch?v=2zcLvlPoWz8",
    followUp:
      "Got it. Hip measurements are crucial for skirts, pants, bodycon dresses — basically anything from the waist down.",
  },
  {
    field: "inseam",
    label: "Inseam",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Time for your inseam.\n\nMeasure from the top of your inner thigh (right at the crotch) straight down to your ankle bone.",
    tip: "Easiest to measure while wearing well-fitting pants, or have someone help. Stand straight with feet shoulder-width apart.",
    video: "https://www.youtube.com/watch?v=aS5opN50l9c",
    followUp:
      "Nice. Your inseam determines pant length and how midi/maxi hemlines will hit on you.",
  },
  {
    field: "shoulder_width",
    label: "Shoulder Width",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Let's measure your shoulders.\n\nMeasure from the bony point at the edge of one shoulder, across the back of your neck, to the same point on the other shoulder.",
    tip: "Feel for the bony bump at the top of each arm — that's your shoulder point. Measure across the back, not the front.",
    video: "https://www.youtube.com/watch?v=fGYR39wtExQ",
    followUp:
      "Shoulder width affects how blazers, jackets, and structured tops fit. This is a measurement most people overlook.",
  },
  {
    field: "arm_length",
    label: "Arm Length",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Almost there! Let's get your arm length.\n\nMeasure from the edge of your shoulder (that same bony point), down along the outside of your slightly bent arm, to your wrist bone.",
    tip: "Keep a slight bend in your elbow — this mimics how sleeves actually sit when you're wearing them.",
    video: "",
    followUp:
      "This helps with sleeve length on blazers, long-sleeve tops, and outerwear. No more sleeves that are too short or too long.",
  },
  {
    field: "torso_length",
    label: "Torso Length",
    inputType: "number" as const,
    unit: "in",
    intro:
      "Last one — torso length.\n\nMeasure from the base of your neck (where it meets your shoulder) straight down your front to your natural waistline.",
    tip: "This tells you if you're short-torsoed or long-torsoed — which affects where crop tops, bodysuits, and high-waisted bottoms hit.",
    video: "",
    followUp:
      "And that's all 9 measurements! You just completed your SUEDE fit profile.",
  },
];

export default function ConsultationPage() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [measurements, setMeasurements] = useState<{ [key: string]: any }>({});
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/consultation");
        return;
      }
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, [router, supabase]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (started && !isTyping) {
      inputRef.current?.focus();
    }
  }, [started, isTyping, currentStep]);

  const addAssistantMessage = (content: string, extras?: Partial<Message>) => {
    return new Promise<void>((resolve) => {
      setIsTyping(true);
      const delay = Math.min(600 + content.length * 5, 1800);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content, type: "text", ...extras },
        ]);
        setIsTyping(false);
        resolve();
      }, delay);
    });
  };

  const startConsultation = async () => {
    setStarted(true);

    await addAssistantMessage(
      "Hey! Welcome to your SUEDE Fit Consultation. ✨",
    );
    await addAssistantMessage(
      "I'm going to walk you through taking 9 body measurements. It takes about 5 minutes and you'll need a soft tape measure — the flexible kind, not a metal one.",
    );
    await addAssistantMessage(
      "If you don't have one, a piece of string + a ruler works too. Or even a phone charger cable — get creative!",
    );
    await addAssistantMessage("Ready? Let's start with something easy.");

    const step = MEASUREMENT_STEPS[0];
    await addAssistantMessage(step.intro, {
      type: "measurement-input",
      field: step.field,
      label: step.label,
      unit: step.unit,
      inputType: step.inputType,
      tip: step.tip,
      video: step.video,
    });
  };

  const handleSubmitMeasurement = async () => {
    const step = MEASUREMENT_STEPS[currentStep];

    if (inputValue.toLowerCase() === "skip") {
      setMessages((prev) => [...prev, { role: "user", content: "Skip" }]);
      setInputValue("");
      await advanceStep("No worries, we'll skip that one.");
      return;
    }

    if (step.inputType === "height") {
      if (!heightFeet) return;
      const heightStr = `${heightFeet}'${heightInches || "0"}"`;
      setMessages((prev) => [...prev, { role: "user", content: heightStr }]);
      setMeasurements((prev) => ({
        ...prev,
        height_feet: parseInt(heightFeet),
        height_inches: parseInt(heightInches || "0"),
      }));
      setHeightFeet("");
      setHeightInches("");
      await advanceStep(step.followUp);
      return;
    }

    const value = parseFloat(inputValue);
    if (!inputValue || isNaN(value)) return;

    if (step.field === "weight" && (value < 50 || value > 500)) {
      await addAssistantMessage(
        "Hmm, that doesn't seem right. Could you double-check? Enter your weight in pounds.",
      );
      return;
    }
    if (step.unit === "in" && (value < 5 || value > 70)) {
      await addAssistantMessage(
        "That measurement seems off — make sure you're measuring in inches. Give it another try?",
      );
      return;
    }

    const displayValue = step.unit ? `${value} ${step.unit}` : `${value}`;
    setMessages((prev) => [...prev, { role: "user", content: displayValue }]);
    setMeasurements((prev) => ({ ...prev, [step.field]: value }));
    setInputValue("");
    await advanceStep(step.followUp);
  };

  const advanceStep = async (followUp: string) => {
    await addAssistantMessage(followUp);

    const nextStep = currentStep + 1;

    if (nextStep >= MEASUREMENT_STEPS.length) {
      await addAssistantMessage("Here's a summary of your measurements:");

      const summary = buildSummary();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: summary,
          type: "measurement-confirm",
        },
      ]);

      await addAssistantMessage(
        "Everything look right? I'll save these to your SUEDE profile. You can always update them later in your profile settings.",
      );
      setCompleted(true);
    } else {
      setCurrentStep(nextStep);
      const step = MEASUREMENT_STEPS[nextStep];
      await addAssistantMessage(step.intro, {
        type: "measurement-input",
        field: step.field,
        label: step.label,
        unit: step.unit,
        inputType: step.inputType,
        tip: step.tip,
        video: step.video,
      });
    }
  };

  const buildSummary = () => {
    const lines: string[] = [];
    if (measurements.height_feet)
      lines.push(
        `Height: ${measurements.height_feet}'${measurements.height_inches || 0}"`,
      );
    if (measurements.weight) lines.push(`Weight: ${measurements.weight} lbs`);
    if (measurements.bust) lines.push(`Bust: ${measurements.bust}"`);
    if (measurements.waist) lines.push(`Waist: ${measurements.waist}"`);
    if (measurements.hips) lines.push(`Hips: ${measurements.hips}"`);
    if (measurements.inseam) lines.push(`Inseam: ${measurements.inseam}"`);
    if (measurements.shoulder_width)
      lines.push(`Shoulder Width: ${measurements.shoulder_width}"`);
    if (measurements.arm_length)
      lines.push(`Arm Length: ${measurements.arm_length}"`);
    if (measurements.torso_length)
      lines.push(`Torso Length: ${measurements.torso_length}"`);
    return lines.join("\n");
  };

  const saveMeasurements = async () => {
    setSaving(true);
    try {
      const result = await saveConsultationMeasurements({
        heightFeet: measurements.height_feet,
        heightInches: measurements.height_inches,
        weight: measurements.weight,
        bust: measurements.bust,
        waist: measurements.waist,
        hips: measurements.hips,
        inseam: measurements.inseam,
        shoulderWidth: measurements.shoulder_width,
        armLength: measurements.arm_length,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to save measurements");
      }

      await addAssistantMessage(
        "Your measurements have been saved to your SUEDE profile! 🎉\n\nNow when you browse reviews, you'll be matched with reviewers who share your measurements. Happy shopping!",
      );

      setTimeout(() => {
        router.push("/profile");
      }, 3000);
    } catch (err) {
      console.error("Save error:", err);
      await addAssistantMessage(
        "Hmm, there was an issue saving. Don't worry — you can manually enter these in your profile settings. Head to The Edit → Measurements.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitMeasurement();
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F6F3] pt-24">
        <div className="flex items-center justify-center py-32">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1A1A1A]/20 border-t-[#1A1A1A]" />
        </div>
      </main>
    );
  }

  if (!started) {
    return (
      <ConsultationLanding
        steps={MEASUREMENT_STEPS}
        onStart={startConsultation}
      />
    );
  }

  const currentStepData =
    currentStep < MEASUREMENT_STEPS.length
      ? MEASUREMENT_STEPS[currentStep]
      : null;

  return (
    <ConsultationChatView
      currentStep={currentStep}
      currentStepData={currentStepData}
      steps={MEASUREMENT_STEPS}
      messages={messages}
      isTyping={isTyping}
      chatEndRef={chatEndRef}
      completed={completed}
      inputRef={inputRef}
      heightFeet={heightFeet}
      setHeightFeet={setHeightFeet}
      heightInches={heightInches}
      setHeightInches={setHeightInches}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onKeyDown={handleKeyDown}
      onSubmitMeasurement={handleSubmitMeasurement}
      saving={saving}
      onSaveMeasurements={saveMeasurements}
    />
  );
}
