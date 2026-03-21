import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Chính sách bảo mật | Chuyện Trong Tay',
    description: 'Chính sách bảo mật và quyền riêng tư của khách hàng tại Chuyện Trong Tay.',
};

export default function PrivacyPolicyPage() {
    return (
        <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen py-20 px-6 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="font-serif text-3xl md:text-4xl uppercase tracking-[0.2em] mb-16 text-center text-[#2D2926]">
                    Chính sách bảo mật
                </h1>

                <div className="space-y-10 text-[14px] md:text-[15px] leading-relaxed text-[#2D2926]/80 font-light tracking-wide">
                    <section>
                        <h2 className="font-serif text-lg mb-4 text-[#2D2926] uppercase tracking-widest font-normal">1. Mục đích thu thập thông tin</h2>
                        <p>
                            Chúng tôi thu thập thông tin cá nhân của bạn nhằm phục vụ cho quá trình xử lý đơn hàng,
                            giao hàng, và cung cấp dịch vụ hỗ trợ khách hàng tốt nhất. Các thông tin thu thập bao gồm:
                            Họ tên, Số điện thoại, Email, và Địa chỉ nhận hàng.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-lg mb-4 text-[#2D2926] uppercase tracking-widest font-normal">2. Phạm vi sử dụng thông tin</h2>
                        <p>
                            Thông tin của bạn chỉ được sử dụng trong nội bộ dự án Chuyện Trong Tay cho các mục đích:
                        </p>
                        <ul className="list-disc pl-5 mt-3 space-y-2 text-[#2D2926]/70">
                            <li>Xác nhận và xử lý đơn đặt hàng gốm sứ.</li>
                            <li>Cập nhật tình trạng đơn hàng và liên hệ giao nhận.</li>
                            <li>Gửi email thông báo về sản phẩm mới hoặc chương trình ưu đãi (nếu có sự đồng ý của bạn).</li>
                            <li>Giải quyết các vấn đề khiếu nại, bảo hành sản phẩm.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="font-serif text-lg mb-4 text-[#2D2926] uppercase tracking-widest font-normal">3. Bảo mật thông tin khách hàng</h2>
                        <p>
                            Chuyện Trong Tay cam kết bảo mật tuyệt đối thông tin cá nhân của bạn. Chúng tôi không bán,
                            trao đổi hay chia sẻ thông tin này cho bất kỳ bên thứ ba nào vì mục đích thương mại. Thông tin
                            chỉ được chia sẻ với các đơn vị vận chuyển đối tác để thực hiện việc giao nhận hàng hóa.
                        </p>
                    </section>

                    <section>
                        <h2 className="font-serif text-lg mb-4 text-[#2D2926] uppercase tracking-widest font-normal">4. Lưu trữ dữ liệu</h2>
                        <p>
                            Dữ liệu của bạn được lưu trữ an toàn trên máy chủ của chúng tôi. Bạn hoàn toàn có quyền yêu cầu
                            chúng tôi kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bất kỳ lúc nào
                            thông qua trang quản lý tài khoản hoặc liên hệ trực tiếp qua email hỗ trợ.
                        </p>
                    </section>

                    <div className="pt-8 border-t border-[#2D2926]/10 mt-16 text-[12px] italic opacity-60 text-center">
                        Cập nhật lần cuối: Tháng 3 năm 2026
                    </div>
                </div>
            </div>
        </main>
    );
}