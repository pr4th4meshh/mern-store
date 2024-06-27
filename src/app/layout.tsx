import type { Metadata } from 'next'
import './globals.css'
import MainLayout from '@/components/layouts/MainLayout'
import StoreProvider from './StoreProvider'

export const metadata: Metadata = {
  title: 'RE-IN',
  description: 'Developed by @pr4th4meshh on GitHub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <MainLayout>{children}</MainLayout>
        </StoreProvider>
      </body>
    </html>
  )
}
