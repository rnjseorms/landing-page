'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const consultingPackages = [
  {
    id: 'basic',
    name: '베이직 컨설팅',
    price: 99000,
    originalPrice: 150000,
    description: '정책자금 기초 상담 및 자격 진단',
    features: [
      '1:1 전화 상담 (30분)',
      '자격 요건 분석',
      '적합 정책자금 추천',
      '신청서류 체크리스트',
      '이메일 Q&A (1회)',
    ],
    popular: false,
    color: 'cyan',
  },
  {
    id: 'standard',
    name: '스탠다드 컨설팅',
    price: 299000,
    originalPrice: 450000,
    description: '신청서 작성 지원 및 맞춤 전략 수립',
    features: [
      '1:1 화상 상담 (60분)',
      '심층 자격 분석 리포트',
      '맞춤 정책자금 로드맵',
      '신청서 작성 가이드',
      '서류 검토 및 피드백',
      '이메일 Q&A (무제한/1개월)',
      '전화 상담 (2회)',
    ],
    popular: true,
    color: 'teal',
  },
  {
    id: 'premium',
    name: '프리미엄 컨설팅',
    price: 599000,
    originalPrice: 900000,
    description: '전담 컨설턴트 배정 및 end-to-end 지원',
    features: [
      '전담 컨설턴트 배정',
      '대면 상담 (2회)',
      '종합 사업계획서 검토',
      '신청서 대행 작성',
      '서류 준비 전 과정 지원',
      '심사 대비 모의 인터뷰',
      '승인까지 무제한 상담',
      '사후 관리 (3개월)',
    ],
    popular: false,
    color: 'violet',
  },
]

export default function ConsultingPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async (packageId: string) => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/consulting')
      return
    }

    setIsLoading(true)
    setSelectedPackage(packageId)

    const pkg = consultingPackages.find(p => p.id === packageId)
    if (!pkg) return

    try {
      // Request payment info from server
      const response = await fetch('/api/payments/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg.id,
          packageName: pkg.name,
          amount: pkg.price,
          customerEmail: session.user?.email,
          customerName: session.user?.name,
        }),
      })

      const data = await response.json()

      if (data.success && data.clientKey) {
        // Load Toss Payments SDK dynamically
        const { loadTossPayments } = await import('@tosspayments/payment-sdk')
        const tossPayments = await loadTossPayments(data.clientKey)

        // Request payment with Toss Payments
        await tossPayments.requestPayment('카드', {
          amount: data.amount,
          orderId: data.orderId,
          orderName: data.orderName,
          customerName: data.customerName || '고객',
          customerEmail: data.customerEmail,
          successUrl: data.successUrl,
          failUrl: data.failUrl,
        })
      } else {
        alert(data.message || '결제 요청에 실패했습니다.')
      }
    } catch (error: unknown) {
      const tossError = error as { code?: string; message?: string }
      if (tossError.code === 'USER_CANCEL') {
        // User cancelled payment - do nothing
        console.log('결제가 취소되었습니다.')
      } else {
        console.error('Payment error:', error)
        alert(tossError.message || '결제 처리 중 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
      setSelectedPackage(null)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <span className="inline-block px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-6">
                전문 컨설팅 서비스
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                정책자금 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">전문 컨설팅</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                10년 이상의 경험을 가진 전문 컨설턴트가<br />
                정책자금 승인까지 함께합니다
              </p>
            </motion.div>
          </div>
        </section>

        {/* Packages Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {consultingPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className={`relative bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border ${
                    pkg.popular
                      ? 'border-teal-500/50 shadow-lg shadow-teal-500/20'
                      : 'border-slate-800'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold rounded-full">
                        BEST
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{pkg.description}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-slate-500 line-through text-lg">
                        {pkg.originalPrice.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex items-baseline justify-center gap-1 mt-1">
                      <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${
                        pkg.color === 'cyan' ? 'from-cyan-400 to-blue-400' :
                        pkg.color === 'teal' ? 'from-teal-400 to-cyan-400' :
                        'from-violet-400 to-purple-400'
                      }`}>
                        {pkg.price.toLocaleString()}
                      </span>
                      <span className="text-slate-400">원</span>
                    </div>
                    <span className="inline-block mt-2 px-3 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded-full">
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% 할인
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          pkg.color === 'cyan' ? 'text-cyan-400' :
                          pkg.color === 'teal' ? 'text-teal-400' :
                          'text-violet-400'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePurchase(pkg.id)}
                    disabled={isLoading && selectedPackage === pkg.id}
                    className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5'
                        : 'bg-slate-800 text-white hover:bg-slate-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading && selectedPackage === pkg.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        처리 중...
                      </span>
                    ) : (
                      '결제하기'
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                왜 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">부광솔루션즈</span>인가요?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🏆', title: '95% 승인율', desc: '업계 최고 수준의 승인율' },
                { icon: '👨‍💼', title: '전문 컨설턴트', desc: '10년 이상 경력의 전문가' },
                { icon: '📋', title: '맞춤 전략', desc: '기업별 맞춤 컨설팅' },
                { icon: '🤝', title: '사후 관리', desc: '승인 후에도 지속 지원' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-slate-800/50 rounded-2xl"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                어떤 패키지가 적합한지 모르시겠나요?
              </h2>
              <p className="text-slate-400 mb-8">
                무료 상담을 통해 맞춤 컨설팅을 추천받으세요
              </p>
              <Link
                href="/#lead-form"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                무료 상담 신청
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
