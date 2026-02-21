'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import Header from '@/components/Header'

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [paymentInfo, setPaymentInfo] = useState<{
    orderId: string
    orderName: string
    amount: number
    approvedAt: string
    receipt?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isConfirmingRef = useRef(false)

  useEffect(() => {
    const confirmPayment = async () => {
      // Prevent duplicate calls (React StrictMode or re-renders)
      if (isConfirmingRef.current) return
      isConfirmingRef.current = true

      const paymentKey = searchParams.get('paymentKey')
      const orderId = searchParams.get('orderId')
      const amount = searchParams.get('amount')

      if (!paymentKey || !orderId || !amount) {
        setError('결제 정보가 올바르지 않습니다.')
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: Number(amount),
          }),
        })

        const data = await response.json()

        if (data.success) {
          setPaymentInfo(data.payment)
        } else {
          // Ignore "already processing" error if we already have payment info
          if (data.code !== 'ALREADY_PROCESSING_REQUEST') {
            setError(data.message || '결제 승인에 실패했습니다.')
          }
        }
      } catch (err) {
        setError('결제 확인 중 오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    confirmPayment()
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400">결제 확인 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8"
          >
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">결제 확인 실패</h1>
            <p className="text-slate-400 mb-8">{error}</p>
            <Link
              href="/consulting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
            >
              다시 시도하기
            </Link>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">결제 완료!</h1>
            <p className="text-slate-400 mb-8">컨설팅 결제가 완료되었습니다.</p>

            {paymentInfo && (
              <div className="bg-slate-800/50 rounded-2xl p-6 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">주문번호</span>
                    <span className="text-white font-mono text-sm">{paymentInfo.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">상품명</span>
                    <span className="text-white">{paymentInfo.orderName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">결제금액</span>
                    <span className="text-cyan-400 font-bold">{paymentInfo.amount?.toLocaleString()}원</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">결제일시</span>
                    <span className="text-white text-sm">
                      {paymentInfo.approvedAt ? new Date(paymentInfo.approvedAt).toLocaleString('ko-KR') : '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <p className="text-slate-500 text-sm mb-6">
              담당 컨설턴트가 영업일 기준 1일 이내에 연락드립니다.
            </p>

            <div className="flex flex-col gap-3">
              {paymentInfo?.receipt && (
                <a
                  href={paymentInfo.receipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
                >
                  영수증 보기
                </a>
              )}
              <Link
                href="/"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                홈으로 돌아가기
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentSuccessContent />
    </Suspense>
  )
}
