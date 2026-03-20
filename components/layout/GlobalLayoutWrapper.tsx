"use client";

import { usePathname } from "next/navigation";
import { ShopHeader } from "@/components/layout/header"; // Sửa lại đường dẫn import Header của bạn cho đúng
import { Footer } from "@/components/layout/Footer"; // Sửa lại đường dẫn import Footer của bạn cho đúng

export function GlobalLayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Xác định các trang KHÔNG muốn hiện Header/Footer
    const isScanPage = pathname.startsWith("/scan");
    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password") || pathname.startsWith("/reset-password");

    // Tắt Header/Footer ở trang Scan và trang Auth (nếu muốn)
    const hideNavigation = isScanPage || isAuthPage;

    return (
        <div className="flex flex-col min-h-screen">
            {!hideNavigation && <ShopHeader />}

            {/* Vùng chứa nội dung chính của trang */}
            <main className="flex-grow">
                {children}
            </main>

            {!hideNavigation && <Footer />}
        </div>
    );
}