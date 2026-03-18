"use client";

import { useCartStore } from '@/store/useCartStore';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  description: string;
  stock_quantity: number;
  images: string[];
}

export function AddToCartButton({ product }: { product: ProductProps }) {
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
    openCart();
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-[#1A1A1A] text-white py-4 px-6 font-serif text-lg tracking-widest hover:bg-[#C0593E] transition-colors duration-300"
    >
      Thêm vào giỏ hàng
    </button>
  );
}
