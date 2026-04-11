import Link from "next/link";
import { redirect } from "next/navigation";
import { hasValidAdminSession } from "@/lib/auth/admin-session";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthed = await hasValidAdminSession();

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#1A1A1A]">
      <header className="border-b border-black/10 bg-white/80 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-0">
          <h1 className="font-cormorant text-3xl">Admin Dashboard</h1>
          <nav className="font-darker flex items-center gap-6 text-sm tracking-wide uppercase">
            <Link href="/admin" className="hover:opacity-70">
              Overview
            </Link>
            <Link href="/admin/about" className="hover:opacity-70">
              About Control
            </Link>
            <form action="/admin/logout" method="post">
              <button type="submit" className="cursor-pointer hover:opacity-70">
                Logout
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-0">{children}</main>
    </div>
  );
}
