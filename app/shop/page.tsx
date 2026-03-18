import { ProductGrid } from '@/components/shop/product-grid';
import { cn } from '@/lib/utils';

export default function ShopPage() {
  return (
    <div className={cn('w-full')}>
      {/* Hero Section */}
      <section className="border-b border-gray-200 py-12 text-center sm:py-16">
        <h1 className="font-serif text-3xl font-light text-gray-900 sm:text-4xl">
          Shop
        </h1>
        <p className="mt-4 text-sm text-gray-600">
          Discover our carefully curated collection of authentic Hoi An ceramics
        </p>
      </section>

      {/* Products Grid */}
      <ProductGrid />
    </div>
  );
}
