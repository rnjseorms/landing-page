'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
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
    shortDesc: '정책자금이 처음이신 분들을 위한 입문 패키지',
    features: [
      '1:1 전화 상담 (30분)',
      '자격 요건 분석',
      '적합 정책자금 추천',
      '신청서류 체크리스트',
      '이메일 Q&A (1회)',
    ],
    detailedFeatures: [
      {
        title: '1:1 전화 상담 (30분)',
        description: '전문 컨설턴트가 귀사의 현황을 파악하고 정책자금 수혜 가능성을 분석합니다.',
      },
      {
        title: '자격 요건 분석',
        description: '업종, 매출, 고용 현황 등을 종합적으로 검토하여 신청 자격을 확인합니다.',
      },
      {
        title: '적합 정책자금 추천',
        description: '중진공, 소진공, 신보 등 다양한 정책자금 중 최적의 상품을 추천드립니다.',
      },
      {
        title: '신청서류 체크리스트',
        description: '신청에 필요한 서류 목록을 정리하여 제공합니다.',
      },
      {
        title: '이메일 Q&A (1회)',
        description: '상담 후 추가 질문에 대해 이메일로 답변드립니다.',
      },
    ],
    recommended: ['정책자금 신청이 처음인 기업', '자격 요건 확인이 필요한 기업', '소규모 예산으로 시작하고 싶은 기업'],
    duration: '상담 후 3일 이내',
    color: 'cyan',
  },
  {
    id: 'standard',
    name: '스탠다드 컨설팅',
    price: 299000,
    originalPrice: 450000,
    description: '신청서 작성 지원 및 맞춤 전략 수립',
    shortDesc: '성공적인 정책자금 신청을 위한 종합 컨설팅',
    features: [
      '1:1 화상 상담 (60분)',
      '심층 자격 분석 리포트',
      '맞춤 정책자금 로드맵',
      '신청서 작성 가이드',
      '서류 검토 및 피드백',
      '이메일 Q&A (무제한/1개월)',
      '전화 상담 (2회)',
    ],
    detailedFeatures: [
      {
        title: '1:1 화상 상담 (60분)',
        description: '화면 공유를 통해 귀사의 재무제표, 사업계획서 등을 함께 검토합니다.',
      },
      {
        title: '심층 자격 분석 리포트',
        description: '정책자금별 적합도를 점수화하여 상세 분석 리포트를 제공합니다.',
      },
      {
        title: '맞춤 정책자금 로드맵',
        description: '단기/중기 관점에서 최적의 자금 조달 전략을 수립합니다.',
      },
      {
        title: '신청서 작성 가이드',
        description: '심사위원 관점에서 높은 점수를 받을 수 있는 작성 팁을 제공합니다.',
      },
      {
        title: '서류 검토 및 피드백',
        description: '작성하신 신청서를 검토하고 개선점을 피드백합니다.',
      },
      {
        title: '이메일 Q&A (무제한/1개월)',
        description: '신청 완료까지 궁금한 점을 언제든 질문하실 수 있습니다.',
      },
      {
        title: '전화 상담 (2회)',
        description: '긴급한 사안이나 복잡한 문의는 전화로 신속하게 해결합니다.',
      },
    ],
    recommended: ['직접 신청을 준비하는 기업', '서류 작성에 어려움을 겪는 기업', '여러 정책자금을 검토 중인 기업'],
    duration: '계약 후 1개월',
    popular: true,
    color: 'teal',
  },
  {
    id: 'premium',
    name: '프리미엄 컨설팅',
    price: 599000,
    originalPrice: 900000,
    description: '전담 컨설턴트 배정 및 end-to-end 지원',
    shortDesc: '승인까지 모든 과정을 전담 컨설턴트가 함께합니다',
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
    detailedFeatures: [
      {
        title: '전담 컨설턴트 배정',
        description: '10년 이상 경력의 시니어 컨설턴트가 전담으로 배정됩니다.',
      },
      {
        title: '대면 상담 (2회)',
        description: '서울/경기 지역 방문 또는 화상 미팅으로 심층 상담을 진행합니다.',
      },
      {
        title: '종합 사업계획서 검토',
        description: '사업계획서 전체를 검토하고 정책자금 심사 기준에 맞게 보완합니다.',
      },
      {
        title: '신청서 대행 작성',
        description: '컨설턴트가 직접 신청서를 작성하여 최적화된 문서를 제출합니다.',
      },
      {
        title: '서류 준비 전 과정 지원',
        description: '필요 서류 발급부터 제출까지 전 과정을 안내합니다.',
      },
      {
        title: '심사 대비 모의 인터뷰',
        description: '현장 실사 또는 심사위원 면접에 대비한 모의 인터뷰를 진행합니다.',
      },
      {
        title: '승인까지 무제한 상담',
        description: '결과 발표까지 기간 제한 없이 상담을 지원합니다.',
      },
      {
        title: '사후 관리 (3개월)',
        description: '승인 후 자금 집행, 정산 등 후속 절차도 함께 관리합니다.',
      },
    ],
    recommended: ['바쁜 경영진을 대신할 전문가가 필요한 기업', '높은 승인율을 원하는 기업', '대규모 자금 조달을 계획하는 기업'],
    duration: '승인까지 (평균 2-3개월)',
    color: 'violet',
  },
]

export default function ConsultingDetailPage() {
  const { id } = useParams()
  const { data: session } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const pkg = consultingPackages.find(p => p.id === id)

  if (!pkg) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-950 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">상품을 찾을 수 없습니다</h1>
            <Link href="/consulting" className="text-cyan-400 hover:underline">
              컨설팅 목록으로 돌아가기
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handlePurchase = async () => {
    if (!session) {
      router.push(`/auth/login?callbackUrl=/consulting/${id}`)
      return
    }

    setIsLoading(true)

    try {
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
        const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk')
        const tossPayments = await loadTossPayments(data.clientKey)
        const payment = tossPayments.payment({ customerKey: session.user?.email || 'guest' })

        await payment.requestPayment({
          method: 'CARD',
          amount: {
            currency: 'KRW',
            value: data.amount,
          },
          orderId: data.orderId,
          orderName: data.orderName,
          customerName: data.customerName || '고객',
          customerEmail: data.customerEmail,
          successUrl: data.successUrl,
          failUrl: data.failUrl,
          card: {
            useEscrow: false,
            flowMode: 'DEFAULT',
            useCardPoint: false,
            useAppCardOnly: false,
          },
        })
      } else {
        alert(data.message || '결제 요청에 실패했습니다.')
      }
    } catch (error: unknown) {
      const tossError = error as { code?: string; message?: string }
      if (tossError.code === 'USER_CANCEL') {
        console.log('결제가 취소되었습니다.')
      } else {
        console.error('Payment error:', error)
        alert(tossError.message || '결제 처리 중 오류가 발생했습니다.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const colorClasses = {
    cyan: {
      gradient: 'from-cyan-400 to-blue-400',
      bg: 'bg-cyan-500',
      bgLight: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
    },
    teal: {
      gradient: 'from-teal-400 to-cyan-400',
      bg: 'bg-teal-500',
      bgLight: 'bg-teal-500/10',
      text: 'text-teal-400',
      border: 'border-teal-500/30',
    },
    violet: {
      gradient: 'from-violet-400 to-purple-400',
      bg: 'bg-violet-500',
      bgLight: 'bg-violet-500/10',
      text: 'text-violet-400',
      border: 'border-violet-500/30',
    },
  }

  const colors = colorClasses[pkg.color as keyof typeof colorClasses]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pt-20">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className="text-slate-500 hover:text-slate-400">홈</Link>
                </li>
                <li className="text-slate-600">/</li>
                <li>
                  <Link href="/consulting" className="text-slate-500 hover:text-slate-400">컨설팅</Link>
                </li>
                <li className="text-slate-600">/</li>
                <li className={colors.text}>{pkg.name}</li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: Product Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {pkg.popular && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-bold rounded-full mb-4">
                    BEST SELLER
                  </span>
                )}
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {pkg.name}
                </h1>
                <p className="text-xl text-slate-400 mb-6">{pkg.shortDesc}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-slate-500 line-through text-xl">
                      {pkg.originalPrice.toLocaleString()}원
                    </span>
                    <span className="px-2 py-1 bg-red-500/10 text-red-400 text-sm font-bold rounded">
                      {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}% OFF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}>
                      {pkg.price.toLocaleString()}
                    </span>
                    <span className="text-2xl text-slate-400">원</span>
                  </div>
                </div>

                {/* Features Summary */}
                <div className={`${colors.bgLight} rounded-2xl p-6 mb-8`}>
                  <h3 className="text-white font-bold mb-4">포함 서비스</h3>
                  <ul className="space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-slate-300">
                        <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-3 text-slate-400 mb-8">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>서비스 기간: {pkg.duration}</span>
                </div>
              </motion.div>

              {/* Right: Purchase Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:sticky lg:top-28 h-fit"
              >
                <div className={`bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border ${colors.border}`}>
                  <h3 className="text-xl font-bold text-white mb-6">{pkg.name} 구매</h3>

                  {/* Price Summary */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>정가</span>
                      <span className="line-through">{pkg.originalPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-red-400">
                      <span>할인</span>
                      <span>-{(pkg.originalPrice - pkg.price).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-white text-lg font-bold">
                      <span>결제 금액</span>
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient}`}>
                        {pkg.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-gradient-to-r ${colors.gradient} text-white hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
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

                  {!session && (
                    <p className="text-slate-500 text-sm text-center mt-4">
                      결제하려면 로그인이 필요합니다
                    </p>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-slate-800">
                    <div className="flex items-center justify-center gap-4 text-slate-500 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        안전 결제
                      </div>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        환불 보장
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-white mb-4">상세 서비스 내용</h2>
              <p className="text-slate-400">각 서비스에 대한 자세한 설명입니다</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {pkg.detailedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl ${colors.bgLight} flex items-center justify-center flex-shrink-0`}>
                      <svg className={`w-5 h-5 ${colors.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                      <p className="text-slate-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recommended For */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-white mb-4">이런 분께 추천합니다</h2>
            </motion.div>

            <div className="space-y-4">
              {pkg.recommended.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-xl ${colors.bgLight} ${colors.border} border`}
                >
                  <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center text-white font-bold`}>
                    {index + 1}
                  </div>
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-slate-400 mb-8">
                95% 승인율의 전문 컨설팅으로 정책자금 확보에 성공하세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handlePurchase}
                  disabled={isLoading}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r ${colors.gradient} text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50`}
                >
                  {pkg.price.toLocaleString()}원 결제하기
                </button>
                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
                >
                  다른 패키지 보기
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
