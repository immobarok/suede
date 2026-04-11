import { createClient as createServerClient } from "@/lib/supabase/server";

export async function assertAdminUser() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.user_metadata?.role === "admin") {
    return user;
  }

  const [{ data: profile }, { data: adminRow }] = await Promise.all([
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
    supabase.from("admins").select("id").eq("id", user.id).maybeSingle(),
  ]);

  const isAdmin = profile?.role === "admin" || Boolean(adminRow?.id);

  if (!isAdmin) {
    throw new Error("Forbidden");
  }

  return user;
}
