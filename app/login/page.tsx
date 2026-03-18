"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push('/');
    }, 1000);
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-20">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] mb-12 text-center text-[#2D2926]">
          Đăng nhập
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col space-y-8 font-sans">
          <div>
            <input 
              type="email" 
              required
              placeholder="Email của bạn"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>
          <div>
            <input 
              type="password" 
              required
              placeholder="Mật khẩu"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <Link href="/forgot-password" className="text-[11px] text-[#2D2926]/50 hover:text-[#2D2926] tracking-widest transition-colors uppercase">
              Quên mật khẩu?
            </Link>
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-black transition-colors disabled:opacity-80 mt-8"
          >
            {isSubmitting ? "Đang mã hóa..." : "Đăng nhập"}
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
