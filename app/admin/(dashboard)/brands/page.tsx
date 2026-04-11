export default function AdminBrandsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Directory
        </p>
        <h2 className="font-cormorant text-3xl">Brand Management</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Manage capsule brands, monitor non-capsule brands, and review capsule
          requests.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <button className="rounded-full border border-border px-4 py-1">
            Capsule Brands
          </button>
          <button className="rounded-full border border-border px-4 py-1">
            Non-Capsule Brands
          </button>
          <button className="rounded-full border border-border px-4 py-1">
            Capsule Requests
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/60 px-4 py-10 text-center text-sm text-muted-foreground">
          Connect data tables to show brand lists, actions, and status.
        </div>
      </div>
    </section>
  );
}
