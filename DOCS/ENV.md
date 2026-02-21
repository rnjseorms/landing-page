# 환경 변수 설정

## .env.local 파일

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 변수들을 설정합니다.

```env
# Google Apps Script 웹 앱 URL (리드 폼 연동용, 선택사항)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=

# 카카오톡 채널 ID (선택사항)
NEXT_PUBLIC_KAKAO_CHANNEL_ID=

# 토스페이먼츠 API 키
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxx  # 클라이언트 키 (테스트/라이브)
TOSS_SECRET_KEY=test_sk_xxxxx              # 시크릿 키 (테스트/라이브)

# Firebase 설정
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Google OAuth 설정
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000    # 개발: localhost, 프로덕션: 실제 도메인
NEXTAUTH_SECRET=your-secret-key       # 랜덤 시크릿 키 (openssl rand -base64 32)
```

## 환경별 설정

### 개발 환경 (Development)

```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxx
TOSS_SECRET_KEY=test_sk_xxxxx
NEXTAUTH_URL=http://localhost:3000
```

### 프로덕션 환경 (Production)

```env
NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_xxxxx
TOSS_SECRET_KEY=live_sk_xxxxx
NEXTAUTH_URL=https://your-domain.com
```

## Vercel 환경 변수

Vercel 대시보드에서 환경 변수 설정:

1. Vercel 프로젝트 → Settings → Environment Variables
2. 각 변수 추가 (Production/Preview/Development 선택)
3. `NEXTAUTH_URL`은 Vercel이 자동 설정하므로 생략 가능

## 보안 주의사항

- `.env.local` 파일은 절대 Git에 커밋하지 않습니다
- `NEXT_PUBLIC_` 접두사가 있는 변수만 클라이언트에 노출됩니다
- 시크릿 키는 절대 클라이언트에 노출되지 않도록 합니다
