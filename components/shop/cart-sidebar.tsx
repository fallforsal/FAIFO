'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  const handleCheckout = () => {
    router.push('/checkout');
    onClose();
  };

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close cart"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-screen w-full max-w-md bg-black text-white transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
          <h2 className="font-serif text-lg">カート</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:text-white"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400">カートは空です</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.quantity}`} className="border-b border-gray-700 pb-6">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mb-3 h-20 w-20 rounded-lg bg-gray-800 object-cover"
                    />
                  )}
                  <p className="font-serif text-sm font-semibold">{item.name}</p>
                  <p className="mt-1 font-serif text-gray-400">{formatPrice(item.price)}</p>
                  
                  {/* Quantity Controls */}
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-lg border border-gray-600 px-3 py-1 text-sm hover:bg-gray-900"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-lg border border-gray-600 px-3 py-1 text-sm hover:bg-gray-900"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto rounded-lg px-2 py-1 text-xs text-gray-400 hover:text-gray-200"
                    >
                      削除
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-700 px-6 py-6">
          <div className="mb-4 flex items-center justify-between font-serif text-lg font-semibold">
            <span>合計</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className={cn(
              'w-full rounded-lg py-3 font-serif font-semibold transition-colors',
              cartItems.length === 0
                ? 'cursor-not-allowed bg-gray-700 text-gray-500'
                : 'bg-white text-black hover:bg-gray-200'
            )}
            disabled={cartItems.length === 0}
          >
            精算
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full rounded-lg border border-gray-600 py-3 font-serif font-semibold text-white hover:bg-gray-900"
          >
            続ける
          </button>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-2 w-full rounded-lg border border-red-600 py-3 font-serif font-semibold text-red-600 hover:bg-red-600 hover:text-white transition-colors"
            >
              削除全て
            </button>
          )}
        </div>
      </div>
    </>
  );
}
