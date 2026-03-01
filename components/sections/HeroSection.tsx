'use client'

import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, useState, useEffect } from 'react'
import { TextRotate } from '@/components/ui/TextRotate'

const rotatingTexts = [
  "저금리 정책자금",
  "맞춤형 자금 안내",
  "빠른 승인 지원",
  "전문가 무료 상담",
]

// 고정된 파티클 위치 (Hydration 에러 방지)
const particlePositions = [
  { left: 10, top: 20 }, { left: 25, top: 45 }, { left: 40, top: 15 },
  { left: 55, top: 70 }, { left: 70, top: 30 }, { left: 85, top: 55 },
  { left: 15, top: 80 }, { left: 30, top: 60 }, { left: 45, top: 35 },
  { left: 60, top: 85 }, { left: 75, top: 10 }, { left: 90, top: 40 },
  { left: 5, top: 50 }, { left: 20, top: 75 }, { left: 35, top: 25 },
  { left: 50, top: 90 }, { left: 65, top: 5 }, { left: 80, top: 65 },
  { left: 95, top: 45 }, { left: 12, top: 95 },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const scrollToForm = () => {
    const formSection = document.getElementById('lead-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={containerRef} className="relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {mounted && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cyan-500/20"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 5) * 0.4,
              repeat: Infinity,
              delay: (i % 10) * 0.2,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Lamp Effect Background */}
      <div className="absolute top-0 isolate z-0 flex w-screen flex-1 items-start justify-center">
        <div className="absolute top-0 z-50 h-48 w-screen bg-transparent opacity-10 backdrop-blur-md" />

        {/* Main glow */}
        <motion.div
          className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-[-30%] rounded-full bg-cyan-500/60 opacity-80 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary glow - teal */}
        <motion.div
          className="absolute inset-auto z-40 h-24 w-[20rem] translate-y-[10%] rounded-full bg-teal-500/40 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

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
          className="absolute inset-auto z-50 h-0.5 -translate-y-[-10%] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
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
        style={{ y, opacity }}
        className="relative z-50 container flex justify-center flex-1 flex-col px-5 md:px-10 gap-4 pt-20"
      >
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge with shine effect */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className="badge-shine inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-sm rounded-full border border-cyan-500/30"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
            <span className="text-sm font-bold text-cyan-300 tracking-wide">2026년 최신 기준 반영</span>
          </motion.div>

          {/* Main Headline with stagger animation */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white leading-[1.1]"
          >
            <span className="block mb-6">중소기업을 위한</span>
            <span className="relative inline-flex items-center min-h-[1.2em] overflow-hidden px-4 py-2 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-lg">
              <TextRotate
                texts={rotatingTexts}
                rotationInterval={3000}
                staggerDuration={0.02}
                staggerFrom="first"
                mainClassName="text-slate-900 font-black"
                splitBy="characters"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            </span>
          </motion.h1>

          {/* Subtitle with highlight */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl lg:text-2xl text-slate-400 max-w-2xl leading-relaxed"
          >
            복잡한 정부정책자금, 전문가가 쉽고 빠르게 안내해 드립니다.
            <br />
            <span className="inline-flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-full text-cyan-300 font-bold border border-cyan-500/30">
                최대 3억원
              </span>
              <span className="text-cyan-300 font-bold">연 1%대 저금리</span>
              <span className="text-slate-300">지원 가능</span>
            </span>
          </motion.p>

          {/* Stats with count-up effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6 md:gap-12 lg:gap-16 py-8"
          >
            {[
              { value: '12,000', suffix: '+', label: '누적 상담' },
              { value: '1,500', suffix: '억', label: '승인 금액' },
              { value: '98', suffix: '%', label: '고객 만족도' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white group-hover:text-cyan-300 transition-colors">
                  {stat.value}
                  <span className="text-cyan-400">{stat.suffix}</span>
                </div>
                <div className="text-sm text-slate-500 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons with enhanced styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl font-bold text-white text-lg overflow-hidden shadow-lg shadow-cyan-500/25 neon-glow-box"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                무료 자격 진단 받기
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </span>
            </motion.button>
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 rounded-2xl font-bold text-white text-lg border-2 border-white/20 hover:bg-white/10 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              상담 문의하기
            </motion.button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30초 간편 신청</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% 무료 상담</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>전문가 1:1 안내</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

          </section>
  )
}
