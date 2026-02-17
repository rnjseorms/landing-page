'use client'

import { motion } from 'motion/react'
import { TextRotate } from '@/components/ui/TextRotate'

const rotatingTexts = [
  "저금리 정책자금",
  "맞춤형 자금 안내",
  "빠른 승인 지원",
  "전문가 무료 상담",
]

export default function HeroSection() {
  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Lamp Effect Background */}
      <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
        <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

        {/* Main glow */}
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-cyan-500/50 opacity-80 blur-3xl" />

        {/* Lamp effect */}
        <motion.div
          initial={{ width: "8rem" }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ width: "16rem" }}
          className="absolute top-0 z-30 h-36 -translate-y-[20%] rounded-full bg-cyan-500/50 blur-2xl"
        />

        {/* Top line */}
        <motion.div
          initial={{ width: "15rem" }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", delay: 0.3, duration: 0.8 }}
          whileInView={{ width: "30rem" }}
          className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-cyan-400/80"
        />

        {/* Left gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500/50 via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right gradient cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500/50 [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        viewport={{ once: true }}
        transition={{ ease: "easeInOut", delay: 0.5, duration: 0.8 }}
        whileInView={{ y: 0, opacity: 1 }}
        className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 pt-20"
      >
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/10 backdrop-blur-sm rounded-full border border-cyan-500/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-sm font-medium text-cyan-300">2025년 최신 기준 반영</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            중소기업을 위한
            <br />
            <span className="inline-flex items-center h-[1.2em] overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400">
              <TextRotate
                texts={rotatingTexts}
                rotationInterval={3000}
                staggerDuration={0.02}
                staggerFrom="first"
                mainClassName="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-teal-400"
                splitBy="characters"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
            복잡한 정부정책자금, 전문가가 쉽고 빠르게 안내해 드립니다.
            <br />
            <span className="text-white font-semibold">최대 3억원, 연 1%대 저금리</span> 지원 가능
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 py-8"
          >
            {[
              { value: '12,000', suffix: '+', label: '누적 상담' },
              { value: '1,500', suffix: '억', label: '승인 금액' },
              { value: '98', suffix: '%', label: '고객 만족도' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                  <span className="text-cyan-400">{stat.suffix}</span>
                </div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={scrollToForm}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl font-bold text-white text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                무료 자격 진단 받기
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button
              onClick={scrollToForm}
              className="px-8 py-4 rounded-xl font-bold text-white text-lg border-2 border-white/20 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300"
            >
              상담 문의하기
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50"
      >
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
