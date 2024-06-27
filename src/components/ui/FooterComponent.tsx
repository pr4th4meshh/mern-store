import Link from 'next/link'
import React from 'react'

const FooterComponent = () => {
  return (
    <footer className="py-6 bg-black text-white flex flex-row justify-between px-20 text-lg mt-28">
      <div>
        <span>
          Re-Inventory | RE-IN ©{new Date().getFullYear()} | Created by{' '}
          <Link href="https://github.com/pr4th4meshh" className="underline hover:text-white">
            @pr4th4meshh
          </Link>
        </span>
      </div>
      <div className='flex gap-3'>
        <span>Terms & Condition</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
      </div>
    </footer>
  )
}

export default FooterComponent
