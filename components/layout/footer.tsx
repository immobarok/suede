"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type FooterLink = {
  label: string;
  href: string;
  hiddenLabel?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const footerColumns: FooterColumn[] = [
  {
    title: "About Us",
    links: [{ label: "About Us", href: "/about", hiddenLabel: true }],
  },
  {
    title: "Privacy",
    links: [{ label: "Privacy", href: "#", hiddenLabel: true }],
  },
  {
    title: "Suede for Business",
    links: [
      { label: "Apply", href: "#" },
      { label: "Brand Portal", href: "#" },
    ],
  },
  {
    title: "Suggest a Brand",
    links: [{ label: "Suggest a Brand", href: "#", hiddenLabel: true }],
  },
  {
    title: "Navigate",
    links: [
      { label: "The Capsule | Brand Directory", href: "/the-capsule" },
      { label: "The Lookbook | Review Feed", href: "/the-lookbook" },
      { label: "The Collective | Member Discovery", href: "/the-collective" },
    ],
  },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (pathname.startsWith("/consultation")) {
    return null;
  }

  return (
    <footer className="bg-[#F8F7F2] px-6 py-6 text-[#0d0d0d] sm:px-10 lg:px-16">
      <div className="container mx-auto">
        {/* Top Section: Logo and Navigation Columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3 lg:grid-cols-7">
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/vector-logo.svg"
              alt="Suede mark"
              width={122}
              height={141}
              className="h-24 w-24 object-contain sm:h-32 sm:w-32"
            />
          </div>

          {/* Spacer for desktop alignment */}
          <div className="hidden lg:block"></div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col">
              <Link
                href={column.links[0]?.href ?? "#"}
                className="text-[13px] font-semibold transition-opacity hover:opacity-65"
              >
                {column.title}
              </Link>
              <ul className="mt-2 flex flex-col gap-2">
                {column.links
                  .filter((link) => !link.hiddenLabel)
                  .map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[13px] text-[#4b4b4b] transition-opacity hover:opacity-65"
                      >
                        {link.label.includes("|") ? (
                          <>
                            {link.label.split("|")[0]}|{" "}
                            <em className="italic">
                              {link.label.split("|")[1].trim()}
                            </em>
                          </>
                        ) : (
                          link.label
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Middle Section: Newsletter and Contact */}
        <div className="mt-6 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-end">
          <div className="w-full max-w-md">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setIsLoading(true);
                try {
                  const { subscribeToNewsletter } = await import(
                    "@/app/actions/newsletter"
                  );
                  const result = await subscribeToNewsletter(email);
                  if (result.success) {
                    toast.success(result.message);
                    setEmail("");
                  } else {
                    toast.error(result.error);
                  }
                } catch {
                  toast.error("Something went wrong. Please try again.");
                } finally {
                  setIsLoading(false);
                }
              }}
              className="w-full"
            >
              <label
                htmlFor="footer-newsletter-email"
                className="text-[13px] font-medium"
              >
                Sign up for our Newsletter | Per Suede
              </label>
              <div className="mt-4 flex items-center border-b border-[#0d0d0d] pb-2">
                <input
                  id="footer-newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  disabled={isLoading}
                  className="h-6 min-w-0 flex-1 bg-transparent text-[14px] font-medium outline-none placeholder:text-[#a0a0a0] disabled:cursor-not-allowed"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="cursor-pointer p-1 transition-opacity hover:opacity-65 disabled:cursor-not-allowed"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M9.00844 13.5791V13.4991C9.00844 12.6691 9.67844 11.9991 10.5084 11.9991C11.3384 11.9991 12.0084 12.6691 12.0084 13.4991C12.0084 14.3291 11.3384 14.9991 10.5084 14.9991H10.4284L4.50844 20.9191L4.70844 21.1191L17.0084 17.7691V12.4191L18.5084 10.9191L13.0984 5.50906L11.5984 7.00906H6.24844L2.89844 19.3091L3.09844 19.5091L9.01844 13.5891L9.00844 13.5791ZM19.9184 9.49906L21.0084 8.40906C21.3884 8.02906 21.5884 7.52906 21.5884 6.98906C21.5884 6.45906 21.3784 5.94906 20.9984 5.57906L18.4084 2.99906C17.6284 2.21906 16.3584 2.21906 15.5784 2.99906L14.4984 4.07906L19.9184 9.49906Z" fill="black"/>
</svg>
                </button>
              </div>
            </form>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-[13px] font-semibold">Let&apos;s Connect!</p>
            <Link
              href="mailto:info@suedecapsule.com"
              className="mt-2 block text-[13px] text-[#4b4b4b] transition-opacity hover:opacity-65"
            >
              info@suedecapsule.com
            </Link>
          </div>
        </div>

        {/* Large Logo Section */}
        <div className="mt-6 mb-4">
          <Image
            src="/Logo_black.svg"
            alt="SUEDE"
            width={1200}
            height={400}
            className="h-auto w-full max-w-[300px] object-contain"
          />
        </div>

        {/* Bottom Section: Copyright and Socials */}
        <div className="mt-2 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-[12px] font-medium text-[#4b4b4b]">Suede LLC</p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="https://www.instagram.com/suedecapsule"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-65"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
              <Link
                href="https://www.tiktok.com/@suedecapsule"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-65"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </Link>
            </div>
            <Link
              href="https://www.instagram.com/suedecapsule"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-semibold transition-opacity hover:opacity-65"
            >
              @suedecapsule
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
