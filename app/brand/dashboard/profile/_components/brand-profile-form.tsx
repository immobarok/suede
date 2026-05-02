"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { BrandProfile } from "../types/brand";
import { Lock, MessageCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { UploadArea } from "./upload-area";
import { SectionWrapper } from "./section-wrapper";




const MAX_BIO_LENGTH = 120;

const INITIAL_DATA: BrandProfile = {
  brandName: "KIKIOLA KANBI",
  country: "France",
  website: "https://kikiolakanbi.com",
  founded: "2019",
  bio: "Maison Ciel is a Paris-based atelier of considered ready-to-wear, founded in 2019.",
  instagram: "@hanifa",
  tiktok: "@hanifa",
};

export function BrandProfileForm() {
  const [form, setForm] = useState<BrandProfile>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends keyof BrandProfile>(field: K, value: BrandProfile[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saved:", form);
      setIsSubmitting(false);
    },
    [form]
  );

  const bioCount = form.bio.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-16">
      <SectionWrapper
        number="01"
        title="Basic information"
        description="The essentials. Your brand name is locked once you've joined."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Brand Name - Locked */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Brand Name
            </Label>
            <div className="relative">
              <Input
                value={form.brandName}
                disabled
                className="bg-gray-50 pr-10 text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-400">
              Locked — contact support to change.
            </p>
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Country
            </Label>
            <Input
              value={form.country}
              onChange={(e) => updateField("country", e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Website
            </Label>
            <Input
              type="url"
              value={form.website}
              onChange={(e) => updateField("website", e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Founded */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Founded
            </Label>
            <Input
              value={form.founded}
              onChange={(e) => updateField("founded", e.target.value)}
              className="bg-white"
            />
          </div>

          {/* Bio - Full Width */}
          <div className="space-y-2 md:col-span-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Bio
            </Label>
            <Textarea
              value={form.bio}
              onChange={(e) => {
                if (e.target.value.length <= MAX_BIO_LENGTH) {
                  updateField("bio", e.target.value);
                }
              }}
              rows={4}
              className="resize-none bg-white"
            />
            <p className="text-right text-xs text-gray-400">
              {bioCount} / {MAX_BIO_LENGTH} characters
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── 02 Imagery ─── */}
      <SectionWrapper
        number="02"
        title="Imagery"
        description="A banner image for your portal. This is reviewed by editors."
      >
        <UploadArea
          label="Banner Image"
          onFileSelect={(file) => console.log("Banner:", file.name)}
        />
      </SectionWrapper>

      {/* ─── 03 Channels ─── */}
      <SectionWrapper
        number="03"
        title="Channels"
        description="Where customers can find you elsewhere."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Instagram */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              Instagram
            </Label>
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={form.instagram}
                onChange={(e) => updateField("instagram", e.target.value)}
                className="bg-white pl-10"
              />
            </div>
          </div>

          {/* TikTok */}
          <div className="space-y-2">
            <Label className="text-xs font-medium uppercase tracking-wider text-gray-500">
              TikTok
            </Label>
            <div className="relative">
              {/* Simple TikTok icon placeholder using SVG */}
              <svg
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
              <Input
                value={form.tiktok}
                onChange={(e) => updateField("tiktok", e.target.value)}
                className="bg-white pl-10"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ─── 04 Size Chart ─── */}
      <SectionWrapper
        number="04"
        title={
          <>
            Size chart <span className="text-gray-400">(Optional)</span>
          </>
        }
        description="Optional. Image or PDF — used to help customers choose the right fit."
      >
        <UploadArea
          label="Size Chart"
          hint="PNG, JPG or PDF"
          accept="image/png,image/jpeg,.pdf"
          onFileSelect={(file) => console.log("Size chart:", file.name)}
        />
      </SectionWrapper>
    </form>
  );
}