import { NextResponse } from 'next/server'
import { getAllPayments } from '@/lib/firestore'

export async function GET() {
  try {
    const payments = await getAllPayments()
    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Failed to fetch payments:', error)
    return NextResponse.json({ payments: [], error: 'Failed to fetch payments' }, { status: 500 })
  }
}
