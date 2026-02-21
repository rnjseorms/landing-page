'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const testimonials = [
  {
    id: 1,
    name: '김OO 대표',
    company: '(주)테크솔루션',
    industry: '제조업',
    amount: '5억원',
    type: '중진공 정책자금',
    rating: 5,
    content: '처음 정책자금을 신청할 때 막막했는데, 부광솔루션즈 덕분에 순조롭게 진행할 수 있었습니다. 서류 준비부터 심사 대응까지 꼼꼼하게 도와주셔서 한 번에 승인받았습니다. 정말 감사합니다!',
    highlight: '한 번에 승인',
    date: '2024.01',
  },
  {
    id: 2,
    name: '이OO 대표',
    company: '디자인스튜디오 모던',
    industry: '디자인업',
    amount: '3천만원',
    type: '소진공 직접대출',
    rating: 5,
    content: '소상공인 자금이 있다는 건 알았지만 신청 방법을 몰랐어요. 컨설턴트 분이 친절하게 설명해주시고 필요한 서류도 하나하나 챙겨주셔서 어렵지 않게 받을 수 있었습니다.',
    highlight: '친절한 상담',
    date: '2024.02',
  },
  {
    id: 3,
    name: '박OO 대표',
    company: '푸드테크 코리아',
    industry: 'F&B',
    amount: '2억원',
    type: '신보 보증부 대출',
    rating: 5,
    content: '담보가 부족해서 대출이 어려웠는데, 신용보증 제도를 활용해서 필요한 자금을 확보할 수 있었습니다. 덕분에 신규 매장 오픈도 무사히 마쳤습니다.',
    highlight: '담보 없이 대출',
    date: '2024.01',
  },
  {
    id: 4,
    name: '최OO 대표',
    company: '에코그린 솔루션즈',
    industry: '환경/에너지',
    amount: '10억원',
    type: '중진공 시설자금',
    rating: 5,
    content: '시설 투자를 위한 대규모 자금이 필요했는데, 일반 은행 대출보다 훨씬 좋은 조건으로 받을 수 있었습니다. 사업계획서 작성도 도와주셔서 심사에서 좋은 점수를 받았습니다.',
    highlight: '10억 승인',
    date: '2023.12',
  },
  {
    id: 5,
    name: '정OO 대표',
    company: '스마트팜 연구소',
    industry: '농업/기술',
    amount: '1억원',
    type: '창업지원금',
    rating: 5,
    content: '농업 기술 스타트업으로 자금 확보가 어려웠는데, 창업 지원금을 통해 초기 연구개발 비용을 마련할 수 있었습니다. 전문적인 컨설팅 덕분에 경쟁률 높은 사업에서 선정되었습니다.',
    highlight: '창업자금 선정',
    date: '2024.03',
  },
  {
    id: 6,
    name: '한OO 대표',
    company: '글로벌 물류',
    industry: '물류/유통',
    amount: '7억원',
    type: '수출기업 지원',
    rating: 5,
    content: '수출 확대를 위한 운영자금이 필요했는데, 수출기업 전용 정책자금이 있다는 걸 알게 되어 큰 도움이 됐습니다. 빠른 진행으로 사업 기회를 놓치지 않았습니다.',
    highlight: '빠른 진행',
    date: '2024.02',
  },
]

const stats = [
  { value: '2,500+', label: '누적 상담' },
  { value: '95%', label: '승인율' },
  { value: '1,200억+', label: '누적 승인액' },
  { value: '4.9', label: '고객 만족도' },
]

export default function TestimonialsPage() {
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
                고객 후기
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                고객님들의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">성공 스토리</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                부광솔루션즈와 함께 정책자금 승인에 성공한<br />
                고객님들의 생생한 후기를 확인하세요
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold">{testimonial.name}</h3>
                      <p className="text-slate-400 text-sm">{testimonial.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full">
                      {testimonial.industry}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-slate-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-teal-500/10 text-teal-400 text-xs rounded">
                      {testimonial.type}
                    </span>
                    <span className="px-2 py-1 bg-violet-500/10 text-violet-400 text-xs rounded">
                      {testimonial.amount} 승인
                    </span>
                  </div>

                  {/* Highlight & Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                      {testimonial.highlight}
                    </span>
                    <span className="text-slate-500 text-xs">{testimonial.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Placeholder */}
        <section className="py-20 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-black text-white mb-4">영상 후기</h2>
              <p className="text-slate-400">고객님들이 직접 전하는 생생한 경험담</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-video bg-slate-800 rounded-2xl flex items-center justify-center group cursor-pointer hover:bg-slate-700 transition-colors"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-slate-400 text-sm">준비 중입니다</p>
                  </div>
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
                다음 성공 스토리의 주인공이 되세요
              </h2>
              <p className="text-slate-400 mb-8">
                지금 바로 무료 상담을 신청하고<br />
                정책자금 승인의 첫 걸음을 내딛으세요
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
