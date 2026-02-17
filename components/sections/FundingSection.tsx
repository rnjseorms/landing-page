'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const fundingOptions = [
  {
    title: '중소벤처기업진흥공단 정책자금',
    description: '중소기업 운전·시설자금',
    conditions: '최대 100억, 연 2%대',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: '소상공인시장진흥공단 직접대출',
    description: '소상공인 운영자금',
    conditions: '최대 7천만원, 연 2~3%',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'bg-teal-50 text-teal-600',
  },
  {
    title: '신용보증기금 보증부 대출',
    description: '신용 보완을 통한 대출',
    conditions: '보증비율 최대 95%',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'bg-slate-100 text-slate-600',
  },
  {
    title: '예비창업자 지원',
    description: '창업 초기 자금 지원',
    conditions: '최대 1억, 무이자~저금리',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-cyan-100 text-cyan-700',
  },
]

export default function FundingSection() {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

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
            활용 가능한 정부정책자금
          </h2>
          <p className="text-center text-gray-500 mb-12">
            사업 규모와 업종에 따라 다양한 정책자금을 이용할 수 있습니다
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fundingOptions.map((option, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${option.color}`}>
                    {option.icon}
                  </div>
                  <CardTitle>{option.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{option.description}</p>
                  <p className="font-semibold text-cyan-600">{option.conditions}</p>
                  <button
                    onClick={scrollToForm}
                    className="mt-4 text-cyan-600 font-medium hover:underline inline-flex items-center gap-1"
                  >
                    자세히 보기
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
