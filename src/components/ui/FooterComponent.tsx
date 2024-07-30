import { Footer } from 'antd/es/layout/layout';
import Link from 'next/link';
import React from 'react';

const FooterComponent = () => {
  return (
    <Footer className="py-6 bg-black text-white flex flex-col md:flex-row justify-between px-4 md:px-20 text-sm md:text-lg mt-28">
      <span className="mb-4 md:mb-0 md:text-start text-center">
        Re-Inventory | RE-IN © {new Date().getFullYear()} | Created by{' '}
        <Link
          rel="noopener"
          target="_blank"
          href="https://github.com/pr4th4meshh"
          className="underline hover:text-gray-400"
        >
          @pr4th4meshh
        </Link>
      </span>
      <div className="flex flex-row gap-2 md:gap-6 justify-center items-center">
        <span className="hover:underline cursor-pointer">Terms & Conditions</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Cookie Policy</span>
      </div>
    </Footer>
  );
};

export default FooterComponent;