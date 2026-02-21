# Google OAuth 설정

## 1. Google Cloud Console 프로젝트

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. Firebase 프로젝트와 동일한 프로젝트 사용 권장

## 2. OAuth 동의 화면 설정

1. APIs & Services → OAuth 동의 화면
2. User Type: **외부** 선택
3. 앱 정보 입력:
   - 앱 이름
   - 사용자 지원 이메일
   - 개발자 연락처 이메일
4. 범위 추가:
   - `email`
   - `profile`
   - `openid`
5. 테스트 사용자 추가 (필요시)

## 3. OAuth 클라이언트 ID 생성

1. APIs & Services → 사용자 인증 정보
2. "사용자 인증 정보 만들기" → OAuth 클라이언트 ID
3. 애플리케이션 유형: **웹 애플리케이션**
4. 이름 입력

### 승인된 JavaScript 원본
```
http://localhost:3000
http://localhost:3010
https://your-domain.com
https://your-app.vercel.app
```

### 승인된 리디렉션 URI
```
http://localhost:3000/api/auth/callback/google
http://localhost:3010/api/auth/callback/google
https://your-domain.com/api/auth/callback/google
https://your-app.vercel.app/api/auth/callback/google
```

5. 만들기 클릭
6. 클라이언트 ID와 클라이언트 보안 비밀번호 복사

## 4. 환경 변수 설정

```env
GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxx
```

## 5. NextAuth 설정

```typescript
// app/api/auth/[...nextauth]/route.ts
import GoogleProvider from 'next-auth/providers/google'

providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
]
```

## 6. 프로덕션 배포 시

1. Google Cloud Console에서 리디렉션 URI 추가:
   ```
   https://your-domain.com/api/auth/callback/google
   ```

2. OAuth 동의 화면 "앱 게시" (테스트 → 프로덕션)

## 7. 문제 해결

### redirect_uri_mismatch 에러
- 리디렉션 URI가 정확히 일치하는지 확인
- 포트 번호 확인 (3000, 3010 등)
- `http` vs `https` 확인

### 설정 반영 지연
- Google Cloud Console 변경 후 5분~몇 시간 소요 가능
- 시크릿 모드에서 테스트

### 이미지 에러
`next.config.js`에 이미지 도메인 추가:
```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'lh3.googleusercontent.com',
    },
  ],
}
```
