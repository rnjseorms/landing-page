# Google Apps Script 연동 가이드

이 가이드는 폼 데이터를 Google Sheets에 자동으로 저장하기 위한 설정 방법입니다.

## 1. Google Sheets 생성

1. [Google Sheets](https://sheets.google.com)에서 새 스프레드시트 생성
2. 첫 번째 행에 헤더 추가:
   ```
   타임스탬프 | 이름 | 연락처 | 이메일 | 업종 | 희망자금규모 | 개인정보동의 | 마케팅동의
   ```

## 2. Apps Script 생성

1. Google Sheets에서 `확장 프로그램` > `Apps Script` 클릭
2. 기존 코드를 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    // 스프레드시트 ID를 실제 ID로 변경하세요
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const data = JSON.parse(e.postData.contents);

    const row = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.industry || '',
      data.fundingAmount || '',
      data.privacyConsent ? 'Y' : 'N',
      data.marketingConsent ? 'Y' : 'N'
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Google Apps Script is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

## 3. 웹 앱으로 배포

1. `배포` > `새 배포` 클릭
2. 유형 선택: `웹 앱`
3. 설정:
   - 설명: "Lead Form Handler"
   - 실행 사용자: `나`
   - 액세스 권한: `모든 사용자`
4. `배포` 클릭
5. 웹 앱 URL 복사

## 4. 환경 변수 설정

`.env.local` 파일에 복사한 URL 추가:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## 5. 테스트

1. `npm run dev`로 개발 서버 실행
2. 폼 작성 및 제출
3. Google Sheets에서 데이터 확인

## 주의사항

- Apps Script 배포 시 "모든 사용자" 접근 권한이 필요합니다 (CORS 우회를 위해)
- 민감한 데이터를 다루므로 스프레드시트 공유 설정에 주의하세요
- 대량 트래픽 시 Google Apps Script 할당량 제한이 있을 수 있습니다

## 이메일 알림 추가 (선택)

폼 제출 시 이메일 알림을 받으려면 doPost 함수에 다음 코드 추가:

```javascript
// 이메일 발송 (doPost 함수 내 sheet.appendRow 다음에 추가)
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: '[새 상담 신청] ' + data.name,
  body: `
새로운 상담 신청이 접수되었습니다.

이름: ${data.name}
연락처: ${data.phone}
이메일: ${data.email}
업종: ${data.industry || '미입력'}
희망 자금 규모: ${data.fundingAmount || '미입력'}
신청 시간: ${data.timestamp}
  `
});
```
