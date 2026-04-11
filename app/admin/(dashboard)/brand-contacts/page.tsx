export default function AdminBrandContactsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Inbound
        </p>
        <h2 className="font-cormorant text-3xl">Brand Contact Requests</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Review requests from capsule brand owners and general brand inquiries.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {[
          "Capsule Brand Owner Requests",
          "General Brand Inquiries",
        ].map((title) => (
          <div
            key={title}
            className="rounded-3xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {title}
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-border bg-background/60 px-4 py-10 text-center text-sm text-muted-foreground">
              Connect data source to populate requests.
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
