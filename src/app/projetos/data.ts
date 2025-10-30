export const projects = [
  {
    slug: "padarias",
    titulo: "Sistema de Entregas e Gestão para Padarias",
    status: "em-desenvolvimento",
    resumo:
      "Sistema web que automatiza rotas de entrega, centraliza pagamentos e oferece dashboards em tempo real.",
    tags: [
      "Node.js",
      "Express",
      "MongoDB",
      "React",
      "Next.js",
      "Tailwind",
      "JWT",
      "RBAC",
    ],
    highlights: [
      "Rotas inteligentes e automáticas — geração diária de entregas com mapa interativo.",
      "Gestão financeira centralizada — pagamentos, histórico e inadimplência.",
      "Segurança corporativa — JWT, permissões por papéis e dados protegidos em MongoDB.",
      "Dashboards estratégicos — métricas em tempo real para decisões rápidas.",
      "Base técnica sólida — Node.js, Express, MongoDB, React/Next.js e Tailwind.",
    ],
    objetivos: [
      "Automatizar rotas de entrega em tempo real, com mapas interativos.",
      "Centralizar gestão de pagamentos e inadimplência em um único painel.",
      "Garantir segurança e organização com autenticação JWT e RBAC.",
    ],
    timeline: [
      {
        fase: "Início (2025-04)",
        detalhe: "Definição do problema e requisitos.",
      },
      {
        fase: "Backend (2025-05 a 2025-07)",
        detalhe: "API REST, JWT, RBAC, MongoDB, rotas automáticas.",
      },
      {
        fase: "Frontend (2025-07 em diante)",
        detalhe: "Painel em React/Next.js, integração com API, dashboards.",
      },
      {
        fase: "Funcionalidades atuais (2025-08)",
        detalhe: "Painéis, pagamentos, inadimplência, rotas no mapa.",
      },
      {
        fase: "Próximos passos (2025-09)",
        detalhe: "Deploy em produção, métricas reais, otimizações.",
      },
    ],
    links: {
      github: "https://github.com/seu-repo/padarias",
      demo: "#",
    },
  },
  {
    slug: "rag-faq",
    titulo: "RAG FAQ – Chatbot com Recuperação de Conteúdo",
    status: "online",
    resumo:
      "Chatbot com RAG usando Next.js, MongoDB e Groq; embeddings locais (sem custo). Upload de PDF/Texto e chat com citações.",
    tags: ["Next.js", "MongoDB", "Groq", "RAG", "Embeddings locais"],
    highlights: [
      "Upload de PDF ou texto → indexação → chat com citações das fontes.",
      "Embeddings locais (sem custo) e detecção de idioma (pt/en).",
      "Endpoints de saúde: /api/health, /api/dbcheck, /api/modelcheck.",
    ],
    objetivos: [
      "Demonstrar RAG full-stack com Next.js + MongoDB + Groq.",
      "Permitir ingestão rápida (PDF/Texto) e respostas com fontes.",
      "Operar sem custo de embeddings usando geração local.",
    ],
    timeline: [
      { fase: "Ideia", detalhe: "MVP de RAG com foco em demo pública." },
      {
        fase: "Implementação",
        detalhe: "Ingestão, chunking, busca e chat citando fontes.",
      },
      {
        fase: "Deploy",
        detalhe: "Vercel + Mongo Atlas; páginas Demo/Chat/Upload.",
      },
    ],
    links: {
      github: "https://github.com/SEU_USUARIO/SEU_REPO_RAG_FAQ",
      demo: "https://rag-faq-bot-tau.vercel.app/",
      chat: "https://rag-faq-bot-tau.vercel.app/chat",
      upload: "https://rag-faq-bot-tau.vercel.app/upload",
    },
  },
];

export type Project = (typeof projects)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
