'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const steps = [
  {
    number: '01',
    title: '무료 상담 신청',
    description: '간단한 정보 입력으로 상담 신청',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    active: true,
  },
  {
    number: '02',
    title: '자격 진단 & 맞춤 자금 안내',
    description: '전문가가 조건 분석 후 최적의 자금 추천',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
    active: false,
  },
  {
    number: '03',
    title: '서류 준비 & 신청 대행 지원',
    description: '복잡한 서류 작성을 전문가가 도와드립니다',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    active: false,
  },
  {
    number: '04',
    title: '자금 승인 & 입금 완료',
    description: '승인 후 자금이 사업장 계좌로 입금',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    active: false,
  },
]

export default function ProcessSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-h2-mobile md:text-h2-desktop text-center text-gray-800 mb-4">
            신청 프로세스
          </h2>
          <p className="text-center text-gray-500 mb-12">
            간단한 4단계로 정책자금을 받을 수 있습니다
          </p>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-16 left-0 right-0 h-0.5 bg-gray-200" />

              <div className="grid grid-cols-4 gap-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative text-center"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ease-out ${index * 150}ms`,
                    }}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`
                        relative z-10 w-32 h-32 mx-auto rounded-full flex items-center justify-center
                        ${step.active ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'bg-gray-100 text-gray-500'}
                        transition-all duration-300
                      `}
                    >
                      {step.icon}
                    </div>

                    {/* Step Number */}
                    <div className={`
                      mt-4 text-sm font-bold
                      ${step.active ? 'text-cyan-600' : 'text-gray-400'}
                    `}>
                      STEP {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-lg font-semibold text-gray-800">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 text-sm text-gray-500">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="md:hidden">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gray-200" />

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `all 0.5s ease-out ${index * 150}ms`,
                    }}
                  >
                    {/* Icon Circle */}
                    <div
                      className={`
                        relative z-10 w-16 h-16 flex-shrink-0 rounded-full flex items-center justify-center
                        ${step.active ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'bg-gray-100 text-gray-500'}
                      `}
                    >
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <div className={`text-sm font-bold ${step.active ? 'text-cyan-600' : 'text-gray-400'}`}>
                        STEP {step.number}
                      </div>
                      <h3 className="mt-1 text-lg font-semibold text-gray-800">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
