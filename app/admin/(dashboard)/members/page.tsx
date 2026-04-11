export default function AdminMembersPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Directory
        </p>
        <h2 className="font-cormorant text-3xl">Member Directory</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Read-only view of all registered members.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card shadow-sm">
        <div className="grid grid-cols-6 gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>Handle</span>
          <span>Email</span>
          <span>Joined</span>
          <span>Profile Complete</span>
          <span>Reviews</span>
          <span>Inquiries</span>
        </div>
        <div className="divide-y divide-border">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 px-6 py-4 text-sm text-foreground"
            >
              <span className="font-medium">—</span>
              <span className="text-muted-foreground">—</span>
              <span className="text-muted-foreground">—</span>
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
