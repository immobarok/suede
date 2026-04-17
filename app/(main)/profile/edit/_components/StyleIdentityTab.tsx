"use client";

import { Label } from "@/components/ui/label";

interface StyleIdentityTabProps {
  formData: any;
  handleStyleVibeToggle: (vibe: string) => void;
  commonStyleVibes: string[];
}

export default function StyleIdentityTab({
  formData,
  handleStyleVibeToggle,
  commonStyleVibes,
}: StyleIdentityTabProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-cormorant mb-2 text-[32px]">Style Identity</h2>
        <p className="text-[14px] text-black/40">
          Help us curate your feed by selecting your style vibes.
        </p>
      </div>

      <div className="space-y-6">
        <Label className="text-[12px] tracking-wider text-black/60 uppercase">
          Style Vibes
        </Label>
        <div className="flex flex-wrap gap-3">
          {commonStyleVibes.map((vibe) => (
            <button
              key={vibe}
              onClick={() => handleStyleVibeToggle(vibe)}
              className={`border px-6 py-3 text-[14px] transition-colors ${
                (formData.styleVibes || []).includes(vibe)
                  ? "border-black bg-black text-white"
                  : "border-black/10 bg-white text-black/60 hover:border-black/30"
              }`}
            >
              {vibe}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
