'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const UNSPLASH_IMAGE = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800';

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Gốm Hội An',
    price: 1200000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '2',
    name: 'Gốm Hội An',
    price: 1500000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '3',
    name: 'Gốm Hội An',
    price: 980000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '4',
    name: 'Gốm Hội An',
    price: 2100000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '5',
    name: 'Gốm Hội An',
    price: 1350000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '6',
    name: 'Gốm Hội An',
    price: 1650000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '7',
    name: 'Gốm Hội An',
    price: 2200000,
    image: UNSPLASH_IMAGE,
  },
  {
    id: '8',
    name: 'Gốm Hội An',
    price: 1800000,
    image: UNSPLASH_IMAGE,
  },
];

interface ProductGridProps {
  className?: string;
}

export function ProductGrid({ className }: ProductGridProps) {
  return (
    <div className={cn('w-full px-4 py-8 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden rounded-lg bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-serif text-lg text-gray-900">{product.name}</h3>
          <p className="font-serif text-sm font-semibold text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}
