## 현재 상태

- 마지막 완료: **C4-3** (본인 팀 멤버 미니 스트립)
- 다음 단계: **C4-4** (라이브 리더보드 — Gross 모드)
- 배포 상태: GitHub Pages + Firestore 규칙 모두 동기화 완료

---

## C4 진행 현황

- C4-1 ✅ 라운드 자동 전환 + 정모 모드 배지 + 입력 가드
- C4-2 ✅ 스코어 Firestore sync (500ms debounce, `scheduleSyncMyScoreToTournament`)
- C4-3 ✅ 본인 팀 멤버 미니 스트립 (`where('teamId')` 서버 필터, onSnapshot cleanup)
- C4-4 ⏳ 라이브 리더보드 (Gross 모드, 전체 멤버 onSnapshot)
- C4-5 Net 모드 + 팀별 합계
- C4-6 1초 throttle + 누수 방지
- C4-7 in_progress 호스트/게스트 재진입 동선

---

## 데이터 모델 (확정)

### tournaments/{id}
- `status`: `"waiting"` | `"in_progress"` | `"completed"` — forward-only (규칙 강제)
- `hostId`, `name`, `courseName`, `date`, `gameMode`, `pars[]`, `maxMembers`, `teamCount`, `teamSize`, `tier`
- `startedAt` (in_progress 진입 시 기록), `completedAt`

### tournaments/{id}/teams/{teamId}
- `name`: 팀 이름 (호스트가 인라인 편집 가능)
- `colorIndex`: 1~10 (클라이언트 TEAM_COLORS 상수로 HEX 매핑)
- `memberIds[]`: 보조 캐시 (단일 출처 아님)
- `createdAt`

### tournaments/{id}/members/{userId}
- `teamId`: `null` 또는 `"team-N"` — **단일 출처** (teams.memberIds는 보조 캐시)
- `name`, `handicapIndex`, `courseHandicap`
- `scores[]`, `putts[]`, `currentHole`, `completed` — C4-2에서 추가 (라운드 진행 중 sync)
- `lastUpdatedAt` — sync 시마다 serverTimestamp 갱신

---

## 보안 규칙 결정 로그

- **옵션 B** (호스트 + 본인 보호) 유지 — 인증된 사용자라면 읽기 가능, 쓰기는 권한 제한
- **status forward-only 강화** (C3-5): `waiting→in_progress→completed` 단방향만 허용
- **teams 서브컬렉션**: 호스트만 write, `status != "completed"` 조건

---

## 진행 원칙

- 마일스톤 잘게 쪼개기 (C3은 5단계, C4는 6~7단계 예상)
- 각 단계마다 Playwright + Firebase MCP 자동 검증
- 보안 규칙 변경은 별도 세션 권장 (코드 동작 검증 후 `firebase deploy --only firestore:rules`)
- 새 화면 만들 때 `.hidden` 우선순위 주의: `.hidden { display: none !important; }` 패턴 필수 (나중에 오는 `display: flex` 규칙에 덮임)

---

## C3에서 발견한 한계 (C4에서 처리)

- `teams` 컬렉션은 onSnapshot 없음 → 팀 이름 변경이 다른 호스트 화면에 자동 반영 안 됨
- `in_progress` 상태인 정모에 호스트가 재진입할 때 동선 미정의 (현재는 IN_PROGRESS alert로 막힘) → C4-7에서 처리
- C4에서 라이브 리더보드 화면 만들 때 두 가지 다 정리

---

## 코드 패턴 메모

- 팀 멤버 정보의 **단일 출처는 `members.teamId`** (`teams.memberIds`는 보조 캐시)
- 자동 배정 = batch 전체, 수동 배정 = batch 1쌍 (members 1건 + 양쪽 teams 2건)
- onSnapshot은 멤버 데이터만 구독, teams는 수동 fetch + `rerenderTeamAssignmentScreen()`
- GitHub Pages CDN 캐시 2분 지연 → CSS/JS 변경 시 `?v=XXX` query param 필수
- **C4 sync 패턴**: 정모 라운드 = `scheduleSyncMyScoreToTournament()` (500ms debounce) / 홀 이동 = `syncMyScoreToTournament()` (즉시) / B6 공유 = 기존 `scoreSync*ToFirestore` 함수 / personal = localStorage만
- **C4 분기 키**: `currentRound.tournamentId` 유무로 정모/비정모 분기 (isShared만으로 부족)
- `currentTournamentDoc`: tournament 본 문서 캐시 (pars, gameMode 등), `leaveTournamentWaitingRoom`에서 null 초기화
- **C4-3 미니 스트립**: `subscribeTournamentTeamMembers(tournamentId, teamId)` — `where('teamId','==',myTeamId)` 서버 필터, `allMembersData` 재사용, `cleanupTournamentRoundListeners()`가 unsub + flushAndClear + allMembersData 초기화 통합 처리
- **renderSharedModeUI() 분기**: tournamentId 있으면 스트립만, shareCode 있으면 B6 배지+스트립, 없으면 모두 숨김. B6 진입 시 tournament-mode-badge 강제 hidden 처리 필요 (이전 정모 세션 badge 누수 방지)

---

## 데이터 흐름 요약 (C4-3 기준)

**본인 입력 흐름:**
`changeScore` → `saveActiveRound` → tournamentId 분기 → `scheduleSyncMyScoreToTournament` (500ms debounce) → `tournaments/{id}/members/{uid}.scores` 업데이트

**팀원 현황 보기:**
`enterTournamentRound` → `subscribeTournamentTeamMembers(where teamId)` → onSnapshot → `allMembersData` → `renderMembersStrip`

**정리:**
`leaveTournamentWaitingRoom` → `cleanupTournamentRoundListeners` (unsub + flushAndClear + allMembersData 초기화)

---

## 회귀 방지 체크포인트 (C4-3에서 발견)

- **새 배지/UI 추가 시**: 다른 모드 진입 시 숨김 처리도 같이 — `renderSharedModeUI()` B6 분기에서 `tournament-mode-badge` hidden 추가한 사례
- **새 onSnapshot 추가 시**: cleanup 함수도 반드시 같이 작성 (메모리 누수 방지), `leaveTournament*` 경로 모두 체크
- **새 분기 (`currentRound.tournamentId`) 추가 시**: personal / B6 케이스 회귀 안 깨지는지 코드 리뷰 필수

---

## C4-4 미리보기

**목표:** 라이브 리더보드 화면 (화면 15)

- 새 화면 ID: `screen-leaderboard`
- 진입: 화면 3(홀 입력)에서 "리더보드" 버튼 → 화면 15 / 화면 15에서 "돌아가기" → 화면 3
- 데이터 소스: `tournaments/{id}/members/` 전체 (팀 필터 없음 — 전 멤버 대상)
- 정렬: Gross 모드 — `총타수 적은 순` (null 홀은 0으로 처리 아님, 미입력 제외)
- onSnapshot 범위: 정모 전체 멤버 (최대 40명 / PRD 5.9 비용 고려 → 500ms throttle 적용 예정)
- C4-5에서 Net 모드 + 팀별 합계 추가

---

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
