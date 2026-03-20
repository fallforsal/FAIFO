"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore"; // Lắp bộ não Zustand vào đây

export function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Lôi data và các hàm xử lý từ Store ra
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  // Khắc phục lỗi Hydration của Next.js khi dùng LocalStorage
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isOpen || !isMounted) return null;

  // Lấy tổng tiền trực tiếp từ Store
  const total = getTotalPrice();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop mờ che nền */}
      <div className="absolute inset-0 bg-black/20 transition-opacity" onClick={onClose} />

      {/* Panel Sidebar */}
      <div className="relative w-full max-w-[420px] bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">

        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <h2 className="text-lg font-serif font-light text-[#2D2926] tracking-widest uppercase">
            Giỏ hàng {items.length > 0 ? `(${items.length})` : ''}
          </h2>
          <button onClick={onClose} className="p-2 text-[#2D2926] hover:opacity-50 transition-opacity">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-8">
          {items.length === 0 ? (
            <div className="text-center font-serif text-gray-500 py-10">Giỏ hàng của bạn đang trống.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-6">
                {/* Ảnh sản phẩm vuông */}
                <div className="w-24 h-24 bg-[#FDF9F3] flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col flex-1 py-1">
                  <div className="flex justify-between items-start gap-4 mb-auto">
                    <h3 className="font-serif text-[14px] text-[#2D2926] leading-relaxed line-clamp-2 font-light">
                      {item.name}
                    </h3>
                    <p className="font-serif text-[14px] text-[#2D2926] whitespace-nowrap">
                      {item.price.toLocaleString('vi-VN')} ₫
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Cụm Tăng/Giảm số lượng (ĐÃ ĐẤU DÂY) */}
                    <div className="flex items-center border border-gray-200 text-[#2D2926]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-50 text-gray-400 transition-colors"
                      >−</button>
                      <span className="px-3 py-1 text-[13px] font-sans w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-50 text-gray-400 transition-colors"
                      >+</button>
                    </div>

                    {/* Nút Xóa (ĐÃ ĐẤU DÂY) */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-[#E05C5C] hover:opacity-70 transition-opacity"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Nút Thanh toán */}
        {items.length > 0 && (
          <div className="p-6 bg-white space-y-6">
            {/* Section Thêm ghi chú */}
            <button className="flex justify-between items-center w-full py-4 border-t border-b border-gray-100 text-[13px] text-[#2D2926] font-sans hover:text-gray-500 transition-colors">
              <span>Thêm ghi chú</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 5v14M5 12h14" /></svg>
            </button>

            {/* Dòng text lưu ý */}
            <div className="text-center text-[11px] text-[#2D2926]/60 font-sans tracking-wide">
              Đã bao gồm thuế. Phí vận chuyển được tính khi thanh toán.
            </div>

            {/* Nút Thanh Toán Đen */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="w-full bg-[#1A1A1A] hover:bg-black text-[#FDF9F3] py-4 font-sans text-[13px] tracking-widest transition-colors flex justify-center items-center gap-2 rounded-sm"
            >
              <span>Thanh toán</span>
              <span className="text-[10px] opacity-60">•</span>
              <span>{total.toLocaleString('vi-VN')} ₫</span>
            </Link>

            {/* Link xem giỏ hàng */}
            <div className="text-center">
              <Link href="/cart" onClick={onClose} className="inline-block text-[12px] text-[#2D2926] font-sans tracking-widest border-b border-[#2D2926]/30 hover:border-[#2D2926] transition-colors pb-0.5">
                Xem giỏ hàng
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}