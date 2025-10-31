"use client";

import React, { useState } from "react";

type Payload = {
  name: string;
  email: string;
  message: string;
  company?: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<Payload>({
    name: "",
    email: "",
    message: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        // tenta extrair mensagem de erro da API
        let msg = "Falha ao enviar a mensagem.";
        try {
          const data: { error?: string } = await res.json();
          if (data?.error) msg = data.error;
        } catch {
          /* ignore */
        }
        throw new Error(msg);
      }

      setOk(true);
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err) {
      setOk(false);
      setError(err instanceof Error ? err.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4 max-w-3xl">
      <div>
        <label className="block text-sm mb-1">Seu nome</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          placeholder="Ex.: Henrique Braga"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Seu e-mail</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          placeholder="seuemail@exemplo.com"
        />
      </div>

      <div>
        <label className="block text-sm mb-1">Mensagem</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full rounded-xl border px-4 py-3 bg-white/70 dark:bg-white/10 border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
          placeholder="Conte em poucas linhas o que você precisa..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary shine-btn min-w-[160px]"
      >
        {loading ? "Enviando..." : "Enviar mensagem"}
      </button>

      {ok === true && (
        <p className="text-emerald-500 text-sm">
          Mensagem enviada com sucesso!
        </p>
      )}
      {ok === false && (
        <p className="text-red-500 text-sm">{error || "Falha ao enviar."}</p>
      )}
    </form>
  );
}
