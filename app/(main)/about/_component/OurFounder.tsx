import Image from "next/image";

type FounderMetadata = {
  label?: string;
  name?: string;
  role?: string;
  tagline?: string;
  intro?: string;
  paragraphs?: string[];
};

type FounderContent = {
  title?: string;
  body?: string;
  publicUrl?: string;
  public_url?: string;
  metadata?: FounderMetadata;
};

const founderParagraphs = [
  "I'm Kikiola - ex-McKinsey, cybersecurity professional by day, fashion girl the rest of the time...",
  "Somewhere along the way the math stopped working...",
  "Suede is my answer...",
];

function plainText(value?: string) {
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

function buildParagraphHtml(paragraphs: string[]) {
  return paragraphs
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return "";

      const normalized = trimmed
        .replace(/&nbsp;/gi, " ")
        .replace(/\u00a0/g, " ");

      if (normalized.includes("<") && normalized.includes(">")) {
        return normalized;
      }

      return `<p>${normalized}</p>`;
    })
    .join("");
}

export default function QuoteSection({
  content,
}: {
  content?: FounderContent;
}) {
  const imageSrc =
    content?.publicUrl ||
    content?.public_url ||
    "https://oamlquwwgaakoyjwcgaw.supabase.co/storage/v1/object/public/images/about/7283a0d3-220b-4923-ae6f-a91d0f3d1604.webp";

  const paragraphsFromMeta =
    content?.metadata?.paragraphs?.filter(Boolean) ?? [];

  const paragraphs =
    paragraphsFromMeta.length > 0
      ? paragraphsFromMeta
      : content?.body
        ? content.body
            .split(/\n\n/)
            .map((line) => line.trim())
            .filter(Boolean)
        : founderParagraphs;

  const paragraphsHtml = buildParagraphHtml(paragraphs);

  return (
    <section className="overflow-hidden bg-[#EBEBEA] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-10 lg:px-0">
        {/* 🔥 FIXED GRID */}
        <div className="grid items-start gap-4 lg:grid-cols-[420px_1fr]">
          {/* IMAGE */}
          <div className="mx-auto w-full max-w-95 lg:mx-0">
            <Image
              src={imageSrc}
              alt={
                plainText(content?.metadata?.name || content?.title) ||
                "Kikiola"
              }
              width={420}
              height={760}
              className="h-130 w-full rounded-[44px] object-cover md:h-162.5 lg:h-190"
              unoptimized
              priority
            />
          </div>

          {/* TEXT */}
          <div className="min-w-0">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-8 bg-black/65" />
              <p
                className="text-center text-[24px] leading-normal font-normal text-black uppercase"
                style={{ fontFamily: "Glacial Indifference" }}
              >
                {content?.metadata?.label || "III - OUR FOUNDER"}
              </p>
            </div>

            <h2 className="font-cormorant text-[96px] leading-normal font-normal text-black">
              {plainText(content?.metadata?.name || content?.title) ||
                "Kikiola"}
            </h2>

            <p className="font-cormorant mt-4 text-[36px] leading-normal font-normal text-black">
              {content?.metadata?.role || "Founder & CEO"}
            </p>

            <p className="font-cormorant mt-4 text-[24px] leading-normal font-bold text-black">
              {content?.metadata?.tagline ||
                "I built the platform I wanted to shop on."}
            </p>

            {content?.metadata?.intro && (
              <div
                className="font-cormorant mt-6 text-[24px] leading-normal font-normal text-black [&_p]:m-0"
                dangerouslySetInnerHTML={{
                  __html: content.metadata.intro,
                }}
              />
            )}

            <div
              className="font-cormorant mt-6 text-[24px] leading-normal font-normal text-black [&_p]:m-0 [&_p]:mb-5"
              dangerouslySetInnerHTML={{ __html: paragraphsHtml }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
