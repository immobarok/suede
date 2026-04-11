import { promises as fs } from "fs";
import path from "path";

export default async function AdminSpecPage() {
  let content = "";

  try {
    const filePath = path.join(process.cwd(), "admin.md");
    content = await fs.readFile(filePath, "utf8");
  } catch {
    content = "Admin spec file not found.";
  }

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Reference
        </p>
        <h2 className="font-cormorant text-3xl">Admin Dashboard Spec</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This document outlines the full internal admin scope, metrics, and
          modules planned for v1.
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <pre className="whitespace-pre-wrap text-sm leading-6 text-foreground">
          {content}
        </pre>
      </div>
    </section>
  );
}
