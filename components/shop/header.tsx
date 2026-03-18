'use client';

import { useState } from 'react';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CartSidebar } from '@/components/shop/cart-sidebar';
import { useCartStore } from '@/store/useCartStore';

export function ShopHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartQuantity = useCartStore((state) => state.getTotalQuantity());
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  return (
    <>
      {/* Header Container */}
      <header className="sticky top-0 z-40 w-full border-b border-[#2D2926]/10 bg-[#FDF9F3] text-[#2D2926]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-5">

          {/* DESKTOP LAYOUT (lg:flex) */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Left Cụm (Logo) */}
            <div className="flex-1 flex justify-start">
              <Link href="/" className="font-serif uppercase text-[22px] tracking-wider hover:opacity-80 transition-opacity flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[10px] font-sans font-bold tracking-tight">
                  CT
                </div>
                CHUYỆN TRONG TAY
              </Link>
            </div>

            {/* Center Cụm (Navigation) */}
            <nav className="flex-1 flex justify-center gap-6 xl:gap-10">
              <Link href="/about" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">
                About Chuyện Trong Tay
              </Link>
              <Link href="/shop" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">
                Shopping
              </Link>
              <Link href="/store-info" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">
                Store Information
              </Link>
              <Link href="/contact" className="font-serif uppercase text-[11px] xl:text-xs tracking-widest hover:text-[#2D2926]/50 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Cụm (Utilities) */}
            <div className="flex-1 flex justify-end items-center gap-6">
              {/* Fake Dropdown Languange */}
              <div className="relative group cursor-pointer font-serif uppercase text-xs tracking-widest relative pb-2 -mb-2">
                <span className="hover:text-[#2D2926]/60 transition-colors">English ▾</span>
                <div className="absolute top-full right-0 mt-0 w-28 bg-[#FDF9F3] border border-[#2D2926]/10 shadow-sm opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all flex flex-col z-50">
                  <span className="px-4 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest border-b border-[#2D2926]/5 transition-colors">ENGLISH</span>
                  <span className="px-4 py-3 hover:bg-[#2D2926]/5 text-[10px] tracking-widest transition-colors">TIẾNG VIỆT</span>
                </div>
              </div>

              {/* Login */}
              <Link href="/login" className="font-serif uppercase text-xs tracking-widest hover:text-[#2D2926]/60 transition-colors">
                Login
              </Link>

              {/* Icons */}
              <button aria-label="Search" className="hover:text-[#2D2926]/60 transition-colors p-1">
                <Search size={18} strokeWidth={1.5} />
              </button>

              <button onClick={() => openCart()} className="relative hover:text-[#2D2926]/60 transition-colors p-1 group">
                <ShoppingCart size={18} strokeWidth={1.5} />
                {cartQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[9px] font-sans transition-transform group-hover:scale-110">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* MOBILE LAYOUT (< lg) */}
          <div className="flex lg:hidden items-center justify-between">
            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-[#2D2926] hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo Mobile */}
            <Link href="/" className="font-serif uppercase text-lg tracking-wider font-medium absolute left-1/2 -translate-x-1/2">
              Chuyện Trong Tay
            </Link>

            {/* Search & Cart */}
            <div className="flex items-center gap-3">
              <button aria-label="Search" className="p-1 hover:opacity-70 transition-opacity">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button onClick={() => openCart()} className="relative p-1 hover:opacity-70 transition-opacity">
                <ShoppingCart size={20} strokeWidth={1.5} />
                {cartQuantity > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2D2926] text-[#FDF9F3] text-[9px] font-sans">
                    {cartQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER MENU */}
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-[#2D2926]/40 z-[60] lg:hidden transition-opacity duration-300 backdrop-blur-sm",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#FDF9F3] z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] lg:hidden shadow-2xl",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-[#2D2926]/10 bg-[#FDF9F3]">
          <span className="font-serif uppercase tracking-widest text-[13px] text-[#2D2926]">Menu</span>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 text-[#2D2926] hover:bg-[#2D2926]/5 rounded-sm transition-colors"
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto font-serif py-8 px-6 space-y-8 bg-[#FDF9F3]">
          <Link href="/about" className="block text-[13px] uppercase tracking-widest hover:text-[#2D2926]/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
            About Chuyện Trong Tay
          </Link>
          <Link href="/shop" className="block text-[13px] uppercase tracking-widest hover:text-[#2D2926]/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Shopping
          </Link>
          <Link href="/store-info" className="block text-[13px] uppercase tracking-widest hover:text-[#2D2926]/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Store Information
          </Link>
          <Link href="/contact" className="block text-[13px] uppercase tracking-widest hover:text-[#2D2926]/60 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>

        <div className="p-6 border-t border-[#2D2926]/10 space-y-8 font-serif bg-[#FDF9F3]">
          <Link
            href="/login"
            className="block text-[13px] uppercase tracking-widest hover:text-[#2D2926]/60 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <div className="space-y-3 pb-4">
            <span className="text-[10px] uppercase tracking-widest text-[#2D2926]/50">Language</span>
            <select className="w-full bg-transparent border-b border-[#2D2926]/20 py-2 text-xs uppercase tracking-widest focus:outline-none focus:border-[#2D2926] text-[#2D2926] transition-colors cursor-pointer">
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => closeCart()} />
    </>
  );
}
