'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const fundingTypes = [
  {
    id: 'jungso',
    title: '중소벤처기업진흥공단',
    subtitle: '정책자금',
    description: '중소기업의 성장과 경쟁력 강화를 위한 정부 지원 자금',
    amount: '최대 100억',
    rate: '연 2%대',
    period: '최대 10년',
    target: ['제조업', '지식서비스업', '수출기업'],
    requirements: [
      '중소기업기본법상 중소기업',
      '업력 3년 이상 (일부 1년)',
      '신용등급 BBB 이상',
      '세금 체납 없음',
    ],
    documents: [
      '사업자등록증',
      '재무제표 (최근 3년)',
      '사업계획서',
      '납세증명서',
      '4대보험 완납증명서',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    id: 'sosang',
    title: '소상공인시장진흥공단',
    subtitle: '직접대출',
    description: '소상공인의 경영안정과 성장을 위한 저금리 운영자금',
    amount: '최대 7천만원',
    rate: '연 2~3%',
    period: '최대 5년',
    target: ['소상공인', '소기업', '자영업자'],
    requirements: [
      '소상공인보호법상 소상공인',
      '상시근로자 5인 미만 (제조업 10인)',
      '사업자등록 후 90일 경과',
      '휴/폐업 이력 없음',
    ],
    documents: [
      '사업자등록증',
      '매출 증빙서류',
      '부가세 신고서',
      '임대차계약서',
      '신분증',
    ],
    gradient: 'from-teal-500 to-emerald-500',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 'sinbo',
    title: '신용보증기금',
    subtitle: '보증부 대출',
    description: '담보력이 부족한 기업의 신용을 보완하여 대출 가능',
    amount: '최대 30억',
    rate: '보증비율 95%',
    period: '보증기간 최대 10년',
    target: ['중소기업', '벤처기업', '스타트업'],
    requirements: [
      '신용보증 신청 자격',
      '사업성 평가 통과',
      '신용등급 기준 충족',
      '연체 이력 없음',
    ],
    documents: [
      '사업자등록증',
      '재무제표',
      '사업계획서',
      '주주명부',
      '등기부등본',
    ],
    gradient: 'from-violet-500 to-purple-500',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    id: 'startup',
    title: '예비창업자',
    subtitle: '창업 지원',
    description: '예비창업자 및 초기 창업기업을 위한 지원 자금',
    amount: '최대 1억',
    rate: '무이자~저금리',
    period: '최대 5년',
    target: ['예비창업자', '창업 3년 미만', '기술창업'],
    requirements: [
      '사업 아이디어 보유',
      '창업 의지 및 역량',
      '관련 분야 경력/학력',
      '사업계획서 심사 통과',
    ],
    documents: [
      '사업계획서',
      '창업자 이력서',
      '기술/특허 증빙 (해당시)',
      '신분증',
      '졸업증명서 또는 경력증명서',
    ],
    gradient: 'from-amber-500 to-orange-500',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

const processSteps = [
  { step: 1, title: '상담 신청', desc: '온라인 또는 전화로 무료 상담 신청' },
  { step: 2, title: '자격 진단', desc: '전문 컨설턴트가 자격 요건 분석' },
  { step: 3, title: '서류 준비', desc: '필요 서류 안내 및 작성 지원' },
  { step: 4, title: '신청 대행', desc: '정책자금 신청 및 심사 대응' },
  { step: 5, title: '승인 완료', desc: '자금 승인 및 집행 안내' },
]

export default function FundingPage() {
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
                정책자금 종류
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                활용 가능한 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">정부정책자금</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                사업 규모와 업종에 따라 다양한 정책자금을 이용할 수 있습니다<br />
                부광솔루션즈가 최적의 자금을 찾아드립니다
              </p>
            </motion.div>
          </div>
        </section>

        {/* Funding Types */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-12">
              {fundingTypes.map((funding, index) => (
                <motion.div
                  key={funding.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800"
                >
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Basic Info */}
                    <div className="lg:col-span-1">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${funding.gradient} text-white mb-4`}>
                        {funding.icon}
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-1">{funding.title}</h2>
                      <p className={`text-sm font-semibold bg-gradient-to-r ${funding.gradient} bg-clip-text text-transparent mb-3`}>
                        {funding.subtitle}
                      </p>
                      <p className="text-slate-400 mb-6">{funding.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                          <span className="text-slate-400">지원 한도</span>
                          <span className="text-white font-bold">{funding.amount}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                          <span className="text-slate-400">금리</span>
                          <span className={`font-bold bg-gradient-to-r ${funding.gradient} bg-clip-text text-transparent`}>{funding.rate}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                          <span className="text-slate-400">상환 기간</span>
                          <span className="text-white font-bold">{funding.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Requirements */}
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-bold text-white mb-4">신청 자격</h3>
                      <ul className="space-y-3 mb-6">
                        {funding.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-300">
                            <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 bg-gradient-to-r ${funding.gradient} bg-clip-text text-transparent`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {req}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-bold text-white mb-4">지원 대상</h3>
                      <div className="flex flex-wrap gap-2">
                        {funding.target.map((t, idx) => (
                          <span key={idx} className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${funding.gradient} bg-opacity-10 text-white`}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: Documents */}
                    <div className="lg:col-span-1">
                      <h3 className="text-lg font-bold text-white mb-4">필요 서류</h3>
                      <ul className="space-y-2 mb-6">
                        {funding.documents.map((doc, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-slate-300">
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            {doc}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="/#lead-form"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r ${funding.gradient} hover:shadow-lg transition-all`}
                      >
                        자격 확인하기
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                신청 프로세스
              </h2>
              <p className="text-slate-400">
                부광솔루션즈와 함께하면 복잡한 절차도 간편해집니다
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-slate-800/50 rounded-2xl p-6 text-center h-full">
                    <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                    <h3 className="text-white font-bold mb-2">{step.title}</h3>
                    <p className="text-slate-400 text-sm">{step.desc}</p>
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-3xl p-12"
            >
              <h2 className="text-3xl font-black text-white mb-4">
                어떤 자금이 적합할지 모르시겠나요?
              </h2>
              <p className="text-slate-400 mb-8">
                무료 자격 진단으로 최적의 정책자금을 찾아드립니다
              </p>
              <Link
                href="/#lead-form"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                무료 자격 진단받기
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
