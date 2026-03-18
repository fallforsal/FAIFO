export default function StoreInfoPage() {
  return (
    <main className="bg-[#FDF9F3] text-[#2D2926] min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="font-serif text-4xl uppercase tracking-[0.15em] mb-20 text-center">
          Cửa hàng
        </h1>

        <hr className="border-gray-300 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Flagship */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-serif text-2xl uppercase tracking-widest mb-6">Hội An Flagship</h2>
            <div className="font-sans text-sm text-[#2D2926]/70 space-y-2 uppercase tracking-widest leading-relaxed">
              <p>123 Trần Phú, Phường Minh An</p>
              <p>Thành phố Hội An, Quảng Nam</p>
              <p className="mt-6 pt-6 border-t border-gray-200 inline-block w-full md:w-auto">Giờ mở cửa: 09:00 - 21:00</p>
            </div>
          </div>

          {/* Saigon Studio */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="font-serif text-2xl uppercase tracking-widest mb-6">Saigon Studio</h2>
            <div className="font-sans text-sm text-[#2D2926]/70 space-y-2 uppercase tracking-widest leading-relaxed">
              <p>Tầng 2, 45 Nguyễn Huệ, P. Bến Nghé</p>
              <p>Quận 1, Thành phố Hồ Chí Minh</p>
              <p className="mt-6 pt-6 border-t border-gray-200 inline-block w-full md:w-auto">Giờ mở cửa: 10:00 - 20:00</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-300 mt-20" />
      </div>
    </main>
  );
}
