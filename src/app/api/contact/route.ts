import { NextResponse } from 'next/server';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // TODO: Uncomment when Resend is configured
    // await resend.emails.send({
    //   from: 'contacto@gallegocazaux.com',
    //   to: 'info@gallegocazaux.com',
    //   subject: `Nuevo contacto desde web: ${name}`,
    //   html: `
    //     <h2>Nuevo mensaje desde el sitio web</h2>
    //     <p><strong>Nombre:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
    //     <p><strong>Mensaje:</strong></p>
    //     <p>${message}</p>
    //   `,
    // });

    // For demo, just log and return success
    console.log('Contact form submission:', { name, email, phone, message });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje' },
      { status: 500 }
    );
  }
}