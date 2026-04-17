"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail } from "lucide-react";

interface AccountTabProps {
  formData: any;
  setFormData: (data: any) => void;
  openPassword: () => void;
}

export default function AccountTab({
  formData,
  setFormData,
  openPassword,
}: AccountTabProps) {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-cormorant mb-2 text-[32px]">Account Settings</h2>
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
          <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-black/40" />
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
            className="text-[12px] tracking-wider text-[#C28B2C] uppercase hover:text-black"
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
            className="rounded-none border border-black/10 px-6 py-2 text-[12px] tracking-wider text-black/50 uppercase hover:text-black"
          >
            Deactivate Account
          </button>
          <button
            type="button"
            className="rounded-none border border-red-500 px-6 py-2 text-[12px] tracking-wider text-red-600 uppercase hover:bg-red-50"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
