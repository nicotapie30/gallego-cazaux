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

    if (slug) {
      revalidatePath(`/propiedades/${slug}`);
    }

    revalidatePath('/propiedades');
    revalidatePath('/propiedades/venta');
    revalidatePath('/propiedades/alquiler');
    revalidatePath('/propiedades/ciudad', 'layout');
    revalidatePath('/propiedades/tipo', 'layout');
    revalidatePath('/');
    revalidatePath('/faq');

    return NextResponse.json({ revalidated: true, slug: slug ?? null });
  } catch {
    return NextResponse.json({ message: 'Error parsing body' }, { status: 400 });
  }
}
