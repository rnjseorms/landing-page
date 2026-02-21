import { NextResponse } from 'next/server'
import { getLeads } from '@/lib/firestore'

export async function GET() {
  try {
    const leads = await getLeads()
    return NextResponse.json({ leads })
  } catch (error) {
    console.error('Failed to fetch leads:', error)
    return NextResponse.json({ leads: [], error: 'Failed to fetch leads' }, { status: 500 })
  }
}
