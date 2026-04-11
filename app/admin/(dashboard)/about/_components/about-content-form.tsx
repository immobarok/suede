"use client";

import { useMemo, useRef, useState } from "react";

type AboutContentFormProps = {
  sections: readonly string[];
  types: readonly string[];
  createAction: (formData: FormData) => Promise<void>;
};

type UploadState = {
  publicUrl: string;
  path: string;
  bucket: string;
};

export function AboutContentForm({
  sections,
  types,
  createAction,
}: AboutContentFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState<UploadState | null>(null);

  const previewUrl = useMemo(() => uploadData?.publicUrl ?? "", [uploadData]);

  async function uploadFile(file: File) {
    setUploadError(null);
    setIsUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("bucket", "images");
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
        throw new Error(text || "Upload failed");
      }

      const data = (await res.json()) as UploadState;
      setUploadData({
        publicUrl: data.publicUrl,
        path: data.path,
        bucket: data.bucket,
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to upload image";
      setUploadError(message);
    } finally {
      setIsUploading(false);
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
      action={createAction}
      className="grid gap-4 border border-black/10 bg-white p-6 md:grid-cols-2"
    >
      <label className="font-darker text-xs uppercase">
        Section
        <select
          name="section"
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </select>
      </label>

      <label className="font-darker text-xs uppercase">
        Type
        <select
          name="contentType"
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        >
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>

      <label className="font-darker text-xs uppercase md:col-span-2">
        Title
        <input
          name="title"
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase md:col-span-2">
        Body
        <textarea
          name="body"
          rows={4}
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <div className="md:col-span-2">
        <p className="font-darker text-xs uppercase">Drag and Drop Image</p>
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={`mt-2 flex cursor-pointer flex-col items-center justify-center border p-6 text-center transition ${
            isDragOver ? "border-black bg-black/5" : "border-black/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFilePicked}
            className="hidden"
          />
          <span className="font-darker text-xs text-black/70 uppercase">
            {isUploading
              ? "Uploading..."
              : "Drop image here or click to choose"}
          </span>
          <span className="font-darker mt-2 text-[11px] text-black/50">
            Uploaded image auto-fills Public URL and Storage Path.
          </span>
        </label>

        {previewUrl ? (
          <div className="mt-3">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="h-40 w-full object-cover"
            />
          </div>
        ) : null}

        {uploadError ? (
          <p className="font-darker mt-2 text-xs text-[#8B1E2D]">
            {uploadError}
          </p>
        ) : null}
      </div>

      <label className="font-darker text-xs uppercase md:col-span-2">
        Public URL (optional)
        <input
          name="publicUrl"
          value={uploadData?.publicUrl ?? undefined}
          onChange={(event) =>
            setUploadData((prev) => ({
              publicUrl: event.target.value,
              path: prev?.path ?? "",
              bucket: prev?.bucket ?? "images",
            }))
          }
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase">
        Storage Bucket
        <input
          name="storageBucket"
          value={uploadData?.bucket ?? "images"}
          onChange={(event) =>
            setUploadData((prev) => ({
              publicUrl: prev?.publicUrl ?? "",
              path: prev?.path ?? "",
              bucket: event.target.value,
            }))
          }
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase">
        Storage Path
        <input
          name="storagePath"
          value={uploadData?.path ?? ""}
          onChange={(event) =>
            setUploadData((prev) => ({
              publicUrl: prev?.publicUrl ?? "",
              path: event.target.value,
              bucket: prev?.bucket ?? "images",
            }))
          }
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase">
        Sort Order
        <input
          name="sortOrder"
          type="number"
          defaultValue={0}
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase">
        Status
        <select
          name="status"
          defaultValue="draft"
          className="mt-2 w-full border border-black/20 p-2 text-sm"
        >
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="archived">archived</option>
        </select>
      </label>

      <button
        type="submit"
        className="font-darker cursor-pointer bg-black px-4 py-3 text-xs tracking-[0.15em] text-white uppercase md:col-span-2"
      >
        Save About Content
      </button>
    </form>
  );
}
