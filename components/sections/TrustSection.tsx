'use client'

import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation'

const stats = [
  { label: '누적 상담 건수', value: 12000, suffix: '건+', icon: '📊' },
  { label: '누적 승인 금액', value: 1500, suffix: '억+', icon: '💰' },
  { label: '고객 만족도', value: 98, suffix: '%', icon: '⭐' },
  { label: '전문 컨설턴트', value: 30, suffix: '명+', icon: '👥' },
]

const partners = [
  '중소벤처기업부',
  '소상공인시장진흥공단',
  '신용보증기금',
  '기술보증기금',
]

function StatCard({ label, value, suffix, icon }: { label: string; value: number; suffix: string; icon: string }) {
  const { count, ref } = useCountUp(value, 2000)

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <div className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500">{label}</div>
    </div>
  )
}

export default function TrustSection() {
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
            신뢰할 수 있는 실적
          </h2>
          <p className="text-center text-gray-500 mb-12">
            수많은 기업들이 저희와 함께 정책자금을 받았습니다
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Partners */}
          <div className="pt-12 border-t border-gray-200">
            <p className="text-center text-gray-500 mb-8">협력 기관</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-gray-50 rounded-lg text-gray-600 font-medium"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-cyan-50 text-cyan-600 text-sm font-medium rounded-full">
              공식 정책자금 상담 기관
            </span>
            <span className="px-4 py-2 bg-teal-50 text-teal-600 text-sm font-medium rounded-full">
              개인정보보호 인증
            </span>
            <span className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
              ISO 27001 인증
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
