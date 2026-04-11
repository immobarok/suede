import { Button } from "@/components/ui/button";

export default function AdminExportsPage() {
  const exportItems = [
    "Export all members",
    "Export all reviews",
    "Export all inquiries",
    "Export brand suggestions",
    "Export platform feedback",
    "Export brand contact requests",
  ];

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Downloads
        </p>
        <h2 className="font-cormorant text-3xl">Data Export</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Trigger CSV exports for full-table downloads.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {exportItems.map((label) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl border border-border bg-card px-4 py-4 shadow-sm"
          >
            <p className="text-sm font-medium">{label}</p>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
