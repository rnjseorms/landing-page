import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { v4 as uuidv4 } from 'uuid'
import { createPayment } from '@/lib/firestore'

// Toss Payments configuration
const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ''
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: '로그인이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { packageId, packageName, amount, customerEmail, customerName } = body

    if (!packageId || !amount) {
      return NextResponse.json(
        { success: false, message: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${uuidv4().slice(0, 8)}`

    // Save payment record to Firestore (pending status)
    await createPayment({
      userId: (session.user as { id?: string }).id || session.user.email,
      userEmail: customerEmail || session.user.email,
      userName: customerName || session.user.name || '고객',
      orderId,
      orderName: packageName,
      packageId,
      amount,
    })

    // Return info for client-side payment
    return NextResponse.json({
      success: true,
      orderId,
      orderName: packageName,
      amount,
      customerEmail,
      customerName,
      clientKey: TOSS_CLIENT_KEY,
      successUrl: `${BASE_URL}/payments/success`,
      failUrl: `${BASE_URL}/payments/fail`,
    })
  } catch (error) {
    console.error('Payment request error:', error)
    return NextResponse.json(
      { success: false, message: '결제 요청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
