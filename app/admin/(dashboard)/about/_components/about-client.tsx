"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AboutContentForm } from "./about-content-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  createAboutContentAction,
  updateAboutContentAction,
  deleteAboutContentAction,
  publishAboutContentAction,
} from "../_actions";
import { useQueryTab } from "@/hooks/use-query-tab";
import { toast } from "sonner";

const sections = [
  "landing_hero",
  "about_hero",
  "etymology",
  "our_origin",
  "our_values",
  "founder",
] as const;

const types = ["image", "video", "text", "json"] as const;

function isValidUrl(string: string) {
  try {
    new URL(string);
    return true;
  } catch {
    return false;
  }
}

function formatSectionLabel(section: string) {
  return section
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function htmlToPlainText(value: string | null) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export type AboutContentItem = {
  id: string;
  section: string;
  contentType: string;
  title: string | null;
  body: string | null;
  publicUrl: string | null;
  storageBucket: string | null;
  storagePath: string | null;
  metadata: unknown;
  sortOrder: number | null;
  status: string | null;
  publishedAt: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
};

interface AboutClientProps {
  initialItems: AboutContentItem[];
}

export function AboutClient({ initialItems }: AboutClientProps) {
  const router = useRouter();
  const [allItems, setAllItems] = useState<AboutContentItem[]>(initialItems);
  const [editingItem, setEditingItem] = useState<AboutContentItem | null>(null);
  const [operationLoading, setOperationLoading] = useState<string | null>(null);
  const { value: activeTab, setValue: setActiveTab } = useQueryTab(
    "tab",
    "landing_hero",
  );

  // Sync state with props when they change (e.g. after router.refresh())
  useEffect(() => {
    setAllItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    setEditingItem(null);
  }, [activeTab]);

  const handleCreate = async (formData: FormData) => {
    setOperationLoading("create");
    try {
      await createAboutContentAction(formData);
      toast.success("Content created successfully");
      setEditingItem(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to create content:", error);
      toast.error("Failed to create content");
    } finally {
      setOperationLoading(null);
    }
  };

  const handleUpdate = async (formData: FormData) => {
    setOperationLoading("update");
    try {
      await updateAboutContentAction(formData);
      toast.success("Content updated successfully");
      setEditingItem(null);
      router.refresh();
    } catch (error) {
      console.error("Failed to update content:", error);
      toast.error("Failed to update content");
    } finally {
      setOperationLoading(null);
    }
  };

  const handleDelete = async (formData: FormData) => {
    if (!confirm("Are you sure you want to delete this content?")) {
      return;
    }

    setOperationLoading("delete");
    try {
      await deleteAboutContentAction(formData);
      toast.success("Content deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete content:", error);
      toast.error("Failed to delete content");
    } finally {
      setOperationLoading(null);
    }
  };

  const handlePublish = async (formData: FormData) => {
    setOperationLoading("publish");
    try {
      await publishAboutContentAction(formData);
      toast.success("Content published successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to publish content:", error);
      toast.error("Failed to publish content");
    } finally {
      setOperationLoading(null);
    }
  };

  return (
    <section className="w-full space-y-12">
      <div className="space-y-4">
        <h2 className="font-cormorant text-5xl">Content Management</h2>
        <p className="font-darker max-w-3xl text-lg text-black/60">
          Manage content sections for multiple pages including landing and about
          content. Upload images, videos, and text content for different
          sections.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid h-12 w-full grid-cols-6 rounded-xl bg-gray-50 p-1">
          {sections.map((section) => (
            <TabsTrigger
              key={section}
              value={section}
              className="rounded-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {formatSectionLabel(section)}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => {
          const items = allItems.filter((item) => {
            if (item.section === section) return true;
            if (section === "etymology" && item.section === "mission") return true;
            if (section === "our_origin" && item.section === "story") return true;
            if (section === "our_values" && item.section === "values") return true;
            return false;
          });
          
          return (
            <TabsContent
              key={section}
              value={section}
              className="mt-8 space-y-8"
            >
              <AboutContentForm
                sections={[section]}
                types={types}
                createAction={handleCreate}
                updateAction={handleUpdate}
                editingItem={
                  editingItem && 
                  (editingItem.section === section || 
                   (section === "etymology" && editingItem.section === "mission") ||
                   (section === "our_origin" && editingItem.section === "story") ||
                   (section === "our_values" && editingItem.section === "values"))
                    ? editingItem 
                    : null
                }
                onCancelEdit={() => setEditingItem(null)}
                isLoading={
                  operationLoading === "create" || operationLoading === "update"
                }
              />

              <div className="space-y-4 pt-6">
                <h3 className="font-cormorant border-b border-black/10 pb-3 text-3xl font-medium">
                  {formatSectionLabel(section)} Content
                </h3>
                {items.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-4">
                      <svg
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                    <p className="mb-2 text-lg font-medium text-black/60">
                      No content uploaded yet
                    </p>
                    <p className="text-sm text-black/50">
                      Upload some content using the form above to get started.
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((item) => (
                    <article
                      key={item.id}
                      className="flex flex-col overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                    >
                      {item.publicUrl && isValidUrl(item.publicUrl) ? (
                        <div className="relative h-48 w-full bg-linear-to-br from-gray-50 to-gray-100">
                          <Image
                            src={item.publicUrl}
                            alt={htmlToPlainText(item.title) || "Content preview"}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3 rounded-full bg-black/80 px-3 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
                            {item.status}
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-48 w-full items-center justify-center bg-black/5 text-xs text-black/40">
                          No Image Available
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="font-cormorant mb-2 line-clamp-1 text-xl font-semibold">
                          {htmlToPlainText(item.title) || "Untitled Content"}
                        </h3>
                        {htmlToPlainText(item.body) ? (
                          <p className="font-darker mb-4 line-clamp-2 text-sm text-black/60">
                            {htmlToPlainText(item.body)}
                          </p>
                        ) : (
                          <p className="font-darker mb-4 text-sm text-black/40 italic">
                            No body provided
                          </p>
                        )}

                        <div className="mt-auto flex gap-3 border-t border-black/10 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingItem(item)}
                            disabled={!!operationLoading}
                            className="font-darker flex-1 rounded-sm border-black/30 text-[11px] tracking-[0.14em] uppercase hover:bg-black/5"
                          >
                            Edit
                          </Button>

                          {item.status !== "published" && (
                            <form action={handlePublish} className="flex-1">
                              <input type="hidden" name="id" value={item.id} />
                              <Button
                                type="submit"
                                size="sm"
                                disabled={operationLoading === "publish"}
                                className="font-darker w-full rounded-sm bg-green-600 text-[11px] tracking-[0.14em] text-white uppercase hover:bg-green-700"
                              >
                                {operationLoading === "publish"
                                  ? "Publishing..."
                                  : "Make Public"}
                              </Button>
                            </form>
                          )}

                          {item.status === "published" && (
                            <div className="flex flex-1 items-center justify-center">
                              <span className="font-darker text-[10px] font-medium tracking-widest text-green-600 uppercase">
                                ✓ Live
                              </span>
                            </div>
                          )}

                          <form action={handleDelete} className="w-auto">
                            <input type="hidden" name="id" value={item.id} />
                            <Button
                              type="submit"
                              variant="outline"
                              size="sm"
                              disabled={operationLoading === "delete"}
                              className="font-darker rounded-sm border-red-500/30 text-[11px] tracking-[0.14em] text-red-600 uppercase hover:bg-red-50"
                            >
                              {operationLoading === "delete"
                                ? "Deleting..."
                                : "Delete"}
                            </Button>
                          </form>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
