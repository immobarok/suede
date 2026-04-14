"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { toast } from "sonner";

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

export function AboutContentForm({
  sections,
  types,
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

  const isEditing = !!editingItem;

  // Form state for controlled inputs
  const [headerSubtitle, setHeaderSubtitle] = useState("");
  const [headerTitle, setHeaderTitle] = useState("");
  const [valuesData, setValuesData] = useState([
    { title: "", icon: "ShieldCheck", description: "" },
    { title: "", icon: "Heart", description: "" },
    { title: "", icon: "Leaf", description: "" },
    { title: "", icon: "Sparkles", description: "" },
  ]);

  const previewUrl = useMemo(() => uploadData?.publicUrl ?? editingItem?.publicUrl ?? "", [uploadData, editingItem]);

  useEffect(() => {
    if (editingItem) {
      // Set selected section to trigger conditional rendering
      setSelectedSection(editingItem.section);

      // Populate form state for values section
      if (editingItem.section === "values" && editingItem.metadata) {
        setHeaderSubtitle(
          editingItem.metadata.header?.subtitle || "What We Stand For",
        );
        setHeaderTitle(editingItem.metadata.header?.title || "Our Values");

        if (
          editingItem.metadata.values &&
          Array.isArray(editingItem.metadata.values)
        ) {
          const defaultTitles = [
            "Trust First",
            "Radical Inclusivity",
            "Wear More, Return Less",
            "Quiet Luxury, Loud Honesty",
          ];
          const defaultIcons = ["ShieldCheck", "Heart", "Leaf", "Sparkles"];
          const defaultDescriptions = [
            "Every review is matched to a real body profile. No brand sponsorships. No paid placements. Only honest accounts of how clothes actually wear.",
            "Fashion has spent decades designing for a narrow sliver of bodies. We built SUEDE so every size, shape, and proportion can find clothes that feel made for them.",
            "40% of online fashion purchases are returned. Fit is the top reason. When shoppers buy right the first time, the environmental cost of fashion drops significantly.",
            "We curate for quality and longevity. We celebrate the slow wardrobe. And we pair that with the most transparent fit information in the industry.",
          ];

          const newValuesData = editingItem.metadata.values.map(
            (value: any, index: number) => ({
              title: value.title || defaultTitles[index] || "",
              icon: value.icon || defaultIcons[index] || "ShieldCheck",
              description:
                value.description || defaultDescriptions[index] || "",
            }),
          );

          setValuesData(newValuesData);
        }
      }
    } else {
      // Reset to defaults when not editing
      setHeaderSubtitle("What We Stand For");
      setHeaderTitle("Our Values");
      setValuesData([
        {
          title: "Trust First",
          icon: "ShieldCheck",
          description:
            "Every review is matched to a real body profile. No brand sponsorships. No paid placements. Only honest accounts of how clothes actually wear.",
        },
        {
          title: "Radical Inclusivity",
          icon: "Heart",
          description:
            "Fashion has spent decades designing for a narrow sliver of bodies. We built SUEDE so every size, shape, and proportion can find clothes that feel made for them.",
        },
        {
          title: "Wear More, Return Less",
          icon: "Leaf",
          description:
            "40% of online fashion purchases are returned. Fit is the top reason. When shoppers buy right the first time, the environmental cost of fashion drops significantly.",
        },
        {
          title: "Quiet Luxury, Loud Honesty",
          icon: "Sparkles",
          description:
            "We curate for quality and longevity. We celebrate the slow wardrobe. And we pair that with the most transparent fit information in the industry.",
        },
      ]);
    }
  }, [editingItem]);

  async function uploadFile(file: File) {
    setUploadError(null);
    setIsUploading(true);

    // Try different bucket names in case "images" doesn't exist
    const bucketsToTry = [
      "images",
      "storage",
      process.env.NEXT_PUBLIC_SUPABASE_URL?.split("//")[1]?.split(".")[0] ||
        "default",
    ];

    for (const bucketName of bucketsToTry) {
      try {
        console.log(`Trying to upload to bucket: ${bucketName}`);

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

        console.log(`Upload response status for ${bucketName}:`, res.status);

        if (!res.ok) {
          const text = await res.text();
          console.error(`Upload failed for ${bucketName} with response:`, text);

          // If this is the last bucket to try, throw the error
          if (bucketName === bucketsToTry[bucketsToTry.length - 1]) {
            throw new Error(text || `Upload failed with status ${res.status}`);
          }
          // Otherwise, continue to next bucket
          continue;
        }

        const data = (await res.json()) as UploadState;
        console.log("Upload successful:", data);

        setUploadData({
          publicUrl: data.publicUrl,
          path: data.path,
          bucket: data.bucket,
        });

        toast.success("Image uploaded successfully");
        setIsUploading(false);
        return; // Success, exit the function
      } catch (error) {
        console.error(`Upload error for ${bucketName}:`, error);

        // If this is the last bucket, show error
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
              {section.replace("_", " ")}
            </option>
          ))}
        </select>
      </label>

      <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
        Title
        <input
          name="title"
          placeholder="e.g. Our Mission"
          defaultValue={editingItem?.title || ""}
          className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
        />
      </label>

      <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
        Body/Content
        <textarea
          name="body"
          rows={4}
          placeholder="Enter the content text here"
          defaultValue={editingItem?.body || ""}
          className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
        />
      </label>

      {selectedSection === "mission" && (
        <>
          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
            Problem Percentage
            <input
              name="problemPercentage"
              type="number"
              placeholder="70"
              defaultValue={editingItem?.metadata?.problemPercentage || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
            Problem Description
            <textarea
              name="problemDescription"
              rows={3}
              placeholder="Size charts lie. Model photos mislead..."
              defaultValue={editingItem?.metadata?.problemDescription || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
            Solution Percentage
            <input
              name="solutionPercentage"
              type="number"
              placeholder="92"
              defaultValue={editingItem?.metadata?.solutionPercentage || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
            Solution Description
            <textarea
              name="solutionDescription"
              rows={4}
              placeholder="SUEDE compares your measurements with real reviewers..."
              defaultValue={editingItem?.metadata?.solutionDescription || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>

          <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
            Match Score Description
            <input
              name="matchScoreDescription"
              placeholder="Reviewer has nearly identical body measurements"
              defaultValue={editingItem?.metadata?.matchScoreDescription || ""}
              className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
            />
          </label>
        </>
      )}

      {selectedSection === "values" && (
        <div className="space-y-8 md:col-span-2">
          {/* Header Section */}
          <div className="space-y-4 rounded-md border border-black/10 bg-gray-50/50 p-6">
            <h3 className="font-cormorant text-xl font-medium text-black">
              Section Header
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
                Header Subtitle
                <input
                  name="headerSubtitle"
                  placeholder="What We Stand For"
                  value={headerSubtitle}
                  onChange={(e) => setHeaderSubtitle(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                />
              </label>
              <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
                Header Title
                <input
                  name="headerTitle"
                  placeholder="Our Values"
                  value={headerTitle}
                  onChange={(e) => setHeaderTitle(e.target.value)}
                  className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                />
              </label>
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-6">
            <h3 className="font-cormorant text-xl font-medium text-black">
              Core Values (4 Features)
            </h3>

            {[1, 2, 3, 4].map((index: number) => (
              <div
                key={index}
                className="rounded-md border border-black/10 bg-white p-6"
              >
                <h4 className="font-darker mb-4 text-sm font-semibold text-black/70">
                  Value {index}
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
                    Title
                    <input
                      name={`value${index}Title`}
                      placeholder={`Value ${index} Title`}
                      defaultValue={
                        index === 1
                          ? "Trust First"
                          : index === 2
                            ? "Radical Inclusivity"
                            : index === 3
                              ? "Wear More, Return Less"
                              : index === 4
                                ? "Quiet Luxury, Loud Honesty"
                                : ""
                      }
                      className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                    />
                  </label>
                  <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase">
                    Icon
                    <select
                      name={`value${index}Icon`}
                      value={valuesData[index - 1]?.icon || "ShieldCheck"}
                      onChange={(e) => {
                        const newData = [...valuesData];
                        newData[index - 1] = {
                          ...newData[index - 1],
                          icon: e.target.value,
                        };
                        setValuesData(newData);
                      }}
                      className="mt-2 w-full cursor-pointer rounded-sm border border-black/20 p-2.5 text-sm outline-none focus:border-black"
                    >
                      <option value="ShieldCheck">Trust/Shield</option>
                      <option value="Heart">Love/Heart</option>
                      <option value="Leaf">Sustainability/Leaf</option>
                      <option value="Sparkles">Quality/Sparkles</option>
                    </select>
                  </label>
                  <label className="font-darker text-xs font-semibold tracking-wider text-black/70 uppercase md:col-span-2">
                    Description
                    <textarea
                      name={`value${index}Description`}
                      rows={3}
                      placeholder={`Description for value ${index}`}
                      value={valuesData[index - 1]?.description || ""}
                      onChange={(e) => {
                        const newData = [...valuesData];
                        newData[index - 1] = {
                          ...newData[index - 1],
                          description: e.target.value,
                        };
                        setValuesData(newData);
                      }}
                      className="mt-2 w-full rounded-sm border border-black/20 p-2.5 text-sm transition-colors outline-none focus:border-black"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
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

      <input type="hidden" name="storagePath" value={uploadData?.path ?? editingItem?.storagePath ?? ""} />

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
        <button
          type="submit"
          disabled={isLoading || isUploading || !!uploadError}
          className="font-darker flex-1 cursor-pointer rounded-sm bg-black px-4 py-3.5 text-sm tracking-[0.15em] text-white uppercase shadow-sm transition-colors hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading
            ? "Processing..."
            : isUploading
              ? "Uploading..."
              : isEditing
                ? "Update Content"
                : "Upload Content"}
        </button>
        {isEditing && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            disabled={isLoading}
            className="font-darker cursor-pointer rounded-sm border border-black/30 px-4 py-3.5 text-sm tracking-[0.15em] text-black uppercase transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
