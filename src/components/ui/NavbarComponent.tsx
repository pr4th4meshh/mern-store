import { Header } from 'antd/es/layout/layout'
import { UserOutlined, ShopOutlined, HeartOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../../../public/REINlight.svg'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/lib/slices/userSlice'


const NAV_LINKS = [
    { label: 'home', key: '/' },
    { label: 'mens', key: '/mens' },
    { label: 'women', key: `/women` },
    { label: 'kids', key: `/kids` },
    { label: 'featured', key: `/featured` },
  ]

const NavbarComponent = () => {
    const user = useSelector(selectCurrentUser)
  return (
    <Header className="hidden md:flex items-center py-12 bg-white text-lg font-semibold border-b">
    <div className="flex flex-1">
      {NAV_LINKS.map((tab) => (
        <Link href={tab.key} key={tab.key} className="px-3 uppercase">
          {tab.label}
        </Link>
      ))}
    </div>

    <Image
      src={logo}
      height={120}
      width={150}
      quality={100}
      alt="reinventory"
    />

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
  )
}

export default NavbarComponent