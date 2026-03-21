import { ProductGrid } from '@/components/shop/product-grid';
import { CategorySearch } from '@/components/shop/CategorySearch';
import { RecentlyViewed } from '@/components/shop/RecentlyViewed';
import Link from 'next/link';

export const metadata = {
  title: 'Bộ Sưu Tập Gốm | Chuyện Trong Tay',
  description: 'Bộ sưu tập gốm sứ thủ công tinh tuyển từ xưởng gốm Hội An.',
};

interface PageProps {
  searchParams: { sort?: string; category?: string; q?: string };
}
const CATEGORY_INFO: Record<string, { title: string; description: string; image: string }> = {
  "Trà Cụ": {
    title: "TRÀ CỤ",
    description: "Những tác phẩm gốm dành riêng cho nghệ thuật thưởng trà. Được chế tác để giữ trọn hương vị và mang lại cảm giác tĩnh tại trong từng chén trà nóng.",
    image: "tracunghethuat.webp"
  },
  "Bát Đĩa": {
    title: "BÁT ĐĨA",
    description: "Nâng tầm bữa ăn gia đình bằng vẻ đẹp mộc mạc của gốm thủ công. Mỗi chiếc bát, chiếc đĩa đều mang hơi ấm của đôi bàn tay nghệ nhân Hội An.",
    image: "batdianghethuat.webp"
  },
  "Bình Hoa": {
    title: "BÌNH HOA",
    description: "Sự giao thoa giữa hoa lá và đất nung. Những dáng bình thanh thoát giúp không gian sống trở nên thơ mộng và tràn đầy cảm hứng.",
    image: "vasenghethuat.png"
  }
};
export default function ShopPage({ searchParams }: {
  searchParams: { category?: string; sort?: string; q?: string };
}) {
  const category = searchParams.category;
  const info = category ? CATEGORY_INFO[category] : null;
  return (
    <div className="w-full bg-[#FDF9F3] text-[#2D2926] font-light min-h-screen flex flex-col pt-4 sm:pt-8 pb-12 selection:bg-[#2D2926]/10">

      {/* HEADER SECTION: Động dựa trên Category */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        {!info ? (
          /* KIỂU MẶC ĐỊNH (Khi chưa chọn Category) */
          <div className="text-center py-10">
            <h1 className="font-serif text-3xl sm:text-[2.75rem] font-extralight tracking-tight text-[#2D2926] mb-8 leading-tight uppercase">
              Bộ Sưu Tập Gốm
            </h1>
            <p className="max-w-2xl mx-auto text-[13px] font-sans text-[#2D2926]/60 leading-relaxed font-light tracking-wide">
              Chút hoài niệm Hội An trong từng nếp gốm chế tác thủ công. <br className="hidden sm:block" />
              Nơi vẻ đẹp tối giản đan xen cùng dòng chảy thời gian.
            </p>
          </div>
        ) : (
          /* KIỂU TO-SAI (Khi đã chọn Category) */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Bên trái: Giới thiệu */}
            <div className="space-y-6 order-2 md:order-1">
              <h1 className="font-serif text-4xl md:text-5xl font-extralight tracking-wider text-[#2D2926] uppercase">
                {info.title}
              </h1>
              <p className="max-w-md text-[14px] font-sans text-[#2D2926]/70 leading-relaxed italic">
                {info.description}
              </p>
            </div>

            {/* Bên phải: Hình minh họa to */}
            <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-white/20 order-1 md:order-2">
              <img
                src={info.image}
                alt={info.title}
                className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-opacity duration-700"
              />
            </div>
          </div>
        )}
      </section>



      {/* 3. Utility Toolbar & Main Product Grid */}
      <section className="flex-1 pb-24 w-full bg-[#FDF9F3] relative pt-12">

        {/* Utility Toolbar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex justify-end">
          <div className="relative group cursor-pointer z-30">
            <div className="flex items-center gap-3 text-[11px] tracking-widest font-sans uppercase border-b border-[#2D2926]/20 pb-2 hover:border-[#2D2926]/50 transition-colors">
              <span className="text-[#2D2926]/80 group-hover:text-[#2D2926] transition-colors">NỔI BẬT</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50 group-hover:opacity-100 transition-opacity">
                <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Sort Dropdown Options */}
            <div className="absolute top-full right-0 mt-0 w-48 bg-[#FDF9F3] border border-[#2D2926]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex flex-col shadow-sm">
              <Link href="/shop?sort=best-selling" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap text-right">BÁN CHẠY NHẤT</Link>
              <Link href="/shop?sort=new-arrivals" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap text-right">MỚI NHẤT</Link>
              <Link href="/shop?sort=price-asc" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap text-right">GIÁ (THẤP ĐẾN CAO)</Link>
              <Link href="/shop?sort=price-desc" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest transition-colors whitespace-nowrap text-right">GIÁ (CAO XUỐNG THẤP)</Link>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid searchParams={searchParams} />
      </section>

      {/* 4. Recently Viewed */}
      <div className="w-full bg-[#FDF9F3] border-t border-[#2D2926]/10 pt-4">
        <RecentlyViewed />
      </div>
      {/* 2. On-page Category Browse */}
      <div className="w-full bg-[#FDF9F3] relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#2D2926]/10"></div>
        <CategorySearch />
      </div>
    </div>
  );
}
