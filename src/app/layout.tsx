import './globals.css'

export const metadata = {
  title: 'RW06 Rejowinangun',
  description: 'Ini adalah website RW06 Rejowinangun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  )
}