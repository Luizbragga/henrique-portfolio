"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Reveal from "../components/Reveal";
import Link from "next/link";
import { projects } from "./projetos/data";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";

/* ===== Botão “magnético” com variants + shine ===== */
type MBProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function MagneticButton({
  href,
  children,
  external,
  className = "",
  variant = "outline",
  onClick,
  ...rest
}: MBProps) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const strength = 6;

  const variantClass =
    variant === "solid"
      ? "btn-primary"
      : variant === "ghost"
      ? "btn-ghost"
      : "btn";

  return (
    <a
      href={href}
      onClick={onClick}
      {...rest}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`shine-btn ${variantClass} ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        if (innerRef.current) {
          innerRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }}
      onMouseLeave={() => {
        if (innerRef.current) {
          innerRef.current.style.transform = "translate3d(0,0,0)";
        }
      }}
    >
      <span
        ref={innerRef}
        className="inline-flex items-center will-change-transform transition-transform duration-150 ease-out"
      >
        {children}
      </span>
    </a>
  );
}

/* ===== Hook de count-up (tipagem ok) ===== */
function useCountUp<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  end: number,
  dur = 1000
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let start = 0;
    let startTs = 0;
    let raf = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / dur, 1);
      const val = Math.floor(p * (end - start) + start);
      el.textContent = String(val);
      if (p < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [ref, end, dur]);
}

/* ===== Card (spotlight + tilt + gradient-border) ===== */
function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left,
      y = e.clientY - r.top;
    setP({ x, y });
    const cx = r.width / 2,
      cy = r.height / 2;
    setRot({ rx: -((y - cy) / cy) * 4, ry: ((x - cx) / cx) * 4 });
  }
  function onLeave() {
    setRot({ rx: 0, ry: 0 });
  }

  const spot = useMemo(
    () =>
      `radial-gradient(260px circle at ${p.x}px ${p.y}px, rgba(255,255,255,.10), transparent 60%)`,
    [p.x, p.y]
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative group rounded-2xl ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800 overflow-hidden transition-all hover:-translate-y-0.5 hover:ring-zinc-300 dark:hover:ring-zinc-600"
      style={{
        transform: `perspective(900px) rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
      }}
    >
      <div className="h-44 w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900" />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ backgroundImage: spot }}
      />
      <div className="relative p-5">
        <div className="gradient-border rounded-2xl">
          <div className="rounded-[0.95rem] bg-white/60 dark:bg-white/[0.04] backdrop-blur-sm p-4 ring-1 ring-black/5 dark:ring-white/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== Skills em abas ===== */
const TABS = ["Back-end", "Front-end", "DevOps"] as const;
const SKILLS: Record<(typeof TABS)[number], string[]> = {
  "Back-end": [
    "Node.js",
    "Express",
    "TypeScript",
    "MongoDB",
    "Mongoose",
    "JWT",
    "RBAC",
  ],
  "Front-end": [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Zustand",
    "TanStack Query",
  ],
  DevOps: ["Docker", "Docker Compose", "CI/CD", "Vercel", "Render", "Linux"],
};

export default function Home() {
  const year = new Date().getFullYear();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Back-end");

  /* refs p/ métricas */
  const m1 = useRef<HTMLSpanElement>(null);
  const m2 = useRef<HTMLSpanElement>(null);
  useCountUp(m1, 5, 900);
  useCountUp(m2, 2, 900);

  const [openContact, setOpenContact] = useState(false);

  return (
    <main className="relative min-h-screen grain bg-grid">
      {/* glows decorativos (suaves) */}
      <div
        className="absolute -top-24 left-[10%] h-[28rem] w-[48rem] rounded-full
  bg-[radial-gradient(closest-side,theme(colors.cyan.400/.28),transparent)]
  blur-3xl mix-blend-multiply opacity-60
  dark:mix-blend-screen dark:opacity-100"
      />

      <div
        className="absolute -top-10 right-[8%] h-[26rem] w-[42rem] rounded-full
  bg-[radial-gradient(closest-side,theme(colors.violet.400/.25),transparent)]
  blur-3xl mix-blend-multiply opacity-60
  dark:mix-blend-screen dark:opacity-100"
      />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[22rem] w-[38rem] rounded-full
  bg-[radial-gradient(closest-side,theme(colors.pink.400/.18),transparent)]
  blur-3xl mix-blend-multiply opacity-60
  dark:mix-blend-screen dark:opacity-100"
      />

      <div className="aurora" />

      <div className="relative z-[1] mx-auto max-w-5xl px-6 py-24">
        {/* HERO */}
        <Reveal>
          <header className="mb-16">
            <p className="text-sm/6 opacity-70">Portfolio</p>

            <h1 className="mt-2 text-5xl sm:text-7xl font-extrabold tracking-tight">
              <span className="title-aurora [text-shadow:_0_2px_14px_rgba(255,255,255,.14)]">
                Henrique Braga
              </span>
            </h1>

            <p className="mt-4 max-w-2xl opacity-90">
              Full-stack Developer (Node.js, React, MongoDB). Eu construo
              produtos reais: APIs robustas, dashboards e experiências web
              rápidas.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#projetos">Ver projetos</MagneticButton>
              <MagneticButton href="https://github.com/Luizbragga" external>
                GitHub
              </MagneticButton>
              <MagneticButton
                href="https://www.linkedin.com/in/luiz-henrique-333214287/"
                external
              >
                LinkedIn
              </MagneticButton>
              <MagneticButton href="/HenriqueBraga-CV.pdf">
                Baixar CV
              </MagneticButton>
              <MagneticButton href="/HenriqueBraga-CV.html" external>
                Ver CV online
              </MagneticButton>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 text-sm opacity-80 dark:border-zinc-800">
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              Disponível para projetos
            </div>
          </header>
        </Reveal>

        {/* MÉTRICAS */}
        <section
          aria-label="Status"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 mt-4"
        >
          <div className="card p-4 text-center transition hover:-translate-y-0.5">
            <div className="text-2xl font-semibold">{projects.length}</div>
            <div className="opacity-70 text-sm">projetos em andamento</div>
          </div>

          <div className="card p-4 text-center transition hover:-translate-y-0.5">
            <div className="text-2xl font-semibold">Node.js + React</div>
            <div className="opacity-70 text-sm">stack principal</div>
          </div>

          <Link
            href="/provas"
            aria-label="Ver estudos de caso"
            className="card card-clickable p-4 text-center"
          >
            <div className="text-2xl font-semibold">3</div>
            <div className="opacity-70 text-sm">
              estudos de caso públicos (meta)
            </div>
          </Link>
        </section>

        {/* Observação curta e honesta */}
        <p className="mt-3 text-sm opacity-70">
          Estou publicando meus projetos e estudos de caso à medida que avanço.
          Se quiser ver algo específico,
          <a
            href="#contato"
            className="underline underline-offset-2 hover:opacity-100"
          >
            {" "}
            fale comigo
          </a>
          .
        </p>

        {/* PROJETOS */}
        <section id="projetos" className="space-y-6 scroll-mt-24 mt-16">
          <h2 className="text-2xl font-semibold">Projetos em destaque</h2>

          <div className="grid gap-6 sm:grid-cols-2">
            <Reveal>
              <SpotlightCard>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs
             text-zinc-700 dark:text-zinc-200
             bg-white/70 dark:bg-white/10
             border-zinc-300 dark:border-white/20"
                  >
                    Em desenvolvimento
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Sistema de entregas para padarias
                </h3>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Backend com JWT, RBAC, geração automática de entregas e
                  dashboards financeiros. Frontend em desenvolvimento com
                  React/Next.js.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Node.js", "Express", "MongoDB", "JWT", "RBAC"].map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border px-2 py-1 transition border-zinc-300 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <MagneticButton
                    href="https://github.com/Luizbragga/padaria-backend"
                    external
                  >
                    Código
                  </MagneticButton>
                  <Link
                    href="/projetos/padarias"
                    className="text-sm text-zinc-800 dark:text-zinc-300 hover:opacity-100"
                  >
                    → estudo de caso
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={180}>
              <SpotlightCard>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs
        text-zinc-700 dark:text-zinc-200 bg-white/70 dark:bg-white/10
        border-zinc-300 dark:border-white/20"
                  >
                    Online
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  RAG FAQ - Chatbot com RAG
                </h3>

                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                  Chatbot com RAG (Next.js + MongoDB + Groq). Embeddings locais
                  (sem custo). Faça upload de PDF/Texto e pergunte no chat com
                  citações.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Next.js", "MongoDB", "Groq", "RAG", "Embeddings"].map(
                    (t) => (
                      <span
                        key={t}
                        className="text-xs rounded-full border px-2 py-1 transition
            bg-zinc-900/5 border-zinc-900/10 hover:bg-black/5
            dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10"
                      >
                        {t}
                      </span>
                    )
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <MagneticButton
                    href="https://rag-faq-bot-tau.vercel.app/"
                    external
                  >
                    Demo
                  </MagneticButton>
                  <Link
                    href="/projetos/rag-faq"
                    className="text-sm text-zinc-700 dark:text-zinc-300 hover:opacity-100"
                  >
                    → estudo de caso
                  </Link>
                  <a
                    href="https://rag-faq-bot-tau.vercel.app/chat"
                    target="_blank"
                    className="text-sm text-zinc-700 dark:text-zinc-300 hover:opacity-100"
                  >
                    Chat
                  </a>
                  <a
                    href="https://rag-faq-bot-tau.vercel.app/upload"
                    target="_blank"
                    className="text-sm text-zinc-700 dark:text-zinc-300 hover:opacity-100"
                  >
                    Upload
                  </a>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* Vênus - barbershop site */}
            <Reveal>
              <SpotlightCard>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs
        text-zinc-700 dark:text-zinc-200 bg-white/70 dark:bg-white/10
        border-zinc-300 dark:border-white/20"
                  >
                    Em andamento
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Vênus - barbershop site
                </h3>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Landing page leve, SEO e captação de leads (CTA/formulários).
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["Next.js", "React", "Tailwind", "Vercel"].map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border px-2 py-1 transition
          border-zinc-300 dark:border-zinc-700 dark:hover:bg-white/5 hover:bg-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <MagneticButton
                    href="https://github.com/Luizbragga/venus-site"
                    external
                  >
                    Código
                  </MagneticButton>
                  <Link
                    href="/projetos/venus"
                    className="text-sm text-zinc-800 dark:text-zinc-300 hover:opacity-100"
                  >
                    → estudo de caso
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>

            {/* MealShift — hábitos e lembretes */}
            <Reveal delay={120}>
              <SpotlightCard>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs
        text-zinc-700 dark:text-zinc-200 bg-white/70 dark:bg-white/10
        border-zinc-300 dark:border-white/20"
                  >
                    Em andamento
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  MealShift - hábitos e lembretes
                </h3>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Planner de refeições com lembretes e template semanal
                  personalizável.
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["React", "TypeScript", "Vite"].map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border px-2 py-1 transition
          border-zinc-300 dark:border-zinc-700 dark:hover:bg-white/5 hover:bg-black/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <MagneticButton
                    href="https://github.com/Luizbragga/mealshift"
                    external
                  >
                    Código
                  </MagneticButton>
                  <Link
                    href="/projetos/mealshift"
                    className="text-sm text-zinc-800 dark:text-zinc-300 hover:opacity-100"
                  >
                    → estudo de caso
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={120}>
              <SpotlightCard>
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs
             text-zinc-700 dark:text-zinc-200
             bg-white/70 dark:bg-white/10
             border-zinc-300 dark:border-white/20"
                  >
                    Em breve
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                  Próximo projeto
                </h3>
                <p className="mt-2 text-zinc-800 dark:text-zinc-300">
                  Descrição curta do projeto, problema resolvido e impacto.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {["React", "Next.js", "Tailwind"].map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border px-2 py-1 transition border-zinc-300 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Link
                    href="/projetos/proximo"
                    className="text-sm text-zinc-800 dark:text-zinc-300 hover:opacity-100"
                  >
                    → estudo de caso
                  </Link>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        {/* SOBRE / SKILLS */}
        <section id="sobre" className="mt-24 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Sobre mim</h2>

          <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-[160px_1fr]">
            <div className="flex h-32 w-32 select-none items-center justify-center rounded-full bg-white/10 text-3xl font-semibold ring-1 ring-white/15 transition hover:shadow-xl hover:shadow-cyan-400/10 dark:bg-white/5">
              <div className="relative h-32 w-32 overflow-hidden rounded-full ring-1 ring-zinc-200 dark:ring-zinc-800">
                <Image
                  src="/perfil/henrique.jpg"
                  alt="Henrique Braga"
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div>
              <p className="opacity-90">
                Desenvolvedor full-stack focado em Node.js e React. Gosto de
                construir APIs seguras, UIs rápidas e automações que economizam
                tempo. Atualmente criando um sistema de entregas com RBAC,
                dashboards e análise financeira.
              </p>

              <div className="mt-6 flex gap-2">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`rounded-xl px-4 py-2 text-sm transition border ${
                      tab === t
                        ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
                        : "border-zinc-300 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/5"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <ul className="mt-4 flex flex-wrap gap-2">
                {SKILLS[tab].map((s) => (
                  <li
                    key={s}
                    className="rounded-full border px-3 py-1 text-sm transition border-zinc-300 hover:bg-black/5 dark:border-zinc-700 dark:hover:bg-white/5"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="mt-24 scroll-mt-24">
          <h2 className="text-2xl font-semibold">Contato</h2>
          <p className="mt-4 max-w-2xl text-zinc-800 dark:text-zinc-300">
            Curtiu meu trabalho? Vamos conversar. Respondo rápido por e-mail e
            LinkedIn.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <MagneticButton href="https://www.linkedin.com/" external>
              LinkedIn
            </MagneticButton>
            <MagneticButton href="https://github.com/" external>
              GitHub
            </MagneticButton>
            <MagneticButton href="/HenriqueBraga-CV.pdf">
              Baixar CV
            </MagneticButton>
            <MagneticButton href="/HenriqueBraga-CV.html" external>
              Ver CV online
            </MagneticButton>

            {/* Botão que abre/fecha o formulário */}
            <MagneticButton
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                setOpenContact((v) => !v);
              }}
            >
              {openContact ? "Fechar" : "Fale comigo"}
            </MagneticButton>
          </div>

          {/* Formulário: escondido até clicar */}
          <div
            id="contact-form"
            className={`transition-all duration-300 ${
              openContact
                ? "mt-6 opacity-100"
                : "mt-0 opacity-0 pointer-events-none h-0 overflow-hidden"
            }`}
            aria-hidden={!openContact}
          >
            <ContactForm />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 border-t border-zinc-200 py-10 dark:border-zinc-800">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 opacity-80 sm:flex-row">
            <span>© {year} Henrique Braga</span>
            <div className="flex gap-4 text-sm">
              <a href="#projetos" className="transition hover:opacity-80">
                Projetos
              </a>
              <a href="#sobre" className="transition hover:opacity-80">
                Sobre
              </a>
              <a href="#contato" className="transition hover:opacity-80">
                Contato
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
