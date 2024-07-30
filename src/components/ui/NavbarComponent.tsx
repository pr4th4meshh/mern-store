import { Header } from "antd/es/layout/layout"
import {
  ContainerOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  MenuOutlined,
} from "@ant-design/icons"
import Link from "next/link"
import Image from "next/image"
import React, { useState, useEffect } from "react"
import logo from "../../../public/REINlight.svg"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUser } from "@/lib/slices/userSlice"
import ProfileComponent from "./ProfileComponent"
import { toggleDrawer } from "@/lib/slices/configurationSlice"
import { DRAWER_STATE } from "@/common/states"
import { useGetUserDetailsQuery } from "@/lib/api-slices/userApiSlice"
import { Avatar, Badge, Drawer, Menu } from "antd"

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
    (state: any) => state.wishlistedItems.wishlistedItems,
  )

  const dispatch = useDispatch()
  const [drawerVisible, setDrawerVisible] = useState(false)

  const { data: userData, refetch } = useGetUserDetailsQuery(user?._id || "");

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  useEffect(() => {
    refetch()
  }, [refetch])

  const cartItems = userData?.cart || []

  const handleDrawerOpen = () => {
    setDrawerVisible(true)
  }

  const handleDrawerClose = () => {
    setDrawerVisible(false)
  }

  const drawerContent = (
    <Menu mode="inline" onClick={handleDrawerClose}>
      {NAV_LINKS.map((tab) => (
        <Menu.Item key={tab.key}>
          <Link href={tab.key}>{tab.label.toUpperCase()}</Link>
        </Menu.Item>
      ))}
      {user && (
        <>
          <Menu.Item key="wishlist">
            <Link href={"/wishlist"}>
              <Badge
                size="small"
                color="orange"
                count={wishlistedItems.length || null}
              >
                <HeartOutlined className="cursor-pointer text-xl" />
              </Badge>
              <span className="pl-2">Wishlist</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="cart">
            <Link href={"/cart"}>
              <Badge
                size="small"
                color="orange"
                count={cartItems.length || null}
              >
                <ShoppingCartOutlined className="cursor-pointer text-xl" />
              </Badge>
              <span className="pl-2">Cart</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="orders">
            <Link href={"/orders"}>
              <Badge size="small" color="orange" count={null}>
                <ContainerOutlined className="cursor-pointer text-xl" />
              </Badge>
              <span className="pl-2">Orders</span> 
            </Link>
          </Menu.Item>
        </>
      )}
      {!user ? (
        <Menu.Item key="register">
          <Link href="/sign-up">
            <span className="font-normal bg-secondary text-white p-2 rounded-md">
              Register
            </span>
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item key="profile">
          <Avatar
            src={user.avatar}
            onClick={() =>
              dispatch(toggleDrawer(DRAWER_STATE.OPEN_DRAWER_STATE))
            }
            className="cursor-pointer text-xl mr-2"
          />
          Profile
        </Menu.Item>
      )}
    </Menu>
  )

  return (
    <>
      <ProfileComponent
        userName={user?.username}
        userEmail={user?.email}
        userID={user?._id}
        userPhoto={user?.avatar}
      />
      <Header className="bg-white text-lg font-semibold border-b py-6 md:py-12 flex items-center justify-between px-6 md:px-16">
        {/* <div className="flex items-center justify-between px-4 md:px-8"> */}
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={handleDrawerOpen}
          aria-label="Toggle Menu"
        >
          <MenuOutlined className="text-xl" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex">
          <Image
            src={logo}
            height={120}
            width={150}
            className="md:h-[120px] md:w-[150px] h-[70px] w-[100px]"
            quality={100}
            alt="reinventory"
          />
        </Link>

        <div className="hidden md:flex">
          {NAV_LINKS.map((tab) => (
            <Link href={tab.key} key={tab.key} className="px-3 uppercase">
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Desktop Menu Items */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-7">
          {user && (
            <>
              <span>
                <Link href={"/wishlist"}>
                  <Badge
                    size="small"
                    color="orange"
                    count={wishlistedItems.length || null}
                  >
                    <HeartOutlined className="cursor-pointer text-xl" />
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
                    <ShoppingCartOutlined className="cursor-pointer text-xl" />
                  </Badge>
                </Link>
              </span>
              <span>
                <Link href={"/orders"}>
                  <Badge size="small" color="orange" count={null}>
                    <ContainerOutlined className="cursor-pointer text-xl" />
                  </Badge>
                </Link>
              </span>
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
                className="cursor-pointer text-xl"
              />
            </span>
          )}
        </div>
        {/* </div> */}
      </Header>
      {/* Mobile Drawer */}
      <Drawer
        placement="left"
        closable
        onClose={handleDrawerClose}
        visible={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
      >
        {drawerContent}
      </Drawer>
    </>
  )
}

export default NavbarComponent
