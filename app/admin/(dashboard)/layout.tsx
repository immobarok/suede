import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/auth/admin-session";
import AdminShell from "@/components/admin/admin-shell";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await hasValidAdminSession();

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return <AdminShell>{children}</AdminShell>;
}
