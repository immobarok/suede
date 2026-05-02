"use client";

import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface UploadAreaProps {
  label: string;
  hint?: string;
  accept?: string;
  onFileSelect?: (file: File) => void;
}

export function UploadArea({
  label,
  hint,
  accept = "image/*,.pdf",
  onFileSelect,
}: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && onFileSelect) onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && onFileSelect) onFileSelect(file);
    },
    [onFileSelect]
  );

  return (
    <div className="space-y-3">
      <label className="text-xs font-medium uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center rounded-none border border-dashed px-6 py-10 transition-colors ${
          isDragging
            ? "border-gray-400 bg-[#F3EDE6]"
            : "border-gray-300 bg-[#F8F5F1]"
        }`}
      >
        <Upload className="mb-3 h-5 w-5 text-gray-400" strokeWidth={1.5} />
        <p className="text-sm text-gray-600">
          <span className="cursor-pointer font-medium underline underline-offset-2 hover:text-gray-900">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
          id={`upload-${label}`}
        />
        <label
          htmlFor={`upload-${label}`}
          className="absolute inset-0 cursor-pointer"
        />
      </div>
    </div>
  );
}