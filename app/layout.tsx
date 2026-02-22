import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'VetRefill - Animal News & Wildlife Stories',
    template: '%s | VetRefill Animal News',
  },
  description: 'Your daily dose of animal news, wildlife stories, and pet care tips. Stay informed about dogs, cats, wildlife, birds, and exotic animals.',
  keywords: 'animal news, wildlife, pets, dogs, cats, birds, exotic animals, pet care, nature',
  authors: [{ name: 'VetRefill Animal News' }],
  creator: 'VetRefill',
  publisher: 'VetRefill',
  metadataBase: new URL('https://vetrefill.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vetrefill.com',
    siteName: 'VetRefill Animal News',
    title: 'VetRefill - Animal News & Wildlife Stories',
    description: 'Your daily dose of animal news, wildlife stories, and pet care tips.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'VetRefill Animal News',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VetRefill - Animal News & Wildlife Stories',
    description: 'Your daily dose of animal news, wildlife stories, and pet care tips.',
    images: ['https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'MzHe7AppcspSa8pCPOgvSnM8wnj3K-o5D1xCGhvR3jY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PX6XQ01SX3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PX6XQ01SX3');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
