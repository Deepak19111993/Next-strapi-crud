'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const router = usePathname();

  const navbar = [
    { id: 1, href: '/', name: 'Home' },
    { id: 2, href: '/about', name: 'About Us' },
    { id: 3, href: '/contact', name: 'Contact Us' },
    { id: 4, href: '/service', name: 'Services' },
  ];

  return (
    <header>
      <div className='logo'>LOGO</div>
      <nav>
        <div className='nav-links'>
          {navbar.map((label, index) => (
            <Link
              key={label?.name}
              className={router === label?.href ? 'active' : ''}
              href={label?.href}
            >
              {label?.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
