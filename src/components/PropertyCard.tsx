"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bed, Bath, Ruler, Car, MapPin } from '@/lib/icons';
import type { Property } from '@/lib/types';

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -5 },
};

const transition = { duration: 0.28, ease: [0, 0, 0.2, 1] as [number, number, number, number] };

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const href = `/propiedades/${property.slug.current}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if ('startViewTransition' in document) {
      (document as Document & { startViewTransition(cb: () => void): void }).startViewTransition(
        () => router.push(href)
      );
    } else {
      router.push(href);
    }
  };

  const formatPrice = (price: number, currency: string) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);

  const operationLabel = property.operation === 'venta' ? 'Venta' : 'Alquiler';
  const operationColor = property.operation === 'venta' ? 'bg-primary' : 'bg-blue-600';

  const hasFeatures =
    property.features.bedrooms ||
    property.features.bathrooms ||
    property.features.coveredArea ||
    property.features.garage;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      animate="rest"
      variants={cardVariants}
      transition={transition}
      className="rounded-xl overflow-hidden bg-white border border-border hover:shadow-lg hover:border-primary/40 transition-shadow transition-colors duration-300"
    >
      <Link href={href} onClick={handleClick} className="block">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-background-alt">
          {property.images && property.images.length > 0 ? (
            <img
              src={property.images[0]?.asset?.url}
              alt={property.title}
              className="w-full h-full object-cover"
              style={{ viewTransitionName: `prop-img-${property._id}`, borderRadius: '0.75rem' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-border" />
            </div>
          )}

          <span className={`absolute top-3 left-3 px-2.5 py-1 ${operationColor} text-white text-xs font-semibold rounded-full`}>
            {operationLabel}
          </span>

          {property.isFeatured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
              Destacado
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="font-outfit font-bold text-xl text-primary mb-1">
            {formatPrice(property.price, property.currency)}
          </div>

          <h3 className="font-outfit font-semibold text-gray text-sm mb-1.5 line-clamp-1">
            {property.title}
          </h3>

          <p className="flex items-center gap-1 text-muted text-xs mb-3">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {property.address}, {property.city}
          </p>

          {hasFeatures && (
            <div className="flex items-center gap-3 text-muted text-xs pt-3 border-t border-border">
              {property.features.bedrooms && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5" />
                  {property.features.bedrooms}
                </span>
              )}
              {property.features.bathrooms && (
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5" />
                  {property.features.bathrooms}
                </span>
              )}
              {property.features.coveredArea && (
                <span className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5" />
                  {property.features.coveredArea} m²
                </span>
              )}
              {property.features.garage && (
                <span className="flex items-center gap-1 ml-auto">
                  <Car className="w-3.5 h-3.5" />
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
