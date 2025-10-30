import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  // honeypot anti-spam (deve ficar vazio)
  company?: string;
};

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Payload;

    // Honeypot simples (bots costumam preencher)
    if (data.company && data.company.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const name = (data.name || "").trim();
    const email = (data.email || "").trim();
    const message = (data.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Campos obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Validação bem básica de e-mail
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return NextResponse.json(
        { ok: false, error: "E-mail inválido." },
        { status: 400 }
      );
    }

    // Transport SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_TO!;
    const from = process.env.CONTACT_FROM || process.env.SMTP_USER!;

    const subject = `Contato do portfólio — ${name}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial">
        <h2>Nova mensagem do portfólio</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>E-mail:</b> ${email}</p>
        <p><b>Mensagem:</b></p>
        <pre style="white-space:pre-wrap">${message}</pre>
        <hr/>
        <p>Responder para: <a href="mailto:${email}">${email}</a></p>
      </div>
    `;

    await transporter.sendMail({
      to,
      from,
      replyTo: email, // responder vai para quem preencheu
      subject,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Falha ao enviar. Tente novamente." },
      { status: 500 }
    );
  }
}
