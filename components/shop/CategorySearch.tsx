import Link from 'next/link';
import { getProducts } from '@/app/actions/product.actions';

const FIXED_CATEGORIES = [
  "Trà Cụ",
  "Bát Đĩa",
  "Bình Hoa"
];

export async function CategorySearch() {
  const result = await getProducts();
  const products = result.success && result.data ? result.data : [];

  const categories = FIXED_CATEGORIES.map((categoryName) => {
    // Find checking ignoring case and extra spaces just to be robust
    const matchingProduct = products.find(p => p.category?.trim().toLowerCase() === categoryName.trim().toLowerCase());
    const imgUrl = (matchingProduct && Array.isArray(matchingProduct.images) && matchingProduct.images.length > 0)
      ? matchingProduct.images[0]
      : 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop';

    return { name: categoryName, img: imgUrl };
  });

  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-[13px] uppercase tracking-[0.2em] font-sans font-light mb-4 text-[#2D2926]/50">Danh mục</h2>
        <p className="text-[14px] font-serif mb-16 italic text-center max-w-xl leading-relaxed text-[#2D2926]">
          Tác phẩm được định hình bởi dòng chảy thời gian, mùa màng và hoài niệm. Chọn cho bạn một danh mục khởi nguồn.
        </p>

        <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 w-full">
          {categories.map((cat, idx) => (
            <Link href={`/shop?category=${encodeURIComponent(cat.name)}`} key={idx} className="group flex flex-col items-center text-center w-24 md:w-32">
              <div className="w-16 h-16 md:w-24 md:h-24 mb-6 rounded-sm overflow-hidden flex items-center justify-center transition-transform group-hover:-translate-y-2 duration-500 ease-out bg-white/20">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply drop-shadow-sm"
                />
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-[#2D2926]/80 group-hover:text-[#2D2926] border-b border-transparent group-hover:border-[#2D2926]/30 pb-1 px-1 transition-all leading-relaxed text-center w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}