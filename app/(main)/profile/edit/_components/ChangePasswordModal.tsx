"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryModal } from "@/hooks";
import { toast } from "sonner";
import { changePassword } from "@/app/actions/change-password";

export default function ChangePasswordModal() {
  const {
    isOpen: isPasswordOpen,
    open: openPassword,
    close: closePassword,
  } = useQueryModal("modal", "change-password");

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    next: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    closePassword();
    setPasswords({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswords({
      current: false,
      next: false,
      confirm: false,
    });
  };

  const handleSubmit = async () => {
    setError(null);

    if (!passwords.newPassword || passwords.newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      await changePassword(passwords.newPassword);

      toast.success("Password updated successfully");
      handleClose();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Password update failed";
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isPasswordOpen}
      onOpenChange={(next) => (next ? openPassword() : handleClose())}
    >
      <DialogContent className="w-[95vw] max-w-130 rounded-none border-none bg-white p-0 shadow-[0_40px_80px_rgba(0,0,0,0.2)]">
        <div className="border-b border-black/10 px-8 py-6">
          <DialogTitle className="font-cormorant text-[24px]">
            Change Password
          </DialogTitle>
          <DialogDescription className="text-[13px] text-black/40">
            Update your password to keep your account secure.
          </DialogDescription>
        </div>
        <div className="space-y-6 px-8 py-8">
          {error && (
            <div className="rounded-none border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-600">
              {error}
            </div>
          )}
          <div className="space-y-3">
            <Label
              htmlFor="currentPassword"
              className="text-[12px] tracking-wider text-black/60 uppercase"
            >
              Current Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <Input
                id="currentPassword"
                type={showPasswords.current ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    currentPassword: e.target.value,
                  }))
                }
                className="h-12 rounded-none border-black/10 bg-[#F9F9F9] pl-10 pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    current: !prev.current,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
              >
                {showPasswords.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="newPassword"
              className="text-[12px] tracking-wider text-black/60 uppercase"
            >
              New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <Input
                id="newPassword"
                type={showPasswords.next ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="h-12 rounded-none border-black/10 bg-[#F9F9F9] pl-10 pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    next: !prev.next,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
              >
                {showPasswords.next ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="confirmPassword"
              className="text-[12px] tracking-wider text-black/60 uppercase"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
              <Input
                id="confirmPassword"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                className="h-12 rounded-none border-black/10 bg-[#F9F9F9] pl-10 pr-10"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPasswords((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 border-t border-black/10 px-8 py-6">
          <button
            type="button"
            onClick={handleClose}
            className="text-[12px] tracking-[0.2em] text-black/40 uppercase hover:text-black"
          >
            Cancel
          </button>
          <Button
            type="button"
            disabled={isSubmitting}
            className="rounded-none bg-black px-8 py-5 text-[12px] tracking-[0.2em] text-white uppercase hover:bg-black/90"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
