import Link from 'next/link';
import { ChevronRight, Home } from '@/lib/icons';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center gap-1 text-sm">
          <li>
            <Link href="/" className="text-gray-light hover:text-primary transition-colors">
              <Home className="w-4 h-4" />
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1">
              <ChevronRight className="w-4 h-4 text-gray-300" />
              {item.href ? (
                <Link href={item.href} className="text-gray-light hover:text-primary transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}