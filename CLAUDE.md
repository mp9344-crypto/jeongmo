## 미래 작업 메모 (C6 끝나면 챙길 것)

### 호스팅 이전 — GitHub Pages → Firebase Hosting

현재 상태:
- GitHub Pages에 호스팅 (mp9344-crypto.github.io/jeongmo/)
- Public 저장소 + firebase-config.js도 git 추적 (호스팅 구조상 어쩔 수 없음)
- API 키는 도메인 제한으로 보호 (Google Cloud Console)

C6 끝난 후 할 일:
1. Firebase Hosting 셋업 (firebase init hosting)
2. firebase-config.js를 다시 git에서 빼고 GitHub Actions로 빌드 시 주입
3. 도메인 제한 변경:
   - 추가: jeongmo-app.web.app
   - 제거: mp9344-crypto.github.io
4. (선택) 커스텀 도메인 구매 후 연결

이전 안 하는 동안 위험도: 낮음 (도메인 제한 + Firestore Rules 옵션 B로 보호)

### API 키 도메인 제한 현황 (2026-05-03 적용)

Google Cloud Console (jeongmo-app 프로젝트) → Browser key:
- 127.0.0.1
- jeongmo-app.firebaseapp.com (Firebase Auth 안전망)
- localhost
- mp9344-crypto.github.io (현재 호스팅 도메인)

### 다국어 지원 (i18n) — 사용자 needs 발생 시

추가 시점: 한국어 안정화 완료 + 외국 친구가 사용할 needs 생길 때
우선순위: 영어 → 일본어 → 그 외
예상 작업 시간: 1~2주 (영어만)

작업 범위:
- HTML/JS의 모든 한국어 텍스트를 translations.js로 추출 (200~300개 항목 예상)
- data-i18n 속성으로 키 참조 구조로 변환
- 언어 선택 UI (브라우저 언어 자동 감지 + 수동 변경)
- localStorage에 언어 설정 저장
- Open Graph 메타태그도 다국어
- Intl.DateTimeFormat으로 날짜 포맷 자동화

함정:
- 영어 텍스트는 한국어보다 30~50% 김 → 모바일 버튼 점검 필수
- 골프 용어는 영어 원어가 자연스러움 (Stroke Play, Net, Gross 등)
- "정모"의 영어 번역: "JeongMo" 그대로 또는 "Friends Round" 추천
- 카카오톡 인앱 브라우저 외 메신저 호환성 (LINE, WhatsApp 등) 점검

지금 안 하는 이유:
- 친구 단톡방 앱이라 사용자 모두 한국어
- C3~C6 동안 새 기능마다 번역 추가하면 작업량 1.5배
- 한국어 표현 안정화 후 번역하는 게 정석 (피드백 받고 다듬은 후)
- PRD 2.4 "본질에 집중" 원칙
