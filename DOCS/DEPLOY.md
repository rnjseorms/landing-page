# Vercel 배포

## 1. Vercel 계정 연결

1. [Vercel](https://vercel.com) 접속
2. GitHub 계정으로 로그인
3. "Add New Project" 클릭
4. GitHub 저장소 연결

## 2. 프로젝트 설정

### 빌드 설정
- Framework Preset: **Next.js**
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### 환경 변수 설정

Vercel Dashboard → Settings → Environment Variables에서 추가:

```
NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_xxxxx
TOSS_SECRET_KEY=live_sk_xxxxx
NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxxx.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxxx
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
NEXTAUTH_SECRET=your-random-secret-key
```

**참고**: `NEXTAUTH_URL`은 Vercel이 자동 설정

## 3. 도메인 설정

1. Vercel Dashboard → Settings → Domains
2. 커스텀 도메인 추가
3. DNS 설정:
   - A 레코드: `76.76.19.19`
   - CNAME: `cname.vercel-dns.com`

## 4. 배포

### 자동 배포
- `main` 브랜치에 push하면 자동 배포

### 수동 배포
```bash
npm install -g vercel
vercel --prod
```

## 5. 배포 후 설정

### Google OAuth 리디렉션 URI 추가
```
https://your-domain.com/api/auth/callback/google
```

### Firebase 승인된 도메인 추가
Firebase Console → Authentication → Settings → 승인된 도메인
```
your-domain.com
your-app.vercel.app
```

### 토스페이먼츠 Webhook URL 설정 (선택)
```
https://your-domain.com/api/payments/webhook
```

## 6. 환경별 배포

### Preview (PR 배포)
- PR 생성 시 자동으로 Preview 배포
- 고유 URL 생성

### Production
- `main` 브랜치 push 시 Production 배포

## 7. 모니터링

### Vercel Analytics
1. Vercel Dashboard → Analytics
2. 트래픽, 성능 지표 확인

### 로그 확인
1. Vercel Dashboard → Deployments
2. 배포 선택 → Logs

## CLI 명령어

```bash
# 로그인
vercel login

# 개발 서버 (Vercel 환경 변수 사용)
vercel dev

# 프리뷰 배포
vercel

# 프로덕션 배포
vercel --prod

# 환경 변수 확인
vercel env ls

# 환경 변수 추가
vercel env add VARIABLE_NAME
```

## 문제 해결

### 빌드 실패
- `npm run build` 로컬에서 테스트
- 의존성 버전 확인

### 환경 변수 미적용
- Vercel 대시보드에서 환경 변수 확인
- 재배포 필요

### 500 에러
- Vercel Functions 로그 확인
- 환경 변수 누락 확인
