'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
          <Image
  src="/icon.png"
  alt="CodeMaster Logo"
  width={50}
  height={50}
  className="ml-10 sm:ml-0"
/>
<p className='text-black/60 font-sans text-xl font-extrabold '>Eduvia Space</p>


          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/tutorials/python"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Python
            </Link>
            <Link
              href="/javascript"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              JavaScript
            </Link>
            <Link
              href="/tutorials/java"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Java
            </Link>
            <Link
              href="/tutorials/cpp"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              C++
            </Link>
            <Link
              href="/tutorials/ruby"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Ruby
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-3 space-y-3">
              <Link
                href="/tutorials/python"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Python
              </Link>
              <Link
                href="/javascript"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                JavaScript
              </Link>
              <Link
                href="/tutorials/java"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Java
              </Link>
              <Link
                href="/tutorials/cpp"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                C++
              </Link>
              <Link
                href="/tutorials/ruby"
                className="block text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Ruby
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}