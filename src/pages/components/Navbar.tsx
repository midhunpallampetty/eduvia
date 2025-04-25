// app/components/Navbar.tsx (or .jsx)
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-2500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="CodeMaster Logo"
              width={400}
              height={200}
              className="h-20 w-36"
            />
         
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/tutorials/python" className="text-gray-300 hover:text-white transition-colors">
              Python
            </Link>
            <Link href="/javascript" className="text-gray-300 hover:text-white transition-colors">
              JavaScript
            </Link>
            <Link href="/tutorials/java" className="text-gray-300 hover:text-white transition-colors">
              Java
            </Link>
            <Link href="/tutorials/cpp" className="text-gray-300 hover:text-white transition-colors">
              C++
            </Link>
            <Link href="/tutorials/ruby" className="text-gray-300 hover:text-white transition-colors">
              Ruby
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
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
          <div className="md:hidden py-4 space-y-4">
            <Link href="/tutorials/python" className="block text-gray-300 hover:text-white px-4">
              Python
            </Link>
            <Link href="/javascript" className="block text-gray-300 hover:text-white px-4">
              JavaScript
            </Link>
            <Link href="/tutorials/java" className="block text-gray-300 hover:text-white px-4">
              Java
            </Link>
            <Link href="/tutorials/cpp" className="block text-gray-300 hover:text-white px-4">
              C++
            </Link>
            <Link href="/tutorials/ruby" className="block text-gray-300 hover:text-white px-4">
              Ruby
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}