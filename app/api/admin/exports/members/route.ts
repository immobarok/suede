import fs from "fs";
import path from "path";
import { db } from "@/db";
import { profiles } from "@/db/schema";

function escapeHtml(str: unknown) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET() {
  const members = await db.select().from(profiles).limit(10000);

  // Try to read a small logo from the public folder and embed as base64
  let logoBase64 = "";
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "icons",
      "logo_small.png",
    );
    const data = fs.readFileSync(logoPath);
    logoBase64 = data.toString("base64");
  } catch (e) {
    // silence - if logo missing we'll just omit it
  }

  const rows = members
    .map((m) => {
      return `
        <tr>
          <td>${escapeHtml(m.email)}</td>
          <td>${escapeHtml(m.displayName)}</td>
          <td>${escapeHtml(m.username)}</td>
          <td>${escapeHtml(m.role)}</td>
          <td>${escapeHtml(m.location)}</td>
          <td>${escapeHtml(m.createdAt)}</td>
        </tr>`;
    })
    .join("\n");

  const html = `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <style>table{border-collapse:collapse}td,th{border:1px solid #ddd;padding:6px}</style>
    </head>
    <body>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
        ${logoBase64 ? `<img src="data:image/png;base64,${logoBase64}" style="width:72px;height:auto"/>` : ""}
        <div>
          <h2 style="margin:0">Members Export</h2>
          <div style="color:#666;font-size:12px">Generated: ${new Date().toISOString()}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Display name</th>
            <th>Username</th>
            <th>Role</th>
            <th>Location</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.ms-excel; charset=utf-8",
      "Content-Disposition": 'attachment; filename="members.xls"',
    },
  });
}
