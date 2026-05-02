import { Button } from "@/components/ui/button";
import { BrandProfileForm } from "./_components/brand-profile-form";
import { RippleButton } from "@/components/ui/ripple-button";

export default function BrandProfilePage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto w-full px-6 py-12 md:px-0">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 border-b border-gray-200 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              Editor
            </span>
            <h1 className="font-serif text-3xl font-medium text-gray-900 md:text-4xl">
              Brand profile
            </h1>
            <p className="text-sm text-gray-500">
              Anything you upload is reviewed by our editors before going live.
            </p>
          </div>
          <div className="flex items-center justify-end gap-4 pt-4">
            <RippleButton
                  type="button"
                  className="text-gray-600 hover:text-gray-900"
            >
                    Discard 
              </RippleButton>
              <RippleButton
                    type="submit"
                    className="rounded-none bg-gray-900 px-6 text-white hover:bg-gray-800"
                  >
                    Save changes
              </RippleButton>
            </div>
        </div>
        {/* Form */}
        <BrandProfileForm />
      </div>
    </main>
  );
}