import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
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
