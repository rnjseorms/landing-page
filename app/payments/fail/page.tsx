'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'motion/react'
import Header from '@/components/Header'

function PaymentFailContent() {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const message = searchParams.get('message')

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
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">결제 실패</h1>
            <p className="text-slate-400 mb-4">결제 처리 중 문제가 발생했습니다.</p>

            {(code || message) && (
              <div className="bg-slate-800/50 rounded-2xl p-4 mb-8 text-left">
                {code && (
                  <div className="mb-2">
                    <span className="text-slate-500 text-sm">에러 코드: </span>
                    <span className="text-red-400 font-mono text-sm">{code}</span>
                  </div>
                )}
                {message && (
                  <p className="text-slate-300 text-sm">{decodeURIComponent(message)}</p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <Link
                href="/consulting"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                다시 시도하기
              </Link>
              <Link
                href="/"
                className="w-full py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
              >
                홈으로 돌아가기
              </Link>
            </div>

            <p className="text-slate-500 text-sm mt-6">
              문제가 계속되면{' '}
              <a href="tel:1588-0000" className="text-cyan-400 hover:underline">
                고객센터
              </a>
              로 문의해주세요.
            </p>
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

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PaymentFailContent />
    </Suspense>
  )
}
