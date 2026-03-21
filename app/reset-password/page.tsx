"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/app/actions/auth.actions";
import { Eye, EyeOff } from "lucide-react"; // Import icon con mắt
import { createClient } from "@/utils/supabase/client"; // Import client để force logout

export default function ResetPasswordPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // State thông báo thành công

  // State điều khiển ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const supabase = createClient();

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    startTransition(async () => {
      const result = await updatePassword(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        // 1. HIỂN THỊ THÔNG BÁO XỊN TRÊN UI
        setSuccess("Mật khẩu đã được cập nhật! Đang đăng xuất và chuyển hướng về trang đăng nhập...");

        // 2. KHÚC NÀY ĂN TIỀN: FORCE LOGOUT NGAY LẬP TỨC
        // Vì Supabase tự động cập nhật session khi đổi pass, nên mình phải ép nó signOut ở client
        await supabase.auth.signOut();

        // 3. ĐỢI 2.5 GIÂY ĐỂ USER ĐỌC CHỮ RỒI MỚI CHUYỂN HƯỚNG
        setTimeout(() => {
          router.push('/login?message=Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.');
          router.refresh(); // Làm mới trang để cập nhật Header
        }, 2500);
      }
    });
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-20">
        <h1 className="font-serif text-[26px] md:text-3xl uppercase tracking-[0.2em] mb-12 text-center text-[#2D2926]">
          Đặt lại mật khẩu
        </h1>

        <form onSubmit={handleResetPassword} className="flex flex-col space-y-8 font-sans">
          {/* Thông báo Lỗi (Màu Đỏ) */}
          {error && (
            <div className="bg-red-50 text-red-500 text-[13px] p-3 text-center border border-red-100 transition-all">
              {error}
            </div>
          )}

          {/* Thông báo Thành công (Màu Xanh - Diệt alert) */}
          {success && (
            <div className="bg-green-50 text-green-700 text-[13px] p-3 text-center border border-green-100 transition-all">
              {success}
            </div>
          )}

          {/* Ô nhập mật khẩu mới */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"} // Điều khiển kiểu input
              name="password"
              required
              placeholder="Mật khẩu mới"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider pr-10"
            />
            {/* Nút con mắt */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#2D2926]/40 hover:text-[#2D2926] transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>

          {/* Ô xác nhận mật khẩu mới */}
          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"} // Điều khiển kiểu input
              name="confirmPassword"
              required
              placeholder="Xác nhận mật khẩu mới"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider pr-10"
            />
            {/* Nút con mắt */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#2D2926]/40 hover:text-[#2D2926] transition-colors focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isPending || !!success}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-black transition-colors disabled:opacity-80 mt-8 flex justify-center items-center"
          >
            {isPending ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </button>
        </form>
      </div>
    </main>
  );
}