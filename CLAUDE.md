## 현재 상태

- 마지막 완료: **C5** (정모 종료 + 결과 화면 16 — 우승자 카드, 개인/팀 순위, 나의 스코어카드, 자동 종료 감지)
- 다음: C6 (공유 초대 링크 + 정모 히스토리 or 기타 개선 — 미정)
- 배포 상태: GitHub Pages (app.js?v=c48) + Firestore 규칙 변경 없음

---

## C4 진행 현황

- C4-1 ✅ 라운드 자동 전환 + 정모 모드 배지 + 입력 가드
- C4-2 ✅ 스코어 Firestore sync (500ms debounce, `scheduleSyncMyScoreToTournament`)
- C4-3 ✅ 본인 팀 멤버 미니 스트립 (`where('teamId')` 서버 필터, onSnapshot cleanup)
- C4-4 ✅ 라이브 리더보드 Gross (개인 순위, onSnapshot, cleanup 연동)
- C4-5 ✅ Net 모드 + 팀별 합계 (개인+팀 양쪽 표시, 비례 핸디) — 시각 확인 완료
- C4-6 ✅ 1초 throttle + beforeunload 누수 방지 + 32명 부하 테스트 (20회 onSnapshot → 2회 render, 90% 감소 확인)
- C4-7 ✅ in_progress 재진입 동선 (호스트/기존멤버 자동 화면3, 신규 차단, URL 새로고침 복귀, 종료 감지)

## C5 진행 현황

- C5 ✅ 정모 종료 + 결과 화면 (화면 16) — 우승자 카드, 최종 개인/팀 순위, 나의 스코어카드, 자동 종료 감지

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
- **C4-4/C4-5 리더보드**: `subscribeAllTournamentMembers(tournamentId)` — 팀 필터 없이 전체 구독. `cleanupLeaderboardListener()`는 `cleanupTournamentRoundListeners()` 내부에서도 호출됨 (이중 보장). `computeMemberStats(member, pars)` — Gross+Net 동시 계산, 비례 핸디 `(playedHoles/18) * courseHandicap`. `fetchLeaderboardTeams(tournamentId)` — teams one-shot fetch, `leaderboardTeams[]` 캐시. `renderLeaderboard()`는 gameMode 분기로 Gross/Net 자동 전환 + 팀 섹션 동시 렌더. 팀 row는 `TEAM_COLORS[colorIndex]`로 컬러 적용.
- **C4-6 throttle 패턴**: `createThrottle(fn, delayMs)` — 첫 호출 즉시 실행 + delayMs 내 후속 호출은 pending 1회로 합산. `renderLeaderboardThrottled`, `renderMembersStripThrottled`가 onSnapshot 콜백에서 사용. `cleanupAllListenersOnUnload()`를 `window.addEventListener('beforeunload', ...)`에 등록. 부하 테스트: 20회 Firestore 업데이트 → renderLeaderboard 2회 호출 (90% 감소). monkey-patch 주의: `renderLeaderboardThrottled`는 생성 시 `renderLeaderboard` 원본 참조를 캡처하므로 이후 `window.renderLeaderboard` 교체가 throttle 내부 fn에 미치지 않음.
- **C4-7 재진입 패턴**: `fetchTournament`가 in_progress 시 데이터 반환(throw 안 함). `handleTournamentEntry`에서 in_progress → `handleInProgressTournamentEntry` 분기. 호스트 즉시 진입 / 기존 멤버 memberDoc.exists 체크 후 진입 / 신규 차단 alert. `subscribeTournamentStatusForRound` — 대기실 거치지 않은 재진입 시 completed 감지용 onSnapshot. `enterTournamentRound` 진입 시 `?t=코드` URL 갱신 (새로고침 복귀). `cleanupTournamentRoundListeners`에서 `roundTournamentStatusUnsub` 정리 + URL 정리. 대기실 onSnapshot의 `.orderBy('joinedAt')` 주의: joinedAt 없는 Firebase MCP 주입 멤버는 대기실에서 보이지 않음 (Firestore orderBy는 해당 필드 없는 문서 제외).

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

## 다음 작업 — C5 정모 종료 + 결과 화면

**C5 목표:**
1. 모든 멤버가 18홀 완료 시 자동 status: completed 전환 (클라이언트 감지 or Cloud Function)
2. 결과 화면 (화면 16): 최종 순위 + 우승자 하이라이트
3. 결과 단톡방 공유 (이미지 or 텍스트)
4. 호스트가 수동 종료 버튼 (강제 완료)

**C4-7에서 남긴 임시 처리:**
- completed 감지 시 alert "결과 화면은 C5 단계에서 추가됩니다." → C5에서 결과 화면으로 교체
- `subscribeTournamentStatusForRound`의 completed 분기에 결과 화면 진입 로직 추가 필요

---

## Playwright MCP 자동화 안정성 메모

- 세션 만료 시 Claude Code 재시작하면 MCP도 같이 재시작됨
- `browser_snapshot` 이 "browser has been closed" 에러 → Claude Code 재시작 필요
- 두 컨텍스트 동시 제어 어려우면 순차 처리 (호스트 셋업 완료 → 게스트 진입)
- **순수 함수(정렬·계산)는 Node.js 단위 테스트 우선** — Playwright보다 빠르고 정확, 브라우저 불필요
- 실 브라우저 필요한 부분만 Playwright (시각 확인 + 라이브 동기화 latency)

---

## 오늘 발견한 좋은 패턴

- **Node.js 단위 테스트로 순수 함수 검증**: `node -e "..."` 인라인 스크립트로 정렬 로직·Net 계산 즉시 검증 (C4-4/C4-5)
- **graceful degradation**: 팀 fetch 실패 시 `catch`에서 `renderLeaderboard()` 호출 → 개인 순위는 유지
- **race condition 처리**: teams fetch + members onSnapshot 완료 시점이 달라도 `leaderboardAllMembers.length > 0` 체크로 이중 렌더 방지
- **cleanup 함수에 모든 캐시 초기화**: `cleanupLeaderboardListener()`에 `leaderboardAllMembers = []` + `leaderboardTeams = []` — stale 데이터 방지
- **C5 결과 화면 진입 경로 3가지**: (1) `subscribeTournamentStatusForRound` completed 감지 → `enterTournamentResultScreen(data)`, (2) URL/코드로 completed 정모 진입 → `handleTournamentEntry` completed 분기, (3) 대기실 중 종료 감지 → waiting room onSnapshot completed 분기
- **C5 자동 종료 감지**: `renderLeaderboard()` 마지막에 `memberStats.every(s => s.completed)` 체크 + 호스트 여부 확인 + `autoEndConfirmShown` 플래그로 중복 방지. `showLeaderboardScreen()`에서 `autoEndConfirmShown = false` 리셋.
- **C5 결과 화면 데이터**: `enterTournamentResultScreen`에서 `cleanupLeaderboardListener` + `cleanupTournamentRoundListeners` 호출 후 members+teams one-shot fetch. `resultMembers[]`, `resultTeams[]`, `resultTournamentDoc` 캐시 사용.
- **handleEndTournament**: Firestore rules forward-only로 보호 — already-completed 정모에 write 시도하면 permission-denied. 정상 케이스에선 status: 'completed' 쓰면 onSnapshot 감지 → enterTournamentResultScreen.

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
