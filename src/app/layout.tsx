import './globals.css'
import ThemeWrapper from '@/components/layout/theme-wrapper'
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: 'Website RW 06 Rejowinangun',
  description: 'Website resmi RW 06 Rejowinangun',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen dark:bg-gray-950">
        <ThemeWrapper>
          {children}
          <Toaster />
        </ThemeWrapper>
      </body>
    </html>
  )
}