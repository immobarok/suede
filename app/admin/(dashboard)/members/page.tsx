import { createAdminClient } from "@/lib/supabase/admin";

type MemberRow = {
  id: string;
  username: string | null;
  display_name: string | null;
  email: string;
  created_at: string | null;
  measurement_completed: boolean | null;
  reviews_count: number | null;
};

function formatDate(value: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function resolveHandle(member: MemberRow) {
  if (member.username) return `@${member.username}`;
  if (member.display_name) return member.display_name;
  const emailPrefix = member.email?.split("@")[0];
  return emailPrefix ? `@${emailPrefix}` : "--";
}

export default async function AdminMembersPage() {
  const supabase = createAdminClient();

  const [{ data: members, error: membersError }, { data: inquiries }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select(
          "id, username, display_name, email, created_at, measurement_completed, reviews_count"
        )
        .order("created_at", { ascending: false }),
      supabase.from("review_requests").select("user_id"),
    ]);

  if (membersError) {
    throw new Error("Failed to load members.");
  }

  const inquiryCounts = (inquiries ?? []).reduce<Record<string, number>>(
    (acc, item) => {
      const userId = (item as { user_id?: string | null }).user_id;
      if (!userId) return acc;
      acc[userId] = (acc[userId] ?? 0) + 1;
      return acc;
    },
    {}
  );

  const rows = members ?? [];

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
          {rows.length === 0 ? (
            <div className="px-6 py-6 text-sm text-muted-foreground">
              No members found yet.
            </div>
          ) : (
            rows.map((member) => (
              <div
                key={member.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 text-sm text-foreground"
              >
                <span className="font-medium">{resolveHandle(member)}</span>
                <span className="text-muted-foreground">{member.email}</span>
                <span className="text-muted-foreground">
                  {formatDate(member.created_at)}
                </span>
                <span className="text-muted-foreground">
                  {member.measurement_completed ? "Yes" : "No"}
                </span>
                <span className="text-muted-foreground">
                  {member.reviews_count ?? 0}
                </span>
                <span className="text-muted-foreground">
                  {inquiryCounts[member.id] ?? 0}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
