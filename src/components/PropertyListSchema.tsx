import { propertyListSchema } from '@/lib/schema';
import { safeJsonLd } from '@/lib/safe-json-ld';
import type { Property } from '@/lib/types';

/** ItemList de las páginas de listado — Server Component: el JSON-LD tiene que
 *  estar en el HTML, no inyectarse desde el cliente */
export default function PropertyListSchema({
  properties,
  name,
  path,
}: {
  properties: Property[];
  name: string;
  path: string;
}) {
  if (properties.length === 0) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(propertyListSchema(properties, { name, path })) }}
    />
  );
}
