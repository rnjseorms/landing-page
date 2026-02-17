import type { Metadata } from 'next'
import './globals.css'

const siteUrl = "https://your-domain.com" // 배포 후 실제 도메인으로 변경

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "2025 정부정책자금 무료 자격진단 | 부광솔루션즈",
    template: "%s | 부광솔루션즈 정책자금",
  },
  description:
    "중소기업·소상공인·예비창업자를 위한 정부정책자금 전문 상담. 30초 만에 무료 자격 진단! 최대 3억원, 연 1%대 저금리 대출 가능. 12,000건+ 상담 실적, 98% 고객 만족도.",
  alternates: {
    canonical: siteUrl,
    languages: { ko: `${siteUrl}/` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "2025 정부정책자금 무료 자격진단 | 최대 3억 저금리 대출",
    description:
      "중소기업·소상공인·예비창업자를 위한 정부정책자금 안내. 복잡한 서류, 전문가가 대행해 드립니다. 지금 무료 상담 신청하세요!",
    siteName: "부광솔루션즈 정책자금",
    locale: "ko_KR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "2025 정부정책자금 무료 자격진단 - 부광솔루션즈",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "2025 정부정책자금 무료 자격진단",
    description: "중소기업·소상공인 맞춤 정책자금 안내. 최대 3억원 저금리 대출!",
    images: ["/og-image.png"],
  },
  keywords: [
    "정부정책자금",
    "저금리 대출",
    "중소기업 대출",
    "소상공인 자금",
    "창업자금",
    "정책자금 상담",
    "중진공",
    "소진공",
    "신용보증기금",
    "기술보증기금",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "finance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "부광솔루션즈 정책자금 상담센터",
              "description": "중소기업·소상공인을 위한 정부정책자금 전문 상담 서비스",
              "url": siteUrl,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "서울특별시",
                "addressCountry": "KR"
              },
              "offers": {
                "@type": "Offer",
                "name": "무료 자격 진단",
                "price": "0",
                "priceCurrency": "KRW"
              }
            })
          }}
        />
      </head>
      <body className="font-pretendard antialiased">
        {children}
      </body>
    </html>
  )
}
