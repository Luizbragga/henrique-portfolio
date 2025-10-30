"use client";

import Link from "next/link";

export function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[var(--overlay)] backdrop-blur supports-[backdrop-filter]:bg-[var(--overlay)]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        {/* Logo/nome */}
        <Link href="/" className="font-semibold tracking-tight">
          Henrique Braga
        </Link>

        {/* Links */}
        <div className="hidden gap-5 sm:flex">
          <Link href="/#projetos" className="opacity-80 hover:opacity-100">
            Projetos
          </Link>
          <Link href="/#sobre" className="opacity-80 hover:opacity-100">
            Sobre
          </Link>
          <Link href="/#contato" className="opacity-80 hover:opacity-100">
            Contato
          </Link>
          <Link
            href="/HenriqueBraga-CV.pdf"
            className="btn-ghost"
            prefetch={false}
          >
            Baixar CV
          </Link>
        </div>

        {/* Mobile: simples (pode evoluir depois) */}
        <div className="sm:hidden">
          <Link href="/#contato" className="btn">
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
}
