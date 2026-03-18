import { ShopHeader } from '@/components/shop/header';

export const metadata = {
  title: 'Product Detail - Gốm Hội An',
  description: 'Explore our traditional Hoi An ceramic products',
};

export default function ProductDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hoiAnBg">
      {children}
    </div>
  );
}
