import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Caveat } from 'next/font/google'
import { GlobalLayoutWrapper } from '@/components/layout/GlobalLayoutWrapper'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin', 'vietnamese'], variable: '--font-playfair' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Chuyện trog tay',
  description: 'Mỗi chiếc gốm là một câu chuyện. A cinematic journey through Hội An pottery craft.',
  keywords: ['Hội An', 'pottery', 'gốm', 'ceramic', 'NFC', 'storytelling', 'Vietnamese craft'],
  authors: [{ name: 'Chuyện trong tay' }],
  openGraph: {
    title: 'Chuyện trong tay',
    description: 'Mỗi chiếc gốm là một câu chuyện. Digital memories from Hội An.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#FDF9F3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      {/* Thêm font-light và antialiased để nét chữ thanh mảnh, mượt mà */}
      <body className="bg-[#FDF9F3] text-stone-800 font-light antialiased flex flex-col min-h-screen">
        <GlobalLayoutWrapper>
          {children}
        </GlobalLayoutWrapper>
      </body>
    </html>
  )
}