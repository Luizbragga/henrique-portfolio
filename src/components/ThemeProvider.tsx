"use client";

import * as React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

type NextThemeProviderProps = React.ComponentProps<typeof NextThemeProvider>;

export function ThemeProvider({ children, ...props }: NextThemeProviderProps) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

export default ThemeProvider;
