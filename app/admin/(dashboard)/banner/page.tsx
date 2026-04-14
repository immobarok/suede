import { revalidatePath } from "next/cache";
import Image from "next/image";
import {
  deleteAboutContent,
  listAboutContentForAdmin,
  upsertAboutContent,
} from "@/app/actions/about-content";
import { BannerContentForm } from "./_components/banner-content-form";

const sections = ["hero"] as const;
const types = ["image"] as const;

export default async function AdminBannerPage() {
  async function createAction(formData: FormData) {
    "use server";

    await upsertAboutContent({
      section: "hero",
      contentType: "image",
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

    revalidatePath("/admin/banner");
    revalidatePath("/");
  }

  async function deleteAction(formData: FormData) {
    "use server";

    const id = String(formData.get("id") ?? "");
    if (!id) return;

    await deleteAboutContent(id);
    revalidatePath("/admin/banner");
    revalidatePath("/");
  }

  async function publishAction(formData: FormData) {
    "use server";

    const id = String(formData.get("id") ?? "");
    if (!id) return;

    await upsertAboutContent({
      id,
      section: "hero",
      contentType: "image",
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

    revalidatePath("/admin/banner");
    revalidatePath("/");
  }

  const items = await listAboutContentForAdmin("hero");

  return (
    <section className="space-y-8 max-w-5xl">
      <div>
        <h2 className="font-cormorant text-4xl">Banner Control</h2>
        <p className="font-darker mt-2 text-black/60">
          Upload and manage the main hero banner for the landing page.
        </p>
      </div>

      <BannerContentForm
        sections={sections}
        types={types}
        createAction={createAction}
      />

      <div className="space-y-4 pt-6">
        <h3 className="font-cormorant text-2xl border-b pb-2">Uploaded Banners</h3>
        {items.length === 0 && (
          <p className="text-black/50 text-sm">No banners uploaded yet. Upload one above.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="border border-black/10 bg-white shadow-sm rounded-md overflow-hidden flex flex-col"
            >
              {item.publicUrl ? (
                <div className="relative w-full h-48 bg-black/5">
                  <Image
                    src={item.publicUrl}
                    alt={item.title || "Banner preview"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider backdrop-blur-sm">
                    {item.status}
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-black/5 flex items-center justify-center text-xs text-black/40">
                  No Image Available
                </div>
              )}
              
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-cormorant text-xl font-medium mb-1 line-clamp-1">
                  {item.title || "Untitled Banner"}
                </h3>
                {item.body ? (
                  <p className="font-darker text-sm text-black/60 mb-4 line-clamp-2">
                    {item.body}
                  </p>
                ) : (
                  <p className="font-darker text-sm text-black/40 mb-4 italic">
                    No subtext provided
                  </p>
                )}
                
                <div className="mt-auto flex gap-2 pt-2 border-t border-black/5">
                  {item.status !== "published" && (
                    <form action={publishAction} className="flex-1">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="title" value={item.title || ""} />
                      <input type="hidden" name="body" value={item.body || ""} />
                      <input type="hidden" name="publicUrl" value={item.publicUrl || ""} />
                      <input type="hidden" name="storageBucket" value={item.storageBucket || "images"} />
                      <input type="hidden" name="storagePath" value={item.storagePath || ""} />
                      <input type="hidden" name="sortOrder" value={String(item.sortOrder || 0)} />
                      <button
                        type="submit"
                        className="w-full font-darker cursor-pointer bg-black text-white px-3 py-2 text-[11px] tracking-[0.14em] uppercase hover:bg-black/80 transition-colors"
                      >
                        Publish Now
                      </button>
                    </form>
                  )}

                  <form action={deleteAction} className={item.status === "published" ? "w-full" : "w-auto"}>
                    <input type="hidden" name="id" value={item.id} />
                    <button
                      type="submit"
                      className={`font-darker cursor-pointer border px-3 py-2 text-[11px] tracking-[0.14em] uppercase transition-colors ${
                        item.status === "published" 
                        ? "w-full border-[#8B1E2D]/20 text-[#8B1E2D] hover:bg-[#8B1E2D]/5" 
                        : "border-[#8B1E2D]/30 text-[#8B1E2D] hover:bg-[#8B1E2D]/5"
                      }`}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
