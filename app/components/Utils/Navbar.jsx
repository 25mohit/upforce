"use client";
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({})

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  function decrypt() {
    const token = localStorage.getItem('token');
  
    // Check if the token exists
    if (!token) {
      console.error('No token found');
      return null;
    }
  
    const parts = token.split('.');
  
    // Ensure the token has three parts (header, payload, and signature)
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
  
    const payload = parts[1];
  
    // Replace URL-safe characters with standard Base64 characters
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  
    try {
      // Decode base64 and parse JSON
      const decodedPayload = JSON.parse(atob(base64));
      return setInfo({name: decodedPayload?.name, email: decodedPayload?.email})
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  useEffect(() => {    
    decrypt()
  },[])

  const onLogoutHandler = () => {
    localStorage.clear()
    window.location.reload()
    window.location.href = '/'
  }
  console.log("info", info)
  
  return (
    <nav className="flex navbar">
      <div className="pc-nav w-full flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/"><i>Event Manager</i></Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex space-x-8 text-md">
          <Link href="/" className="hover:text-gray-400 transition duration-300">Home</Link>
          <Link href="/about" className="hover:text-gray-400 transition duration-300">About</Link>
          <Link href="/services" className="hover:text-gray-400 transition duration-300">Services</Link>
          <Link href="/contact" className="hover:text-gray-400 transition duration-300">Contact</Link>
        </div>

        {/* Login Link */}
        <div className="hidden md:block">
          {
            info.name ? <span className='flex items-center gap-2 cursor-pointer' title={info?.email}>{info.name} <FaSignOutAlt className='cursor-pointer' onClick={onLogoutHandler}/></span> :
            <Link href="/user" className="font-light">
              Want to Login?
            </Link>
          }
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <span>{info.name}</span>
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
          <Link onClick={toggleMenu} href="/" className="block text-xl hover:text-gray-400 transition duration-300">
            Home
          </Link>
          <Link onClick={toggleMenu} href="/about" className="block text-xl hover:text-gray-400 transition duration-300">
            About
          </Link>
          <Link onClick={toggleMenu} href="/services" className="block text-xl hover:text-gray-400 transition duration-300">
            Services
          </Link>
          <Link onClick={toggleMenu} href="/contact" className="block text-xl hover:text-gray-400 transition duration-300">
            Contact
          </Link>
          {
            info.name ? <span className='flex items-center gap-2'>{info.name} <FaSignOutAlt className='cursor-pointer' onClick={onLogoutHandler}/></span> :
            <Link onClick={toggleMenu} href="/user" className="font-bold mt-8">
              Want to Login?
            </Link>
          }
        </div>
      </div>
    </nav>
  );
}