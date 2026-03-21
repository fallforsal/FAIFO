
export const metadata = {
  title: 'Chi tiết tác phẩm - CHUYỆN TRONG TAY',
  description: 'Khám phá câu chuyện được thổi vào đất nung',
};

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#2D2926]">
      {children}
    </div>
  );
}