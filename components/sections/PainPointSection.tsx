'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const painPoints = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '높은 금리 부담',
    text: '은행 대출 금리가 너무 높아 이자 부담이 크다',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '정보 부족',
    text: '정부자금이 있다는 건 알지만 신청 방법을 모르겠다',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: '복잡한 서류',
    text: '서류 준비가 복잡해서 포기한 적 있다',
    gradient: 'from-purple-500 to-violet-500',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: '자격 불확실',
    text: '내가 자격 요건에 해당하는지 확인하기 어렵다',
    gradient: 'from-blue-500 to-cyan-500',
  },
]

export default function PainPointSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-semibold rounded-full mb-4">
              Pain Points
            </span>
            <h2 className="text-h2-mobile md:text-h2-desktop text-gray-900 mb-4">
              혹시 이런 <span className="gradient-text">고민</span>을 하고 계신가요?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              많은 사업자분들이 같은 어려움을 겪고 있습니다.
              <br className="hidden sm:block" />
              저희가 이 문제를 해결해 드리겠습니다.
            </p>
          </div>

          {/* Pain Point Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {painPoints.map((point, index) => (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${point.gradient} text-white mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {point.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {point.text}
                </p>

                {/* Hover Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${point.gradient} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              이런 고민, 더 이상 혼자 하지 마세요
            </p>
            <button
              onClick={() => {
                const formSection = document.getElementById('lead-form')
                if (formSection) formSection.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1 transition-all duration-300"
            >
              전문가와 무료 상담하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
