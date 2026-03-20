import { AddToCartButton } from '@/components/shop/AddToCartButton';
import { CategorySearch } from "@/components/shop/CategorySearch";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";
import { getProductById } from '@/app/actions/product.actions';
import { TrackViewedItem } from '@/components/shop/TrackViewedItem';
import { ProductImageGallery } from '@/components/shop/ProductImageGallery';

export const dynamic = 'force-dynamic';
interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = params;

  // 1. Gọi Server Action để fetch DB
  const result = await getProductById(id);

  // 2. Xử lý nếu ID sai hoặc sản phẩm không tồn tại
  if (!result.success || !result.data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDF9F3] font-serif text-2xl text-[#2D2926]">
        Món gốm này chưa có câu chuyện...
      </div>
    );
  }

  // 3. Lấy data thật
  const product = result.data;

  console.log("MẢNG HÌNH ẢNH TỪ DB:", product.images);
  console.log("SỐ LƯỢNG ẢNH:", product.images?.length);
  // Xử lý an toàn mảng hình ảnh (phòng hờ DB rỗng)
  const validImages: string[] = Array.isArray(product.images) && product.images.length > 0
    ? (product.images as string[])
    : ['/images/placeholder.jpg'];
  const cleanProduct = {
    ...product,
    images: validImages
  };
  return (
    <main className="bg-[#FDF9F3] min-h-screen font-serif py-20 px-8">
      <TrackViewedItem product={{ id: product.id, name: product.name, price: product.price, img: validImages[0] }} />
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">

        {/* Cột Trái: Hình ảnh (Mobile Carousel trượt ngang, Desktop xếp dọc) */}
        <ProductImageGallery images={validImages} altText={product.name} />




        {/* Cột Phải: Thông tin */}
        <div className="md:col-span-5 flex flex-col sticky top-32">
          <h1 className="text-3xl font-serif text-[#2D2926] uppercase tracking-wide mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-serif text-[#2D2926] mb-2">
            {product.price?.toLocaleString("vi-VN")} đ
          </p>
          <div className="text-sm text-gray-500 font-sans mb-8">
            {product.stock_quantity > 0 ? `Còn lại ${product.stock_quantity} tác phẩm` : 'Đã hết tác phẩm này'}
          </div>

          <AddToCartButton product={cleanProduct} />

          <hr className="my-10 border-gray-200" />


          <p className="text-[15px] text-gray-700 leading-relaxed font-serif whitespace-pre-line">
            {product.description}
          </p>
        </div>

      </div>
      <FeaturedProducts />
      <RecentlyViewed />
      <CategorySearch />
    </main>
  );
}