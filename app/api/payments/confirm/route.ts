import { NextRequest, NextResponse } from 'next/server'

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentKey, orderId, amount } = body

    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { success: false, message: '필수 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // Confirm payment with Toss Payments API
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${TOSS_SECRET_KEY}:`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Toss payment confirmation failed:', data)
      return NextResponse.json(
        {
          success: false,
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code
        },
        { status: response.status }
      )
    }

    // Payment successful - save to database here
    // For now, we just return success
    // TODO: Save payment record to Firestore

    return NextResponse.json({
      success: true,
      payment: {
        paymentKey: data.paymentKey,
        orderId: data.orderId,
        orderName: data.orderName,
        amount: data.totalAmount,
        status: data.status,
        approvedAt: data.approvedAt,
        method: data.method,
        receipt: data.receipt?.url,
      },
    })
  } catch (error) {
    console.error('Payment confirmation error:', error)
    return NextResponse.json(
      { success: false, message: '결제 승인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
