"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { login } from "@/app/actions/auth.actions";
import { Eye, EyeOff } from "lucide-react"; // Import icon

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // State điều khiển ẩn/hiện mật khẩu
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-20">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] mb-12 text-center text-[#2D2926]">
          Đăng nhập
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-8 font-sans">
          {error && (
            <div className="bg-red-50 text-red-500 text-[13px] p-3 text-center border border-red-100 transition-all">
              {error}
            </div>
          )}

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

          <div className="flex justify-end pt-2">
            <Link href="/forgot-password" className="text-[11px] text-[#2D2926]/50 hover:text-[#2D2926] tracking-widest transition-colors uppercase">
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-black transition-colors disabled:opacity-80 mt-8 flex justify-center items-center"
          >
            {isPending ? "Đang xác thực..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[11px] text-[#2D2926]/50 font-sans tracking-widest uppercase">
            Chưa có tài khoản? <Link href="/register" className="text-[#2D2926] underline underline-offset-4 ml-2 hover:opacity-70 transition-opacity">Đăng ký</Link>
          </p>
        </div>
      </div>
    </main>
  );
}