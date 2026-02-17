'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Button from '@/components/ui/Button'

const eligibilityList = [
  '사업자등록증 보유 중소기업 또는 소상공인',
  '업력 7년 이내 기업 (일부 자금은 업력 무관)',
  '국세·지방세 체납 없음',
  '신용등급 일정 기준 이상 (자금별 상이)',
  '예비창업자 (사업자등록 전이라도 가능한 자금 존재)',
]

export default function EligibilitySection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-h2-mobile md:text-h2-desktop text-center text-gray-800 mb-4">
            지원 대상 및 자격 요건
          </h2>
          <p className="text-center text-gray-500 mb-12">
            아래 조건 중 하나라도 해당되면 신청 가능합니다
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
            <ul className="space-y-5">
              {eligibilityList.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-4"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.5s ease-out ${index * 100}ms`,
                  }}
                >
                  <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 pt-8 border-t border-gray-100 text-center">
              <p className="text-gray-600 mb-6">
                해당 여부가 확실하지 않으신가요?
              </p>
              <Button onClick={scrollToForm}>
                무료 자격 진단 받기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
