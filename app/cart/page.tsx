"use client";

import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartPage() {
  // Lấy thêm note và updateNote từ Store để đồng bộ với Sidebar
  const { items, updateQuantity, removeItem, getTotalPrice, note, updateNote } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Nếu trong Store đã có ghi chú thì mở sẵn ô nhập khi vào trang
    if (note) setIsNoteOpen(true);
  }, [note]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FDF9F3] flex justify-center items-center">
        <div className="w-8 h-8 border-t-[1px] border-[#2D2926] rounded-full animate-spin opacity-50"></div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const subtotal = getTotalPrice();
  const shippingFee = 30000; // Phí COD mặc định 30k
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#2D2926] pt-28 sm:pt-36 pb-32 px-4 sm:px-8 lg:px-12 font-light antialiased">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="font-serif text-3xl sm:text-[2.25rem] mb-12 sm:mb-20 text-center font-extralight tracking-tight text-[#2D2926]">
          Giỏ hàng
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center">
            <p className="text-base text-gray-500 mb-8 font-light tracking-wide">Giỏ hàng của bạn đang trống.</p>
            <Link
              href="/shop"
              className="inline-block border border-[#2D2926] text-[#2D2926] px-10 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-[#2D2926] hover:text-[#FDF9F3] transition-colors duration-500"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* Table Header (Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-8 border-b border-gray-200 pb-4 text-[10px] tracking-[0.15em] uppercase text-[#2D2926]/50 mb-4">
              <div className="col-span-6">Sản phẩm</div>
              <div className="col-span-3 pl-4">Số lượng</div>
              <div className="col-span-3 text-right">Tổng cộng</div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="flex flex-col">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 gap-6 md:gap-8 md:items-center py-8 border-b border-gray-200/80 group">
                  <div className="col-span-6 flex items-center gap-6 sm:gap-8">
                    <div className="w-24 h-24 sm:w-[120px] sm:h-[120px] flex-shrink-0 relative mix-blend-multiply bg-[#F5F0E6]/50">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <Link href={`/shop/${item.id}`} className="text-sm sm:text-[15px] font-serif font-light tracking-wide hover:opacity-60 transition-opacity">
                        {item.name}
                      </Link>
                      <p className="md:hidden text-[13px] font-light text-[#2D2926]/70">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between md:contents">
                    <div className="col-span-3 flex items-center gap-4">
                      <div className="inline-flex items-center border border-gray-200 bg-white/20">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 flex items-center justify-center opacity-40 hover:opacity-100 font-extralight text-xl">-</button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 flex items-center justify-center opacity-40 hover:opacity-100 font-extralight text-xl">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="opacity-30 hover:opacity-100 hover:text-red-700 transition-all p-2">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" /></svg>
                      </button>
                    </div>
                    <div className="col-span-3 text-right text-sm sm:text-[15px] tracking-widest">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 sm:gap-24 pt-16">
              {/* Left: Notes (ĐÃ ĐỒNG BỘ VỚI STORE) */}
              <div className="flex flex-col order-2 md:order-1">
                <div className="border border-gray-200/60 bg-[#F5F0E6]/30 p-6">
                  <button
                    onClick={() => setIsNoteOpen(!isNoteOpen)}
                    className="flex justify-between items-center w-full text-[11px] tracking-[0.15em] uppercase text-[#2D2926]/70 hover:text-[#2D2926] transition-colors"
                  >
                    <span>{note ? 'Ghi chú của bạn' : 'Thêm ghi chú'}</span>
                    <span className="text-xl font-extralight">{isNoteOpen ? '-' : '+'}</span>
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${isNoteOpen ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <textarea
                      value={note}
                      onChange={(e) => updateNote(e.target.value)}
                      className="w-full bg-transparent border-b border-[#2D2926]/20 py-2 text-[13px] font-light focus:outline-none focus:border-[#2D2926] resize-none placeholder:text-[#2D2926]/40"
                      rows={3}
                      placeholder="Ghi chú cho đơn hàng..."
                    ></textarea>
                  </div>
                </div>
                <Link href="/shop" className="mt-8 text-[11px] tracking-[0.15em] uppercase border-b border-[#2D2926]/30 pb-1 self-start hover:border-[#2D2926] transition-colors">
                  Tiếp tục mua sắm
                </Link>
              </div>

              {/* Right: Totals (CHUẨN VIỆT NAM) */}
              <div className="flex flex-col text-right order-1 md:order-2">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex justify-between items-center text-[13px] text-[#2D2926]/60">
                    <span className="tracking-[0.1em] uppercase">Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px] text-[#2D2926]/60">
                    <span className="tracking-[0.1em] uppercase">Giao hàng (COD)</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <div className="w-full h-[1px] bg-[#2D2926]/10 my-2"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-[13px] font-medium tracking-[0.1em] uppercase">Tổng cộng</span>
                    <span className="text-[22px] font-light">{formatPrice(total)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#2D2926]/50 mb-8 font-extralight leading-relaxed italic">
                  Hỗ trợ: COD, Chuyển khoản QR, Thẻ Visa/Mastercard.
                </p>

                <Link
                  href="/checkout"
                  className="w-full bg-[#1A1A1A] text-[#FDF9F3] py-4 text-[12px] tracking-[0.2em] uppercase font-light hover:bg-black transition-all duration-300 text-center"
                >
                  Tiến hành thanh toán
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}