import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import MainLayout from "@/components/layouts/MainLayout"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "@/lib/store"
import { Provider } from "react-redux"
import StoreProvider from "./StoreProvider"

const poppins = Poppins({weight: ["400"], subsets: ['latin']})

export const metadata: Metadata = {
  title: "RE-IN",
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
