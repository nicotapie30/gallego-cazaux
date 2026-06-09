import { NextResponse } from 'next/server';
import { z } from 'zod';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(254),
  phone:   z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  topic:   z.enum(['compra', 'venta', 'alquiler', 'tasacion', 'consulta']).optional(),
});

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

    // TODO: Uncomment when Resend is configured
    // await resend.emails.send({
    //   from: 'contacto@gallegocazaux.com',
    //   to: 'info@gallegocazaux.com',
    //   subject: `Nuevo contacto desde web: ${escapeHtml(name)}`,
    //   html: `
    //     <h2>Nuevo mensaje desde el sitio web</h2>
    //     <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    //     <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    //     <p><strong>Teléfono:</strong> ${phone ? escapeHtml(phone) : 'No proporcionado'}</p>
    //     <p><strong>Mensaje:</strong></p>
    //     <p>${escapeHtml(message)}</p>
    //   `,
    // });

    void escapeHtml; void email; void name; void phone; void message; // used when Resend is active
    console.log('Contact form received', { topic, timestamp: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error instanceof Error ? error.message : 'unknown');
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}
