# 설치 가이드

## 요구 사항

- Node.js 18.x 이상
- npm 또는 yarn
- Git

## 설치

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/government-funding-landing.git
cd government-funding-landing
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local.example`을 복사하여 `.env.local` 생성:

```bash
cp .env.local.example .env.local
```

환경 변수 설정은 [ENV.md](./ENV.md) 참조

### 4. 개발 서버 실행

```bash
npm run dev
```

기본적으로 http://localhost:3000 에서 실행됩니다.

### 5. 빌드

```bash
npm run build
```

### 6. 프로덕션 실행

```bash
npm start
```

## 주요 스크립트

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 |
| `npm start` | 프로덕션 서버 실행 |
| `npm run lint` | ESLint 실행 |

## 다음 단계

1. [Firebase 설정](./FIREBASE.md) - 인증 및 데이터베이스
2. [토스페이먼츠 설정](./TOSSPAYMENTS.md) - 결제 연동
3. [Google OAuth 설정](./GOOGLE_OAUTH.md) - 소셜 로그인
4. [Vercel 배포](./DEPLOY.md) - 배포
