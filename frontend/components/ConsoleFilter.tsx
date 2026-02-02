"use client";

import { useEffect } from "react";

/**
 * Suppresses noisy console warnings in development that are not actionable.
 * These come from third-party libraries and don't affect functionality.
 */
export function useConsoleFilter() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalWarn = console.warn;
    const originalError = console.error;

    // Patterns to filter out
    const suppressPatterns = [
      // WalletConnect multiple initialization (library internal)
      "WalletConnect Core is already initialized",
      // Lit dev mode warning (normal in development)
      "Lit is in dev mode",
      "Multiple versions of Lit loaded",
      // Reown Config 403 (demo projectId)
      "Failed to fetch remote project configuration",
      "[Reown Config]",
    ];

    const shouldSuppress = (args: unknown[]) => {
      const message = args.map((arg) => String(arg)).join(" ");
      return suppressPatterns.some((pattern) => message.includes(pattern));
    };

    console.warn = (...args) => {
      if (!shouldSuppress(args)) {
        originalWarn.apply(console, args);
      }
    };

    console.error = (...args) => {
      if (!shouldSuppress(args)) {
        originalError.apply(console, args);
      }
    };

    return () => {
      console.warn = originalWarn;
      console.error = originalError;
    };
  }, []);
}

export default function ConsoleFilter({
  children,
}: {
  children: React.ReactNode;
}) {
  useConsoleFilter();
  return <>{children}</>;
}
