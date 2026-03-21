import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo Section */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-serif hover:opacity-80 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-600 text-white text-sm font-bold">
              </div>
              <div className="text-center">
                <div className="text-xs font-semibold">CHUYỆN TRONG TAY</div>
              </div>
            </Link>
            <p className="text-sm text-gray-600">
              Mang câu chuyện thổi vào đất nung.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold text-gray-900">
              DANH MỤC
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sản Phẩm
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold text-gray-900">
              THÔNG TIN
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Liên Hệ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-semibold text-gray-900">
              KẾT NỐI
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} Chuyện Trong Tay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
