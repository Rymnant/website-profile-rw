import './globals.css'
// import global.css
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen text-black">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}