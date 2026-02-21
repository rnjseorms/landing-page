'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'

interface Payment {
  id: string
  orderId: string
  orderName: string
  amount: number
  status: string
  createdAt: string
}

export default function MyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.email) {
      fetchPayments()
    }
  }, [session])

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/user/payments')
      if (res.ok) {
        const data = await res.json()
        setPayments(data.payments || [])
      }
    } catch (error) {
      console.error('Failed to fetch payments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-slate-950 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Section */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800 mb-8">
            <div className="flex items-center gap-6">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {session.user?.name?.[0] || session.user?.email?.[0] || '?'}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white">{session.user?.name || '사용자'}</h1>
                <p className="text-slate-400">{session.user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Link
              href="/consulting"
              className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">컨설팅 신청</h3>
              <p className="text-slate-400 text-sm">전문 컨설팅 서비스 신청하기</p>
            </Link>

            <Link
              href="/#lead-form"
              className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">무료 상담</h3>
              <p className="text-slate-400 text-sm">정책자금 무료 상담 신청</p>
            </Link>

            <a
              href="tel:1234-5678"
              className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold mb-1">전화 문의</h3>
              <p className="text-slate-400 text-sm">1234-5678</p>
            </a>
          </div>

          {/* Payment History */}
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-800">
            <h2 className="text-xl font-bold text-white mb-6">결제 내역</h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : payments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-slate-400 mb-4">결제 내역이 없습니다.</p>
                <Link
                  href="/consulting"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  컨설팅 신청하기
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl"
                  >
                    <div>
                      <h3 className="text-white font-medium">{payment.orderName}</h3>
                      <p className="text-slate-400 text-sm">
                        {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('ko-KR') : '-'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-cyan-400 font-bold">{payment.amount?.toLocaleString()}원</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        payment.status === 'completed'
                          ? 'bg-green-500/10 text-green-400'
                          : payment.status === 'pending'
                          ? 'bg-yellow-500/10 text-yellow-400'
                          : 'bg-red-500/10 text-red-400'
                      }`}>
                        {payment.status === 'completed' ? '완료' : payment.status === 'pending' ? '대기' : '실패'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
