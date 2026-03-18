"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Tạo tài khoản thành công!");
      router.push('/login');
    }, 1000);
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-16">
        <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] mb-12 text-center text-[#2D2926]">
          Đăng ký
        </h1>

        <form onSubmit={handleRegister} className="flex flex-col space-y-8 font-sans">
          <div>
            <input 
              type="text" 
              required
              placeholder="Họ và tên"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>
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
          <div>
            <input 
              type="password" 
              required
              placeholder="Xác nhận mật khẩu"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-black transition-colors disabled:opacity-80 mt-10"
          >
            {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/login" className="text-[11px] text-[#2D2926]/60 font-sans tracking-widest uppercase hover:text-[#2D2926] hover:underline underline-offset-4 transition-all">
            Đã có tài khoản? Đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}
