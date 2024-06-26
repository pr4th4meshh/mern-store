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
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      </style>
      <StoreProvider>
        <body>
          <MainLayout>{children}</MainLayout>
        </body>
      </StoreProvider>
    </html>
  )
}
