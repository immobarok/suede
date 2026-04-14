"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useQueryTab(key: string, defaultValue: string = "") {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentValue = searchParams.get(key) || defaultValue;

  const setValue = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== defaultValue) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [key, defaultValue, pathname, router, searchParams],
  );

  return {
    value: currentValue,
    setValue,
  };
}
