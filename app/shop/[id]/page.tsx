import { supabase } from '@/lib/supabase';
import { AddToCartButton } from '@/components/shop/AddToCartButton';
import { CategorySearch } from "@/components/shop/CategorySearch";
import { FeaturedProducts } from "@/components/shop/FeaturedProducts";
import { RecentlyViewed } from "@/components/shop/RecentlyViewed";

interface PageProps {
  params: { id: string };
}

// 1. DỮ LIỆU GIẢ LẬP (MOCK DATA) - ĐỂ CHECK UI
const MOCK_PRODUCT = {
  id: "dummy-1",
  name: "Bình Gốm Men Lam Cổ Khảm Thuyền Hội An",
  price: 1250000,
  description: "Tác phẩm được chế tác thủ công bởi nghệ nhân kỳ cựu tại Hội An. Họa tiết men lam tái hiện cảnh thuyền buôn tấp nập tại cảng thị Faifo thế kỷ 17. Men sáng bóng, bền màu theo thời gian.",
  stock_quantity: 5,
  images: [
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800",
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800",
    "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800",
  ],
};

export default async function ProductDetailPage({ params }: PageProps) {
  // 2. TẠM THỜI BYPASS SUPABASE FETCHING LOGIC
  /*
  const { id } = params;
  
  const { data: dbProduct, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !dbProduct) {
    return <div className="p-10 text-center bg-[#FDF9F3] font-serif text-2xl">Món gốm này chưa có câu chuyện...</div>;
  }
  */

  const product = MOCK_PRODUCT; // Dùng dữ liệu giả

  // 3. RENDER UI CHI TIẾT DÙNG DATA MOCK
  return (
    <main className="bg-[#FDF9F3] min-h-screen font-serif py-20 px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-start">
        {/* Cột Trái: Hình ảnh (60%) */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <img src={product.images[0]} alt={product.name} className="w-full aspect-[4/5] object-cover" />
          <div className="flex gap-4">
            {product.images.slice(1).map((img, idx) => (
              <img key={idx} src={img} alt={`${product.name} thumb ${idx}`} className="w-20 aspect-square object-cover" />
            ))}
          </div>
        </div>

        {/* Cột Phải: Thông tin (40%) */}
        <div className="md:col-span-5 flex flex-col sticky top-32">
          <h1 className="text-3xl font-serif text-[#2D2926] uppercase tracking-wide mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-serif text-[#2D2926] mb-2">
            {product.price.toLocaleString("vi-VN")} đ
          </p>
          <div className="text-sm text-gray-500 font-sans mb-8">
            {product.stock_quantity > 0 ? `Còn lại ${product.stock_quantity} tác phẩm` : 'Đã hết tác phẩm này'}
          </div>

          <AddToCartButton product={product} />

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
