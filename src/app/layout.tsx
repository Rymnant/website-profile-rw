import './globals.css'
import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}