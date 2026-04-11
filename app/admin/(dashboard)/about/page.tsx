import { revalidatePath } from "next/cache";
import {
  deleteAboutContent,
  listAboutContentForAdmin,
  upsertAboutContent,
} from "@/app/actions/about-content";
import { AboutContentForm } from "./_components/about-content-form";

const sections = ["hero", "mission", "story", "values", "quote"] as const;
const types = ["image", "video", "text", "json"] as const;

export default async function AdminAboutPage() {
  async function createAction(formData: FormData) {
    "use server";

    await upsertAboutContent({
      section: String(formData.get("section")) as (typeof sections)[number],
      contentType: String(
        formData.get("contentType"),
      ) as (typeof types)[number],
      title: String(formData.get("title") ?? "") || null,
      body: String(formData.get("body") ?? "") || null,
      publicUrl: String(formData.get("publicUrl") ?? "") || null,
      storageBucket: String(formData.get("storageBucket") ?? "images") || null,
      storagePath: String(formData.get("storagePath") ?? "") || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      status: String(formData.get("status") ?? "draft") as
        | "draft"
        | "published"
        | "archived",
      metadata: {},
    });

    revalidatePath("/admin/about");
    revalidatePath("/about");
  }

  async function deleteAction(formData: FormData) {
    "use server";

    const id = String(formData.get("id") ?? "");
    if (!id) return;

    await deleteAboutContent(id);
    revalidatePath("/admin/about");
    revalidatePath("/about");
  }

  async function publishAction(formData: FormData) {
    "use server";

    const id = String(formData.get("id") ?? "");
    if (!id) return;

    await upsertAboutContent({
      id,
      section: String(formData.get("section")) as (typeof sections)[number],
      contentType: String(
        formData.get("contentType"),
      ) as (typeof types)[number],
      title: String(formData.get("title") ?? "") || null,
      body: String(formData.get("body") ?? "") || null,
      publicUrl: String(formData.get("publicUrl") ?? "") || null,
      storageBucket: String(formData.get("storageBucket") ?? "images") || null,
      storagePath: String(formData.get("storagePath") ?? "") || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0),
      status: "published",
      metadata: {},
      publishedAt: new Date(),
    });

    revalidatePath("/admin/about");
    revalidatePath("/about");
  }

  const items = await listAboutContentForAdmin();

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-cormorant text-4xl">About Page Control</h2>
        <p className="font-darker mt-2 text-black/60">
          Add and publish About content from the admin dashboard only.
        </p>
      </div>

      <AboutContentForm
        sections={sections}
        types={types}
        createAction={createAction}
      />

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="border border-black/10 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-cormorant text-2xl">
                  {item.title || "Untitled"}
                </h3>
                <p className="font-darker text-xs text-black/60 uppercase">
                  {item.section} • {item.contentType} • {item.status}
                </p>
              </div>
              <div className="flex gap-2">
                <form action={publishAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <input type="hidden" name="section" value={item.section} />
                  <input
                    type="hidden"
                    name="contentType"
                    value={item.contentType}
                  />
                  <input type="hidden" name="title" value={item.title || ""} />
                  <input type="hidden" name="body" value={item.body || ""} />
                  <input
                    type="hidden"
                    name="publicUrl"
                    value={item.publicUrl || ""}
                  />
                  <input
                    type="hidden"
                    name="storageBucket"
                    value={item.storageBucket || "images"}
                  />
                  <input
                    type="hidden"
                    name="storagePath"
                    value={item.storagePath || ""}
                  />
                  <input
                    type="hidden"
                    name="sortOrder"
                    value={String(item.sortOrder || 0)}
                  />
                  <button
                    type="submit"
                    className="font-darker cursor-pointer border border-black/20 px-3 py-2 text-[10px] tracking-[0.14em] uppercase"
                  >
                    Publish
                  </button>
                </form>

                <form action={deleteAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    className="font-darker cursor-pointer border border-[#8B1E2D]/30 px-3 py-2 text-[10px] tracking-[0.14em] text-[#8B1E2D] uppercase"
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
            {item.body ? (
              <p className="font-darker mt-3 text-sm text-black/70">
                {item.body}
              </p>
            ) : null}
            {item.publicUrl ? (
              <p className="font-darker mt-2 text-xs text-black/50">
                {item.publicUrl}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
