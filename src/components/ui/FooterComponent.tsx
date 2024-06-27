import { Footer } from 'antd/es/layout/layout'
import Link from 'next/link'
import React from 'react'

const FooterComponent = () => {
  return (
    <Footer className="py-6 bg-black text-white flex flex-row justify-between px-20 text-lg mt-28">
      <span>
        Re-Inventory | RE-IN © {new Date().getFullYear()} | Created by{' '}
        <Link
          rel="noopener"
          target="_blank"
          href="https://github.com/pr4th4meshh"
          className="underline hover:text-white"
        >
          @pr4th4meshh
        </Link>
      </span>
      <div className="flex gap-3">
        <span>Terms & Condition</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
      </div>
    </Footer>
  )
}

export default FooterComponent
