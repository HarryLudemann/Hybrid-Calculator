'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold" style={{ color: '#D50000' }}>
              BAIC
            </div>
            <div className="ml-2 text-sm text-gray-600">Wellington</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#calculator" className="text-gray-700 hover:text-red-600 transition">
              Calculator
            </a>
            <a href="#vehicles" className="text-gray-700 hover:text-red-600 transition">
              Vehicles
            </a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <a
            href="#calculator"
            className="hidden md:inline-block px-6 py-2 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: '#D50000' }}
          >
            Calculate Savings
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <a href="#calculator" className="block py-2 text-gray-700 hover:text-red-600">
              Calculator
            </a>
            <a href="#vehicles" className="block py-2 text-gray-700 hover:text-red-600">
              Vehicles
            </a>
            <a href="#contact" className="block py-2 text-gray-700 hover:text-red-600">
              Contact
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
