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
    image: "batdianghethuat4.jpg"
  }
};
export default function ShopPage({ searchParams }: {
  searchParams: { category?: string; sort?: string; q?: string };
}) {
  const category = searchParams.category;
  const info = category ? CATEGORY_INFO[category] : null;
  return (
    <div className="w-full bg-[#FDF9F3] text-[#2D2926] font-light min-h-screen flex flex-col pt-4 sm:pt-8 pb-12 selection:bg-[#2D2926]/10">

      {/* HEADER SECTION: CHUẨN TO-SAI - CHIA ĐÔI & TỶ LỆ ẢNH LƠ LỬNG */}
      <section className="w-screen ml-[calc(50%-50vw)] border-b border-[#2D2926]/10 mb-12 bg-[#FDF9F3]">
        {!info ? (
          /* KIỂU MẶC ĐỊNH */
          <div className="text-center py-16 lg:py-24 px-4 max-w-7xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl font-extralight tracking-widest text-[#2D2926] mb-6 uppercase">
              Bộ Sưu Tập Gốm
            </h1>
            <p className="max-w-2xl mx-auto text-[13px] font-sans text-[#2D2926]/60 leading-loose tracking-wide font-light">
              Chút hoài niệm Hội An trong từng nếp gốm chế tác thủ công. <br className="hidden sm:block" />
              Nơi vẻ đẹp tối giản đan xen cùng dòng chảy thời gian.
            </p>
          </div>
        ) : (
          /* CẤU TRÚC 2 CỘT: Dùng Flexbox an toàn, ép chiều cao h-[400px] */
          <div className="flex flex-col md:flex-row w-full h-auto md:h-[380px] lg:h-[450px]">

            {/* CỘT 1 (Bên trái): Nền tệp với web, căn giữa Text */}
            <div className="w-full md:w-1/2 flex justify-center items-center px-6 py-16 md:py-0 bg-[#FDF9F3]">
              <div className="w-full max-w-md flex flex-col items-center text-center space-y-5">
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-extralight tracking-[0.2em] text-[#2D2926] uppercase leading-tight">
                  {info.title}
                </h1>
                <p className="text-[13px] md:text-[14px] font-sans text-[#2D2926]/80 leading-relaxed font-light tracking-wide">
                  {info.description}
                </p>
              </div>
            </div>

            {/* CỘT 2 (Bên phải): Thêm bg-đen 2% để phân tách tinh tế như To-sai */}
            {/* overflow-hidden khóa chặt, không cho bất kỳ thứ gì tràn ra ngoài */}
            <div className="w-full md:w-1/2 flex justify-center items-center bg-[#2D2926]/[0.02] relative overflow-hidden py-12 md:py-0">
              <img
                src={info.image}
                alt={info.title}
                // CHÌA KHÓA: Đổi w-full h-full thành max-w-[75%] max-h-[75%]. 
                // Ảnh sẽ luôn nhỏ hơn khung chứa 25%, lơ lửng ở giữa đúng phong cách vẽ tay.
                className="max-w-[75%] max-h-[75%] object-contain mix-blend-darken transition-transform duration-700 hover:scale-105"
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
