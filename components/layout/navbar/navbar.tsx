import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { NavbarClient } from "./navbar-client";

export function Navbar() {
  const logoSlot: ReactNode = <Logo />;

  return <NavbarClient logoSlot={logoSlot} />;
}
