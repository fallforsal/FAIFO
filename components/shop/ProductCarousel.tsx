"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ products }: { products: any[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth / 1.5
                : scrollLeft + clientWidth / 1.5;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (products.length === 0) return null;

    return (
        <div className="relative group px-4 sm:px-12">
            {/* Nút Điều hướng Bên Trái */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[#2D2926]/30 hover:text-[#2D2926] transition-colors hidden md:block"
                aria-label="Scroll left"
            >
                <ChevronLeft size={32} strokeWidth={1} />
            </button>

            {/* Container chứa sản phẩm */}
            <div
                ref={scrollRef}
                className="flex gap-6 sm:gap-10 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex-shrink-0 w-[280px] sm:w-[320px] snap-start"
                    >
                        <Link href={`/shop/${product.id}`} className="block group/item">
                            <div className="space-y-6">
                                <div className="relative aspect-[4/5] overflow-hidden bg-[#FDF9F3]">
                                    <img
                                        src={product.images?.[0] || ""}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/item:scale-105 mix-blend-multiply"
                                    />
                                </div>
                                <div className="space-y-2 text-center">
                                    <h3 className="font-serif text-[14px] text-[#2D2926] uppercase tracking-[0.1em] font-light line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="font-sans text-[13px] text-[#2D2926]/60 font-light">
                                        {product.price.toLocaleString('vi-VN')} đ
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Nút Điều hướng Bên Phải */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-[#2D2926]/30 hover:text-[#2D2926] transition-colors hidden md:block"
                aria-label="Scroll right"
            >
                <ChevronRight size={32} strokeWidth={1} />
            </button>
        </div>
    );
}