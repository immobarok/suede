"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-user";
import { usePathname } from "@/i18n/routing";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const GUEST_CLICK_LIMIT = 5;
const STORAGE_COUNT_KEY = "guest_click_count";

export function GuestClickGate() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      return;
    }

    localStorage.removeItem(STORAGE_COUNT_KEY);
  }, [isAuthenticated, isLoading]);

  const isAuthPage = useMemo(() => {
    return pathname.startsWith("/auth/");
  }, [pathname]);

  useEffect(() => {
    if (isLoading || isAuthenticated || isAuthPage) {
      return;
    }

    const currentCount = Number(localStorage.getItem(STORAGE_COUNT_KEY) ?? 0);
    if (currentCount >= GUEST_CLICK_LIMIT) {
      setTimeout(() => setIsOpen(true), 0);
    }
  }, [isAuthenticated, isAuthPage, isLoading]);

  useEffect(() => {
    if (isLoading || isAuthenticated || isAuthPage) {
      return;
    }

    const handleClick = () => {
      if (isOpen) {
        return;
      }

      const currentCount =
        Number(localStorage.getItem(STORAGE_COUNT_KEY) ?? 0) + 1;
      localStorage.setItem(STORAGE_COUNT_KEY, String(currentCount));

      if (currentCount >= GUEST_CLICK_LIMIT) {
        setIsOpen(true);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isAuthPage, isAuthenticated, isLoading, isOpen]);

  if (isAuthenticated || isAuthPage) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-darker text-center text-2xl uppercase">
            Sign in to continue
          </DialogTitle>
          <DialogDescription className="text-center">
            You have reached the guest click limit. Please sign in or create an
            account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button asChild className="w-full uppercase">
            <Link href="/auth/login">Sign in</Link>
          </Button>
          <Button asChild variant="outline" className="w-full uppercase">
            <Link href="/auth/register">Sign up</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
