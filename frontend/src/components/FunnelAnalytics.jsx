"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackFunnel } from "../lib/funnelAnalytics";

export default function FunnelAnalytics() {
  const pathname = usePathname();
  useEffect(() => {
    const seen = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !seen.has(entry.target)) {
            seen.add(entry.target);
            trackFunnel("pricing_view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    document
      .querySelectorAll(".it-pricing-grid,.school-pricing-grid")
      .forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
