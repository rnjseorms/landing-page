interface FormData {
  name: string
  phone: string
  email: string
  industry?: string
  fundingAmount?: string
  privacyConsent: boolean
  marketingConsent: boolean
  timestamp?: string
}

interface SubmitResult {
  success: boolean
  message: string
}

export async function submitToGoogleSheets(formData: FormData): Promise<SubmitResult> {
  const SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL

  if (!SCRIPT_URL) {
    console.warn('Google Apps Script URL is not configured')
    // Return success in development mode for testing
    return { success: true, message: 'Development mode - form submission simulated' }
  }

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
      }),
    })

    // With no-cors mode, we can't read the response
    // So we assume success if no error was thrown
    return { success: true, message: '신청이 완료되었습니다.' }
  } catch (error) {
    console.error('Form submission error:', error)
    return { success: false, message: '제출 중 오류가 발생했습니다. 다시 시도해주세요.' }
  }
}
