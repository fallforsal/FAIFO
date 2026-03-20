"use client";
import { useEffect } from "react";

export function TrackViewedItem({ product }: { product: any }) {
    useEffect(() => {
        if (!product) return;
        const stored = localStorage.getItem('recentlyViewed');
        let viewed = stored ? JSON.parse(stored) : [];

        // Xóa sản phẩm cũ nếu đã tồn tại để đẩy lên đầu
        viewed = viewed.filter((item: any) => item.id !== product.id);

        // Thêm vào đầu mảng
        viewed.unshift(product);

        // Chỉ giữ lại 6 sản phẩm gần nhất
        if (viewed.length > 6) viewed.pop();

        localStorage.setItem('recentlyViewed', JSON.stringify(viewed));
    }, [product.id]);

    return null; // Component tàng hình
}