import Link from 'next/link';

import { getProducts } from '@/app/actions/product.actions'; // Import hàm gọi DB
import ProductCarousel from '@/components/shop/ProductCarousel';

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + ' đ';
};

export const metadata = {
  title: 'CHUYỆN TRONG TAY - Gốm Hội An',
  description: 'Mang câu chuyện thổi vào đất nung',
};

// Đổi thành async function để await data
export default async function HomePage() {
  // Lấy dữ liệu thật từ DB
  const result = await getProducts();

  // Lấy ra tối đa 5 sản phẩm mới nhất làm "Sản phẩm nổi bật"
  const featuredProducts = result.success && result.data ? result.data.slice(0, 5) : [];

  return (
    <main className="min-h-screen bg-[#FDF9F3]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-tight text-[#2D2926]">
                Mang câu chuyện thổi vào đất nung
              </h1>
              <p className="text-lg text-[#2D2926]/80 leading-relaxed max-w-lg font-sans">
                Mỗi chiếc gốm là một câu chuyện, mỗi sản phẩm là một kết nối giữa quá khứ và hiện tại.
                Bằng công nghệ NFC ẩn dưới đáy sản phẩm, chúng tôi bảo lưu lời chúc, nhật ký,
                và những khoảnh khắc quý giá của bạn.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-4 bg-[#2D2926] text-[#FDF9F3] font-serif uppercase tracking-widest text-sm hover:bg-[#C0593E] transition-colors duration-300"
              >
                Xem toàn bộ bộ sưu tập
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 sm:h-[500px] overflow-hidden bg-gray-200">
              <img
                src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800"
                alt="Gốm Hội An"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="space-y-4 mb-16 text-center sm:text-left">
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#2D2926] tracking-tight">
              Sản phẩm nổi bật
            </h2>

          </div>

          {/* Carousel Component mới - Xử lý nút bấm và vuốt */}
          <ProductCarousel products={featuredProducts} />

          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-block px-10 py-3 border border-[#2D2926]/20 text-[#2D2926] font-serif uppercase tracking-[0.2em] text-[11px] hover:bg-[#2D2926] hover:text-[#FDF9F3] transition-all duration-500"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#FDF9F3]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-8">
            <h2 className="font-serif text-4xl font-light text-[#2D2926]">
              Sẵn sàng khám phá?
            </h2>
            <p className="text-[#2D2926]/70 max-w-2xl mx-auto font-sans">
              Truy cập bộ sưu tập đầy đủ và tìm kiếm chiếc gốm sứ hoàn hảo lưu giữ câu chuyện của bạn.
            </p>
            <Link
              href="/shop"
              className="inline-block px-12 py-4 bg-[#2D2926] text-[#FDF9F3] font-serif uppercase tracking-widest text-sm hover:bg-[#C0593E] transition-colors duration-300"
            >
              Xem toàn bộ bộ sưu tập
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}