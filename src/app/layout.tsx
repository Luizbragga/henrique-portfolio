import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Henrique Braga — Portfólio",
  description: "Full-stack Developer (Node.js, React, MongoDB).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* NAVBAR FIXA */}
          <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur dark:border-zinc-800/80 dark:bg-black/70">
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
              <a href="/" className="font-semibold tracking-tight">
                Henrique Braga
              </a>
              <div className="flex items-center gap-5 text-sm">
                <a href="#projetos" className="hover:opacity-80 transition">
                  Projetos
                </a>
                <a href="#sobre" className="hover:opacity-80 transition">
                  Sobre
                </a>
                <a
                  href="mailto:henrique@email.com"
                  className="hover:opacity-80 transition"
                >
                  Contato
                </a>
                <a
                  href="/HenriqueBraga-CV.pdf"
                  className="rounded-xl border border-zinc-300 px-3 py-1.5 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/5 transition"
                >
                  Baixar CV
                </a>
                <ThemeToggle />
              </div>
            </nav>
          </header>

          {/* conteúdo abaixo da navbar */}
          <div className="pt-16 min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
