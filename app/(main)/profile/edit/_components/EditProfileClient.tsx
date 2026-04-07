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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "sonner";
import { updateProfile } from "../../actions";
import { useQueryModal } from "@/hooks";
import ChangePasswordModal from "./ChangePasswordModal";

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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { open: openPassword } = useQueryModal("modal", "change-password");

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const dataToSave = {
        ...formData,
        heightCm: formData.heightCm ? Number(formData.heightCm) : null,
        weightKg: formData.weightKg ? Number(formData.weightKg) : null,
        bustCm: formData.bustCm ? Number(formData.bustCm) : null,
        waistCm: formData.waistCm ? Number(formData.waistCm) : null,
        hipsCm: formData.hipsCm ? Number(formData.hipsCm) : null,
      };

      await updateProfile(dataToSave);
      toast.success("Profile updated successfully");
      router.push("/profile");
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/20 to-white/10" />

      <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-32">
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
                      : "text-black/40 hover:bg-black/[0.02] hover:text-black/60"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.id}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Form */}
          <div className="min-h-[600px] flex-1 bg-white p-12 shadow-sm">
            {activeTab === "Personal Info" && (
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
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    placeholder="Tell the community a little about your style..."
                    className="w-full rounded-none border border-black/10 bg-[#F9F9F9] p-4 text-[14px] focus:border-black/30 focus:outline-none"
                  />
                  <div className="text-right text-[10px] text-black/40 uppercase">
                    {(formData.bio || "").length} / 200
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Style Identity" && (
              <div className="space-y-12">
                <div>
                  <h2 className="font-cormorant mb-2 text-[32px]">
                    Style Identity
                  </h2>
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
            )}

            {activeTab === "Measurements" && (
              <div className="space-y-12">
                <div>
                  <h2 className="font-cormorant mb-2 text-[32px]">
                    Body Measurements
                  </h2>
                  <p className="text-[14px] text-black/40">
                    Your measurements help us find your perfect fit. These are
                    private and only used for fit matching.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
                  <div className="space-y-3">
                    <Label
                      htmlFor="height"
                      className="text-[12px] tracking-wider text-black/60 uppercase"
                    >
                      Height (cm)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.heightCm || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, heightCm: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="weight"
                      className="text-[12px] tracking-wider text-black/60 uppercase"
                    >
                      Weight (kg)
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weightKg || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, weightKg: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="bust"
                      className="text-[12px] tracking-wider text-black/60 uppercase"
                    >
                      Bust (cm)
                    </Label>
                    <Input
                      id="bust"
                      type="number"
                      value={formData.bustCm || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, bustCm: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="waist"
                      className="text-[12px] tracking-wider text-black/60 uppercase"
                    >
                      Waist (cm)
                    </Label>
                    <Input
                      id="waist"
                      type="number"
                      value={formData.waistCm || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, waistCm: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="hips"
                      className="text-[12px] tracking-wider text-black/60 uppercase"
                    >
                      Hips (cm)
                    </Label>
                    <Input
                      id="hips"
                      type="number"
                      value={formData.hipsCm || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, hipsCm: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Account" && (
              <div className="space-y-10">
                <div>
                  <h2 className="font-cormorant mb-2 text-[32px]">
                    Account Settings
                  </h2>
                  <p className="text-[14px] text-black/40">
                    Manage your login credentials and account security.
                  </p>
                </div>

                <div className="space-y-3 border-t border-black/10 pt-6">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-[12px] tracking-wider text-black/60 uppercase"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-14 rounded-none border-black/10 bg-[#F9F9F9] pl-10"
                    />
                  </div>
                  <p className="text-[11px] text-black/40">
                    A verification link will be sent to your new email address.
                  </p>
                </div>

                <div className="space-y-4 border-t border-black/10 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-cormorant text-[24px]">Password</h3>
                      <p className="text-[14px] text-black/40">
                        Keep your account secure with a strong password.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openPassword}
                      className="text-[12px] uppercase tracking-wider text-[#C28B2C] hover:text-black"
                    >
                      Change
                    </button>
                  </div>
                  <div className="relative flex items-center gap-3 rounded-none border border-black/10 bg-[#F9F9F9] px-4 py-4 pl-10">
                    <Lock className="absolute left-4 h-4 w-4 text-black/40" />
                    <span className="text-[12px] text-black/40">••••••••••</span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-black/10 pt-6">
                  <div>
                    <h3 className="font-cormorant text-[24px]">Danger Zone</h3>
                    <p className="text-[14px] text-black/40">
                      These actions are permanent and cannot be undone.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button
                      type="button"
                      className="rounded-none border border-black/10 px-6 py-2 text-[12px] uppercase tracking-wider text-black/50 hover:text-black"
                    >
                      Deactivate Account
                    </button>
                    <button
                      type="button"
                      className="rounded-none border border-red-500 px-6 py-2 text-[12px] uppercase tracking-wider text-red-600 hover:bg-red-50"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== "Personal Info" &&
              activeTab !== "Measurements" &&
              activeTab !== "Style Identity" &&
              activeTab !== "Account" && (
                <div className="flex h-96 items-center justify-center text-black/40 italic">
                  {activeTab} content implementation in progress...
                </div>
              )}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-end gap-6">
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
