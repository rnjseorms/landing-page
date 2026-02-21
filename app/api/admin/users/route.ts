import { NextResponse } from 'next/server'
import { getAllUsers } from '@/lib/firestore'

export async function GET() {
  try {
    const users = await getAllUsers()
    return NextResponse.json({ users })
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return NextResponse.json({ users: [], error: 'Failed to fetch users' }, { status: 500 })
  }
}
