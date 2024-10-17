"use client";
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex navbar">
      <div className="pc-nav w-full flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">MyLogo</Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="/" className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link href="/about" className="hover:text-gray-400 transition duration-300">About</Link>
          <Link href="/services" className="hover:text-gray-400 transition duration-300">Services</Link>
          <Link href="/contact" className="hover:text-gray-400 transition duration-300">Contact</Link>
        </div>

        {/* Login Link */}
        <div className="hidden md:block">
          <Link href="/user" className="font-bold">
            Want to Login?
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed z-10 top-0 right-0 h-full w-64 bg-gray-900 text-white p-6 transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <button onClick={toggleMenu} className="text-white">
          <FiX size={24} />
        </button>
        <div className="mt-8 space-y-6">
          <Link href="/" className="block text-xl hover:text-gray-400 transition duration-300">
            Home
          </Link>
          <Link href="/about" className="block text-xl hover:text-gray-400 transition duration-300">
            About
          </Link>
          <Link href="/services" className="block text-xl hover:text-gray-400 transition duration-300">
            Services
          </Link>
          <Link href="/contact" className="block text-xl hover:text-gray-400 transition duration-300">
            Contact
          </Link>
          <Link href="/user" className="font-bold mt-8">
            Want to Login?
          </Link>
        </div>
      </div>
    </nav>
  );
}