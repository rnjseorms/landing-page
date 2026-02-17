'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { label: '정책자금 안내', id: 'funding' },
    { label: '신청 프로세스', id: 'process' },
    { label: '고객 후기', id: 'testimonials' },
    { label: 'FAQ', id: 'faq' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <Image
                src="/부광솔루션즈 로고 (4).png"
                alt="부광솔루션즈"
                width={180}
                height={40}
                className={`h-10 w-auto transition-all duration-300 ${
                  isScrolled ? '' : 'brightness-0 invert'
                }`}
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-600 hover:text-cyan-500 hover:bg-cyan-500/5'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={scrollToForm}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              무료 상담 신청
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-all duration-300 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? 'opacity-0' : ''}`}
              />
              <span
                className={`block h-0.5 rounded-full transition-all duration-300 ${
                  isScrolled ? 'bg-gray-700' : 'bg-white'
                } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav
            className={`flex flex-col gap-1 py-4 ${
              isScrolled ? '' : 'glass rounded-2xl p-4 mb-4'
            }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  isScrolled
                    ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-500'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={scrollToForm}
              className="mt-2 py-3 px-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              무료 상담 신청
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
