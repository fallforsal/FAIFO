# FAIFO
Dự án của nhóm WHY NOT


🏺 Storytellers of Faifo - Technical Specification
🚀 Core Framework
Next.js 15 (RC/Stable) - React framework với App Router, tối ưu cho việc truyền tải nội dung di động.

React 19 - Thư viện UI với React Server Components và các Action mới giúp xử lý form tâm thư mượt mà.

TypeScript - Đảm bảo an toàn kiểu dữ liệu cho luồng dữ liệu từ Chip NFC đến Database.

Framer Motion - Thư viện animation chính để tạo cảm giác nghệ thuật, chuyển động sóng âm và hiệu ứng "vị lai" trên nền văn hóa cổ.

🎨 Styling & UI
Tailwind CSS v4 - Engine mới nhanh hơn, tối ưu cho trải nghiệm mượt mà trên trình duyệt mobile.

shadcn/ui - Hệ thống component chất lượng cao (Style: New York) cho các nút tương tác và form nhập liệu.

Radix UI - Các nguyên mẫu UI không định dạng, đảm bảo tính tiếp cận (Accessibility).

Lucide React - Bộ icon tối giản, tinh tế.

📊 Data Management
Supabase Client - Backend-as-a-Service, cung cấp PostgreSQL và Realtime cho luồng quà tặng.

TanStack Query v5 - Đồng bộ hóa dữ liệu giữa DB và UI, xử lý caching cho thông tin sản phẩm gốm.

React Hook Form - Xử lý các form viết tâm thư/lời chúc với hiệu suất cao.

Zod - Schema validation cho nội dung lời nhắn, đảm bảo không có ký tự lỗi trong "mảnh ký ức".

🛠️ Development Tools
pnpm - Trình quản lý gói nhanh, tiết kiệm dung lượng.

Turbopack - Bundler thế hệ mới giúp tốc độ hot-reload trên mobile test cực nhanh.

ESLint - Phân tích code tĩnh để duy trì chất lượng dự án môn học.

📁 Project Architecture
Dự án được tổ chức theo kiến trúc Feature-based Module để tách biệt luồng trải nghiệm văn hóa và luồng thương mại:

Plaintext
faifo-web/
├── app/                     # Next.js App Router
│   ├── (experience)/        # Nhóm các trang trải nghiệm quét NFC
│   │   ├── scan/[id]/       # Điểm đón đầu tiên khi quét chip
│   │   ├── story/           # Flow 6 trang kể chuyện gốm
│   │   └── gift/            # Flow B cho người nhận quà
│   ├── (auth)/              # Đăng ký/Đăng nhập (Email/SĐT)
│   ├── shop/                # Trang thương mại điện tử
│   └── layout.tsx           # Root layout (Font, Analytics)
├── components/             # Reusable UI components
│   ├── shared/              # Component dùng chung (Button, Card)
│   └── animations/          # Hiệu ứng sóng âm, hiệu ứng chuyển trang
├── modules/                # Feature-based modules
│   ├── nfc-engine/          # Xử lý logic định danh chip & trạng thái (Self/Gift)
│   ├── storyteller/         # Quản lý nội dung tâm thư & lời nhắn
│   └── product/             # Thông tin chi tiết về các loại gốm Faifo
├── lib/                    # Utility functions
│   ├── supabase.ts         # Khởi tạo kết nối Supabase
│   └── utils.ts            # Common utilities
└── ...config files
🛠️ Module Structure (Example: Storyteller)
Mỗi module sẽ đóng gói hoàn toàn logic của nó:

api/ - Các hàm gọi Supabase để lưu/đọc lời chúc.

components/ - Các UI đặc thù như DiaryPaper.tsx hay GiftLogo.tsx.

types/ - Zod schemas định nghĩa độ dài lời nhắn (max 500 ký tự chẳng hạn).

index.ts - Export những gì cần thiết cho bên ngoài.
