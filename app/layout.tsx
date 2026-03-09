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
  themeColor: '#121212',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="antialiased grain-overlay" style={{ backgroundColor: '#F5F0E6', color: '#44403c' }}>
        {children}
      </body>
    </html>
  )
}
