import Link from 'next/link';
import { cn } from '@/lib/utils';

const FEATURED_PRODUCTS = [
  {
    id: '1',
    name: 'Gốm Hội An',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800',
  },
  {
    id: '2',
    name: 'Gốm Hội An',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800',
  },
  {
    id: '3',
    name: 'Gốm Hội An',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800',
  },
  {
    id: '4',
    name: 'Gốm Hội An',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800',
  },
];

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

export const metadata = {
  title: 'FAIFO - Gốm Hội An',
  description: 'Mang câu chuyện thổi vào đất nung',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-hoiAnBg">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light leading-tight text-gray-900">
                Mang câu chuyện thổi vào đất nung
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-lg">
                Mỗi chiếc gốm là một câu chuyện, mỗi sản phẩm là một kết nối giữa quá khứ và hiện tại. 
                Bằng công nghệ NFC ẩn dưới đáy sản phẩm, chúng tôi bảo lưu lời chúc, nhật ký, 
                và những khoảnh khắc quý giá của bạn.
              </p>
              <Link
                href="/shop"
                className="inline-block px-8 py-3 bg-gray-900 text-white font-serif rounded-lg hover:bg-gray-800 transition-colors"
              >
                Xem toàn bộ bộ sưu tập
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-96 sm:h-[500px] overflow-hidden rounded-lg bg-gray-200">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-2">
            <h2 className="font-serif text-4xl font-light text-gray-900">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600">
              Khám phá các tác phẩm gốm sứ được chọn lọc
            </p>
          </div>

          {/* Horizontal Scroll Carousel */}
          <div className="overflow-x-auto scroll-smooth">
            <div className="flex gap-6 pb-4">
              {FEATURED_PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 w-80 group snap-start"
                >
                  <Link href={`/shop/${product.id}`}>
                    <div className="space-y-4">
                      {/* Product Image */}
                      <div className="relative h-80 overflow-hidden rounded-lg bg-gray-200">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <h3 className="font-serif text-lg font-semibold text-gray-900 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="font-serif text-lg font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </p>
                        <button className="w-full py-2 px-4 bg-gray-900 text-white font-serif rounded-lg hover:bg-gray-800 transition-colors">
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center space-y-6">
            <h2 className="font-serif text-4xl font-light text-gray-900">
              Sẵn sàng khám phá?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Truy cập bộ sưu tập đầy đủ và tìm kiếm chiếc gốm sứ hoàn hảo cho bạn
            </p>
            <Link
              href="/shop"
              className="inline-block px-12 py-4 bg-gray-900 text-white font-serif text-lg rounded-lg hover:bg-gray-800 transition-colors"
            >
              Xem toàn bộ bộ sưu tập
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
