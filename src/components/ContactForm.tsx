"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    company: "",
  }); // company = honeypot
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Falha ao enviar");
      }
      setStatus("ok");
      setForm({ name: "", email: "", message: "", company: "" });
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Erro desconhecido.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 max-w-xl">
      {/* honeypot invisível */}
      <input
        type="text"
        name="company"
        autoComplete="off"
        tabIndex={-1}
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="hidden"
      />

      <div className="grid gap-1">
        <label className="text-sm text-zinc-800 dark:text-zinc-200">
          Seu nome
        </label>
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="rounded-xl border px-3 py-2
             bg-white/80 dark:bg-white/10
             border-zinc-300 dark:border-zinc-700
             text-zinc-900 dark:text-zinc-100
             placeholder-zinc-600 dark:placeholder-zinc-400"
        />

        <label className="text-sm text-zinc-800 dark:text-zinc-200">
          Seu e-mail
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="rounded-xl border px-3 py-2
             bg-white/80 dark:bg-white/10
             border-zinc-300 dark:border-zinc-700
             text-zinc-900 dark:text-zinc-100
             placeholder-zinc-600 dark:placeholder-zinc-400"
        />

        <label className="text-sm text-zinc-800 dark:text-zinc-200">
          Mensagem
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="rounded-xl border px-3 py-2
             bg-white/80 dark:bg-white/10
             border-zinc-300 dark:border-zinc-700
             text-zinc-900 dark:text-zinc-100
             placeholder-zinc-600 dark:placeholder-zinc-400"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary shine-btn disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando…" : "Enviar mensagem"}
      </button>

      {status === "ok" && (
        <p className="text-emerald-500 text-sm">
          Mensagem enviada com sucesso! Vou responder em breve.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">
          Não foi possível enviar. {error || ""}
        </p>
      )}
    </form>
  );
}
