import { ReactNode } from "react";

interface SectionWrapperProps {
  number: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}

export function SectionWrapper({
  number,
  title,
  description,
  children,
}: SectionWrapperProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
      {/* Left Column */}
      <div className="space-y-2">
        <span className="text-xs font-medium tracking-widest text-gray-400">
          {number}
        </span>
        <h2 className="text-xl font-medium text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
        )}
      </div>

      {/* Right Column */}
      <div className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
        {children}
      </div>
    </div>
  );
}