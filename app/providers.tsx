"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
}