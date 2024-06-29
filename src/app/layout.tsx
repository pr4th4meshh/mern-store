import type { Metadata } from 'next'
import './globals.css'
import MainLayout from '@/components/layouts/MainLayout'
import StoreProvider from './StoreProvider'
import localFont from "next/font/local"

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/Poppins-Regular.ttf",
      weight: '400'
    }
  ],
  variable: '--font-poppins'
})

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
    <html lang="en" className={`${poppins.variable} font-sans`}>
      <body>
        <StoreProvider>
          <MainLayout>
            {children}
            </MainLayout>
        </StoreProvider>
      </body>
    </html>
  )
}
