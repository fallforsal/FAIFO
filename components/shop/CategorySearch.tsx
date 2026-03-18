import Link from 'next/link';

const categories = [
  { name: 'KUMIDASHI (CHÉN TRÀ QUÝ)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'TEACUP (TÁCH TRÀ)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'APPETIZER (BÁT & ĐĨA NAI)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'TEA BOWL (BÁT TRÀ QUY Y)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'SMALL ITEMS (PHỤ KIỆN)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'SAKEWARE (BÌNH RƯỢU SAKE)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'TEAPOTS AND TEA POTS (ẤM TRÀ)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'CHOPSTICK REST (KÊ ĐŨA)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'TEA CEREMONY UTENSILS (TRÀ CỤ)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'CALLIGRAPHY TOOLS (THƯ PHÁP)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'FLOWER VASE (BÌNH HOA)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
  { name: 'CLAY BELLS (CHUÔNG ĐẤT)', img: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?w=200&h=200&fit=crop' },
];

export function CategorySearch() {
  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-16 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-serif mb-2 tracking-wide">Search by category</h2>
        <p className="text-sm text-[#2D2926]/60 font-sans mb-14 italic text-center max-w-2xl leading-relaxed">
          Tác phẩm được định hình bởi dòng chảy thời gian, mùa màng và hoài niệm. Chọn cho bạn một danh mục khởi nguồn.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-x-6 gap-y-12 w-full justify-items-center">
          {categories.map((cat, idx) => (
            <Link href="/shop" key={idx} className="group flex flex-col items-center text-center w-full">
              <div className="w-16 h-16 md:w-20 md:h-20 mb-5 rounded-sm overflow-hidden flex items-center justify-center transition-transform group-hover:-translate-y-1 duration-300">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="object-contain w-full h-full mix-blend-multiply opacity-80" 
                />
              </div>
              <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-widest text-[#2D2926] border-b border-transparent border-dashed group-hover:border-[#2D2926]/40 pb-1 px-1 transition-all leading-relaxed break-words w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
