"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { YANDEX_SCRIPT_URL, trackMetrikaPage } from "../lib/yandexMetrika";

export default function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    trackMetrikaPage(pathname, search);
  }, [pathname, search]);

  return (
    <Script
      id="yandex-metrika"
      src={YANDEX_SCRIPT_URL}
      strategy="afterInteractive"
      referrerPolicy="no-referrer"
    />
  );
}
