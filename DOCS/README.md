# 정부정책자금 컨설팅 랜딩페이지

정부정책자금 컨설팅 서비스를 위한 원스크롤 랜딩페이지 + 결제/회원 시스템

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **스타일링**: Tailwind CSS
- **인증**: NextAuth.js (Google OAuth + Firebase Auth)
- **데이터베이스**: Firebase Firestore
- **결제**: 토스페이먼츠 SDK
- **애니메이션**: Framer Motion
- **배포**: Vercel

## 주요 기능

### 1. 랜딩페이지
- 반응형 원스크롤 디자인
- 히어로 섹션, 문제 제기, 정책자금 소개, 자격 요건, 프로세스, 성공 사례, 신뢰 요소, FAQ
- 리드 수집 폼 (Google Sheets 연동 가능)

### 2. 인증 시스템
- Google OAuth 소셜 로그인
- 이메일/비밀번호 로그인 (Firebase Auth)
- NextAuth.js 세션 관리

### 3. 결제 시스템
- 토스페이먼츠 결제 연동
- 컨설팅 패키지 구매
- 결제 내역 Firebase 저장

### 4. 사용자 기능
- 마이페이지 (프로필, 결제 내역)
- 컨설팅 신청

### 5. 관리자 기능
- 관리자 대시보드
- 상담 신청 관리
- 결제 내역 관리
- 회원 관리

## 프로젝트 구조

```
├── app/
│   ├── admin/              # 관리자 페이지
│   │   ├── page.tsx        # 관리자 로그인
│   │   └── dashboard/      # 관리자 대시보드
│   ├── api/
│   │   ├── auth/           # NextAuth API
│   │   ├── admin/          # 관리자 API
│   │   ├── payments/       # 결제 API
│   │   └── user/           # 사용자 API
│   ├── auth/
│   │   ├── login/          # 로그인 페이지
│   │   └── signup/         # 회원가입 페이지
│   ├── consulting/         # 컨설팅 페이지
│   ├── mypage/             # 마이페이지
│   ├── payments/           # 결제 결과 페이지
│   ├── layout.tsx
│   ├── page.tsx            # 메인 랜딩페이지
│   └── globals.css
├── components/
│   ├── sections/           # 랜딩페이지 섹션
│   ├── ui/                 # UI 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── FloatingCTA.tsx
├── lib/
│   ├── firebase.ts         # Firebase 설정
│   └── firestore.ts        # Firestore 함수
├── hooks/                  # 커스텀 훅
├── public/                 # 정적 파일
├── DOCS/                   # 문서
└── .env.local              # 환경 변수
```

## 문서 목록

- [설치 가이드](./SETUP.md)
- [환경 변수 설정](./ENV.md)
- [Firebase 설정](./FIREBASE.md)
- [토스페이먼츠 설정](./TOSSPAYMENTS.md)
- [Google OAuth 설정](./GOOGLE_OAUTH.md)
- [Vercel 배포](./DEPLOY.md)
