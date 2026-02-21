'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const faqCategories = [
  { id: 'all', label: '전체' },
  { id: 'basic', label: '기본 정보' },
  { id: 'eligibility', label: '자격 요건' },
  { id: 'process', label: '신청 절차' },
  { id: 'consulting', label: '컨설팅' },
]

const faqs = [
  {
    id: 1,
    category: 'basic',
    question: '정책자금이란 무엇인가요?',
    answer: '정책자금은 정부나 공공기관이 중소기업과 소상공인의 성장을 지원하기 위해 제공하는 저금리 대출 상품입니다. 일반 시중 은행 대출보다 금리가 낮고 (연 2~4%) 상환 조건이 유리합니다. 중소벤처기업진흥공단, 소상공인시장진흥공단, 신용보증기금 등에서 다양한 정책자금을 운영하고 있습니다.',
  },
  {
    id: 2,
    category: 'basic',
    question: '정책자금과 일반 대출의 차이점은?',
    answer: '정책자금은 일반 대출과 비교하여 다음과 같은 장점이 있습니다:\n\n• 금리: 연 2~4%대의 저금리 (시중 은행 대비 약 50% 이상 낮음)\n• 상환기간: 최대 10년 이상의 장기 분할 상환 가능\n• 거치기간: 최대 2~5년의 원금 상환 유예기간 제공\n• 담보: 신용보증을 통해 담보 없이도 대출 가능\n• 한도: 기업 규모에 따라 최대 100억원까지 지원',
  },
  {
    id: 3,
    category: 'eligibility',
    question: '어떤 기업이 정책자금을 신청할 수 있나요?',
    answer: '중소기업기본법상 중소기업 또는 소상공인보호법상 소상공인이라면 대부분 신청 자격이 있습니다. 업종, 매출액, 상시근로자 수 등에 따라 세부 자격이 달라지며, 세금 체납이 없고 신용상태가 양호해야 합니다. 정확한 자격 여부는 무료 상담을 통해 확인하실 수 있습니다.',
  },
  {
    id: 4,
    category: 'eligibility',
    question: '창업한 지 얼마 안 됐는데 신청 가능한가요?',
    answer: '네, 가능합니다. 창업 단계에 따라 다양한 지원 프로그램이 있습니다:\n\n• 예비창업자: 창업 전 지원금 (최대 1억원)\n• 창업 1년 미만: 초기창업지원 정책자금\n• 창업 3년 이하: 청년창업사관학교, 창업성장기술개발 등\n• 창업 7년 이하: 벤처기업 지원자금\n\n창업 초기일수록 오히려 더 유리한 조건으로 지원받을 수 있는 경우가 많습니다.',
  },
  {
    id: 5,
    category: 'eligibility',
    question: '신용등급이 낮아도 받을 수 있나요?',
    answer: '신용등급이 낮더라도 사업성이 인정되면 정책자금을 받을 수 있습니다. 특히 신용보증기금, 기술보증기금의 보증을 활용하면 담보와 신용이 부족하더라도 대출이 가능합니다. 다만 연체 이력이 있거나 신용회복 중인 경우에는 제한이 있을 수 있으니 상담을 통해 확인해 보시기 바랍니다.',
  },
  {
    id: 6,
    category: 'process',
    question: '신청부터 승인까지 얼마나 걸리나요?',
    answer: '정책자금 종류와 신청 시기에 따라 다르지만, 일반적으로:\n\n• 소진공 직접대출: 약 2~4주\n• 중진공 정책자금: 약 4~8주\n• 신용보증 대출: 약 3~6주\n• 창업 지원금: 약 1~3개월 (공모 일정에 따라 상이)\n\n서류 준비 상태와 보완 요청 여부에 따라 기간이 달라질 수 있습니다.',
  },
  {
    id: 7,
    category: 'process',
    question: '어떤 서류가 필요한가요?',
    answer: '기본적으로 필요한 서류는 다음과 같습니다:\n\n• 사업자등록증 사본\n• 재무제표 (최근 2~3년)\n• 부가가치세 신고서\n• 납세증명서\n• 4대보험 완납증명서\n• 사업계획서\n• 법인등기부등본 (법인인 경우)\n\n정책자금 종류에 따라 추가 서류가 필요할 수 있으며, 컨설팅 시 상세 안내드립니다.',
  },
  {
    id: 8,
    category: 'process',
    question: '온라인으로도 신청할 수 있나요?',
    answer: '네, 대부분의 정책자금은 온라인으로 신청할 수 있습니다. 중진공은 기업마당(www.bizinfo.go.kr), 소진공은 소상공인정책자금(ols.semas.or.kr)에서 신청 가능합니다. 다만 서류 준비와 제출 과정이 복잡하므로, 전문 컨설팅을 통해 진행하시면 훨씬 수월하게 신청하실 수 있습니다.',
  },
  {
    id: 9,
    category: 'consulting',
    question: '컨설팅 비용은 얼마인가요?',
    answer: '부광솔루션즈는 다양한 컨설팅 패키지를 제공합니다:\n\n• 베이직: 99,000원 (기초 상담 및 자격 진단)\n• 스탠다드: 299,000원 (신청서 작성 지원)\n• 프리미엄: 599,000원 (전담 컨설턴트 배정, 대행 작성)\n\n자세한 내용은 컨설팅 페이지를 참고해 주세요. 초기 상담은 무료로 제공됩니다.',
  },
  {
    id: 10,
    category: 'consulting',
    question: '승인이 안 되면 어떻게 되나요?',
    answer: '정책자금 승인이 되지 않은 경우, 탈락 사유를 분석하여 보완 후 재신청을 지원해 드립니다. 프리미엄 패키지의 경우 승인까지 무제한으로 상담을 제공하며, 다른 정책자금으로의 전환 신청도 도와드립니다. 부광솔루션즈의 평균 승인율은 95%입니다.',
  },
  {
    id: 11,
    category: 'consulting',
    question: '상담 예약은 어떻게 하나요?',
    answer: '상담 예약은 다음 방법으로 가능합니다:\n\n1. 홈페이지 상담 신청 폼 작성\n2. 전화 상담: 1588-0000\n3. 카카오톡 채널 상담\n\n영업시간: 평일 09:00 ~ 18:00\n상담 신청 후 1영업일 이내에 전문 컨설턴트가 연락드립니다.',
  },
  {
    id: 12,
    category: 'basic',
    question: '정책자금 상환은 어떻게 하나요?',
    answer: '정책자금은 대부분 원금균등분할상환 방식으로 상환합니다. 거치기간(보통 1~3년) 동안은 이자만 납부하고, 이후 원금과 이자를 함께 상환합니다. 중도상환 시 수수료가 없거나 매우 적으며, 상환 스케줄은 기업 상황에 맞게 조정 가능한 경우도 있습니다.',
  },
]

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openId, setOpenId] = useState<number | null>(null)

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

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
                자주 묻는 질문
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                궁금한 점을 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">해결해 드립니다</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                정책자금에 대해 자주 묻는 질문들을 모았습니다<br />
                찾으시는 답변이 없다면 상담을 신청해 주세요
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-3">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <AnimatePresence>
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="text-white font-medium pr-4">{faq.question}</span>
                      <motion.svg
                        animate={{ rotate: openId === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-5 h-5 text-cyan-400 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {openId === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-0">
                            <div className="border-t border-slate-800 pt-4">
                              <p className="text-slate-400 whitespace-pre-line leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-white mb-4">
                원하는 답변을 찾지 못하셨나요?
              </h2>
              <p className="text-slate-400">
                전문 컨설턴트에게 직접 문의하세요
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">전화 상담</h3>
                <p className="text-slate-400 text-sm mb-4">평일 09:00 - 18:00</p>
                <a href="tel:1588-0000" className="text-cyan-400 font-bold text-lg hover:text-cyan-300">
                  1588-0000
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.5 3 2 6.58 2 11c0 2.13.94 4.05 2.5 5.45V21l4.38-2.62c.96.17 1.96.62 3.12.62 5.5 0 10-3.58 10-8s-4.5-8-10-8z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">카카오톡 상담</h3>
                <p className="text-slate-400 text-sm mb-4">실시간 채팅 상담</p>
                <a
                  href="https://open.kakao.com/o/sL3gxyth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  채팅 시작하기
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-teal-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-2">이메일 문의</h3>
                <p className="text-slate-400 text-sm mb-4">24시간 접수 가능</p>
                <a href="mailto:contact@bukwang.co.kr" className="text-teal-400 font-bold hover:text-teal-300">
                  contact@bukwang.co.kr
                </a>
              </motion.div>
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
                지금 바로 상담받으세요
              </h2>
              <p className="text-slate-400 mb-8">
                전문 컨설턴트가 귀사에 맞는 정책자금을 안내해 드립니다
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
