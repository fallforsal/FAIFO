"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { forgotPassword } from "@/app/actions/auth.actions";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleForgotPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await forgotPassword(formData);

      if (result?.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: "Liên kết đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư." });
      }
    });
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen flex items-center justify-center py-24 px-6">
      <div className="max-w-md w-full -mt-20">
        <h1 className="font-serif text-[26px] md:text-3xl uppercase tracking-[0.2em] mb-4 text-center text-[#2D2926]">
          Quên mật khẩu
        </h1>
        <p className="text-center text-xs text-[#2D2926]/60 font-sans tracking-wide leading-relaxed mb-12 px-4">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>

        <form onSubmit={handleForgotPassword} className="flex flex-col space-y-8 font-sans">
          {message && (
            <div className={`text-[13px] p-3 text-center border ${message.type === 'error' ? 'bg-red-50 text-red-500 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
              {message.text}
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

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#2D2926] text-[#FDF9F3] py-5 uppercase tracking-[0.25em] text-[11px] font-sans hover:bg-[#C0593E] transition-colors disabled:opacity-80 mt-8"
          >
            {isPending ? "Đang gửi..." : "Gửi liên kết"}
          </button>
        </form>

        <div className="mt-12 text-center">
          <Link href="/login" className="text-[11px] text-[#2D2926]/60 font-sans tracking-widest uppercase hover:text-[#2D2926] transition-all">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </main>
  );
}