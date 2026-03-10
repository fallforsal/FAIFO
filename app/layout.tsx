import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Caveat } from 'next/font/google'

const inter = Inter({ subsets: ['latin', 'vietnamese'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin', 'vietnamese'], variable: '--font-playfair' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat' })

export const metadata: Metadata = {
  title: 'Storytellers of Faifo',
  description: 'Mỗi chiếc gốm là một câu chuyện. A cinematic journey through Hội An pottery craft.',
  keywords: ['Hội An', 'Faifo', 'pottery', 'gốm', 'ceramic', 'NFC', 'storytelling', 'Vietnamese craft'],
  authors: [{ name: 'Storytellers of Faifo' }],
  openGraph: {
    title: 'Storytellers of Faifo',
    description: 'Mỗi chiếc gốm là một câu chuyện. Digital memories from Hội An.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#F5F0E6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="bg-[#F5F0E6] text-stone-800">
        {children}
      </body>
    </html>
  )
}
