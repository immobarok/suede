"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Lock,
  Mail,
  User,
  Ruler,
  Share2,
  Settings,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { toast } from "sonner";
import { updateProfile } from "../../actions";
import { useQueryModal } from "@/hooks";
import ChangePasswordModal from "./ChangePasswordModal";
import PersonalInfoTab from "./PersonalInfoTab";
import StyleIdentityTab from "./StyleIdentityTab";
import MeasurementsTab from "./MeasurementsTab";
import AccountTab from "./AccountTab";

type Tab =
  | "Personal Info"
  | "Style Identity"
  | "Measurements"
  | "Social Links"
  | "Account";

export default function EditProfileClient({
  initialData,
}: {
  initialData: any;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("Personal Info");
  const [formData, setFormData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { open: openPassword } = useQueryModal("modal", "change-password");

  const parseInches = (val: string | number | undefined) => {
    if (!val) return null;
    if (typeof val === "string" && val.includes("'")) {
      const parts = val.split("'");
      const feet = parseInt(parts[0]) || 0;
      const inches = parseInt(parts[1]?.replace('"', "")) || 0;
      return Math.round((feet * 12 + inches) * 2.54);
    }
    const num = parseFloat(val.toString().replace('"', ""));
    return isNaN(num) ? null : Math.round(num * 2.54);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave = {
        ...formData,
        heightCm: formData.heightInches
          ? parseInches(formData.heightInches)
          : formData.heightCm
            ? Number(formData.heightCm)
            : null,
        weightKg: formData.weightKg ? Number(formData.weightKg) : null,
        bustCm: formData.bustInches
          ? parseInches(formData.bustInches)
          : formData.bustCm
            ? Number(formData.bustCm)
            : null,
        waistCm: formData.waistInches
          ? parseInches(formData.waistInches)
          : formData.waistCm
            ? Number(formData.waistCm)
            : null,
        hipsCm: formData.hipsInches
          ? parseInches(formData.hipsInches)
          : formData.hipsCm
            ? Number(formData.hipsCm)
            : null,
        shoulderWidthCm: formData.shoulder
          ? parseInches(formData.shoulder)
          : null,
        inseamCm: formData.inseam ? parseInches(formData.inseam) : null,
        armLengthCm: formData.armLength
          ? parseInches(formData.armLength)
          : null,
        sizeTop: JSON.stringify({
          letter: formData.topsLetterSizes || [],
          numeric: formData.topsNumericSizes || [],
        }),
        sizeBottom: JSON.stringify({
          letter: formData.bottomsLetterSizes || [],
          numeric: formData.bottomsNumericSizes || [],
          waist: formData.bottomsWaistSizes || [],
        }),
        sizeDress: JSON.stringify({
          plus: formData.plusSizes || [],
        }),
      };

      await updateProfile(dataToSave);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "Personal Info", icon: User },
    { id: "Style Identity", icon: Sparkles },
    { id: "Measurements", icon: Ruler },
    { id: "Social Links", icon: Share2 },
    { id: "Account", icon: Settings },
  ];

  const handleStyleVibeToggle = (vibe: string) => {
    const currentVibes = formData.styleVibes || [];
    if (currentVibes.includes(vibe)) {
      setFormData({
        ...formData,
        styleVibes: currentVibes.filter((v: string) => v !== vibe),
      });
    } else {
      setFormData({ ...formData, styleVibes: [...currentVibes, vibe] });
    }
  };

  const commonStyleVibes = [
    "Minimalist",
    "Classic",
    "Neutral",
    "Streetwear",
    "Vintage",
    "Bohemian",
    "Chic",
    "Grunge",
  ];

  const handleArrayToggle = (key: string, value: string) => {
    const currentArray = formData[key] || [];
    if (currentArray.includes(value)) {
      setFormData({
        ...formData,
        [key]: currentArray.filter((v: string) => v !== value),
      });
    } else {
      setFormData({ ...formData, [key]: [...currentArray, value] });
    }
  };

  const handlePhotoPick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "avatars");
      body.append("maxWidth", "1024");
      body.append("quality", "85");
      body.append("format", "webp");

      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Upload failed");
      }

      const data = await res.json();
      setFormData((prev: any) => ({
        ...prev,
        avatarUrl: data.publicUrl,
      }));
      toast.success("Photo uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F0]">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-25 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/20 to-white/10" />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-32 md:px-0">
        <div className="mb-12 flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-[12px] tracking-wider text-black/60 uppercase hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Profile
          </Link>
          <h1 className="font-cormorant absolute left-1/2 -translate-x-1/2 text-center text-[42px] text-black">
            Edit Profile
          </h1>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          <div className="w-full space-y-8 lg:w-64">
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-24 w-24 rounded-full bg-neutral-100">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-md">
                  <Image
                    src={
                      formData.avatarUrl ||
                      "https://i.ibb.co/3mKz4rNX/Rectangle-13.png"
                    }
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePhotoPick}
                  disabled={isUploading}
                  className="absolute -right-2 bottom-3 z-10 rounded-full border-2 border-white bg-black p-1.5 shadow-md disabled:opacity-50"
                >
                  <Camera className="h-3 w-3 text-white" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={handlePhotoPick}
                disabled={isUploading}
                className="text-[12px] text-black/40 hover:text-black disabled:opacity-50"
              >
                {isUploading ? "Uploading..." : "Change photo"}
              </button>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`flex w-full items-center gap-3 px-4 py-4 text-[14px] transition-colors ${
                    activeTab === tab.id
                      ? "border-l-2 border-black bg-black/5 font-medium text-black"
                      : "text-black/40 hover:bg-black/2 hover:text-black/60"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.id}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Form */}
          <div className="min-h-150 flex-1 bg-white p-12 shadow-sm">
            {activeTab === "Personal Info" && (
              <PersonalInfoTab formData={formData} setFormData={setFormData} />
            )}

            {activeTab === "Style Identity" && (
              <StyleIdentityTab
                formData={formData}
                handleStyleVibeToggle={handleStyleVibeToggle}
                commonStyleVibes={commonStyleVibes}
              />
            )}

            {activeTab === "Measurements" && (
              <MeasurementsTab
                formData={formData}
                setFormData={setFormData}
                handleArrayToggle={handleArrayToggle}
              />
            )}

            {activeTab === "Account" && (
              <AccountTab
                formData={formData}
                setFormData={setFormData}
                openPassword={openPassword}
              />
            )}
          </div>
        </div>

        <Progress
          value={
            ((tabs.findIndex((t) => t.id === activeTab) + 1) / tabs.length) *
            100
          }
          className="mt-12 mb-6 w-full"
        />

        <div className="flex items-center justify-end gap-6">
          <button
            onClick={() => setFormData(initialData)}
            className="text-[12px] tracking-[0.2em] text-black/40 uppercase hover:text-black"
          >
            Discard Changes
          </button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="rounded-none bg-black px-12 py-7 text-[12px] tracking-[0.2em] text-white uppercase hover:bg-black/90"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <ChangePasswordModal />
    </main>
  );
}
