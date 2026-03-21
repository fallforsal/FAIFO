import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getProducts } from '@/app/actions/product.actions';

// Không dùng 'use client' ở đây nữa để nó thành Server Component

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

// Cập nhật interface: Thêm className vào để Next.js không báo lỗi đỏ
interface ProductGridProps {
  searchParams: { sort?: string; category?: string; q?: string };
  className?: string;
}

// BƯỚC 1: Hứng searchParams ở đây
export async function ProductGrid({ searchParams, className }: ProductGridProps) {

  // BƯỚC 2: Truyền searchParams vào API để báo cho DB biết ông muốn lọc/sắp xếp thế nào
  const result = await getProducts(searchParams);
  const products = result.success && result.data ? result.data : [];

  if (products.length === 0) {
    return (
      <div className="text-center py-20 font-serif text-[#2D2926]/50 uppercase tracking-widest text-[13px]">
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

// Giữ nguyên ProductCard của ông
function ProductCard({ product }: { product: any }) {
  const thumbnailUrl = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800';

  return (
    <div className="group">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden rounded-sm bg-[#FDF9F3]">
          <img
            src={thumbnailUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
          />
        </div>
        <div className="mt-4 space-y-2">
          <h3 className="font-serif text-[14px] text-[#2D2926] leading-relaxed line-clamp-2 font-light">
            {product.name}
          </h3>
          <p className="font-sans text-[13px] font-medium text-[#2D2926]">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    </div>
  );
}