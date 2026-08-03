import type { Property } from './types';

/** "12 × 50 m" — null si falta alguna de las dos medidas (lote irregular) */
export function formatLotSize(features: Property['features']): string | null {
  const { lotWidth, lotDepth } = features;
  if (!lotWidth || !lotDepth) return null;
  const m = (n: number) => n.toLocaleString('es-AR', { maximumFractionDigits: 2 });
  return `${m(lotWidth)} × ${m(lotDepth)} m`;
}

export function slugifyCity(city: string): string {
  return city
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export function deslugifyCity(cities: string[], slug: string): string | undefined {
  return cities.find((c) => slugifyCity(c) === slug);
}
