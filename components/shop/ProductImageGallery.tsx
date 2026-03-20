"use client";

import { useState, useRef, UIEvent } from "react";

interface GalleryProps {
    images: string[];
    altText: string;
}

export function ProductImageGallery({ images, altText }: GalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Xử lý khi người dùng vuốt trên điện thoại
    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const container = e.currentTarget;
        const scrollPosition = container.scrollLeft;
        const itemWidth = container.clientWidth;
        // Tính toán index hiện tại dựa trên vị trí cuộn
        const newIndex = Math.round(scrollPosition / itemWidth);
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
        }
    };

    // Xử lý khi bấm nút mũi tên
    const scrollTo = (index: number) => {
        if (scrollContainerRef.current) {
            const itemWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    return (
        <div className="md:col-span-7 flex flex-col w-full min-w-0">
            {/* Khung chứa ảnh */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar md:gap-12"
            >
                {images.map((img: string, idx: number) => (
                    <div key={idx} className="w-full flex-none snap-center bg-[#FDF9F3]">
                        <img
                            src={img}
                            alt={`${altText} - Góc nhìn ${idx + 1}`}
                            className="w-full aspect-square md:aspect-auto object-cover"
                            loading={idx === 0 ? "eager" : "lazy"}
                        />
                    </div>
                ))}
            </div>

            {/* Bộ điều khiển Mobile (Ẩn trên Desktop - md:hidden) */}
            {images.length > 1 && (
                <div className="flex md:hidden items-center justify-center gap-8 mt-6 text-[#2D2926] font-sans">
                    <button
                        onClick={() => scrollTo(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className="p-2 disabled:opacity-30 transition-opacity"
                        aria-label="Previous image"
                    >
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M7 13L1 7L7 1" />
                        </svg>
                    </button>

                    <span className="text-[13px] tracking-widest">
                        {currentIndex + 1} / {images.length}
                    </span>

                    <button
                        onClick={() => scrollTo(currentIndex + 1)}
                        disabled={currentIndex === images.length - 1}
                        className="p-2 disabled:opacity-30 transition-opacity"
                        aria-label="Next image"
                    >
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M1 13L7 7L1 1" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
}