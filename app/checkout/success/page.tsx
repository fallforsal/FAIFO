import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FDF9F3] text-[#2D2926] font-serif flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white/40 backdrop-blur-md p-10 rounded-2xl border border-[#2D2926]/10 shadow-sm">
        <CheckCircle2 className="w-20 h-20 mx-auto text-green-700/80" strokeWidth={1.5} />
        
        <div className="space-y-4">
          <h1 className="text-3xl font-light leading-snug">Đặt hàng thành công</h1>
          <p className="text-base text-[#2D2926]/80 leading-relaxed font-sans font-light">
            Cảm ơn bạn đã lựa chọn Gốm Hội An. Mỗi tác phẩm là một câu chuyện độc bản, và chúng tôi rất vinh hạnh được gửi trọn vẹn giá trị đó đến tay bạn.
          </p>
          <p className="text-sm text-[#2D2926]/60 font-sans italic pt-2">
            Mã đơn hàng và thông tin vận chuyển đã được gửi qua email của bạn.
          </p>
        </div>

        <div className="pt-8 relative z-10">
          <Link 
            href="/shop" 
            className="inline-block w-full bg-[#2D2926] text-[#FDF9F3] py-4 px-8 rounded-md font-sans text-[15px] hover:bg-black transition-colors"
          >
            Tiếp tục khám phá
          </Link>
        </div>
      </div>
    </main>
  );
}
