"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const ProfileTabs = ({ activeView }: { activeView: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabClick = useCallback(
    (view: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", view);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const tabs = [
    { label: "Reviews", value: "reviews" },
    { label: "Inquiries", value: "inquiries" },
  ];

  return (
    <div className="flex w-full mb-8 border-b border-black/10">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => handleTabClick(tab.value)}
          className={`relative flex-1 py-4 text-[14px] uppercase tracking-[0.2em] transition-colors ${
            activeView === tab.value
              ? "text-black font-medium"
              : "text-black/40 hover:text-black/60"
          }`}
        >
          {tab.label}
          {activeView === tab.value && (
            <motion.div
              layoutId="profileTabUnderline"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
