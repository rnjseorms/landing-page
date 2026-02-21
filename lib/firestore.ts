import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface User {
  uid: string
  email: string
  name: string
  image?: string
  phone?: string
  company?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  lastLoginAt: Timestamp
}

export interface Payment {
  id: string
  userId: string
  userEmail: string
  userName: string
  orderId: string
  orderName: string
  packageId: string
  amount: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  paymentKey?: string
  method?: string
  approvedAt?: Timestamp
  receipt?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface LeadForm {
  id: string
  companyName: string
  contactName: string
  phone: string
  email: string
  employees: string
  revenue: string
  fundingTypes: string[]
  message?: string
  createdAt: Timestamp
}

// User functions
export async function createOrUpdateUser(userData: {
  uid: string
  email: string
  name: string
  image?: string
}): Promise<User | null> {
  if (!db) return null

  const userRef = doc(db, 'users', userData.uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    // Update existing user
    await updateDoc(userRef, {
      name: userData.name,
      image: userData.image,
      lastLoginAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return { ...userSnap.data(), ...userData } as User
  } else {
    // Create new user
    const newUser = {
      ...userData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      lastLoginAt: serverTimestamp(),
    }
    await setDoc(userRef, newUser)
    return newUser as unknown as User
  }
}

export async function getUserById(uid: string): Promise<User | null> {
  if (!db) return null

  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    return { uid, ...userSnap.data() } as User
  }
  return null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  if (!db) return null

  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('email', '==', email))
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]
    return { uid: doc.id, ...doc.data() } as User
  }
  return null
}

// Payment functions
export async function createPayment(paymentData: {
  userId: string
  userEmail: string
  userName: string
  orderId: string
  orderName: string
  packageId: string
  amount: number
}): Promise<Payment | null> {
  if (!db) return null

  const paymentRef = doc(db, 'payments', paymentData.orderId)
  const payment = {
    ...paymentData,
    id: paymentData.orderId,
    status: 'pending' as const,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  await setDoc(paymentRef, payment)
  return payment as unknown as Payment
}

export async function updatePaymentStatus(
  orderId: string,
  data: {
    status: 'completed' | 'failed' | 'cancelled'
    paymentKey?: string
    method?: string
    approvedAt?: Date
    receipt?: string
  }
): Promise<void> {
  if (!db) return

  const paymentRef = doc(db, 'payments', orderId)
  await updateDoc(paymentRef, {
    ...data,
    approvedAt: data.approvedAt ? Timestamp.fromDate(data.approvedAt) : null,
    updatedAt: serverTimestamp(),
  })
}

export async function getPaymentByOrderId(orderId: string): Promise<Payment | null> {
  if (!db) return null

  const paymentRef = doc(db, 'payments', orderId)
  const paymentSnap = await getDoc(paymentRef)

  if (paymentSnap.exists()) {
    return { id: orderId, ...paymentSnap.data() } as Payment
  }
  return null
}

export async function getUserPayments(userId: string): Promise<Payment[]> {
  if (!db) return []

  const paymentsRef = collection(db, 'payments')
  const q = query(
    paymentsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Payment[]
}

// Lead form functions
export async function saveLeadForm(formData: {
  companyName: string
  contactName: string
  phone: string
  email: string
  employees: string
  revenue: string
  fundingTypes: string[]
  message?: string
}): Promise<LeadForm | null> {
  if (!db) return null

  const leadsRef = collection(db, 'leads')
  const leadDoc = doc(leadsRef)
  const lead = {
    ...formData,
    id: leadDoc.id,
    createdAt: serverTimestamp(),
  }

  await setDoc(leadDoc, lead)
  return lead as unknown as LeadForm
}

export async function getLeads(): Promise<LeadForm[]> {
  if (!db) return []

  const leadsRef = collection(db, 'leads')
  const q = query(leadsRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      fundingType: data.fundingTypes?.join(', ') || '',
      createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
    }
  }) as unknown as LeadForm[]
}

// Admin functions
export async function getAllPayments(): Promise<Payment[]> {
  if (!db) return []

  const paymentsRef = collection(db, 'payments')
  const q = query(paymentsRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
    }
  }) as unknown as Payment[]
}

export async function getAllUsers(): Promise<User[]> {
  if (!db) return []

  const usersRef = collection(db, 'users')
  const q = query(usersRef, orderBy('createdAt', 'desc'))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(doc => {
    const data = doc.data()
    return {
      id: doc.id,
      uid: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || '',
    }
  }) as unknown as User[]
}
