# FAIFO - Số hóa Gốm Hội An: AI Context & Development Guidelines

Mục tiêu của file này là cung cấp bối cảnh (context) và các quy định nghiêm ngặt về phát triển dự án "FAIFO - Số hóa Gốm Hội An" cho các AI Code Generators (như Vercel v0, Cursor, GitHub Copilot). 

**Yêu cầu các AI đọc, hiểu và tuân thủ tuyệt đối các quy chuẩn dưới đây trước khi sinh ra bất kỳ dòng code nào.**

---

## 1. Project Overview & Vibe

- **Tầm nhìn**: Đây là một dự án startup kết hợp giữa sản phẩm vật lý (Gốm sứ có gắn chip NFC) và trải nghiệm tương tác số (Web App). Mục tiêu là tạo ra sự kết nối giữa người sở hữu và câu chuyện của sản phẩm nghệ thuật.
- **Vibe Thiết kế**: 
  - **Minimalism** (Tối giản).
  - Mang đậm phong cách truyền thống cổ kính của **Hội An**.
  - Cảm giác **tĩnh lặng**, hoài niệm, nhưng tinh tế và **sang trọng** (Luxurious).

---

## 2. Tech Stack & Rules (Strict)

- **Core Framework**: 
  - Bắt buộc dùng **Next.js 14+ (App Router)**.
  - Ngôn ngữ: **TypeScript** (Yêu cầu strict typing, hạn chế tối đa `any`).
  - Styling: **Tailwind CSS**.
- **Database/Backend**: 
  - Dùng **Supabase** (PostgreSQL, Supabase Auth, Storage).
- **Animation & 3D Experience**:
  - 3D/WebGL: Dùng `three`, `@react-three/fiber`, `@react-three/drei`. (Lưu ý code GLSL Shader đang được lưu tại `lib/shaders`).
  - Component Animations: Dùng `framer-motion` (lưu tại `components/animations`).
- **Luật Import Paths (BẤT DỊCH)**:
  - Bắt buộc sử dụng **Path Aliases** trong mọi file (ví dụ: `@/components/...`, `@/lib/...`, `@/hooks/...`, `@/app/...`).
  - Tuyệt đối **KHÔNG ĐƯỢC PHÉP** sử dụng relative path lùi thư mục kiểu cũ (ví dụ: `../../components/...`).

---

## 3. Folder Structure Architecture

Kiến trúc thư mục được thiết kế theo chức năng, các AI phải đặt file mới đúng vị trí:

- **`app/`**: Chứa Next.js Pages, Layouts, cấu hình Route và Server Actions.
  - Code trang đích quét NFC nằm tại `app/scan/`.
  - Phân vùng: Layout và code UI của trang bán hàng **phải** nằm ở `app/shop/`.
- **`components/`**: Chứa React Components, phân rã theo nhóm rõ ràng:
  - `components/animations/`: Các component xử lý logic animation dùng Framer Motion hoặc WebGL loading transition.
  - `components/cinematic/`: Các flow trải nghiệm nặng về kể chuyện, interactive 3D và visual (ví dụ luồng thư hoài niệm, xem gốm 3D lồng ghép).
  - `components/ui/`: Các component tái sử dụng cơ bản (nút bấm, dialog, input).
  - `components/shop/`: **Bắt buộc** chứa toàn bộ các components phục vụ cho luồng giao diện bán hàng (E-commerce UI).
- **`lib/`**: Chứa utility functions, configurations (Supabase Client/Server), queries DB. 
  - Chú ý: `lib/shaders/` chứa các tệp GLSL phục vụ Three.js.
- **`hooks/`**: Chứa Custom Hooks React chuyên biệt để tái sử dụng logic (navigation, state 3D, lấy dữ liệu).

---

## 4. UI/UX & Tailwind Design System (RẤT QUAN TRỌNG)

Mọi code UI được sinh ra cần tuân thủ Design System sau để không phá vỡ Vibe của dự án:

- **Background Chủ đạo**: Sử dụng màu vàng kem đặc trưng của bức tường cổ Hội An. 
  - Mã Màu: **`#FDF9F3`** (Sử dụng qua text-color, bg-color tương ứng).
- **Typography (Chữ viết)**: 
  - Luôn ưu tiên dùng **Font Serif** cho các **Heading** và các **Text mang tính kể chuyện** (Storytelling). Điều này tạo sự cao cấp, hoài niệm. (Có thể dùng font mặc định được config trong CSS variables hoặc Tailwind family).
- **Trạng thái Component (Component States)**:
  - **Không** sử dụng Border quá viền đậm (thick/harsh borders).
  - **Không** sử dụng Bóng đổ quá gắt (heavy drop shadows). Chỉ dùng shadow cực kỳ mờ, mềm mại hoặc không có.
  - **Ưu tiên Không Gian Mở (White space)**: Giữ các Spacing (Padding, Margin) rộng rãi để tạo cảm giác thoáng đãng, tĩnh tĩnh. 
- **Tailwind Utility - Cú pháp merge class**:
  - Mọi Component UI được gen ra khi có nối hoặc xử lý điều kiện class của Tailwind CSS **bắt buộc** phải sử dụng hàm `cn()` từ `@/lib/utils`.
  - Code mẫu chuẩn: 
    ```tsx
    import { cn } from "@/lib/utils";

    export function MyComponent({ className }: { className?: string }) {
      return (
        <div className={cn("bg-[#FDF9F3] text-serif p-8", className)}>
          {/* Content */}
        </div>
      );
    }
    ```
