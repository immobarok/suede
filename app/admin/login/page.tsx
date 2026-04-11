import { redirect } from "next/navigation";
import {
  hasValidAdminSession,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/auth/admin-session";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasValidAdminSession()) {
    redirect("/admin");
  }

  const params = await searchParams;
  const hasError = params.error === "invalid";

  async function loginAction(formData: FormData) {
    "use server";

    const password = String(formData.get("password") ?? "");

    if (!verifyAdminPassword(password)) {
      redirect("/admin/login?error=invalid");
    }

    await setAdminSessionCookie();
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F0] px-4">
      <div className="w-full max-w-md border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="font-cormorant text-4xl text-[#1A1A1A]">
          Admin Sign In
        </h1>
        <p className="font-darker mt-2 text-sm text-black/60">
          Enter the seeded admin password from environment settings.
        </p>

        <form action={loginAction} className="mt-8 space-y-4">
          <label className="font-darker block text-xs tracking-wide text-black/70 uppercase">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full border border-black/20 px-3 py-2 text-sm outline-none focus:border-black"
              placeholder="Admin password"
            />
          </label>

          {hasError ? (
            <p className="font-darker text-xs text-[#8B1E2D]">
              Invalid password. Please try again.
            </p>
          ) : null}

          <button
            type="submit"
            className="font-darker w-full cursor-pointer bg-black px-4 py-2 text-xs tracking-[0.15em] text-white uppercase hover:bg-black/90"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}
