"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type AboutContentFormProps = {
  sections: readonly string[];
  types: readonly string[];
  createAction: (formData: FormData) => Promise<void>;
  updateAction?: (formData: FormData) => Promise<void>;
  editingItem?: any;
  onCancelEdit?: () => void;
  isLoading?: boolean;
};

type UploadState = {
  publicUrl: string;
  path: string;
  bucket: string;
};

type FounderMetadata = {
  label?: string;
  name?: string;
  role?: string;
  tagline?: string;
  intro?: string;
  paragraphs?: string[];
};

type ValuesMetadata = {
  label?: string;
  stats?: Array<{
    value?: string;
    description?: string;
  }>;
};

const defaultStats = [
  {
    value: "25%",
    description: "chance of online apparel orders being returned to the seller",
  },
  {
    value: "$21 - $46",
    description: "lost per returned product",
  },
  {
    value: "38%",
    description:
      "of consumers return clothing they purchased online due to poor fit",
  },
];

function formatSectionLabel(section: string) {
  return section
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AboutContentForm({
  sections,
  types: _types,
  createAction,
  updateAction,
  editingItem,
  onCancelEdit,
  isLoading = false,
}: AboutContentFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState<UploadState | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>(
    sections[0] || "",
  );
  const [titleHtml, setTitleHtml] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [founderParagraphsHtml, setFounderParagraphsHtml] = useState("");
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "clean"],
      ],
    }),
    [],
  );

  const isEditing = !!editingItem;

  useEffect(() => {
    if (editingItem?.section) {
      setSelectedSection(editingItem.section);
    }
    setTitleHtml(editingItem?.title || "");
    setBodyHtml(editingItem?.body || "");
    
    // Initialize founder paragraphs
    const fMeta = (editingItem?.metadata || {}) as FounderMetadata;
    const fDefault = fMeta.paragraphs?.join("\n\n") || editingItem?.body || "";
    setFounderParagraphsHtml(fDefault);
  }, [editingItem]);

  const previewUrl = useMemo(
    () => uploadData?.publicUrl ?? editingItem?.publicUrl ?? "",
    [uploadData, editingItem],
  );

  const founderMeta = (editingItem?.metadata || {}) as FounderMetadata;
  const valuesMeta = (editingItem?.metadata || {}) as ValuesMetadata;

  const founderParagraphsDefault =
    founderMeta.paragraphs?.join("\n\n") || editingItem?.body || "";

  const statsForForm =
    valuesMeta.stats && valuesMeta.stats.length
      ? valuesMeta.stats
      : defaultStats;

  async function uploadFile(file: File) {
    setUploadError(null);
    setIsUploading(true);

    const bucketsToTry = [
      "images",
      "storage",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]?.split(".")[0] ||
        "default",
    ];

    for (const bucketName of bucketsToTry) {
      try {
        const body = new FormData();
        body.append("file", file);
        body.append("bucket", bucketName);
        body.append("folder", "about");
        body.append("maxWidth", "1920");
        body.append("quality", "90");
        body.append("format", "webp");

        const res = await fetch("/api/uploads/image", {
          method: "POST",
          body,
        });

        if (!res.ok) {
          const text = await res.text();
          if (bucketName === bucketsToTry[bucketsToTry.length - 1]) {
            throw new Error(text || `Upload failed with status ${res.status}`);
          }
          continue;
        }

        const data = (await res.json()) as UploadState;
        setUploadData({
          publicUrl: data.publicUrl,
          path: data.path,
          bucket: data.bucket,
        });
        toast.success("Image uploaded successfully");
        setIsUploading(false);
        return;
      } catch (error) {
        if (bucketName === bucketsToTry[bucketsToTry.length - 1]) {
          const message =
            error instanceof Error ? error.message : "Failed to upload image";
          setUploadError(message);
          toast.error(message);
          setIsUploading(false);
        }
      }
    }
  }

  function onDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    void uploadFile(file);
  }

  function onFilePicked(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    void uploadFile(file);
  }

  return (
    <form
      key={editingItem?.id || "new-form"}
      action={isEditing && updateAction ? updateAction : createAction}
      className="grid gap-4 rounded-md border border-black/10 bg-white p-6 shadow-sm md:grid-cols-2"
    >
      {isEditing && <input type="hidden" name="id" value={editingItem.id} />}

      <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
        Section
        <select
          name="section"
          value={selectedSection}
          className="mt-2 w-full cursor-pointer rounded-sm border border-black/20 p-2.5 text-sm outline-none focus:border-black"
          required
          onChange={(e) => setSelectedSection(e.target.value)}
        >
          <option value="">Select a section</option>
          {sections.map((section) => (
            <option key={section} value={section}>
              {formatSectionLabel(section)}
            </option>
          ))}
        </select>
      </label>

      {selectedSection !== "founder" &&
        selectedSection !== "our_values" &&
        selectedSection !== "values" && (
          <>
            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
              Title
              <div className="mt-2 overflow-hidden rounded-sm border border-black/20 bg-white [&_.ql-container]:border-0 [&_.ql-editor]:min-h-24 [&_.ql-editor]:px-3 [&_.ql-editor]:py-2.5 [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0">
                <ReactQuill
                  theme="snow"
                  value={titleHtml}
                  modules={quillModules}
                  onChange={(value) => {
                    setTitleHtml(value);
                  }}
                />
              </div>
              <input type="hidden" name="title" value={titleHtml} />
            </label>

            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
              Body/Content
              <div className="mt-2 overflow-hidden rounded-sm border border-black/20 bg-white [&_.ql-container]:border-0 [&_.ql-editor]:min-h-40 [&_.ql-editor]:px-3 [&_.ql-editor]:py-2.5 [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0">
                <ReactQuill
                  theme="snow"
                  value={bodyHtml}
                  modules={quillModules}
                  onChange={(value) => {
                    setBodyHtml(value);
                  }}
                />
              </div>
              <input type="hidden" name="body" value={bodyHtml} />
            </label>
          </>
        )}

      {(selectedSection === "values" || selectedSection === "our_values") && (
        <div className="space-y-6 md:col-span-2">
          <h3 className="font-cormorant text-xl font-medium text-black">
            Values Section Content
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
              Label
              <input
                name="valuesLabel"
                placeholder="III - OUR VALUES"
                defaultValue={valuesMeta.label || "III - OUR VALUES"}
                className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
              />
            </label>
          </div>

          <h3 className="font-cormorant text-xl font-medium text-black pt-4">
            Stats (3 Columns)
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-md border border-black/10 bg-gray-50/50 p-5"
              >
                <h4 className="font-darker mb-3 text-xs tracking-[0.1em] text-black/60 uppercase text-center">
                  Stat {index}
                </h4>
                <div className="space-y-4">
                  <label className="font-darker block text-xs font-semibold tracking-wider text-black/70 uppercase">
                    Value
                    <input
                      name={`stat${index}Value`}
                      placeholder={
                        index === 2 ? "$21 - $46" : index === 1 ? "25%" : "38%"
                      }
                      defaultValue={statsForForm[index - 1]?.value || ""}
                      className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                    />
                  </label>
                  <label className="font-darker block text-xs font-semibold tracking-wider text-black/70 uppercase">
                    Description
                    <textarea
                      name={`stat${index}Description`}
                      rows={3}
                      placeholder="Stat description"
                      defaultValue={statsForForm[index - 1]?.description || ""}
                      className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSection === "founder" && (
        <div className="space-y-6 md:col-span-2">
          <h3 className="font-cormorant text-xl font-medium text-black">
            Founder Content
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
              Label
              <input
                name="founderLabel"
                placeholder="III - OUR FOUNDER"
                defaultValue={founderMeta.label || "III - OUR FOUNDER"}
                className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
              />
            </label>

            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
              Name
              <input
                name="founderName"
                placeholder="Kikiola"
                defaultValue={founderMeta.name || ""}
                className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
              />
            </label>

            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
              Role
              <input
                name="founderRole"
                placeholder="Founder & CEO"
                defaultValue={founderMeta.role || ""}
                className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
              />
            </label>

            <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
              Tagline
              <input
                name="founderTagline"
                placeholder="I built the platform I wanted to shop on."
                defaultValue={founderMeta.tagline || ""}
                className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
              />
            </label>
          </div>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
            Intro (Optional)
            <textarea
              name="founderIntro"
              rows={3}
              placeholder="Short intro paragraph"
              defaultValue={founderMeta.intro || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
            Founder Paragraphs
            <div className="mt-2 overflow-hidden rounded-sm border border-black/20 bg-white [&_.ql-container]:border-0 [&_.ql-editor]:min-h-40 [&_.ql-editor]:px-3 [&_.ql-editor]:py-2.5 [&_.ql-toolbar]:border-x-0 [&_.ql-toolbar]:border-t-0">
              <ReactQuill
                theme="snow"
                value={founderParagraphsHtml}
                modules={quillModules}
                onChange={(value) => {
                  setFounderParagraphsHtml(value);
                }}
              />
            </div>
            <input
              type="hidden"
              name="founderParagraphs"
              value={founderParagraphsHtml}
            />
          </label>
        </div>
      )}

      <div className="md:col-span-2">
        <p className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
          Image (Optional)
        </p>
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={`mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-10 text-center transition-all duration-300 ${
            isDragOver
              ? "border-black bg-black/5"
              : "border-black/20 hover:border-black/40 hover:bg-black/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFilePicked}
            className="hidden"
          />
          <span className="text-sm font-medium text-black/80">
            {isUploading
              ? "Uploading..."
              : "Drop your image here, or click to browse"}
          </span>
          <span className="font-darker mt-3 text-xs text-black/50">
            High resolution recommended (1920x1080)
          </span>
        </label>

        {previewUrl ? (
          <div className="mt-4 overflow-hidden rounded-md border border-black/10">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="h-[300px] w-full object-cover"
            />
          </div>
        ) : null}

        {uploadError ? (
          <p className="font-darker mt-3 rounded-sm bg-[#8B1E2D]/10 p-2 text-xs text-[#8B1E2D]">
            {uploadError}
          </p>
        ) : null}
      </div>

      <input
        type="hidden"
        name="publicUrl"
        value={uploadData?.publicUrl ?? editingItem?.publicUrl ?? ""}
      />

      <input
        type="hidden"
        name="storageBucket"
        value={uploadData?.bucket ?? editingItem?.storageBucket ?? "images"}
      />

      <input
        type="hidden"
        name="storagePath"
        value={uploadData?.path ?? editingItem?.storagePath ?? ""}
      />

      <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
        Sort Order
        <input
          name="sortOrder"
          type="number"
          defaultValue={editingItem?.sortOrder ?? 0}
          className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm"
        />
      </label>

      <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
        Status
        <select
          name="status"
          defaultValue={editingItem?.status || "published"}
          className="mt-2 w-full cursor-pointer rounded-sm border border-black/20 p-2.5 text-sm outline-none focus:border-black"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </label>

      <div className="flex gap-3 pt-4 md:col-span-2">
        <Button
          type="submit"
          disabled={isLoading || isUploading || !!uploadError}
          className="font-darker h-auto flex-1 cursor-pointer rounded-sm bg-black px-4 py-3.5 text-sm tracking-[0.15em] text-white uppercase shadow-sm transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Processing..."
            : isUploading
              ? "Uploading..."
              : isEditing
                ? "Update Content"
                : "Upload Content"}
        </Button>
        {isEditing && onCancelEdit && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancelEdit}
            disabled={isLoading}
            className="font-darker h-auto cursor-pointer rounded-sm border border-black/30 px-4 py-3.5 text-sm tracking-[0.15em] text-black uppercase transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
