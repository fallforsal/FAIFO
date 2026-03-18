"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/useCartStore';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const InputField = ({ label, type = "text", required = true, placeholder = "" }: { label: string, type?: string, required?: boolean, placeholder?: string }) => (
  <div className="space-y-2">
    <label className="block text-sm font-sans tracking-wide text-[#2D2926]/80">{label}</label>
    <input 
      type={type} 
      required={required}
      placeholder={placeholder}
      className={cn(
        "w-full bg-transparent border border-[#2D2926]/20 rounded-md px-4 py-3 font-sans text-sm",
        "focus:outline-none focus:border-[#2D2926] focus:ring-1 focus:ring-[#2D2926] transition-all",
        "placeholder:text-gray-400"
      )}
    />
  </div>
);

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const totalPrice = getTotalPrice();
  const shippingFee = paymentMethod === 'cod' ? 30000 : 0;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fake API interaction for 2 seconds
    setTimeout(() => {
      clearCart();
      router.push('/checkout/success');
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#FDF9F3] text-[#2D2926] font-serif py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <Link href="/shop" className="text-sm font-sans text-[#2D2926]/60 hover:text-[#2D2926] transition-colors">
            ← Quay lại cửa hàng
          </Link>
          <h1 className="text-4xl font-light mt-4">Thanh toán</h1>
        </div>
        
        <form onSubmit={handleCheckout} className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Cột Trái: Thông tin Giao hàng & Thanh toán */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Section 1: Thông tin giao hàng */}
            <section>
              <h2 className="text-2xl mb-6 border-b border-[#2D2926]/10 pb-4">Thông tin giao hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <InputField label="Họ và tên" placeholder="Nhập đầy đủ họ tên" />
                </div>
                <InputField label="Số điện thoại" type="tel" placeholder="090 123 4567" />
                <InputField label="Email" type="email" placeholder="email@example.com" />
                <div className="sm:col-span-2">
                  <InputField label="Địa chỉ nhận hàng" placeholder="Số nhà, Đường, Giao lộ..." />
                </div>
              </div>
            </section>

            {/* Section 2: Phương thức thanh toán */}
            <section>
              <h2 className="text-2xl mb-6 border-b border-[#2D2926]/10 pb-4">Phương thức thanh toán</h2>
              <div className="space-y-4 font-sans">
                
                {/* Credit Card */}
                <label className={cn(
                  "block border rounded-lg p-4 cursor-pointer transition-colors",
                  paymentMethod === 'credit-card' ? "border-[#2D2926] bg-[#2D2926]/5" : "border-[#2D2926]/20 hover:border-[#2D2926]/50"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment_method"
                      className="w-4 h-4 accent-[#2D2926]" 
                      checked={paymentMethod === 'credit-card'} 
                      onChange={() => setPaymentMethod('credit-card')} 
                    />
                    <span className="font-medium text-[15px]">Thẻ thanh toán quốc tế (Visa / Mastercard / JCB)</span>
                  </div>
                  {/* Form Nhập thẻ giả */}
                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 pt-4 border-t border-[#2D2926]/10 grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <InputField label="Số thẻ" type="text" placeholder="0000 0000 0000 0000" />
                      </div>
                      <InputField label="Ngày hết hạn" type="text" placeholder="MM/YY" />
                      <InputField label="Mã bảo mật (CVV)" type="text" placeholder="123" />
                    </div>
                  )}
                </label>
                
                {/* Ví điện tử */}
                <label className={cn(
                  "block border rounded-lg p-4 cursor-pointer transition-colors",
                  paymentMethod === 'ewallet' ? "border-[#2D2926] bg-[#2D2926]/5" : "border-[#2D2926]/20 hover:border-[#2D2926]/50"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment_method"
                      className="w-4 h-4 accent-[#2D2926]" 
                      checked={paymentMethod === 'ewallet'} 
                      onChange={() => setPaymentMethod('ewallet')} 
                    />
                    <span className="font-medium text-[15px]">Thanh toán qua Ví điện tử (VNPay / MoMo)</span>
                  </div>
                  {/* Fake QR UI */}
                  {paymentMethod === 'ewallet' && (
                    <div className="mt-4 pt-4 border-t border-[#2D2926]/10">
                      <div className="bg-gray-50 p-4 border rounded-md text-center">
                        <p className="text-sm text-[#2D2926]/80 mb-4">Vui lòng quét mã QR bên dưới qua ứng dụng ngân hàng hoặc MoMo.</p>
                        <div className="w-32 h-32 bg-gray-200 border-dashed border-2 flex items-center justify-center text-xs mx-auto text-gray-500">
                          Mã QR tĩnh
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* ATM nội địa */}
                <label className={cn(
                  "block border rounded-lg p-4 cursor-pointer transition-colors",
                  paymentMethod === 'atm' ? "border-[#2D2926] bg-[#2D2926]/5" : "border-[#2D2926]/20 hover:border-[#2D2926]/50"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment_method"
                      className="w-4 h-4 accent-[#2D2926]" 
                      checked={paymentMethod === 'atm'} 
                      onChange={() => setPaymentMethod('atm')} 
                    />
                    <span className="font-medium text-[15px]">Thẻ ATM nội địa (Internet Banking)</span>
                  </div>
                  {/* Fake QR UI cho ATM */}
                  {paymentMethod === 'atm' && (
                    <div className="mt-4 pt-4 border-t border-[#2D2926]/10">
                      <div className="bg-gray-50 p-4 border rounded-md text-center">
                        <p className="text-sm text-[#2D2926]/80 mb-4">Vui lòng quét mã QR bên dưới qua ứng dụng ngân hàng của bạn.</p>
                        <div className="w-32 h-32 bg-gray-200 border-dashed border-2 flex items-center justify-center text-xs mx-auto text-gray-500">
                          Mã QR tĩnh
                        </div>
                      </div>
                    </div>
                  )}
                </label>

                {/* COD */}
                <label className={cn(
                  "block border rounded-lg p-4 cursor-pointer transition-colors",
                  paymentMethod === 'cod' ? "border-[#2D2926] bg-[#2D2926]/5" : "border-[#2D2926]/20 hover:border-[#2D2926]/50"
                )}>
                  <div className="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="payment_method"
                      className="w-4 h-4 accent-[#2D2926]" 
                      checked={paymentMethod === 'cod'} 
                      onChange={() => setPaymentMethod('cod')} 
                    />
                    <span className="font-medium text-[15px]">Thanh toán khi nhận hàng (COD)</span>
                  </div>
                  {/* Note cho COD */}
                  {paymentMethod === 'cod' && (
                    <div className="mt-4 pt-4 border-t border-[#2D2926]/10">
                      <p className="text-sm text-[#2D2926]/60 italic text-center">
                        Bạn sẽ thanh toán bằng tiền mặt khi nhận hàng (+30.000đ phí thu hộ).
                      </p>
                    </div>
                  )}
                </label>

              </div>
            </section>
          </div>

          {/* Cột Phải: Tóm tắt Đơn hàng */}
          <div className="lg:col-span-5 relative">
            <div className="bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#2D2926]/10 sticky top-24 font-sans shadow-sm">
              <h2 className="font-serif text-2xl mb-6 border-b border-[#2D2926]/10 pb-4">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-6 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.length === 0 ? (
                  <p className="text-sm text-[#2D2926]/60 italic">Chưa có sản phẩm nào trong giỏ hàng.</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-24 bg-gray-100 rounded shrink-0 overflow-hidden border border-[#2D2926]/5">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-[#2D2926]/10 flex items-center justify-center text-xs text-[#2D2926]/40">No img</div>
                        )}
                      </div>
                      <div className="flex-grow flex flex-col justify-center">
                        <h3 className="text-sm font-medium line-clamp-2 leading-relaxed">{item.name}</h3>
                        <div className="flex justify-between items-end mt-3">
                          <span className="text-sm text-[#2D2926]/60">SL: {item.quantity}</span>
                          <span className="font-semibold text-[15px]">{(item.price * item.quantity).toLocaleString('vi-VN')} đ</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-[#2D2926]/10 pt-4 pb-2 space-y-3 mt-auto">
                <div className="flex justify-between items-center text-sm text-[#2D2926]/70">
                  <span>Tạm tính</span>
                  <span>{totalPrice.toLocaleString('vi-VN')} đ</span>
                </div>
                <div className="flex justify-between items-center text-sm text-[#2D2926]/70">
                  <span>Phí vận chuyển</span>
                  <span>{paymentMethod === 'cod' ? '30.000 đ' : 'Miễn phí'}</span>
                </div>
              </div>

              <div className="border-t border-[#2D2926]/10 pt-4 mb-8">
                <div className="flex justify-between items-center text-xl font-medium">
                  <span>Tổng thanh toán</span>
                  <span>{(totalPrice + shippingFee).toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting || items.length === 0}
                className={cn(
                  "w-full bg-[#2D2926] text-[#FDF9F3] py-4 rounded-md font-sans text-lg transition-colors flex items-center justify-center gap-2",
                  isSubmitting || items.length === 0 ? "opacity-70 cursor-not-allowed" : "hover:bg-black"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  "Xác nhận đặt hàng"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
