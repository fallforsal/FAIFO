import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getProducts } from '@/app/actions/product.actions';

// Không dùng 'use client' ở đây nữa để nó thành Server Component

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

interface ProductGridProps {
  className?: string;
}

export async function ProductGrid({ className }: ProductGridProps) {
  // Gọi trực tiếp Server Action để lấy data thật từ DB
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  if (products.length === 0) {
    return (
      <div className="text-center py-20 font-serif text-gray-500">
        Hiện tại chưa có tác phẩm nào trong cửa hàng.
      </div>
    );
  }

  return (
    <div className={cn('w-full px-4 py-8 sm:px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Bắt buộc phải có type bất kỳ (any) hoặc type chuẩn từ DB, ở đây tôi dùng Type nhanh
function ProductCard({ product }: { product: any }) {
  // Lấy ảnh đầu tiên trong mảng images, nếu mảng rỗng thì dùng ảnh mặc định
  const thumbnailUrl = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800';

  return (
    <div className="group">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden rounded-lg bg-[#FDF9F3]">
          <img
            src={thumbnailUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-serif text-lg text-[#2D2926] uppercase tracking-wide truncate">
            {product.name}
          </h3>
          <p className="font-sans text-sm font-semibold text-[#2D2926]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}