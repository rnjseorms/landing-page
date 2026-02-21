# Firebase 설정

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력
4. Google Analytics 설정 (선택)
5. 프로젝트 생성

## 2. 웹 앱 등록

1. 프로젝트 설정 → 일반 → 내 앱
2. 웹 앱 추가 (`</>` 아이콘)
3. 앱 닉네임 입력
4. Firebase SDK 설정 복사

```javascript
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

이 값들을 `.env.local`에 설정합니다.

## 3. Authentication 설정

1. Firebase Console → Authentication → Sign-in method
2. **이메일/비밀번호** 사용 설정
3. **Google** 사용 설정
   - 프로젝트 지원 이메일 선택
   - 저장

## 4. Firestore Database 설정

1. Firebase Console → Firestore Database
2. "데이터베이스 만들기" 클릭
3. 위치 선택 (asia-northeast3 = 서울)
4. 보안 규칙: "테스트 모드에서 시작" 선택

### Firestore 보안 규칙 (프로덕션용)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 컬렉션
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 결제 컬렉션
    match /payments/{paymentId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if false; // 서버에서만 업데이트
    }

    // 리드 컬렉션
    match /leads/{leadId} {
      allow create: if true; // 누구나 상담 신청 가능
      allow read: if false;  // 관리자만 (서버 사이드에서)
    }
  }
}
```

## 5. Firestore 컬렉션 구조

### users
```javascript
{
  uid: string,
  email: string,
  name: string,
  image?: string,
  phone?: string,
  company?: string,
  createdAt: timestamp,
  updatedAt: timestamp,
  lastLoginAt: timestamp
}
```

### payments
```javascript
{
  id: string,
  userId: string,
  userEmail: string,
  userName: string,
  orderId: string,
  orderName: string,
  packageId: string,
  amount: number,
  status: 'pending' | 'completed' | 'failed' | 'cancelled',
  paymentKey?: string,
  method?: string,
  approvedAt?: timestamp,
  receipt?: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### leads
```javascript
{
  id: string,
  companyName: string,
  contactName: string,
  phone: string,
  email: string,
  employees: string,
  revenue: string,
  fundingTypes: string[],
  message?: string,
  createdAt: timestamp
}
```

## 6. 인덱스 생성

Firestore에서 복합 쿼리 사용 시 인덱스가 필요합니다.
오류 발생 시 콘솔에 표시되는 링크를 클릭하여 자동 생성합니다.

### 필요한 인덱스
- `payments` 컬렉션: `userEmail` ASC, `createdAt` DESC
- `leads` 컬렉션: `createdAt` DESC
