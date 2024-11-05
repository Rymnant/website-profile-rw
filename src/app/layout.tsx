import './globals.css'
import type { Metadata } from 'next'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'

export const metadata: Metadata = {
  title: 'RW06 Rejowinangun',
  description: 'Website resmi RW06 Rejowinangun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen text-black">
          <Header />
            {children}        
          <Footer />
        </div>
      </body>
    </html>
  )
}