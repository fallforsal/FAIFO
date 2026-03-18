export const metadata = {
  title: 'Shop - Gốm Hội An',
  description: 'Explore our collection of traditional Hoi An ceramics',
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl">
      {children}
    </div>
  );
}
