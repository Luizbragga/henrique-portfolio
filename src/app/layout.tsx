import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { ThemeToggle } from "../components/ThemeToggle";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

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
          <header
            className="fixed inset-x-0 top-0 z-50 border-b backdrop-blur shadow-sm"
            style={{
              background: "var(--overlay)",
              borderColor: "var(--border)",
            }}
          >
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
              <Link href="/" className="font-semibold tracking-tight">
                Henrique Braga
              </Link>

              <div className="flex items-center gap-5 text-sm">
                <Link href="/#projetos" className="hover:opacity-80 transition">
                  Projetos
                </Link>
                <Link href="/#sobre" className="hover:opacity-80 transition">
                  Sobre
                </Link>
                <Link href="/#contato" className="hover:opacity-80 transition">
                  Contato
                </Link>

                {/* arquivo estático pode continuar como <a> */}
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
