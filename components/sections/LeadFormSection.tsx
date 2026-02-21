'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'motion/react'
import { Input, Select, Checkbox } from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  phone: string
  email: string
  industry: string
  fundingAmount: string
  privacyConsent: boolean
  marketingConsent: boolean
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  privacyConsent?: string
}

const industryOptions = [
  { value: 'manufacturing', label: '제조업' },
  { value: 'service', label: '서비스업' },
  { value: 'food', label: '요식업' },
  { value: 'it', label: 'IT/소프트웨어' },
  { value: 'retail', label: '도소매업' },
  { value: 'other', label: '기타' },
]

const fundingOptions = [
  { value: 'under30m', label: '3천만원 이하' },
  { value: '30m-100m', label: '3천만원 ~ 1억' },
  { value: '100m-300m', label: '1억 ~ 3억' },
  { value: 'over300m', label: '3억 이상' },
]

export default function LeadFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    industry: '',
    fundingAmount: '',
    privacyConsent: false,
    marketingConsent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = '이름을 2글자 이상 입력해주세요'
    }

    const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
    if (!formData.phone || !phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      newErrors.phone = '올바른 연락처를 입력해주세요'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일을 입력해주세요'
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = '개인정보 수집에 동의해주세요'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || ''

      if (SCRIPT_URL) {
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        })
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKakaoClick = () => {
    window.open('https://open.kakao.com/o/sL3gxyth', '_blank')
  }

  if (isSubmitted) {
    return (
      <section id="lead-form" className="relative py-24 bg-slate-950 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-700/50"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30"
            >
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-4"
            >
              신청이 완료되었습니다!
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 mb-8"
            >
              24시간 내에 전문 상담사가 연락드리겠습니다.
              <br />
              빠른 상담을 원하시면 카카오톡으로 문의해주세요.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button variant="kakao" size="lg" onClick={handleKakaoClick}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                </svg>
                카카오톡 빠른 상담
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="lead-form" className="relative py-24 bg-slate-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.5) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/20 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm font-medium text-cyan-400">30초만에 완료</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 whitespace-nowrap">
              지금 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">무료 상담</span> 받아보세요
            </h2>
            <p className="text-lg text-slate-400">
              간단한 정보 입력으로 맞춤 정책자금을 안내해 드립니다
            </p>
          </div>

          {/* Form Card */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-700/50"
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-teal-500/30 rounded-br-3xl" />

            <div className="space-y-6">
              {/* Name */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Input
                  label="이름"
                  type="text"
                  required
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={errors.name}
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <Input
                  label="연락처"
                  type="tel"
                  required
                  placeholder="010-1234-5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Input
                  label="이메일"
                  type="email"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={errors.email}
                />
              </motion.div>

              {/* Two columns for selects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  viewport={{ once: true }}
                >
                  <Select
                    label="업종"
                    options={industryOptions}
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Select
                    label="희망 자금 규모"
                    options={fundingOptions}
                    value={formData.fundingAmount}
                    onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
                  />
                </motion.div>
              </div>

              {/* Consent Checkboxes */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 }}
                viewport={{ once: true }}
                className="space-y-3 pt-4"
              >
                <Checkbox
                  label="[필수] 개인정보 수집 및 이용에 동의합니다."
                  required
                  checked={formData.privacyConsent}
                  onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                  error={errors.privacyConsent}
                />
                <Checkbox
                  label="[선택] 마케팅 정보 수신에 동의합니다."
                  checked={formData.marketingConsent}
                  onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 px-8 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none neon-glow-box"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      제출 중...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      무료 자격 진단 신청하기
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </button>
              </motion.div>
            </div>

            {/* Kakao Channel */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-slate-700/50 text-center"
            >
              <p className="text-slate-500 mb-4 text-sm">
                카카오톡으로 빠른 상담을 받으세요
              </p>
              <button
                type="button"
                onClick={handleKakaoClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEE500] hover:bg-[#FDD835] text-[#000000] font-bold rounded-xl transition-all duration-300 hover:scale-105"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                </svg>
                카카오톡 상담
              </button>
            </motion.div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-slate-500 text-center">
              본 서비스는 정보 제공 목적이며, 대출 승인을 보장하지 않습니다.
            </p>
          </motion.form>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6 mt-8 text-slate-500 text-sm"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>SSL 보안 적용</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>개인정보 보호</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24시간 내 연락</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
