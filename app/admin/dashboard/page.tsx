'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Lead {
  id: string
  companyName: string
  contactName: string
  phone: string
  email: string
  fundingType: string
  createdAt: string
}

interface Payment {
  id: string
  orderId: string
  orderName: string
  amount: number
  status: string
  userEmail: string
  userName: string
  createdAt: string
}

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'leads' | 'payments' | 'users'>('leads')
  const [leads, setLeads] = useState<Lead[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check admin authentication
    const authData = localStorage.getItem('adminAuth')
    if (!authData) {
      router.push('/admin')
      return
    }

    const auth = JSON.parse(authData)
    // Session expires after 24 hours
    if (!auth.authenticated || Date.now() - auth.timestamp > 24 * 60 * 60 * 1000) {
      localStorage.removeItem('adminAuth')
      router.push('/admin')
      return
    }

    fetchData()
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [leadsRes, paymentsRes, usersRes] = await Promise.all([
        fetch('/api/admin/leads'),
        fetch('/api/admin/payments'),
        fetch('/api/admin/users'),
      ])

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json()
        setLeads(leadsData.leads || [])
      }
      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json()
        setPayments(paymentsData.payments || [])
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData.users || [])
      }
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('ko-KR')
  }

  const formatAmount = (amount: number) => {
    return amount?.toLocaleString() + '원'
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">관리자 대시보드</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                사이트 보기
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">상담 신청</p>
                <p className="text-2xl font-bold text-white">{leads.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">총 결제</p>
                <p className="text-2xl font-bold text-white">{payments.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-400 text-sm">가입 회원</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 overflow-hidden">
          <div className="border-b border-slate-800">
            <div className="flex">
              <button
                onClick={() => setActiveTab('leads')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'leads'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                상담 신청 ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'payments'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                결제 내역 ({payments.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                회원 목록 ({users.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* Leads Table */}
                {activeTab === 'leads' && (
                  <div className="overflow-x-auto">
                    {leads.length === 0 ? (
                      <p className="text-center text-slate-400 py-8">상담 신청 내역이 없습니다.</p>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-slate-400 text-sm">
                            <th className="pb-4 font-medium">업체명</th>
                            <th className="pb-4 font-medium">담당자</th>
                            <th className="pb-4 font-medium">연락처</th>
                            <th className="pb-4 font-medium">이메일</th>
                            <th className="pb-4 font-medium">자금 종류</th>
                            <th className="pb-4 font-medium">신청일</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          {leads.map((lead) => (
                            <tr key={lead.id} className="border-t border-slate-800">
                              <td className="py-4">{lead.companyName}</td>
                              <td className="py-4">{lead.contactName}</td>
                              <td className="py-4">{lead.phone}</td>
                              <td className="py-4">{lead.email}</td>
                              <td className="py-4">{lead.fundingType}</td>
                              <td className="py-4 text-slate-400 text-sm">{formatDate(lead.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Payments Table */}
                {activeTab === 'payments' && (
                  <div className="overflow-x-auto">
                    {payments.length === 0 ? (
                      <p className="text-center text-slate-400 py-8">결제 내역이 없습니다.</p>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-slate-400 text-sm">
                            <th className="pb-4 font-medium">주문번호</th>
                            <th className="pb-4 font-medium">상품명</th>
                            <th className="pb-4 font-medium">금액</th>
                            <th className="pb-4 font-medium">상태</th>
                            <th className="pb-4 font-medium">결제자</th>
                            <th className="pb-4 font-medium">결제일</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          {payments.map((payment) => (
                            <tr key={payment.id} className="border-t border-slate-800">
                              <td className="py-4 font-mono text-sm">{payment.orderId}</td>
                              <td className="py-4">{payment.orderName}</td>
                              <td className="py-4 text-cyan-400">{formatAmount(payment.amount)}</td>
                              <td className="py-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  payment.status === 'completed'
                                    ? 'bg-green-500/10 text-green-400'
                                    : payment.status === 'pending'
                                    ? 'bg-yellow-500/10 text-yellow-400'
                                    : 'bg-red-500/10 text-red-400'
                                }`}>
                                  {payment.status === 'completed' ? '완료' : payment.status === 'pending' ? '대기' : '실패'}
                                </span>
                              </td>
                              <td className="py-4">{payment.userName || payment.userEmail}</td>
                              <td className="py-4 text-slate-400 text-sm">{formatDate(payment.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {/* Users Table */}
                {activeTab === 'users' && (
                  <div className="overflow-x-auto">
                    {users.length === 0 ? (
                      <p className="text-center text-slate-400 py-8">가입된 회원이 없습니다.</p>
                    ) : (
                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-slate-400 text-sm">
                            <th className="pb-4 font-medium">이름</th>
                            <th className="pb-4 font-medium">이메일</th>
                            <th className="pb-4 font-medium">가입일</th>
                          </tr>
                        </thead>
                        <tbody className="text-white">
                          {users.map((user) => (
                            <tr key={user.id} className="border-t border-slate-800">
                              <td className="py-4">{user.name || '-'}</td>
                              <td className="py-4">{user.email}</td>
                              <td className="py-4 text-slate-400 text-sm">{formatDate(user.createdAt)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
