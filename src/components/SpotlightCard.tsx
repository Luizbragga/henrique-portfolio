"use client";
import Image from "next/image";
import { HTMLAttributes, useRef } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  header?: boolean; // mostra a faixa superior
  headerImage?: string; // imagem para tema claro (opcional)
  headerImageDark?: string; // imagem para tema escuro (opcional)
  headerAlt?: string; // alt da imagem do header
};

export default function SpotlightCard({
  children,
  className = "",
  header = true,
  headerImage,
  headerImageDark,
  headerAlt = "Imagem do projeto",
  ...props
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - r.left}px`);
    el.style.setProperty("--y", `${e.clientY - r.top}px`);
  }

  // altura do header (h-40 = 10rem). Se não tiver header, o “quadro” começa no topo.
  const contentTopClass = header ? "top-40" : "top-0";

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`group relative rounded-2xl overflow-hidden
        bg-white/80 dark:bg-zinc-900/70
        backdrop-blur-md
        border border-zinc-200/70 dark:border-white/10
        ring-1 ring-black/5 dark:ring-white/10
        shadow-[0_1px_0_#fff_inset] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset]
        transition-shadow hover:shadow-[0_10px_40px_-12px_rgba(0,0,0,0.35)]
        ${className}`}
      {...props}
    >
      {/* HEADER — imagem (se enviada) ou gradiente padrão */}
      {header &&
        (headerImage ? (
          <div className="relative h-40 rounded-t-2xl overflow-hidden">
            {/* claro */}
            <Image
              src={headerImage}
              alt={headerAlt}
              fill
              className="object-cover block dark:hidden"
              priority={false}
            />
            {/* escuro (se fornecida) */}
            {headerImageDark && (
              <Image
                src={headerImageDark}
                alt={headerAlt}
                fill
                className="object-cover hidden dark:block"
                priority={false}
              />
            )}
          </div>
        ) : (
          <div
            className="h-40 rounded-t-2xl bg-gradient-to-b
                       from-zinc-300/95 to-zinc-200/80
                       dark:from-white/5 dark:to-white/0"
          />
        ))}

      {/* QUADRO do conteúdo — apenas no tema claro (escurece levemente) */}
      <div
        className={`absolute inset-x-0 bottom-0 ${contentTopClass}
                    rounded-b-2xl bg-zinc-300/75 ring-1 ring-inset ring-zinc-900/5
                    dark:hidden z-[15]`}
      />

      {/* spotlight que segue o mouse */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl
                   opacity-0 group-hover:opacity-100 transition-opacity
                   [mask-image:radial-gradient(280px_280px_at_var(--x,50%)_var(--y,20%),#000_30%,transparent_65%)]
                   bg-white/50 dark:bg-white/10 mix-blend-overlay
                   z-[10]"
      />

      {/* conteúdo por cima de tudo */}
      <div className="relative z-[20] p-5 pt-6">{children}</div>
    </div>
  );
}
