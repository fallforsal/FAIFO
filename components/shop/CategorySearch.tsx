import Link from 'next/link';
import { getProducts } from '@/app/actions/product.actions';

export async function CategorySearch() {
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  // Gom nhóm sản phẩm theo Category (Loại bỏ trùng lặp)
  const categoriesMap = new Map();
  products.forEach((product) => {
    if (product.category && !categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, {
        name: product.category,
        img: Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop'
      });
    }
  });

  const categories = Array.from(categoriesMap.values());

  if (categories.length === 0) return null;

  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-serif mb-2 tracking-wide">Search by category</h2>
        <p className="text-sm text-[#2D2926]/60 font-sans mb-14 italic text-center max-w-2xl leading-relaxed">
          Tác phẩm được định hình bởi dòng chảy thời gian, mùa màng và hoài niệm. Chọn cho bạn một danh mục khởi nguồn.
        </p>

        <div className="flex flex-wrap justify-center gap-x-10 gap-y-12 w-full">
          {categories.map((cat, idx) => (
            <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} key={idx} className="group flex flex-col items-center text-center w-24 md:w-32">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-5 rounded-sm overflow-hidden flex items-center justify-center transition-transform group-hover:-translate-y-1 duration-300">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-widest text-[#2D2926] border-b border-transparent border-dashed group-hover:border-[#2D2926]/40 pb-1 px-1 transition-all leading-relaxed text-center w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}