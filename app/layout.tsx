import './globals.css'
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Storytellers of Faifo',
  description: 'Digital memories. A cinematic journey through Hoi An pottery craft.',
  keywords: ['Hoi An', 'pottery', 'ceramic', 'storytelling', 'Vietnamese craft'],
  authors: [{ name: 'Faifo Studios' }],
  openGraph: {
    title: 'Storytellers of Faifo',
    description: 'Digital memories. A cinematic journey through Hoi An pottery craft.',
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
    <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-ceramic-light text-ceramic-dark antialiased">
        {children}
      </body>
    </html>
  )
}
