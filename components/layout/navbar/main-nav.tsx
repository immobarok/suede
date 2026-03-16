import { NavLink } from "./nav-link";

interface NavItem {
  href: string;
  label: string;
  tooltip: string;
}

interface MainNavProps {
  navItems: NavItem[];
  navTextColor: string;
  navActiveColor: string;
  navHoverColor: string;
}

export function MainNav({
  navItems,
  navTextColor,
  navActiveColor,
  navHoverColor,
}: MainNavProps) {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          tooltip={item.tooltip}
          navTextColor={navTextColor}
          navActiveColor={navActiveColor}
          navHoverColor={navHoverColor}
        />
      ))}
    </nav>
  );
}
