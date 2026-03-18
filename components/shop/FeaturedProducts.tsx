import Link from 'next/link';

const featuredItems = [
  { id: '1', name: 'BÌNH GỐM MEN LAM CỔ KHẢM THUYỀN', price: 1250000, img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800' },
  { id: '2', name: 'ẤM TRÀ TỬ SA QUAI ĐỒNG LỤC GIÁC', price: 3400000, img: 'https://images.unsplash.com/photo-1594631252845-29fc4e8c7152?q=80&w=800' },
  { id: '3', name: 'BÁT CHÁU UỐNG TRÀ SEN HỘI AN', price: 850000, img: 'https://images.unsplash.com/photo-1558223637-2fb0aa19ed81?q=80&w=800' },
  { id: '4', name: 'ĐĨA TỨ QUÝ MÙA XUÂN SỨ SƯƠNG', price: 2100000, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800' },
];

export function FeaturedProducts() {
  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-[22px] font-serif mb-12 tracking-wide text-left">
          Featured products
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {featuredItems.map((item) => (
            <Link href={`/shop/${item.id}`} key={item.id} className="group block">
              <div className="aspect-square bg-white/40 overflow-hidden mb-5 rounded-sm border border-transparent group-hover:border-[#2D2926]/5 transition-colors duration-300">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-95" 
                />
              </div>
              <h3 className="font-sans text-[11px] md:text-xs uppercase tracking-[0.15em] text-[#2D2926] leading-relaxed mb-2 line-clamp-2 min-h-[40px]">
                {item.name}
              </h3>
              <p className="font-serif text-[15px] text-[#2D2926]">
                {item.price.toLocaleString("vi-VN")} đ
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
