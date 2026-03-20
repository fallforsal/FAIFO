"use client";

import { useCartStore } from "@/store/useCartStore";

export function AddToCartButton({ product }: { product: any }) {
  // Lôi thêm hàm openCart từ bộ não Zustand ra
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    // ĐÃ XÓA dòng quantity: 1 để chiều lòng TypeScript
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: Array.isArray(product.images) && product.images.length > 0
        ? product.images[0]
        : 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=200'
    });

    // Thêm thành công thì tự động kéo mở Sidebar Giỏ hàng ra cho sang trọng!
    openCart();
  };

  const isOutOfStock = product.stock_quantity <= 0;

  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className="w-full bg-[#1A1A1A] hover:bg-black text-[#FDF9F3] py-4 font-sans text-[13px] tracking-widest transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase"
    >
      {isOutOfStock ? "Hết tác phẩm" : "Thêm vào giỏ hàng"}
    </button>
  );
}