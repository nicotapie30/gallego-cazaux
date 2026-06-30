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
