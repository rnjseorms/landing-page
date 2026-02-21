'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past hero section (approx 100vh)
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight
      setIsVisible(scrollY > heroHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleKakaoClick = () => {
    window.open('https://open.kakao.com/o/sL3gxyth', '_blank')
  }

  return (
    <>
      {/* Mobile: Full-width bottom bar */}
      <div
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white border-t border-gray-200 shadow-lg
          px-4 py-3 flex gap-3
          transition-transform duration-300
          ${isVisible ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        <Button onClick={scrollToForm} fullWidth>
          무료 상담 신청
        </Button>
        <button
          onClick={handleKakaoClick}
          className="flex-shrink-0 w-12 h-12 bg-[#FEE500] rounded-lg flex items-center justify-center hover:bg-[#FDD835] transition-colors"
        >
          <svg className="w-6 h-6 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
          </svg>
        </button>
      </div>

      {/* Desktop: Floating buttons on right */}
      <div
        className={`
          hidden md:flex fixed bottom-8 right-8 z-50
          flex-col gap-3
          transition-all duration-300
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}
        `}
      >
        <button
          onClick={handleKakaoClick}
          className="w-14 h-14 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center hover:bg-[#FDD835] hover:scale-110 transition-all"
          title="카카오톡 상담"
        >
          <svg className="w-7 h-7 text-[#000000]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
          </svg>
        </button>
        <button
          onClick={scrollToForm}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-lg flex items-center justify-center hover:from-cyan-600 hover:to-teal-600 hover:scale-110 transition-all"
          title="무료 상담 신청"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gray-100 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all"
          title="맨 위로"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  )
}
