import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import StoreProvider from "./StoreProvider"
import MainLayout from "@/components/layouts/MainLayout"

const poppins = Poppins({weight: ["400"], subsets: ['latin']})

export const metadata: Metadata = {
  title: "Mern-Store",
  description: "Developed by @pr4th4meshh on GitHub",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={poppins.className}>
          <MainLayout>{children}</MainLayout>
        </body>
      </StoreProvider>
    </html>
  )
}
