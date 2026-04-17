"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoTabProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function PersonalInfoTab({
  formData,
  setFormData,
}: PersonalInfoTabProps) {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-cormorant mb-2 text-[32px]">
          Personal Information
        </h2>
        <p className="text-[14px] text-black/40">
          This is how other members see you on SUEDE.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <Label
            htmlFor="displayName"
            className="text-[12px] tracking-wider text-black/60 uppercase"
          >
            Display Name
          </Label>
          <Input
            id="displayName"
            value={formData.displayName || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                displayName: e.target.value,
              })
            }
            className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
          />
        </div>
        <div className="space-y-3">
          <Label
            htmlFor="username"
            className="text-[12px] tracking-wider text-black/60 uppercase"
          >
            Username
          </Label>
          <Input
            id="username"
            value={formData.username || ""}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            placeholder="@ username"
            className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
          />
        </div>
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="location"
          className="text-[12px] tracking-wider text-black/60 uppercase"
        >
          Location
        </Label>
        <Input
          id="location"
          value={formData.location || ""}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Brooklyn, NY"
          className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
        />
      </div>

      <div className="space-y-3">
        <Label
          htmlFor="bio"
          className="text-[12px] tracking-wider text-black/60 uppercase"
        >
          Bio
        </Label>
        <textarea
          id="bio"
          value={formData.bio || ""}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          placeholder="Tell the community a little about your style..."
          className="w-full rounded-none border border-black/10 bg-[#F9F9F9] p-4 text-[14px] focus:border-black/30 focus:outline-none"
        />
        <div className="text-right text-[10px] text-black/40 uppercase">
          {(formData.bio || "").length} / 200
        </div>
      </div>
    </div>
  );
}
