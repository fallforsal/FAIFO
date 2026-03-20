"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductMock {
  id: string;
  name: string;
  price: number;
  img: string;
}

export function RecentlyViewed() {
  const [viewedItems, setViewedItems] = useState<ProductMock[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setViewedItems(JSON.parse(stored));
    }
  }, []);

  if (viewedItems.length === 0) return null; // Ẩn luôn nếu chưa xem gì

  return (
    <section className="bg-[#FDF9F3] text-[#2D2926] py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto border-t border-[#2D2926]/10 pt-16">
        <h2 className="text-[22px] font-serif mb-12 tracking-wide text-left">
          Recently viewed items
        </h2>
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