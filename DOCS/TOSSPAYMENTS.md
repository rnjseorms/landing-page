# 토스페이먼츠 설정

## 1. 토스페이먼츠 가입

1. [토스페이먼츠 개발자센터](https://developers.tosspayments.com) 접속
2. 회원가입 및 로그인
3. 테스트 상점 자동 생성

## 2. API 키 확인

1. 개발자센터 → API 키
2. **테스트 키** 확인:
   - 클라이언트 키: `test_ck_xxxxx`
   - 시크릿 키: `test_sk_xxxxx`

3. **라이브 키** (실결제용):
   - 사업자 인증 후 발급
   - 클라이언트 키: `live_ck_xxxxx`
   - 시크릿 키: `live_sk_xxxxx`

## 3. 환경 변수 설정

```env
# 테스트 환경
NEXT_PUBLIC_TOSS_CLIENT_KEY=test_ck_xxxxx
TOSS_SECRET_KEY=test_sk_xxxxx

# 프로덕션 환경
NEXT_PUBLIC_TOSS_CLIENT_KEY=live_ck_xxxxx
TOSS_SECRET_KEY=live_sk_xxxxx
```

## 4. 결제 흐름

### 결제 요청 (클라이언트)
```typescript
// app/consulting/[id]/page.tsx
const { loadTossPayments } = await import('@tosspayments/tosspayments-sdk')
const tossPayments = await loadTossPayments(clientKey)
const payment = tossPayments.payment({ customerKey: userEmail })

await payment.requestPayment({
  method: 'CARD',
  amount: { currency: 'KRW', value: amount },
  orderId: orderId,
  orderName: orderName,
  successUrl: `${window.location.origin}/payments/success`,
  failUrl: `${window.location.origin}/payments/fail`,
})
```

### 결제 승인 (서버)
```typescript
// app/api/payments/confirm/route.ts
const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${Buffer.from(secretKey + ':').toString('base64')}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ paymentKey, orderId, amount }),
})
```

## 5. 테스트 카드

| 카드사 | 카드번호 | 유효기간 | CVC | 비밀번호 |
|--------|----------|----------|-----|----------|
| 테스트 | 4330-0000-0000-0000 | 12/30 | 123 | 00 |

## 6. Webhook 설정 (선택)

1. 토스페이먼츠 → 상점관리 → Webhook
2. Webhook URL: `https://your-domain.com/api/payments/webhook`
3. 이벤트 선택: `PAYMENT_STATUS_CHANGED`

## 7. 실결제 전환

1. 토스페이먼츠에서 사업자 인증
2. 심사 완료 후 라이브 키 발급
3. 환경 변수를 라이브 키로 변경
4. 배포

## 참고 문서

- [토스페이먼츠 연동 가이드](https://docs.tosspayments.com/guides/payment-widget/integration)
- [SDK 레퍼런스](https://docs.tosspayments.com/reference/js-sdk)
- [결제 승인 API](https://docs.tosspayments.com/reference/payments-approve)
