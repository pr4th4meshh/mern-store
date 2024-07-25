import { Header } from "antd/es/layout/layout"
import {
  UserOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect } from "react"
import logo from "../../../public/REINlight.svg"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "@/lib/slices/userSlice"
import ProfileComponent from "./ProfileComponent"
import { toggleDrawer } from "@/lib/slices/configurationSlice"
import { DRAWER_STATE } from "@/common/states"
import { useGetUserDetailsQuery } from "@/lib/api-slices/userApiSlice"
import { Avatar, Badge } from "antd"

const NAV_LINKS = [
  { label: "home", key: "/" },
  { label: "mens", key: "/category/mens" },
  { label: "women", key: `/category/women` },
  { label: "kids", key: `/category/kids` },
  { label: "featured", key: `/category/featured` },
]

const NavbarComponent = () => {
  const user = useSelector(selectCurrentUser)
  const wishlistedItems = useSelector(
    (state) => state.wishlistedItems.wishlistedItems,
  )
  const { data: userData, refetch } = useGetUserDetailsQuery(user._id)
  const dispatch = useDispatch()

  console.log(userData)
  const cartItems = userData.cart

  useEffect(() => {
    refetch()
  }, [refetch])
  console.log(user)
  return (
    <>
      <ProfileComponent
        userName={user?.username}
        userEmail={user?.email}
        userID={user?._id}
        userPhoto={user?.avatar}
      />
      <Header className="hidden md:flex items-center py-12 bg-white text-lg font-semibold border-b">
        <div className="flex flex-1">
          {NAV_LINKS.map((tab) => (
            <Link href={tab.key} key={tab.key} className="px-3 uppercase">
              {tab.label}
            </Link>
          ))}
        </div>

        <Link href="/">
          <Image
            src={logo}
            height={120}
            width={150}
            quality={100}
            alt="reinventory"
          />
        </Link>

        <div className="flex flex-1 justify-end gap-7 items-center">
          {user && (
            <>
              {" "}
              <span>
                <Link href={"/wishlist"}>
                  <Badge
                    size="small"
                    color="orange"
                    count={wishlistedItems.length || null}
                  >
                    <HeartOutlined className=" cursor-pointer text-xl" />
                  </Badge>
                </Link>
              </span>
              <span>
                <Link href={"/cart"}>
                  <Badge
                    size="small"
                    color="orange"
                    count={cartItems.length || null}
                  >
                    <ShoppingCartOutlined className=" cursor-pointer text-xl" />
                  </Badge>
                </Link>
              </span>{" "}
            </>
          )}
          {!user ? (
            <Link href="/sign-up">
              <span className="font-normal bg-secondary text-white p-2 rounded-md">
                Register
              </span>
            </Link>
          ) : (
            <span>
              <Avatar
              src={user.avatar}
                onClick={() =>
                  dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
                }
                className=" cursor-pointer text-xl"
              />
            </span>
          )}
        </div>
      </Header>
    </>
  )
}

export default NavbarComponent
