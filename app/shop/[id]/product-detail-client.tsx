'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Share2, Copy, Facebook, X } from 'lucide-react';
import { CartSidebar } from '@/components/shop/cart-sidebar';
import { useCartStore } from '@/store/useCartStore';
import { cn } from '@/lib/utils';

interface ProductData {
  name: string;
  price: number;
  description: string;
  dimensions: string;
  sku: string;
  images: string[];
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductDetailClientProps {
  id: string;
  productData: ProductData;
  featuredProducts: Product[];
  recentlyViewed: Product[];
}

export default function ProductDetailClient({
  id,
  productData,
  featuredProducts,
  recentlyViewed,
}: ProductDetailClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: id,
        name: productData.name,
        price: productData.price,
        image: productData.images[0],
      });
    }
    setToastMessage(`Đã thêm ${productData.name} vào giỏ hàng của bạn`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setIsCartOpen(true);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-300 bg-white px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-gray-700">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>{productData.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-200">
              <img
                src={productData.images[currentImageIndex]}
                alt="Product"
                className="h-full w-full object-cover"
              />
              {/* Zoom Icon */}
              <button className="absolute right-4 top-4 rounded-full bg-white p-3 text-gray-700 hover:bg-gray-100">
                <Share2 size={20} />
              </button>
            </div>

            {/* Image Navigation */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handlePrevImage}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-200"
                aria-label="Previous image"
              >
                ←
              </button>
              <span className="text-sm text-gray-600">
                {currentImageIndex + 1} / {productData.images.length}
              </span>
              <button
                onClick={handleNextImage}
                className="rounded-lg p-2 text-gray-600 hover:bg-gray-200"
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Price */}
            <div>
              <h1 className="font-serif text-4xl font-semibold text-gray-900">
                {productData.name}
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Tax included.{' '}
                <a href="#" className="underline hover:no-underline">
                  Shipping
                </a>{' '}
                calculated at checkout.
              </p>
            </div>

            {/* Price */}
            <div className="text-3xl font-serif font-semibold text-gray-900">
              {formatPrice(productData.price)}
            </div>

            {/* Description */}
            <div className="space-y-3 border-t border-gray-300 pt-6">
              <p className="font-serif text-sm leading-relaxed text-gray-700">
                {productData.description}
              </p>
              <p className="font-serif text-sm text-gray-600">
                {productData.dimensions}
              </p>
            </div>

            {/* Social Share */}
            <div className="flex gap-4 border-b border-gray-300 pb-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <X size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Share2 size={20} />
              </a>
              <button className="text-gray-600 hover:text-gray-900">
                <Copy size={20} />
              </button>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button - Prominent */}
              <button
                onClick={handleAddToCart}
                className="w-full rounded-lg bg-black py-4 font-serif text-lg font-semibold text-white transition-colors hover:bg-gray-900"
              >
                カートに入れる
              </button>
            </div>

            {/* Info Links */}
            <div className="flex flex-col gap-2 border-t border-gray-300 pt-6 text-sm text-gray-600">
              <a href="#" className="flex items-center gap-2 hover:text-gray-900">
                📦 About Noshi
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-gray-900">
                🚚 About Shipping
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-gray-900">
                ⚠️ Handling
              </a>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <section className="mt-16 space-y-6 border-t border-gray-300 pt-16">
          <h2 className="font-serif text-3xl font-semibold text-gray-900">
            Featured products
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/shop/${product.id}`}>
                <div className="group space-y-3">
                  <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-sm font-semibold text-gray-900">
                    {product.name}
                  </h3>
                  <p className="font-serif text-sm font-semibold text-gray-700">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* NFC Chip Section */}
        <section className="mt-16 space-y-6 border-t border-gray-300 pt-16">
          <h2 className="font-serif text-3xl font-semibold text-gray-900">
            Mã định danh Gốm
          </h2>
          <div className="rounded-lg border border-gray-300 bg-gray-50 p-8">
            <div className="space-y-4">
              <p className="font-serif text-lg text-gray-700">
                Mỗi sản phẩm gốm của chúng tôi đều có một chip NFC duy nhất được nhúng bên dưới đáy.
              </p>
              <p className="text-gray-600">
                Chip này lưu trữ câu chuyện độc nhất của sản phẩm - lịch sử tạo tác, các bàn tay làm nên nó, và những cảm xúc được thổi vào từng chi tiết.
              </p>
              <Link
                href={`/experience/${id}`}
                className="inline-block rounded-lg bg-black px-6 py-3 font-serif font-semibold text-white transition-colors hover:bg-gray-900"
              >
                Dùng thử câu chuyện
              </Link>
            </div>
          </div>
        </section>

        {/* Recently Viewed */}
        <section className="mt-16 space-y-6 border-t border-gray-300 pt-16">
          <h2 className="font-serif text-3xl font-semibold text-gray-900">
            Recently viewed items
          </h2>
          <div className="space-y-4">
            {recentlyViewed.map((item) => (
              <Link key={item.id} href={`/shop/${item.id}`}>
                <div className="flex gap-4 rounded-lg border border-gray-300 p-4 hover:bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-serif text-sm font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="mt-1 font-serif text-sm font-semibold text-gray-700">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">+</button>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg animate-in fade-in slide-in-from-bottom-2">
          {toastMessage}
        </div>
      )}
    </>
  );
}
