import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui/custom-cursor'
import { PortfolioProvider } from '@/components/ui/portfolio-context'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Qulbi Khutsi Azzumi — UI/UX & Graphic Designer',
  description: 'Portfolio of Qulbi Khutsi Azzumi, a creative UI/UX and Graphic Designer specializing in Figma, Adobe Illustrator, and modern web design.',
  generator: 'Next.js',
  icons: {
    icon: '/navbar-logo.png',
    apple: '/navbar-logo.png',
  },
  openGraph: {
    title: 'Qulbi Khutsi Azzumi — UI/UX & Graphic Designer',
    description: 'Portfolio of Qulbi Khutsi Azzumi, a creative UI/UX and Graphic Designer.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FAFB' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // suppressHydrationWarning prevents errors from dynamic dark/light class added by PortfolioProvider
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PortfolioProvider>
          <CustomCursor />
          {children}
        </PortfolioProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
