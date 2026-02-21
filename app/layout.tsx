import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VetRefill - Veterinary Prescription Refill Management',
  description: 'Streamline prescription refills for your veterinary clinic. Automate reminders, manage patients, and never miss a refill deadline.',
  keywords: 'veterinary, prescription, refill, management, pet health, clinic software',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
