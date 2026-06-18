"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, Home, ChevronLeft, ChevronRight } from '@/lib/icons';
import PropertyCard from '@/components/PropertyCard';
import Select from '@/components/ui/Select';
import type { Property } from '@/lib/types';

type Filters = {
  operation: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  city: string;
};

const defaultFilters: Filters = {
  operation: '',
  propertyType: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  city: '',
};

const OPERATION_OPTIONS = [
  { value: '', label: 'Todas' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
];

const TYPE_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'casa', label: 'Casa' },
  { value: 'departamento', label: 'Depto.' },
  { value: 'ph', label: 'PH' },
  { value: 'terreno', label: 'Terreno' },
  { value: 'local', label: 'Local' },
];

const BEDROOM_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Más reciente' },
  { value: 'price_asc', label: 'Menor precio' },
  { value: 'price_desc', label: 'Mayor precio' },
];

const PAGE_SIZE = 12;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages: (number | 'ellipsis')[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('ellipsis');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-10">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-border text-gray hover:bg-background-alt hover:border-primary/30 hover:text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Página anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`e-${i}`} className="w-9 text-center text-muted text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              p === currentPage
                ? 'bg-primary text-white'
                : 'border border-border text-gray hover:bg-background-alt hover:border-primary/30 hover:text-primary'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-border text-gray hover:bg-background-alt hover:border-primary/30 hover:text-primary transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Página siguiente"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}


interface FilterPanelProps {
  filters: Filters;
  search: string;
  onFiltersChange: (f: Filters) => void;
  onSearchChange: (s: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  cityOptions: { value: string; label: string }[];
}

function FilterPanel({ filters, search, onFiltersChange, onSearchChange, onClear, hasActiveFilters, cityOptions }: FilterPanelProps) {
  const setFilter = (key: keyof Filters, value: string) =>
    onFiltersChange({ ...filters, [key]: value });

  const toggle = (key: keyof Filters, value: string) =>
    setFilter(key, filters[key] === value ? '' : value);

  return (
    <div className="bg-white rounded-xl border border-border p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-outfit font-semibold text-secondary text-base">Filtros</h2>
        {hasActiveFilters && (
          <button onClick={onClear} className="text-sm text-primary hover:underline">
            Limpiar todo
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Buscar</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted" />
          <input
            type="text"
            placeholder="Dirección o título..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-border rounded-lg text-sm text-gray placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Operation */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Operación</label>
        <div className="flex gap-2">
          {OPERATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle('operation', opt.value)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filters.operation === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-background-alt text-gray hover:bg-gray-100 border border-border'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Tipo</label>
        <div className="flex flex-wrap gap-2">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle('propertyType', opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filters.propertyType === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-background-alt text-gray hover:bg-gray-100 border border-border'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Precio</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Mín"
            value={filters.minPrice}
            onChange={(e) => setFilter('minPrice', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm text-gray placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <input
            type="number"
            placeholder="Máx"
            value={filters.maxPrice}
            onChange={(e) => setFilter('maxPrice', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm text-gray placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Dormitorios</label>
        <div className="flex flex-wrap gap-2">
          {BEDROOM_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => toggle('bedrooms', opt.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                filters.bedrooms === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-background-alt text-gray hover:bg-gray-100 border border-border'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray mb-2">Ciudad</label>
        <Select
          value={filters.city}
          onChange={(v) => setFilter('city', v)}
          options={[{ value: '', label: 'Todas las ciudades' }, ...cityOptions]}
          className="w-full [&>button]:w-full [&>button]:justify-between"
        />
      </div>
    </div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="text-center py-20 bg-white rounded-xl border border-border">
      <div className="w-16 h-16 rounded-2xl bg-background-alt flex items-center justify-center mx-auto mb-4">
        <Home className="w-8 h-8 text-border" />
      </div>
      <h3 className="font-outfit font-semibold text-secondary mb-2">Sin resultados</h3>
      <p className="text-muted text-sm mb-6 max-w-xs mx-auto">
        No encontramos propiedades con esos filtros. Probá cambiando algún criterio.
      </p>
      <button
        onClick={onClear}
        className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        Limpiar filtros
      </button>
    </div>
  );
}

function PropiedadesContent({ initialProperties }: { initialProperties: Property[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    operation: searchParams.get('operation') ?? '',
    propertyType: searchParams.get('type') ?? '',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');
  const isMounted = useRef(false);
  const filterSignature = useRef<string | null>(null);

  // Derived from URL — single source of truth for sharing
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? '1'));

  const cityOptions = useMemo(() => {
    const cities = [...new Set(initialProperties.map((p) => p.city).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'es-AR')
    );
    return cities.map((c) => ({ value: c, label: c }));
  }, [initialProperties]);

  const filteredProperties = useMemo(() => {
    return initialProperties
      .filter((p) => {
        if (filters.operation && p.operation !== filters.operation) return false;
        if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
        if (filters.city && p.city !== filters.city) return false;
        if (filters.minPrice && (p.price == null || p.price < Number(filters.minPrice))) return false;
        if (filters.maxPrice && (p.price == null || p.price > Number(filters.maxPrice))) return false;
        if (filters.bedrooms && (!p.features.bedrooms || p.features.bedrooms < Number(filters.bedrooms))) return false;
        if (search) {
          const q = search.toLowerCase();
          if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return (a.price ?? 0) - (b.price ?? 0);
        if (sortBy === 'price_desc') return (b.price ?? 0) - (a.price ?? 0);
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [filters, sortBy, search, initialProperties]);

  // When filters/sort/search change, clear page param from URL (reset to page 1)
  // Uses signature comparison — safe against React Strict Mode double-invocation
  useEffect(() => {
    const sig = `${filters.operation}|${filters.propertyType}|${filters.city}|${filters.minPrice}|${filters.maxPrice}|${filters.bedrooms}|${sortBy}|${search}`;
    const prev = filterSignature.current;
    filterSignature.current = sig;
    if (prev === null || prev === sig) return; // mount or no change
    if (!searchParams.has('page')) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page');
    const qs = params.toString();
    router.replace(qs ? `/propiedades?${qs}` : '/propiedades', { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortBy, search]);

  // Scroll to top after page change (skip mount)
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(filteredProperties.length / PAGE_SIZE);
  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProperties.slice(start, start + PAGE_SIZE);
  }, [filteredProperties, currentPage]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const qs = params.toString();
    router.replace(qs ? `/propiedades?${qs}` : '/propiedades', { scroll: false });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '') || search !== '';
  const activeFilterCount = Object.values(filters).filter((v) => v !== '').length + (search ? 1 : 0);

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearch('');
  };

  return (
    <div className="min-h-screen bg-background-alt">
      {/* Header */}
      <div className="bg-secondary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-center gap-2 text-white/40 text-sm mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Inicio</Link>
            <span>/</span>
            <span className="text-white/70">Propiedades</span>
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl font-bold text-white mb-3">
            Nuestras Propiedades
          </h1>
          <p className="text-white/55 text-lg">
            Encontrá tu próximo hogar en Santa Rosa y La Pampa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            {/* Mobile toggle */}
            <button
              className="lg:hidden flex items-center gap-2 w-full px-4 py-3 bg-white border border-border rounded-xl mb-4 font-medium text-gray shadow-sm"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter className="w-4 h-4" />
              Filtros
              {hasActiveFilters && (
                <span className="ml-auto w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop */}
            <div className="hidden lg:block sticky top-24">
              <FilterPanel
                filters={filters}
                search={search}
                onFiltersChange={setFilters}
                onSearchChange={setSearch}
                onClear={clearFilters}
                hasActiveFilters={hasActiveFilters}
                cityOptions={cityOptions}
              />
            </div>
          </aside>

          {/* Grid area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted text-sm">
                <span className="font-semibold text-secondary">{filteredProperties.length}</span>{' '}
                {filteredProperties.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}
                {totalPages > 1 && (
                  <span className="ml-2 text-muted">· Página {currentPage} de {totalPages}</span>
                )}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted hidden sm:block">Ordenar:</span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                />
              </div>
            </div>

            {paginatedProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {paginatedProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            ) : (
              <EmptyState onClear={clearFilters} />
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 lg:hidden flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-outfit font-semibold text-secondary">Filtros</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-background-alt rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                <FilterPanel
                  filters={filters}
                  search={search}
                  onFiltersChange={setFilters}
                  onSearchChange={setSearch}
                  onClear={clearFilters}
                  hasActiveFilters={hasActiveFilters}
                  cityOptions={cityOptions}
                />
              </div>
              <div className="p-5 border-t border-border">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full py-3 bg-primary text-white font-medium rounded-xl text-sm hover:bg-primary-hover transition-colors"
                >
                  Ver {filteredProperties.length}{' '}
                  {filteredProperties.length === 1 ? 'propiedad' : 'propiedades'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PropiedadesClient({ initialProperties }: { initialProperties: Property[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-alt" />}>
      <PropiedadesContent initialProperties={initialProperties} />
    </Suspense>
  );
}
