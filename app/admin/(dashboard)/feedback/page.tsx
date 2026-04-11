export default function AdminFeedbackPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Suggestions
        </p>
        <h2 className="font-cormorant text-3xl">Platform Feedback</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Review platform improvement ideas submitted by members.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid grid-cols-4 gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Submitted By</span>
          <span>Suggestion</span>
          <span>Date</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-border">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 px-6 py-4 text-sm text-foreground"
            >
              <span className="font-medium">—</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">—</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
