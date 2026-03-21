"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/app/actions/auth.actions";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // States cho nút con mắt
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 1. KIỂM TRA MẬT KHẨU KHỚP NHAU
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    // 2. REGEX KIỂM TRA ĐỘ MẠNH MẬT KHẨU
    const hasNumber = /\d/; // Có ít nhất 1 chữ số
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Có ít nhất 1 ký tự đặc biệt

    if (password.length < 8 || !hasNumber.test(password) || !hasSpecialChar.test(password)) {
      setError("Mật khẩu phải dài tối thiểu 8 ký tự, bao gồm ít nhất 1 chữ số và 1 ký tự đặc biệt.");
      return;
    }

    // Gọi API Đăng ký
    startTransition(async () => {
      const result = await register(formData);

      if (result?.success) {
        setSuccess("Tạo tài khoản thành công! Đang chuyển hướng...");
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-16">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] mb-12 text-center text-[#2D2926]">
          Đăng ký
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col space-y-8 font-sans">
          {error && (
            <div className="bg-red-50 text-red-500 text-[13px] p-3 text-center border border-red-100 transition-all leading-relaxed">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 text-[13px] p-3 text-center border border-green-100 transition-all">
              {success}
            </div>
          )}

          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Họ và tên"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Email của bạn"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>

          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Mật khẩu"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#2D2926]/40 hover:text-[#2D2926] transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
            </button>
          </div>

          <div className="relative group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              required
              placeholder="Xác nhận mật khẩu"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider pr-10"
            />
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
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-black transition-colors disabled:opacity-80 mt-10 flex justify-center items-center gap-2"
          >
            {isPending ? "Đang xử lý..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/login" className="text-[11px] text-[#2D2926]/60 font-sans tracking-widest uppercase hover:text-[#2D2926] transition-all">
            Đã có tài khoản? <span className="text-[#2D2926] underline underline-offset-4 ml-1">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </main>
  );
}