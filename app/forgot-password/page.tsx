"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert("Đã gửi mã xác thực. Hệ thống sẽ chuyển đến trang đặt lại mật khẩu.");
      // Chỗ này ăn tiền: Đá thẳng sang trang reset-password
      router.push('/reset-password');
    }, 1500);
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-20">
        <h1 className="font-serif text-[26px] md:text-3xl uppercase tracking-[0.2em] mb-4 text-center text-[#2D2926]">
          Quên mật khẩu
        </h1>
        <p className="text-center text-xs text-[#2D2926]/60 font-sans tracking-wide leading-relaxed mb-12 px-4">
          Vui lòng nhập email của bạn. Chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.
        </p>

        <form onSubmit={handleForgotPassword} className="flex flex-col space-y-8 font-sans">
          <div>
            <input
              type="email"
              required
              placeholder="Email của bạn"
              className="w-full bg-transparent border-b border-[#2D2926]/20 py-4 text-sm focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 tracking-wider"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-[#C0593E] transition-colors disabled:opacity-80 mt-8"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi liên kết"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/login" className="text-[11px] text-[#2D2926]/60 font-sans tracking-widest uppercase hover:text-[#2D2926] hover:underline underline-offset-4 transition-all">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}