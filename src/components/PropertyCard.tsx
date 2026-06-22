"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const MotionImage = motion.create(Image);
import { Bed, Bath, Ruler, Car, MapPin } from '@/lib/icons';
import type { Property } from '@/lib/types';
import { urlFor } from '@/lib/sanity';

const cardVariants = {
  rest: {
    y: 0,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
  },
  hover: {
    y: -4,
    boxShadow: '0 16px 40px rgba(1,143,51,0.13), 0 6px 16px rgba(0,0,0,0.07)',
  },
};

const transition = { duration: 0.28, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const router = useRouter();
  const href = `/propiedades/${property.slug.current}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const img = (e.currentTarget as HTMLElement).querySelector('img');
    if (img) {
      img.style.transition = 'none';
      img.style.transform = 'none';
    }
    if ('startViewTransition' in document) {
      (document as Document & { startViewTransition(cb: () => void): void }).startViewTransition(
        () => router.push(href)
      );
    } else {
      router.push(href);
    }
  };

  const formatPrice = (price: number | null | undefined, currency: string, priceOnRequest?: boolean) => {
    if (priceOnRequest || price == null || price === 0) return 'Consultar precio';
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: currency || 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const operationLabel = property.operation === 'venta' ? 'Venta' : 'Alquiler';
  const operationBg = property.operation === 'venta' ? 'bg-primary/90' : 'bg-blue-600/90';

  const hasFeatures =
    property.features.bedrooms ||
    property.features.bathrooms ||
    property.features.coveredArea ||
    property.features.garage;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.985 }}
      animate="rest"
      variants={cardVariants}
      transition={transition}
      className="group relative rounded-2xl overflow-hidden bg-white border border-border hover:border-primary/25 transition-colors duration-300 cursor-pointer h-full"
    >
      {/* Bottom border accent — slides in left→right on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary z-10 pointer-events-none"
        variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
        transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        style={{ originX: 0 }}
      />

      <Link href={href} onClick={handleClick} className="flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
          {/* Blurred backdrop — fills letterbox areas for any image ratio */}
          {property.images && property.images.length > 0 && (
            <>
              <div
                className="absolute inset-0 scale-110"
                style={{
                  backgroundImage: `url(${urlFor(property.images[0]!).width(40).url()})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(40px)',
                }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}
          {property.images && property.images.length > 0 ? (
            <MotionImage
              src={urlFor(property.images[0]!).width(600).url()}
              alt={property.title}
              fill
              className="object-contain"
              style={{ viewTransitionName: `prop-img-${property._id}` }}
              variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }}
              transition={transition}
              sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(50vw - 3rem), 600px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-background-alt">
              <MapPin className="w-10 h-10 text-border" />
            </div>
          )}

          {/* Bottom gradient — legibility without color overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent pointer-events-none" />

          {/* Badges */}
          <span className={`absolute top-3 left-3 px-2.5 py-1 ${operationBg} backdrop-blur-sm text-white text-xs font-semibold rounded-full`}>
            {operationLabel}
          </span>

          {property.isFeatured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 bg-secondary/85 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
              Destacado
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Price */}
          <div className="mb-2.5">
            {(property.priceOnRequest || property.price == null || property.price === 0) ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary bg-secondary/7 border border-secondary/12 px-3 py-1.5 rounded-full">
                Consultar precio
              </span>
            ) : (
              <span className="font-outfit font-bold text-2xl text-primary leading-none">
                {formatPrice(property.price, property.currency)}
              </span>
            )}
          </div>

          <h3 className="font-outfit font-semibold text-secondary text-sm leading-snug mb-2 line-clamp-2">
            {property.title}
          </h3>

          <p className="flex items-center gap-1.5 text-muted text-xs line-clamp-1">
            <MapPin className="w-3 h-3 flex-shrink-0 text-primary/50" />
            {property.address}, {property.city}
          </p>

          {/* Features row */}
          {hasFeatures && (
            <div className="flex items-center gap-3 text-xs text-muted pt-4 mt-4 border-t border-border">
              {property.features.bedrooms && (
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-secondary/40" />
                  <span className="font-medium text-secondary/70">{property.features.bedrooms}</span>
                  <span>dorm.</span>
                </span>
              )}
              {property.features.bathrooms && (
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-secondary/40" />
                  <span className="font-medium text-secondary/70">{property.features.bathrooms}</span>
                  <span>baños</span>
                </span>
              )}
              {property.features.coveredArea && (
                <span className="flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-secondary/40" />
                  <span className="font-medium text-secondary/70">{property.features.coveredArea}</span>
                  <span>m²</span>
                </span>
              )}
              {property.features.garage && !property.features.bedrooms && !property.features.bathrooms && !property.features.coveredArea && (
                <span className="flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-secondary/40" />
                  <span>Cochera</span>
                </span>
              )}
            </div>
          )}

          {/* CTA — solo en hover, siempre abajo */}
          <div className="flex justify-end mt-auto pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-xs text-primary font-medium flex items-center gap-1">
              Ver propiedad
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
