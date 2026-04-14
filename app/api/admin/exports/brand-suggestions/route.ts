import fs from "fs";
import path from "path";
import { db } from "@/db";
import { brandSuggestions } from "@/db/schema";

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
  const data = await db.select().from(brandSuggestions).limit(10000);

  let logoBase64 = "";
  try {
    const logoPath = path.join(
      process.cwd(),
      "public",
      "icons",
      "logo_small.png",
    );
    const fileData = fs.readFileSync(logoPath);
    logoBase64 = fileData.toString("base64");
  } catch (e) {
    // silence - if logo missing we'll just omit it
  }

  const rows = data
    .map((item) => {
      return `
        <tr>
          <td>${escapeHtml(item.id)}</td>
          <td>${escapeHtml(item.brandName)}</td>
          <td>${escapeHtml(item.userId)}</td>
          <td>${escapeHtml(item.status)}</td>
          <td>${escapeHtml(item.createdAt)}</td>
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
          <h2 style="margin:0">Brand Suggestions Export</h2>
          <div style="color:#666;font-size:12px">Generated: ${new Date().toISOString()}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand Name</th>
            <th>User ID</th>
            <th>Status</th>
            <th>Created At</th>
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
      "Content-Disposition": 'attachment; filename="brand-suggestions.xls"',
    },
  });
}
