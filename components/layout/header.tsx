'use client';

import { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, X, User as UserIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CartSidebar } from '@/components/shop/cart-sidebar';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import client-side supabase
import { logout } from '@/app/actions/auth.actions';   // Import hàm logout server action
import { User } from '@supabase/supabase-js';

export function ShopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(false);

  // 1. THÊM STATE ĐỂ LƯU THÔNG TIN USER
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  // 2. LẮNG NGHE TRẠNG THÁI ĐĂNG NHẬP KHI COMPONENT MOUNT
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();

    // Tự động cập nhật Header nếu trạng thái Auth thay đổi (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const cartQuantity = useCartStore((state) => state.getTotalQuantity());
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoutClick = async () => {
    await logout();
    setUser(null);
    router.refresh(); // Ép trang web render lại để cập nhật quyền truy cập
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#2D2926]/10 bg-[#FDF9F3] text-[#2D2926]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-5">

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex-1 flex justify-start">
              <Link href="/" className="font-serif uppercase text-[22px] tracking-wider hover:opacity-80 transition-opacity flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[10px] font-sans font-bold">CT</div>
                CHUYỆN TRONG TAY
              </Link>
            </div>

            <nav className="flex-1 flex justify-center gap-6 xl:gap-10 items-center">
              <Link href="/about" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">Giới thiệu</Link>
              <div className="relative group cursor-pointer font-serif uppercase text-[11px] xl:text-xs tracking-widest py-2">
                <span className="hover:text-[#2D2926]/50 transition-colors">SẢN PHẨM</span>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#FDF9F3] border border-[#2D2926]/10 shadow-sm opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all flex flex-col z-50">
                  <Link href="/shop" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap">TẤT CẢ SẢN PHẨM</Link>
                  <Link href="/shop?category=Trà Cụ" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap">Trà Cụ</Link>
                  <Link href="/shop?category=Bát Đĩa" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors whitespace-nowrap">Bát Đĩa</Link>
                  <Link href="/shop?category=Bình Hoa" className="px-5 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest transition-colors whitespace-nowrap">Bình Hoa</Link>
                </div>
              </div>
              <Link href="/store-info" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">Địa Chỉ</Link>
              <Link href="/contact" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">Liên Hệ</Link>
            </nav>

            <div className="flex-1 flex justify-end items-center gap-6">
              <form onSubmit={handleSearch} className="flex items-center border-b border-[#2D2926]/30 pb-1">
                <input
                  type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-[11px] font-sans font-light w-24 focus:w-32 transition-all placeholder:text-[#2D2926]/40 uppercase tracking-widest"
                />
                <button type="submit"><Search size={14} strokeWidth={1.5} className="text-[#2D2926]/80" /></button>
              </form>

              {/* 3. ĐỔI NÚT ĐĂNG NHẬP / ĐĂNG XUẤT TRÊN DESKTOP */}
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-[10px] uppercase tracking-widest font-sans text-[#2D2926]/60">Chào, {user.user_metadata?.full_name?.split(' ').pop() || 'Bạn'}</span>
                  <button onClick={handleLogoutClick} className="hover:text-[#C0593E] transition-colors" title="Đăng xuất">
                    <LogOut size={16} strokeWidth={1.5} />
                  </button>
                </div>
              ) : (
                <Link href="/login" className="font-serif uppercase text-xs tracking-widest hover:text-[#2D2926]/60 transition-colors">Đăng nhập</Link>
              )}

              <div className="relative group cursor-pointer font-serif uppercase text-xs tracking-widest relative pb-2 -mb-2">
                <span className="hover:text-[#2D2926]/60 transition-colors">VI ▾</span>
                <div className="absolute top-full right-0 mt-0 w-24 bg-[#FDF9F3] border border-[#2D2926]/10 shadow-sm opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all flex flex-col z-50 text-center">
                  <span className="px-4 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5">VI</span>
                  <span className="px-4 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest">EN</span>
                </div>
              </div>

              <button onClick={() => openCart()} className="relative hover:text-[#2D2926]/60 transition-colors p-1 group">
                <ShoppingCart size={18} strokeWidth={1.5} />
                {cartQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[9px] font-sans group-hover:scale-110 transition-transform">{cartQuantity}</span>
                )}
              </button>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="flex lg:hidden items-center justify-between">
            <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 text-[#2D2926]"><Menu size={22} strokeWidth={1.5} /></button>
            <Link href="/" className="font-serif uppercase text-[15px] sm:text-lg tracking-wider font-medium absolute left-1/2 -translate-x-1/2 whitespace-nowrap">Chuyện Trong Tay</Link>
            <div className="flex items-center gap-3">
              <button className="p-1"><Search size={20} strokeWidth={1.5} /></button>
              <button onClick={() => openCart()} className="relative p-1">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartQuantity > 0 && <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[9px] font-sans">{cartQuantity}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={cn("fixed inset-0 bg-[#2D2926]/40 z-[60] lg:hidden transition-opacity duration-300 backdrop-blur-sm", isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible")} onClick={() => setIsMenuOpen(false)} />
      <div className={cn("fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#FDF9F3] z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden shadow-2xl overflow-hidden", isMenuOpen ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex items-center justify-between p-5 border-b border-[#2D2926]/10">
          <span className="font-serif uppercase tracking-widest text-[13px] text-[#2D2926]">DANH MỤC</span>
          <button onClick={() => setIsMenuOpen(false)}><X size={22} strokeWidth={1.5} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto font-serif py-8 px-6 space-y-8 bg-[#FDF9F3]">
          <form onSubmit={handleSearch} className="flex items-center border-b border-[#2D2926]/30 pb-2 mb-8">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm..." className="bg-transparent border-none outline-none text-[13px] w-full uppercase tracking-widest" />
            <button type="submit"><Search size={16} strokeWidth={1.5} /></button>
          </form>

          <Link href="/about" className="block text-[13px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Câu chuyện</Link>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link href="/shop" className="block text-[13px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Sản phẩm</Link>
              <button onClick={() => setIsMobileShopOpen(!isMobileShopOpen)} className="p-1 text-xl font-extralight">{isMobileShopOpen ? '-' : '+'}</button>
            </div>
            <div className={cn("pl-4 border-l border-[#2D2926]/10 flex flex-col gap-5 overflow-hidden transition-all duration-300", isMobileShopOpen ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0")}>
              <Link href="/shop" className="block text-[11px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Tất cả sản phẩm</Link>
              <Link href="/shop?category=Trà Cụ" className="block text-[11px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Trà Cụ</Link>
              <Link href="/shop?category=Bát Đĩa" className="block text-[11px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Bát Đĩa</Link>
              <Link href="/shop?category=Bình Hoa" className="block text-[11px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Bình Hoa</Link>
            </div>
          </div>

          <Link href="/store-info" className="block text-[13px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Địa chỉ</Link>
          <Link href="/contact" className="block text-[13px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Liên hệ</Link>
        </nav>

        {/* 4. ĐỔI NÚT ĐĂNG NHẬP / ĐĂNG XUẤT TRÊN MOBILE */}
        <div className="p-6 border-t border-[#2D2926]/10 space-y-8 font-serif bg-[#FDF9F3] shrink-0">
          {user ? (
            <div className="space-y-4">
              <span className="block text-[10px] uppercase tracking-widest text-[#2D2926]/50 font-sans">Tài khoản: {user.user_metadata?.full_name || user.email}</span>
              <button onClick={handleLogoutClick} className="block text-[13px] uppercase tracking-widest text-[#C0593E]">Đăng xuất</button>
            </div>
          ) : (
            <Link href="/login" className="block text-[13px] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
          )}
          <div className="space-y-3 pb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#2D2926]/50">Ngôn ngữ</span>
            <select className="w-full bg-transparent border-b border-[#2D2926]/20 py-2 text-xs uppercase tracking-widest cursor-pointer">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => closeCart()} />
    </>
  );
}