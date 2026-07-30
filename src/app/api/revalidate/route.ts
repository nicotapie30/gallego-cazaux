import { timingSafeEqual } from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!isValidSecret(secret)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();

    const slug: string | undefined = body?.slug?.current;

    // Todas las fichas de una vez, no solo la del slug que vino en el payload.
    // En un borrado Sanity no manda slug, y si lo cambian el payload trae el
    // nuevo: en ambos casos la ficha vieja seguía accesible hasta que venciera
    // su hora. Con 20 propiedades el costo de invalidarlas juntas es nulo.
    revalidatePath('/propiedades/[slug]', 'page');

    revalidatePath('/propiedades');
    revalidatePath('/propiedades/venta');
    revalidatePath('/propiedades/alquiler');
    // Con el patrón de la ruta dinámica + 'page'. Antes apuntaban al segmento
    // padre con 'layout', pero ahí no hay ningún layout.tsx: el tag no existía
    // y estas landings no se revalidaban nunca por webhook.
    revalidatePath('/propiedades/ciudad/[ciudad]', 'page');
    revalidatePath('/propiedades/tipo/[tipo]', 'page');
    revalidatePath('/');
    revalidatePath('/faq');
    // Estas no muestran propiedades, pero su footer lista las ciudades y tipos
    // que sí tienen publicadas
    revalidatePath('/contacto');
    revalidatePath('/sobre-nosotros');
    revalidatePath('/terminos');
    revalidatePath('/privacidad');
    // El sitemap lista las propiedades y las landings de ciudad/tipo: si no se
    // revalida acá, se queda con el estado del último deploy
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ revalidated: true, slug: slug ?? null });
  } catch {
    return NextResponse.json({ message: 'Error parsing body' }, { status: 400 });
  }
}
