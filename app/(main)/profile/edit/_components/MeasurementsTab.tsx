"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const topLetterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "OS"];
const numericSizes = [
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
];
const bottomLetterSizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const waistSizes = [
  "24",
  "26",
  "28",
  "30",
  "32",
  "34",
  "36",
  "38",
  "40",
  "42",
  "44",
];
const plusSizesArr = ["1X", "2X", "3X", "4X", "5X"];

const bodyBuilds = [
  { id: "Petite", desc: "Small frame, shorter stature" },
  { id: "Tall", desc: "Longer limbs, elongated torso" },
  { id: "Athletic", desc: "Broader shoulders, defined through the body" },
  { id: "Straight", desc: "Similar width shoulder to hip" },
  { id: "Curvy", desc: "Fuller bust and hips, defined waist" },
  { id: "Full-figured", desc: "Fuller through bust, waist, and hips" },
];

interface MeasurementsTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayToggle: (key: string, value: string) => void;
}

export default function MeasurementsTab({
  formData,
  setFormData,
  handleArrayToggle,
}: MeasurementsTabProps) {
  return (
    <div className="space-y-12">
      {/* Measurement Profile Section */}
      <div>
        <h2 className="font-cormorant mb-2 text-[32px] text-black">
          Measurement Profile
        </h2>
        <p className="mb-6 text-[14px] text-black/60">
          Your measurements are used to calculate Match Scores with reviewers.
          They are kept private and only shared as aggregate match percentages.
        </p>

        <hr className="mb-8 border-t border-black/5" />

        <div className="mb-8 flex items-start gap-3 border border-black/10 bg-[#FAFAFA] p-4">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-black" />
          <p className="text-[13px] text-black/60">
            Accurate measurements improve your match score results by up to 40%.
            We recommend measuring yourself in form-fitting clothing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">Height</Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">
              feet & inches
            </p>
            <Input
              value={formData.heightInches || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  heightInches: e.target.value,
                })
              }
              placeholder="5'6&quot;"
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">Bust</Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.bustInches || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bustInches: e.target.value,
                })
              }
              placeholder='36"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">Waist</Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.waistInches || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  waistInches: e.target.value,
                })
              }
              placeholder='28"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">Hips</Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.hipsInches || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hipsInches: e.target.value,
                })
              }
              placeholder='40"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">
              Shoulder <span className="text-black/40">(Optional)</span>
            </Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.shoulder || ""}
              onChange={(e) =>
                setFormData({ ...formData, shoulder: e.target.value })
              }
              placeholder='28"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">
              Inseam <span className="text-black/40">(Optional)</span>
            </Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.inseam || ""}
              onChange={(e) =>
                setFormData({ ...formData, inseam: e.target.value })
              }
              placeholder='40"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[13px] text-black/80">
              Arm Length <span className="text-black/40">(Optional)</span>
            </Label>
            <p className="m-0 mb-1 p-0 text-[11px] text-black/40">inches</p>
            <Input
              value={formData.armLength || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  armLength: e.target.value,
                })
              }
              placeholder='28"'
              className="h-12 rounded-none border-black/10 bg-[#FAFAFA] text-[14px] text-black"
            />
          </div>
        </div>
      </div>

      <hr className="border-t border-black/5" />

      {/* Usual Sizes Section */}
      <div>
        <h2 className="font-cormorant mb-2 text-[32px] text-black">
          Usual Sizes
        </h2>
        <p className="mb-8 text-[14px] text-black/60">
          Select all that apply for each category (US Sizing)
        </p>

        <div className="space-y-12">
          {/* TOPS & DRESSES */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-wider text-black/40 uppercase">
              Tops & Dresses
            </h3>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block text-[12px] text-black/60">
                  Letter size
                </Label>
                <div className="flex flex-wrap gap-2">
                  {topLetterSizes.map((size) => {
                    const isActive = (formData.topsLetterSizes || []).includes(
                      size,
                    );
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          handleArrayToggle("topsLetterSizes", size)
                        }
                        className={`flex h-10 min-w-12 items-center justify-center border px-4 text-[13px] transition-colors ${
                          isActive
                            ? "border-black bg-white text-black"
                            : "border-black/10 bg-white text-black/60 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label className="mb-3 block text-[12px] text-black/60">
                  US numeric size
                </Label>
                <div className="flex flex-wrap gap-2">
                  {numericSizes.map((size) => {
                    const isActive = (formData.topsNumericSizes || []).includes(
                      size,
                    );
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          handleArrayToggle("topsNumericSizes", size)
                        }
                        className={`flex h-10 w-10 items-center justify-center border text-[13px] transition-colors ${
                          isActive
                            ? "border-black bg-white text-black"
                            : "border-black/10 bg-white text-black/60 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-black/5" />

          {/* BOTTOMS */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-wider text-black/40 uppercase">
              Bottoms
            </h3>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block text-[12px] text-black/60">
                  Letter size
                </Label>
                <div className="flex flex-wrap gap-2">
                  {bottomLetterSizes.map((size) => {
                    const isActive = (
                      formData.bottomsLetterSizes || []
                    ).includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          handleArrayToggle("bottomsLetterSizes", size)
                        }
                        className={`flex h-10 min-w-12 items-center justify-center border px-4 text-[13px] transition-colors ${
                          isActive
                            ? "border-black bg-white text-black"
                            : "border-black/10 bg-white text-black/60 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label className="mb-3 block text-[12px] text-black/60">
                  US numeric size
                </Label>
                <div className="flex flex-wrap gap-2">
                  {numericSizes.map((size) => {
                    const isActive = (
                      formData.bottomsNumericSizes || []
                    ).includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          handleArrayToggle("bottomsNumericSizes", size)
                        }
                        className={`flex h-10 w-10 items-center justify-center border text-[13px] transition-colors ${
                          isActive
                            ? "border-black bg-white text-black"
                            : "border-black/10 bg-white text-black/60 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label className="mb-3 block text-[12px] text-black/60">
                  Waist size (inches) — for denim & trousers
                </Label>
                <div className="flex flex-wrap gap-2">
                  {waistSizes.map((size) => {
                    const isActive = (
                      formData.bottomsWaistSizes || []
                    ).includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() =>
                          handleArrayToggle("bottomsWaistSizes", size)
                        }
                        className={`flex h-10 w-10 items-center justify-center border text-[13px] transition-colors ${
                          isActive
                            ? "border-black bg-white text-black"
                            : "border-black/10 bg-white text-black/60 hover:border-black/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-black/5" />

          {/* PLUS */}
          <div>
            <h3 className="mb-6 text-[10px] tracking-wider text-black/40 uppercase">
              Plus
            </h3>
            <div className="flex flex-wrap gap-2">
              {plusSizesArr.map((size) => {
                const isActive = (formData.plusSizes || []).includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleArrayToggle("plusSizes", size)}
                    className={`flex h-10 min-w-12 items-center justify-center border px-4 text-[13px] transition-colors ${
                      isActive
                        ? "border-black bg-white text-black"
                        : "border-black/10 bg-white text-black/60 hover:border-black/30"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t border-black/5" />

      {/* Body Build Section */}
      <div>
        <h2 className="font-cormorant mb-2 text-[32px] text-black">
          Body Build
        </h2>
        <p className="mb-8 text-[14px] text-black/60">
          Select your closest match
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bodyBuilds.map((build) => {
            const isActive = formData.bodyType === build.id;
            return (
              <button
                key={build.id}
                onClick={() => setFormData({ ...formData, bodyType: build.id })}
                className={`flex flex-col items-start border p-6 text-left transition-colors ${
                  isActive
                    ? "border-black bg-white"
                    : "border-black/10 bg-white hover:border-black/30"
                }`}
              >
                <h4 className="mb-2 text-[16px] text-black">{build.id}</h4>
                <p className="m-0 text-[13px] text-black/60">{build.desc}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
