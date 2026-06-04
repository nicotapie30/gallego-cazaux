"use client";

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, X, Home } from '@/lib/icons';
import PropertyCard from '@/components/PropertyCard';
import Select from '@/components/ui/Select';
import { mockProperties } from '@/lib/mock-data';

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


interface FilterPanelProps {
  filters: Filters;
  search: string;
  onFiltersChange: (f: Filters) => void;
  onSearchChange: (s: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

function FilterPanel({ filters, search, onFiltersChange, onSearchChange, onClear, hasActiveFilters }: FilterPanelProps) {
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
          options={[
            { value: '', label: 'Todas las ciudades' },
            { value: 'Santa Rosa', label: 'Santa Rosa' },
            { value: 'Toay', label: 'Toay' },
            { value: 'General Pico', label: 'General Pico' },
          ]}
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

function PropiedadesContent() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    operation: searchParams.get('operation') ?? '',
    propertyType: searchParams.get('type') ?? '',
  });
  const [sortBy, setSortBy] = useState('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredProperties = useMemo(() => {
    return mockProperties
      .filter((p) => {
        if (filters.operation && p.operation !== filters.operation) return false;
        if (filters.propertyType && p.propertyType !== filters.propertyType) return false;
        if (filters.city && p.city !== filters.city) return false;
        if (filters.minPrice && p.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
        if (filters.bedrooms && (!p.features.bedrooms || p.features.bedrooms < Number(filters.bedrooms))) return false;
        if (search) {
          const q = search.toLowerCase();
          if (!p.title.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_asc') return a.price - b.price;
        if (sortBy === 'price_desc') return b.price - a.price;
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      });
  }, [filters, sortBy, search]);

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

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
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

export default function PropiedadesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background-alt" />}>
      <PropiedadesContent />
    </Suspense>
  );
}
