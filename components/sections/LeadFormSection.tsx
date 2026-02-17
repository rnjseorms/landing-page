'use client'

import { useState, FormEvent } from 'react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
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
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>()
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
      // Google Apps Script endpoint (placeholder - replace with actual URL)
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
    const kakaoChannelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID || '_placeholder'
    window.open(`https://pf.kakao.com/${kakaoChannelId}`, '_blank')
  }

  if (isSubmitted) {
    return (
      <section id="lead-form" className="py-20 bg-slate-900">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              신청이 완료되었습니다!
            </h2>
            <p className="text-gray-600 mb-8">
              24시간 내에 전문 상담사가 연락드리겠습니다.
              <br />
              빠른 상담을 원하시면 카카오톡으로 문의해주세요.
            </p>
            <Button variant="kakao" size="lg" onClick={handleKakaoClick}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
              </svg>
              카카오톡 빠른 상담
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="lead-form" className="py-20 bg-slate-900">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-10">
            <h2 className="text-h2-mobile md:text-h2-desktop text-white mb-4">
              지금 무료 자격 진단을 받아보세요
            </h2>
            <p className="text-white/80">
              30초면 충분합니다. 맞춤 정책자금을 안내해 드립니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
            <div className="space-y-5">
              {/* Name */}
              <Input
                label="이름"
                type="text"
                required
                placeholder="홍길동"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
              />

              {/* Phone */}
              <Input
                label="연락처"
                type="tel"
                required
                placeholder="010-1234-5678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                error={errors.phone}
              />

              {/* Email */}
              <Input
                label="이메일"
                type="email"
                required
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
              />

              {/* Industry */}
              <Select
                label="업종"
                options={industryOptions}
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />

              {/* Funding Amount */}
              <Select
                label="희망 자금 규모"
                options={fundingOptions}
                value={formData.fundingAmount}
                onChange={(e) => setFormData({ ...formData, fundingAmount: e.target.value })}
              />

              {/* Consent Checkboxes */}
              <div className="space-y-3 pt-4">
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
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? '제출 중...' : '무료 자격 진단 신청하기'}
              </Button>
            </div>

            {/* Kakao Channel */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500 mb-4">
                카카오톡으로 빠른 상담을 받으세요
              </p>
              <Button variant="kakao" onClick={handleKakaoClick}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 10.5c0 2.47 1.607 4.647 4.034 5.907-.133.476-.856 3.063-.883 3.273 0 0-.017.165.087.228.104.063.226.029.226.029.299-.042 3.46-2.265 4.006-2.645.507.074 1.03.113 1.563.113 5.523 0 10-3.477 10-7.5S17.523 3 12 3z"/>
                </svg>
                카카오톡 채널 추가하기
              </Button>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-gray-400 text-center">
              본 서비스는 정보 제공 목적이며, 대출 승인을 보장하지 않습니다.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
