import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SchemaMarkup from './SchemaMarkup';
import { breadcrumbSchema } from '../lib/schema';

export default function Breadcrumbs({ items }) {
  const schema = breadcrumbSchema(items);
  return (
    <>
      <SchemaMarkup schema={schema} />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ol className="flex items-center gap-1 text-sm text-text-muted flex-wrap">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight size={14} className="text-text-muted/50" />}
              {i < items.length - 1 ? (
                <Link href={item.path} className="hover:text-primary transition-colors">{item.name}</Link>
              ) : (
                <span className="text-text-dark font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
