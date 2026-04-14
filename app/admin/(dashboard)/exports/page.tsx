"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function AdminExportsPage() {
  const exportItems = [
    { label: "Export all members", url: "/api/admin/exports/members", filename: "members.xls" },
    { label: "Export all reviews", url: "/api/admin/exports/reviews", filename: "reviews.xls" },
    { label: "Export all inquiries", url: "/api/admin/exports/inquiries", filename: "inquiries.xls" },
    { label: "Export brand suggestions", url: "/api/admin/exports/brand-suggestions", filename: "brand-suggestions.xls" },
    { label: "Export platform feedback", url: "/api/admin/exports/platform-feedback", filename: "platform-feedback.xls" },
    { label: "Export brand contact requests", url: "/api/admin/exports/brand-contact-requests", filename: "brand-contact-requests.xls" },
  ];

  async function handleExport(url: string, filename: string) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const tempUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = tempUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(tempUrl);
    } catch (err) {
      console.error(err);
      alert(`Failed to download ${filename}`);
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-muted-foreground text-xs tracking-[0.25em] uppercase">
          Downloads
        </p>
        <h2 className="font-cormorant text-3xl">Data Export</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
          Trigger CSV exports for full-table downloads.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {exportItems.map((item) => (
          <div
            key={item.label}
            className="border-border bg-card flex items-center justify-between rounded-2xl border px-4 py-4 shadow-sm"
          >
            <p className="text-sm font-medium">{item.label}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleExport(item.url, item.filename)}
            >
              Download
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
