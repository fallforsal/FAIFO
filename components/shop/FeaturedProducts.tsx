import Link from 'next/link';
import { getProducts } from '@/app/actions/product.actions';

export async function FeaturedProducts() {
  // 1. Fetch data thật từ DB
  const result = await getProducts();

  // 2. Lấy 4 sản phẩm mới nhất
  const featuredItems = result.success && result.data ? result.data.slice(0, 4) : [];

  if (featuredItems.length === 0) return null;

  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-16 px-4 sm:px-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[22px] font-serif mb-12 tracking-wide text-left">
          Featured products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {featuredItems.map((item) => {
            // Lấy ảnh thumbnail an toàn
            const thumbnailUrl = Array.isArray(item.images) && item.images.length > 0
              ? item.images[0]
              : 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800';

            return (
              <Link href={`/shop/${item.id}`} key={item.id} className="group block">
                <div className="aspect-square bg-[#FDF9F3] overflow-hidden mb-5 rounded-sm border border-transparent group-hover:border-[#2D2926]/5 transition-colors duration-300">
                  <img
                    src={thumbnailUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-95"
                  />
                </div>
                <h3 className="font-sans text-[11px] md:text-xs uppercase tracking-[0.15em] text-[#2D2926] leading-relaxed mb-2 line-clamp-2 min-h-[40px]">
                  {item.name}
                </h3>
                <p className="font-serif text-[15px] text-[#2D2926]">
                  {item.price.toLocaleString("vi-VN")} đ
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}