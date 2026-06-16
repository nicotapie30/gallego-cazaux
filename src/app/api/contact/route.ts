import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(254),
  phone:   z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  topic:   z.enum(['compra', 'venta', 'alquiler', 'tasacion', 'consulta']).optional(),
});

const TOPIC_LABELS: Record<string, string> = {
  compra:   'Compra',
  venta:    'Venta',
  alquiler: 'Alquiler',
  tasacion: 'Tasación',
  consulta: 'Consulta general',
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      );
    }

    const { name, email, phone, message, topic } = parsed.data;

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Gallego Cazaux <onboarding@resend.dev>',
      to:   'nicoatapie@gmail.com',
      replyTo: email,
      subject: `Nuevo contacto web: ${escapeHtml(name)}${topic ? ` — ${TOPIC_LABELS[topic]}` : ''}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="background: #05103d; color: white; padding: 16px 24px; margin: 0; border-radius: 8px 8px 0 0;">
            Nuevo mensaje desde el sitio web
          </h2>
          <div style="border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            ${topic ? `<p style="margin: 0 0 12px;"><strong>Motivo:</strong> ${TOPIC_LABELS[topic]}</p>` : ''}
            <p style="margin: 0 0 12px;"><strong>Nombre:</strong> ${escapeHtml(name)}</p>
            <p style="margin: 0 0 12px;"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p style="margin: 0 0 12px;"><strong>Teléfono:</strong> ${phone ? escapeHtml(phone) : 'No proporcionado'}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <p style="margin: 0 0 8px;"><strong>Mensaje:</strong></p>
            <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
