import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { PortfolioProvider } from '@/components/ui/portfolio-context'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Qulbi Khutsi Azzumi - UI/UX & Graphic Designer',
  description: 'Portfolio of Qulbi Khutsi Azzumi, a creative UI/UX and Graphic Designer showcasing digital design work and creative projects.',
  generator: 'v0.app',
  icons: {
    icon: '/navbar-logo.png',
    apple: '/navbar-logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#000000' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        <PortfolioProvider>
          <CustomCursor />
          {children}
        </PortfolioProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

