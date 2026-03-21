import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full aspect-video md:h-[70vh] bg-gray-200 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2000"
          alt="Lò gốm cổ"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white font-serif text-4xl md:text-6xl uppercase tracking-[0.2em] font-medium text-center px-4 mix-blend-overlay">
            Linh hồn của đất
          </h1>
        </div>
      </section>

      {/* Body Section */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div className="">
            <h2 className="font-serif text-3xl md:text-4xl leading-snug text-[#2D2926]">
              Chuyện Trong Tay - Nơi gốm sứ cất tiếng nói
            </h2>
            <hr className="w-16 border-[#2D2926] mt-8" />
          </div>
          <div className="font-serif leading-relaxed text-[#2D2926]/80 text-lg space-y-8">
            <p>
              Giữa nhịp sống vội vã, những giá trị nguyên bản đôi khi bị lớp bụi thời gian che khuất. Chuyện Trong Tay ra đời từ khao khát gìn giữ tinh hoa gốm sứ Hội An - nơi những đôi bàn tay nghệ nhân ngày đêm nhào nặn lên hình hài của đất mẹ.
            </p>
            <p>
              Nhưng chúng tôi không chỉ dừng lại ở truyền thống. Mỗi tác phẩm gốm tại Chuyện Trong Tay được tích hợp một chip NFC một chạm siêu nhỏ ẩn mình dưới đáy bình. Dấu ấn công nghệ giấu kín này biến một vật thể tĩnh lặng thành "vị quản gia" trung thành lưu giữ ký ức số.
            </p>
            <p>
              Chỉ với một cú chạm điện thoại, bạn có thể truyền tải bức thư thoại, video kỷ niệm, hay những lời nhắn nhủ yêu thương cho người nhận. Đó là sự giao thoa hoàn mỹ giữa giá trị thủ công ngàn đời và hơi thở thời đại, biến gốm sứ thành một di sản cá nhân đích thực rực rỡ và bất tử.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
