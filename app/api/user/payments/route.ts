import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function GET() {
  try {
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ payments: [] })
    }

    if (!db) {
      return NextResponse.json({ payments: [] })
    }

    const paymentsRef = collection(db, 'payments')
    const q = query(
      paymentsRef,
      where('userEmail', '==', session.user.email),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot = await getDocs(q)

    const payments = querySnapshot.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
      }
    })

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Failed to fetch user payments:', error)
    return NextResponse.json({ payments: [], error: 'Failed to fetch payments' }, { status: 500 })
  }
}
