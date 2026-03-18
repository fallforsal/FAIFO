"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductMock {
  id: string;
  name: string;
  price: number;
  img: string;
}

const DEFAULT_MOCK: ProductMock[] = [
  { id: '5', name: 'CHÉN TRÀ MEN TRẮNG NGỌC CAO CẤP', price: 450000, img: 'https://images.unsplash.com/photo-1594631252845-29fc4e8c7152?q=80&w=800' },
  { id: '6', name: 'ĐĨA NHỎ ĐỰNG GIA VỊ CHIẾC LÁ KHÔ', price: 250000, img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800' },
  { id: '7', name: 'LƯ HƯƠNG XÔNG TRẦM TỊNH TÂM', price: 890000, img: 'https://images.unsplash.com/photo-1558223637-2fb0aa19ed81?q=80&w=800' },
];

export function RecentlyViewed() {
  const [viewedItems, setViewedItems] = useState<ProductMock[]>([]);

  useEffect(() => {
    // Giả lập đọc dữ liệu từ localStorage, tuân thủ Client Lifecycle
    try {
      const stored = localStorage.getItem('recentlyViewed');
      if (stored) {
        setViewedItems(JSON.parse(stored));
      } else {
        // Fallback mock static data
        setViewedItems(DEFAULT_MOCK);
      }
    } catch (e) {
      console.warn("Lỗi parser localStorage", e);
      setViewedItems(DEFAULT_MOCK);
    }
  }, []);

  if (viewedItems.length === 0) return null;

  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto border-t border-[#2D2926]/10 pt-16">
        <h2 className="text-[22px] font-serif mb-12 tracking-wide text-left">
          Recently viewed items
        </h2>
        
        {/* Lưới 5 hoặc 6 cột để cho thẻ sản phẩm nhỏ gọn hơn Grid 4 Cột của Featured */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-6 gap-y-10">
          {viewedItems.map((item) => (
            <Link href={`/shop/${item.id}`} key={item.id} className="group block">
              <div className="aspect-square bg-white/40 overflow-hidden mb-4 rounded-sm border border-transparent transition-colors duration-300">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 ease-out opacity-90" 
                />
              </div>
              <h3 className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-[#2D2926] leading-relaxed mb-1 line-clamp-2 min-h-[36px]">
                {item.name}
              </h3>
              <p className="font-serif text-[13px] text-[#2D2926]/80">
                {item.price.toLocaleString("vi-VN")} đ
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
