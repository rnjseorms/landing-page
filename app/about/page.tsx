'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const stats = [
  { number: '10+', label: '업력 (년)', suffix: '' },
  { number: '2,500', label: '누적 상담', suffix: '+' },
  { number: '95', label: '승인율', suffix: '%' },
  { number: '1,200', label: '승인 실적', suffix: '억+' },
]

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '신뢰와 투명성',
    description: '고객과의 신뢰를 최우선으로 생각하며, 모든 과정을 투명하게 진행합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '신속한 대응',
    description: '정책자금은 타이밍이 중요합니다. 빠른 분석과 신속한 대응으로 기회를 놓치지 않습니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: '전문성',
    description: '10년 이상의 경험을 바탕으로 기업별 맞춤 전략을 수립합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: '동반 성장',
    description: '단순 컨설팅을 넘어 고객사의 지속적인 성장을 위한 파트너가 됩니다.',
  },
]

const team = [
  {
    name: '김부광',
    role: '대표이사 / CEO',
    description: '15년간 정책자금 분야에서 활동하며 1,000건 이상의 성공 사례를 이끌었습니다.',
    image: '/team/ceo.jpg',
  },
  {
    name: '이정책',
    role: '수석 컨설턴트',
    description: '중소벤처기업부 출신으로 정책자금 심사 기준을 누구보다 잘 알고 있습니다.',
    image: '/team/consultant1.jpg',
  },
  {
    name: '박금융',
    role: '금융 전문가',
    description: '대기업 은행 출신으로 기업 재무 분석과 자금 조달 전략 수립의 전문가입니다.',
    image: '/team/consultant2.jpg',
  },
]

const timeline = [
  { year: '2014', title: '부광솔루션즈 설립', description: '정책자금 전문 컨설팅 회사로 출발' },
  { year: '2016', title: '누적 상담 500건 달성', description: '초기 고객 확보 및 노하우 축적' },
  { year: '2018', title: '승인율 90% 돌파', description: '업계 최고 수준의 승인율 달성' },
  { year: '2020', title: '누적 승인 500억 달성', description: '코로나19 극복 지원 확대' },
  { year: '2022', title: '디지털 전환', description: '온라인 상담 시스템 구축' },
  { year: '2024', title: '누적 승인 1,200억 돌파', description: '업계 리딩 기업으로 성장' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 pt-20">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
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
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                중소기업의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">성장 파트너</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">
                부광솔루션즈는 2014년부터 중소기업의 정책자금 확보를 지원해온<br />
                대한민국 대표 정책자금 전문 컨설팅 기업입니다.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
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
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                    {stat.number}{stat.suffix}
                  </div>
                  <div className="text-slate-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                  모든 중소기업이 정책자금의<br />
                  혜택을 누릴 수 있도록
                </h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  많은 중소기업들이 자격이 있음에도 복잡한 절차와 정보 부족으로
                  정책자금의 혜택을 놓치고 있습니다. 부광솔루션즈는 이러한 장벽을
                  낮추고, 모든 기업이 공정하게 기회를 얻을 수 있도록 돕는 것을
                  사명으로 합니다.
                </p>
                <p className="text-slate-400 leading-relaxed">
                  우리는 단순히 서류를 대행하는 것이 아니라, 기업의 상황을 깊이
                  이해하고 최적의 자금 조달 전략을 수립하여 실질적인 성장을
                  이끌어냅니다.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Our Vision</h3>
                    <p className="text-slate-400">
                      대한민국 모든 중소기업의<br />
                      든든한 금융 파트너
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                핵심 가치
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-2xl p-6 hover:bg-slate-800 transition-colors"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-slate-400 text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                History
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                연혁
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-teal-500" />

              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-cyan-500 rounded-full transform -translate-x-1/2 ring-4 ring-slate-950" />

                    {/* Content */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}>
                      <div className="bg-slate-800/50 rounded-2xl p-6">
                        <span className="text-cyan-400 font-bold">{item.year}</span>
                        <h3 className="text-lg font-bold text-white mt-1">{item.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-slate-900/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-semibold mb-4">
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                전문가 팀
              </h2>
              <p className="text-slate-400">
                각 분야 최고의 전문가들이 고객의 성공을 위해 함께합니다
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 rounded-3xl p-6 text-center"
                >
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{member.name[0]}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm font-semibold mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm">{member.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-3xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                함께 성장하실 준비가 되셨나요?
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                지금 바로 무료 상담을 신청하시고<br />
                귀사에 맞는 최적의 정책자금을 찾아보세요
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#lead-form"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  무료 상담 신청
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/consulting"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors"
                >
                  컨설팅 서비스 보기
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-1">주소</h3>
                <p className="text-slate-400 text-sm">서울특별시 강남구 테헤란로 123<br />부광빌딩 5층</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-1">전화</h3>
                <p className="text-slate-400 text-sm">1588-0000</p>
              </div>
              <div>
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold mb-1">이메일</h3>
                <p className="text-slate-400 text-sm">contact@bukwang.co.kr</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
