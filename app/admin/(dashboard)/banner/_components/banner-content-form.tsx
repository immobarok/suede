"use client";

import { useMemo, useRef, useState } from "react";

type BannerContentFormProps = {
  sections: readonly string[];
  types: readonly string[];
  createAction: (formData: FormData) => Promise<void>;
};

type UploadState = {
  publicUrl: string;
  path: string;
  bucket: string;
};

export function BannerContentForm({
  sections,
  types,
  createAction,
}: BannerContentFormProps) {
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
      body.append("folder", "banners");
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
      className="grid gap-4 border border-black/10 bg-white p-6 md:grid-cols-2 shadow-sm rounded-md"
    >
      <input type="hidden" name="section" value="hero" />
      <input type="hidden" name="contentType" value="image" />

      <label className="font-darker text-xs uppercase md:col-span-2 text-black/70 font-semibold tracking-wider">
        Banner Title
        <input
          name="title"
          placeholder="e.g. The Trust Layer For Fashion"
          className="mt-2 w-full border border-black/20 p-2.5 text-sm rounded-sm focus:border-black outline-none transition-colors"
        />
      </label>

      <label className="font-darker text-xs uppercase md:col-span-2 text-black/70 font-semibold tracking-wider">
        Subtext (Optional)
        <textarea
          name="body"
          rows={3}
          placeholder="e.g. Start your shopping journey with confidence"
          className="mt-2 w-full border border-black/20 p-2.5 text-sm rounded-sm focus:border-black outline-none transition-colors"
        />
      </label>

      <div className="md:col-span-2">
        <p className="font-darker text-xs uppercase text-black/70 font-semibold tracking-wider">Banner Image</p>
        <label
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={onDrop}
          className={`mt-2 flex cursor-pointer flex-col items-center justify-center border-2 border-dashed p-10 text-center transition-all duration-300 rounded-md ${
            isDragOver ? "border-black bg-black/5" : "border-black/20 hover:border-black/40 hover:bg-black/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFilePicked}
            className="hidden"
          />
          <span className="font-medium text-sm text-black/80">
            {isUploading
              ? "Uploading..."
              : "Drop your banner image here, or click to browse"}
          </span>
          <span className="font-darker mt-3 text-xs text-black/50">
            High resolution recommended (1920x1080)
          </span>
        </label>

        {previewUrl ? (
          <div className="mt-4 rounded-md overflow-hidden border border-black/10">
            <img
              src={previewUrl}
              alt="Uploaded preview"
              className="h-[300px] w-full object-cover"
            />
          </div>
        ) : null}

        {uploadError ? (
          <p className="font-darker mt-3 text-xs text-[#8B1E2D] bg-[#8B1E2D]/10 p-2 rounded-sm">
            {uploadError}
          </p>
        ) : null}
      </div>

      <input
        type="hidden"
        name="publicUrl"
        value={uploadData?.publicUrl ?? ""}
      />
      
      <input
        type="hidden"
        name="storageBucket"
        value={uploadData?.bucket ?? "images"}
      />
      
      <input
        type="hidden"
        name="storagePath"
        value={uploadData?.path ?? ""}
      />

      <label className="font-darker text-xs uppercase text-black/70 font-semibold tracking-wider hidden">
        Sort Order
        <input
          name="sortOrder"
          type="number"
          defaultValue={0}
          className="mt-2 w-full border border-black/20 p-2.5 text-sm rounded-sm"
        />
      </label>

      <label className="font-darker text-xs uppercase text-black/70 font-semibold tracking-wider">
        Status
        <select
          name="status"
          defaultValue="published"
          className="mt-2 w-full border border-black/20 p-2.5 text-sm rounded-sm focus:border-black outline-none cursor-pointer"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
      </label>

      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          className="font-darker w-full cursor-pointer bg-black px-4 py-3.5 text-sm tracking-[0.15em] text-white uppercase hover:bg-black/80 transition-colors rounded-sm shadow-sm"
        >
          Upload Banner
        </button>
      </div>
    </form>
  );
}
