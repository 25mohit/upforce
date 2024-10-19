"use client";
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState({})
  const router = useRouter();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  function decrypt() {
    const token = localStorage.getItem('token');
      if (!token) {
      console.error('No token found');
      return null;
    }
  
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      console.error('Invalid token format');
      return null;
    }
  
    const payload = parts[1];
  
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  
    try {
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
    router.replace()
  }
  
  return (
    <nav className="flex navbar">
      <div className="pc-nav w-full flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/"><i>Event Manager</i></Link>
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex space-x-8 text-md">
          <span className="cursor-pointer hover:text-gray-400 transition duration-300">Home</span>
          <span className="cursor-pointer hover:text-gray-400 transition duration-300">About</span>
          <span className="cursor-pointer hover:text-gray-400 transition duration-300">Services</span>
          <span className="cursor-pointer hover:text-gray-400 transition duration-300">Contact</span>
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
        <div className="mt-8 space-y-6 flex flex-col">
          <span onClick={toggleMenu} className="block text-xl hover:text-gray-400 transition duration-300">
            Home
          </span>
          <span onClick={toggleMenu} className="block text-xl hover:text-gray-400 transition duration-300">
            About
          </span>
          <span onClick={toggleMenu} className="block text-xl hover:text-gray-400 transition duration-300">
            Services
          </span>
          <span onClick={toggleMenu} className="block text-xl hover:text-gray-400 transition duration-300">
            Contact
          </span>
          {
            info.name ? <span className='flex items-center gap-2'>{info.name} <FaSignOutAlt className='cursor-pointer' onClick={onLogoutHandler}/></span> :
            <Link onClick={toggleMenu} href="/user" className="font-bold">
              Want to Login?
            </Link>
          }
        </div>
      </div>
    </nav>
  );
}