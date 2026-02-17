# Google Sheets 연동 설정 가이드

## 1단계: Google 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com)에 접속
2. **새 스프레드시트** 생성
3. 스프레드시트 이름을 **"정책자금 리드 목록"** 등으로 변경
4. URL에서 스프레드시트 ID 복사
   ```
   https://docs.google.com/spreadsheets/d/[이 부분이 SPREADSHEET_ID]/edit
   ```

## 2단계: Apps Script 설정

1. 스프레드시트에서 **확장 프로그램 > Apps Script** 클릭
2. 기존 코드를 모두 삭제
3. `Code.gs` 파일의 내용을 복사하여 붙여넣기
4. **16번째 줄**의 `YOUR_SPREADSHEET_ID_HERE`를 실제 스프레드시트 ID로 변경:
   ```javascript
   const SPREADSHEET_ID = '1ABC...xyz';  // 복사한 ID 붙여넣기
   ```
5. **저장** (Ctrl + S)

## 3단계: 시트 초기화

1. Apps Script 편집기에서 함수 선택 드롭다운 클릭
2. **initializeSheet** 함수 선택
3. **실행** 버튼 클릭
4. 권한 요청 시 **권한 검토 > 고급 > (프로젝트명)(으)로 이동 > 허용**
5. 스프레드시트에 "리드목록" 시트가 생성되고 헤더가 설정됨

## 4단계: 웹 앱 배포

1. Apps Script 편집기에서 **배포 > 새 배포** 클릭
2. **유형 선택** 옆의 톱니바퀴 아이콘 클릭 > **웹 앱** 선택
3. 설정:
   - **설명**: 정책자금 리드 수집 API
   - **실행 주체**: 나
   - **액세스 권한**: 모든 사용자
4. **배포** 클릭
5. **웹 앱 URL** 복사 (중요!)
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

## 5단계: Next.js 프로젝트에 URL 설정

1. 프로젝트 루트에 `.env.local` 파일 생성 (또는 수정)
2. 다음 내용 추가:
   ```
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycb.../exec
   ```
3. 개발 서버 재시작
   ```bash
   npm run dev
   ```

## 6단계: 테스트

1. 랜딩페이지에서 폼 제출
2. Google 스프레드시트에서 데이터 확인

---

## 주의사항

### 배포 업데이트 시
코드를 수정한 후에는 반드시 **새 배포**를 해야 합니다:
1. 배포 > 배포 관리
2. 연필 아이콘 클릭 > 버전: 새 버전
3. 배포

### CORS 문제
- `mode: 'no-cors'`로 요청하므로 응답을 직접 확인할 수 없습니다
- 스프레드시트에서 데이터 저장 여부를 확인하세요

### 보안
- 스프레드시트 ID는 공개되어도 괜찮습니다 (접근 권한이 있어야 열람 가능)
- Apps Script URL이 노출되면 스팸 데이터가 들어올 수 있으니 주의하세요

---

## 선택 기능: 이메일 알림

새 리드가 접수되면 이메일 알림을 받으려면:

1. `Code.gs`의 **179번째 줄** 주석 해제:
   ```javascript
   sendNotificationEmail(data, leadId);
   ```
2. **199번째 줄**의 이메일 주소 변경:
   ```javascript
   const recipientEmail = 'your-email@example.com';
   ```
3. 저장 후 새 버전 배포

---

## 스프레드시트 컬럼 설명

| 컬럼 | 설명 |
|------|------|
| 접수번호 | YYYYMMDD-001 형식의 고유 ID |
| 접수일시 | 신청 시간 |
| 이름 | 신청자 이름 |
| 연락처 | 신청자 연락처 |
| 이메일 | 신청자 이메일 |
| 업종 | 제조업, 서비스업 등 |
| 희망자금규모 | 희망하는 대출 금액 |
| 개인정보동의 | O/X |
| 마케팅동의 | O/X |
| 상담상태 | 신규/상담중/완료/보류 |
| 메모 | 상담 메모 |

### 상담상태 색상
- **신규** (노란색): 새로 접수된 리드
- **상담중** (파란색): 상담 진행 중
- **완료** (초록색): 상담 완료
- **보류** (빨간색): 보류 상태
