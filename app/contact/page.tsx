"use client";

import { useState } from "react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Cảm ơn bạn. Câu chuyện đã được gửi đi.");
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl uppercase tracking-widest mb-28 text-center mt-8">
          Liên Hệ
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
          {/* Cột Trái: Thông tin */}
          <div className="flex flex-col space-y-12">
            <div>
              <h2 className="font-serif text-2xl uppercase tracking-widest mb-6">Trạm Thư Tín</h2>
              <p className="font-serif text-[#2D2926]/70 leading-relaxed text-[17px]">
                Chúng tôi luôn lắng nghe những câu chuyện và giải đáp thắc mắc của bạn về tác phẩm gốm cũng như trải nghiệm lưu giữ ký ức số.
              </p>
            </div>
            
            <div className="font-sans text-sm uppercase tracking-widest space-y-8">
              <div>
                <p className="text-[#2D2926]/40 mb-2 text-[11px]">Email</p>
                <p className="text-base">chuyentrongtay@faifo.vn</p>
              </div>
              <div>
                <p className="text-[#2D2926]/40 mb-2 text-[11px]">Điện thoại</p>
                <p className="text-base">+84 90 123 4567</p>
              </div>
            </div>
          </div>

          {/* Cột Phải: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10 font-sans">
            <div className="relative">
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Tên của bạn *"
                className="w-full bg-transparent border-b border-[#2D2926]/20 py-3 text-[13px] focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 uppercase tracking-widest"
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="Email *"
                className="w-full bg-transparent border-b border-[#2D2926]/20 py-3 text-[13px] focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 uppercase tracking-widest"
              />
            </div>
            <div className="relative mt-4">
              <textarea 
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({...formData, message: e.target.value})}
                placeholder="Lời nhắn..."
                className="w-full bg-transparent border-b border-[#2D2926]/20 py-3 text-[15px] focus:outline-none focus:border-[#2D2926] transition-colors placeholder:text-[#2D2926]/40 resize-none font-serif tracking-normal"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#2D2926] text-[#FDF9F3] py-5 px-10 uppercase tracking-[0.2em] text-xs font-sans hover:bg-black transition-colors disabled:opacity-70 self-start mt-4"
            >
              {isSubmitting ? "Đang gửi..." : "Gửi thông điệp"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
