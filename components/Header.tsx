'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const { data: session, status } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

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
    { label: '회사소개', id: 'about', href: '/about' },
    { label: '컨설팅', id: 'consulting', href: '/consulting' },
    { label: '정책자금 안내', id: 'funding' },
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
            <Link href="/" className="flex items-center">
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
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-cyan-500 hover:bg-cyan-500/5'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
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
              )
            ))}
          </nav>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ''}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold ${
                      isScrolled ? 'bg-cyan-500 text-white' : 'bg-white text-cyan-500'
                    }`}>
                      {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                    </div>
                  )}
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900 truncate">{session.user?.name}</p>
                      <p className="text-sm text-gray-500 truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      마이페이지
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        signOut({ callbackUrl: '/' })
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50"
                    >
                      로그아웃
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-600 hover:text-cyan-500'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  로그인
                </Link>
                <Link
                  href="/auth/signup"
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    isScrolled
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/25'
                      : 'bg-white text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  회원가입
                </Link>
              </>
            )}

            <button
              onClick={scrollToForm}
              className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                isScrolled
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5'
                  : 'bg-cyan-500 text-white hover:bg-cyan-400'
              }`}
            >
              무료 상담
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
            isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav
            className={`flex flex-col gap-1 py-4 ${
              isScrolled ? '' : 'glass rounded-2xl p-4 mb-4'
            }`}
          >
            {navItems.map((item) => (
              item.href ? (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-left py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100 hover:text-cyan-500'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
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
              )
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-gray-200/20 mt-2 pt-2">
              {session ? (
                <>
                  <div className={`py-3 px-4 ${isScrolled ? 'text-gray-700' : 'text-white/90'}`}>
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-sm opacity-70">{session.user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      signOut({ callbackUrl: '/' })
                    }}
                    className={`w-full text-left py-3 px-4 rounded-xl font-medium ${
                      isScrolled
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-red-400 hover:bg-white/10'
                    }`}
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl font-medium ${
                      isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-4 rounded-xl font-medium ${
                      isScrolled
                        ? 'text-cyan-600 hover:bg-cyan-50'
                        : 'text-cyan-400 hover:bg-white/10'
                    }`}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </div>

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
