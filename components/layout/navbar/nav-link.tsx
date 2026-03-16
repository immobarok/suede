import Link from "next/link";
import { usePathname } from "@/i18n/routing";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavLinkClientProps {
  href: string;
  label: string;
  tooltip: string;
  navTextColor: string;
  navActiveColor: string;
  navHoverColor: string;
}

export function NavLink({
  href,
  label,
  tooltip,
  navTextColor,
  navActiveColor,
  navHoverColor,
}: NavLinkClientProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={href}
          className={`font-darker text-[16px] uppercase transition-colors ${isActive ? navActiveColor : `${navTextColor} ${navHoverColor}`}`}
        >
          {label}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}
