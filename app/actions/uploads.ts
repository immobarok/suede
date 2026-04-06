"use server";

import sharp from "sharp";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";

const DEFAULT_MAX_WIDTH = 1600;
const DEFAULT_QUALITY = 80;
const DEFAULT_FORMAT = "webp";

export async function uploadImage(
  file: File,
  options?: {
    bucket?: string;
    folder?: string;
    maxWidth?: number;
    quality?: number;
    format?: string;
  },
) {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const bucket = options?.bucket ?? "images";
  const folder = options?.folder ?? "uploads";
  const maxWidth = options?.maxWidth ?? DEFAULT_MAX_WIDTH;
  const quality = options?.quality ?? DEFAULT_QUALITY;
  const format = (options?.format ?? DEFAULT_FORMAT).toLowerCase();

  const buffer = Buffer.from(await file.arrayBuffer());
  const image = sharp(buffer).rotate();

  const output =
    format === "png"
      ? image
          .resize({ width: maxWidth, withoutEnlargement: true })
          .png({ quality })
      : format === "jpeg" || format === "jpg"
        ? image
            .resize({ width: maxWidth, withoutEnlargement: true })
            .jpeg({ quality, mozjpeg: true })
        : image
            .resize({ width: maxWidth, withoutEnlargement: true })
            .webp({ quality });

  const processed = await output.toBuffer();
  const extension = format === "jpg" ? "jpeg" : format;
  const filename = `${crypto.randomUUID()}.${extension}`;
  const path = `${folder}/${filename}`;

  const admin = createAdminClient();
  const { error: uploadError } = await admin.storage
    .from(bucket)
    .upload(path, processed, {
      contentType: `image/${extension}`,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = admin.storage.from(bucket).getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
    bucket,
    width: maxWidth,
    format: extension,
  };
}

export async function createMuxUpload() {
  const supabase = await createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const tokenId = process.env.MUX_TOKEN_ID;
  const tokenSecret = process.env.MUX_TOKEN_SECRET;
  const corsOrigin = process.env.NEXT_PUBLIC_SITE_URL;

  if (!tokenId || !tokenSecret || !corsOrigin) {
    throw new Error("Mux env vars missing");
  }

  const { default: Mux } = await import("@mux/mux-node");
  const mux = new Mux({ tokenId, tokenSecret });

  const upload = await mux.video.uploads.create({
    cors_origin: corsOrigin,
    new_asset_settings: {
      playback_policy: ["public"],
      mp4_support: "standard",
    },
  });

  return {
    uploadId: upload.id,
    uploadUrl: upload.url,
  };
}
