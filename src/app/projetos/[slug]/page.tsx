import { getProject } from "../data";

// Next 15: params pode ser Promise. Faça a page async e "await params".
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto py-12 px-4">
        Projeto não encontrado
      </main>
    );
  }

  // Alias para campos opcionais (chat/upload)
  const l = project.links as Record<string, string | undefined>;

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">{project.titulo}</h1>
      <p className="text-zinc-600 dark:text-zinc-300 mb-6">{project.resumo}</p>

      <h2 className="text-xl font-semibold mt-8 mb-2">🎯 Objetivos</h2>
      <ul className="list-disc pl-6 space-y-1">
        {project.objetivos.map((obj: string, i: number) => (
          <li key={i}>{obj}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">✨ Highlights</h2>
      <ul className="list-disc pl-6 space-y-1">
        {project.highlights.map((h: string, i: number) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">📅 Timeline</h2>
      <ul className="list-disc pl-6 space-y-1">
        {project.timeline.map(
          (t: { fase: string; detalhe: string }, i: number) => (
            <li key={i}>
              <strong>{t.fase}:</strong> {t.detalhe}
            </li>
          )
        )}
      </ul>

      <div className="mt-10 flex flex-wrap gap-3">
        {l.github && (
          <a
            href={l.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium
                       bg-zinc-900 text-white hover:bg-zinc-800
                       dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            GitHub
          </a>
        )}

        {l.demo && (
          <a
            href={l.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium
                       bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                       dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            Demo
          </a>
        )}

        {l.chat && (
          <a
            href={l.chat}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium
                       bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                       dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            Chat
          </a>
        )}

        {l.upload && (
          <a
            href={l.upload}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium
                       bg-zinc-100 text-zinc-900 hover:bg-zinc-200
                       dark:bg-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
          >
            Upload
          </a>
        )}
      </div>
    </main>
  );
}
