import { timingSafeEqual } from 'crypto';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { SANITY_TAGS, type SanityTag } from '@/lib/sanity';

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;

  return timingSafeEqual(a, b);
}

function isKnownTag(value: unknown): value is SanityTag {
  return typeof value === 'string' && (SANITY_TAGS as readonly string[]).includes(value);
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!isValidSecret(secret)) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Se revalida por tag y no por path. revalidatePath('/propiedades/[slug]',
    // 'page') devolvía 200 sin invalidar nada: el patrón de ruta dinámica no
    // alcanza a las páginas que prerenderiza generateStaticParams, así que las
    // fichas, /propiedades/ciudad/* y /propiedades/tipo/* se quedaban con los
    // datos del último deploy hasta que vencía su hora. Los tags viven en los
    // fetch (src/lib/sanity.ts), de modo que cada página queda asociada al
    // contenido que consultó: no hay que enumerar rutas acá ni acordarse de
    // agregar la nueva cuando se suma una página, y un borrado o un cambio de
    // slug invalidan la ficha vieja igual que cualquier otra edición.
    // expire: 0 en vez del perfil 'max' que recomienda Next: con 'max' la
    // entrada queda stale-while-revalidate y el primero en entrar después de
    // la edición todavía ve lo viejo. El cliente carga una propiedad y la mira
    // enseguida, así que ese primer request tiene que esperar el dato fresco.
    const tags = isKnownTag(body?._type) ? [body._type as SanityTag] : SANITY_TAGS;
    tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));

    return NextResponse.json({ revalidated: true, tags });
  } catch {
    return NextResponse.json({ message: 'Error parsing body' }, { status: 400 });
  }
}
