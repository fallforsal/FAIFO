
import { GlobalLayoutWrapper } from '@/components/layout/GlobalLayoutWrapper'; // Bạn sẽ tạo file này ở Bước 3
// ... các import khác ...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="font-light antialiased text-[#2D2926] bg-[#FDF9F3]">
        {/* Bao bọc toàn bộ App bằng Wrapper */}
        <GlobalLayoutWrapper>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  );
}