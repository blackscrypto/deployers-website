import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Deployers - AI Automation Agency',
  description: 'Automate. Scale. Deploy. Your AI automation partner.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CustomCursor />
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
