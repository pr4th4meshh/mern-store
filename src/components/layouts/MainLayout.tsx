"use client"
import React from "react"
import { UserOutlined, ShopOutlined, HeartOutlined } from "@ant-design/icons"
import { Layout } from "antd"
import { useSelector } from "react-redux"
import { Footer } from "antd/es/layout/layout"
import Link from "next/link"
import { selectCurrentUser } from "@/lib/slices/userSlice"
import logo from "../../../public/REINlight.svg"
import Image from "next/image"

const { Header, Content } = Layout

const NAV_LINKS = [
  { label: "home", key: "/" },
  { label: "mens", key: "/mens" },
  { label: "women", key: `/women` },
  { label: "kids", key: `/kids` },
  { label: "featured", key: `/featured` },
]

const MainLayout = ({ children }: any) => {
  const user = useSelector(selectCurrentUser)
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="hidden md:flex items-center py-12 bg-white text-lg font-semibold border-b">
        <div className="flex flex-1">
          {NAV_LINKS.map((tab) => (
            <Link href={tab.key} key={tab.key} className="px-3 uppercase">
              {tab.label}
            </Link>
          ))}
        </div>

        <Image src={logo} height={120} width={150} quality={100} alt="reinventory" />

        <div className="flex flex-1 justify-end gap-7 items-center">
          <span>
            <HeartOutlined className=" cursor-pointer" />
          </span>
          <span>
            <ShopOutlined className=" cursor-pointer " />
          </span>
          {!user ? (
            <Link href="/sign-up">
              <span className="font-normal bg-secondary text-white p-2 rounded-md">
                Register
              </span>
            </Link>
          ) : (
            <span>
              <UserOutlined className=" cursor-pointer " />
            </span>
          )}
        </div>
      </Header>
      <Layout>
        <Content
          style={{
            padding: 0,
            margin: 0,
            minHeight: "100vh",
            backgroundColor: "white",
          }}
        >
          {children}
        </Content>
      </Layout>
      <Footer style={{ textAlign: "center" }}>
        Re-Inventory | RE-IN ©{new Date().getFullYear()} | Created by{" "}
        <a
          target="_blank"
          rel="noopener"
          className="text-red-500 underline"
          href="https://github.com/pr4th4meshh"
        >
          @pr4th4meshh
        </a>
      </Footer>
    </Layout>
  )
}

export default MainLayout
