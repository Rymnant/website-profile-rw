import '@/app/styles/globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen text-black">
      <Header />
      {children}
      <Footer />
    </div>
  )
}