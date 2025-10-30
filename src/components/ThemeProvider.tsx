"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // 👈 padrão
      enableSystem={false} // 👈 ignora “system” no primeiro carregamento
      storageKey="hb-theme" // 👈 evita preferência antiga gravada
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
