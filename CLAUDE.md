## 현재 상태

**F3 완료** (2026-05-05) — 정모 만들기→대기방→참여 흐름 전체 재스타일 (7 카드 구조, .field-group/.member-row/.code-display/.badge)
**F2.1 완료** (2026-05-05) — 메인 4액션 버튼 위계 도입 (그린 1개만)
**F2 완료** (2026-05-05) — 메인 화면 + 골프룰 카드 재스타일

**E 단계 전체 완료** (2026-05-05)

- E0 ✅ 보안 규칙 사전 정비 (eventWinners 멤버 update + notifications/messages 서브컬렉션)
- E1 ✅ 골프룰 이해 (GOLF_RULES_CARDS 7개 + 캐러셀 갤러리, 화면 25)
- E2 ✅ 게임 방식 선택 UI (gameType 필드 + 드롭다운)
- E3 ✅ 이벤트 홀 설정 UI (events[] 배열 + 화면 8/11/join)
- E4 ✅ 이벤트 홀 진행 UI (배너 + 위너 입력 모달 + onSnapshot)
- E5 ✅ 알림 자동 발행 + 라이브 티커 + 홀인원 폭죽
- E6 ✅ 결과 정산 + 알림 정리
- E7 ✅ Canvas 결과 공유 이미지
- E8 ✅ 대기방 채팅 (onSnapshot + 카카오 스타일 + 삭제 권한)

**배포 상태**: Firestore rules 배포 완료 (E5 — complete 타입 추가), GitHub Pages 미배포 (`app.js?v=f3`)

---

## 데이터 모델 (확정)

### tournaments/{id}
- `status`: `"waiting"` | `"in_progress"` | `"completed"` (forward-only, 규칙 강제)
- `hostId`, `name`, `courseName`, `date`, `gameMode`, `pars[]`, `maxMembers`, `teamCount`, `teamSize`, `tier`
- `gameType`: `"stroke"` | `"stableford"` | `"match"` | `"vegas"` (E2)
- `events[]`: `{id, type, holeNumber, prizeText, prizeAmount}` (E3; type: kp/longest/holeInOne)
- `eventWinners`: `{ eventId: array | object }` (E4; KP/롱기스트=배열, 홀인원=단일 객체)
- `gameWinnerPrizeText`, `gameWinnerPrizeAmount` (E6)
- `courseId`, `teeBoxId`, `teeBoxLabel`, `courseRating`, `slopeRating` (D4 캐시)
- `startedAt`, `completedAt`

### tournaments/{id}/teams/{teamId}
- `name`, `colorIndex` (1~10, TEAM_COLORS 상수로 HEX 매핑), `memberIds[]` (보조 캐시), `createdAt`

### tournaments/{id}/members/{userId}
- `teamId` (단일 출처), `name`, `handicapIndex`, `courseHandicap`
- `scores[]`, `putts[]`, `currentHole`, `completed`, `lastUpdatedAt`
- 프록시: `proxyMember:true`, `proxyHostId:<hostUid>`, memberId = `proxy_<ts36><rand4>`

### tournaments/{id}/notifications/{id}
- `type` (7종: birdie/eagle/albatross/ace/skin_win/event_win/complete)
- `userId`, `userName`, `holeNumber`, `createdAt`, `extra?`

### tournaments/{id}/messages/{id}
- `userId`, `userName`, `text` (1~500자), `sentAt`

### courses/{id}
- `name`, `nameLower`, `city`, `cityLower`, `holes` (9/18/27), `addedBy`, `usageCount`, `addedAt`

### courses/{id}/teeBoxes/{teeId}
- `pars[18]`, `yardages[18]`, `courseRating`, `slopeRating`, `totalPar`, `totalYardage`, `color`, `label`

---

## 보안 규칙 결정 로그

- **옵션 B 기본**: 인증 사용자 읽기 가능, 쓰기는 권한 제한
- **status forward-only** (C3-5): waiting→in_progress→completed 단방향만 허용
- **teams**: 호스트만 write, status!="completed" 조건
- **D1 courses**: addedBy 잠금. teeBoxes는 addedBy만 write. usageCount 일반 update 잠금.
- **D7-1 usageCount increment-only**: 케이스 A(등록자 일반 수정, usageCount 잠금) + 케이스 B(누구나 +1만 허용)
- **D7-3 reports**: 본인만 read/update/delete, 누구나 create (reporterId==본인, handled=false, reason 1~500자)
- **D8 members create 프록시**: `userId.matches("proxy_.+")` + `proxyMember==true` + `proxyHostId==auth.uid` + status!="completed". update/delete는 기존 호스트 권한 그대로.
- **E0 eventWinners**: 멤버가 eventWinners 필드만 update (`diff().affectedKeys().hasOnly(['eventWinners'])` + exists() 멤버십 검증)
- **E0 notifications**: 멤버만 read/create. create: userId==auth.uid + status!="completed" + type 6종 enum + holeNumber 1~18. update 금지, 삭제 호스트만.
- **E0 messages**: 멤버만 read/create. create: userId==auth.uid + status!="completed" + text 1~500자. update 금지, 삭제 호스트 또는 본인.
- **E5**: notifications type enum에 `complete` 추가 (E0 누락). 배포 완료. 이후 변경 없음.

---

## 진행 원칙

- 마일스톤 잘게 쪼개기 + 각 단계마다 Node.js 단위 테스트 → Playwright 시각 확인 → Firebase MCP 검증
- `.hidden { display: none !important; }` 패턴 필수 (나중에 오는 `display: flex`에 덮임)
- 호스트성 액션 추가 시 `canUserHostTournament()` 가드 필수
- `showScreen(screenMain)` 진입 시 `renderMyCoursesList()` 자동 호출 (D2부터)
- Firestore 서브컬렉션 write 보안 규칙에 `get(parent)` 검사 있을 경우 → 부모 문서 먼저 쓰고 서브컬렉션은 그다음 단계 (D2 교훈)
- 사용자 행동 카운터는 increment-only 보안 규칙 패턴. silent fail로 메인 흐름 막지 않음.
- 모든 D 단계는 자유 입력 fallback 유지. courseId=null 케이스가 끝까지 작동해야 함.
- 새 onSnapshot 추가 시 cleanup 함수 반드시 같이 작성. `leaveTournament*` 경로 모두 체크.
- 새 배지/UI 추가 시 다른 모드 진입 시 숨김 처리도 같이 (renderSharedModeUI B6 분기 사례)
- 보안 규칙 변경은 별도 세션 권장 (코드 동작 검증 후 `firebase deploy --only firestore:rules`)
- 순수 함수(정렬·계산)는 Node.js 단위 테스트 우선 — Playwright보다 빠르고 정확
- GitHub Pages CDN 캐시 2분 지연 → CSS/JS 변경 시 `?v=XXX` query param 필수
- 호스트 정모 진행 중 메인 복귀 금지. 일시 이탈은 `?t=코드` URL 새로고침으로 복귀.

---

## 핵심 코드 패턴

### C 단계

- **sync**: 정모 라운드 = `scheduleSyncMyScoreToTournament()` (500ms debounce) / 홀 이동 = 즉시. `currentRound.tournamentId` 유무로 정모/비정모 분기 (isShared만으론 부족).
- **throttle**: `createThrottle(fn, delayMs)` — 첫 호출 즉시 + delayMs 내 후속은 pending 1회. 생성 시 원본 fn 캡처 → 이후 window 교체 무효.
- **onSnapshot cleanup**: `cleanupTournamentRoundListeners()` — 모든 unsub + flushAndClear + 상태 초기화 통합. `leaveTournament*` 모든 경로.
- **재진입**: `handleInProgressTournamentEntry` — 호스트 즉시 / 기존 멤버 memberDoc.exists / 신규 차단. `subscribeTournamentStatusForRound`로 completed 감지.
- **자동 종료 감지**: `renderLeaderboard()` 끝에 `memberStats.every(s => s.completed)` + 호스트 여부 + `autoEndConfirmShown` 플래그.
- **C5 결과 진입 3경로**: subscribeTournamentStatusForRound completed / URL 직접 / 대기실 종료 감지.

### D 단계

- **D3 자동완성**: `searchCourses(q)` — nameLower + cityLower prefix 쿼리 → 클라이언트 머지/dedupe → usageCount DESC > nameLower ASC, top 5. 자동 티박스: white > blue > black > gold > red > other > 첫번째.
- **D4 티박스**: `selectedCourseForTournament.autoSelectedTeeBox` 단일 출처. `switchTeeBox(teeId)` — autoSelectedTeeBox 갱신 + 파 재채움 + 배지 갱신. tournament 본 문서에 5개 필드 캐시 (게스트 추가 fetch 불필요).
- **D4 핸디 분기**: courseId + slopeRating + courseRating 전부 → USGA WHS (`HI × Slope/113 + Rating - Par`), 빠지면 `Math.round(HI)` fallback.
- **D5 헬퍼**: `calculateMemberCourseHandicapFromTournament(HI, tournament)`. `tournamentHasAccurateHandicapInfo()` — ✨/⚠️ 배지용.
- **D6 격리**: `selectedCourseForTournament` vs `selectedCourseForRound` 완전 분리. `pendingReturnToTournamentCreate` vs `pendingReturnToRoundCreate` 플래그.
- **D7-1**: `incrementCourseUsageCount(courseId)` — silent fail. 게스트 join 시 호출 안 함 (인기도 왜곡 방지).
- **D8 프록시**: `getActiveInputData()` / `commitActiveInputChange()` 추상화. `proxyScoreCache{}` + `proxySyncTimers{}` per-proxyId 독립 debounce. `getMyProxyMembers()` — leaderboardAllMembers 필터.

### E 단계

- **E1 캐러셀**: `_swipeSetup` 플래그 (중복 방지). `buildGolfRuleIndicators()` — `container.children.length === total` 체크. dot: `width:10px !important; padding:0 !important; border-radius:50%` (전역 button 오버라이드).
- **E3**: `pendingTournamentEvents` in-memory. `validateEventHole(type, holeNumber, pars)` — pars=[] fallback true. `showToast` — `#toast-notification` 동적 생성, `_timer` 프로퍼티로 연속 호출 취소.
- **E4**: `eventWinners` map — KP/롱기스트=배열, 홀인원=단일 객체 `{achieved,userId,userName,inputBy,inputAt}`. `arrayUnion` 동시 입력 안전. pop = read-modify-write. `inputAt: Date.now()` (arrayUnion 내 serverTimestamp 미지원). `btn-sm { width: auto !important }`.
- **E5**: `detectScoreNotification` → `lastNotifiedScores {userId_hole: bestType}` dedupe. 이벤트 알림: 등록자 uid → userId, 위너 이름 → userName (보안 규칙 통과 + 표시 정확성). `tickerQueue[]` max 10, 8초 순환. 홀인원 폭죽: z-index:9999, 3초 auto-hide, `initialLoadDone` 플래그로 초기 로드 스킵.
- **E6 정산**: `winner = amount*(M-1)/(K*M)`, `non-winner = -amount*(M-1)/(M*(M-K))`. M=전체 인원, K=공동우승수. 홀인원 정산 제외. `calculateSettlement(tournament, memberStats, isNetMode)`.
- **E7 Canvas**: `IMG_W=1080`, `imgText/imgRoundedRect/imgDivider` 헬퍼 (ctx.save/restore). `calcImageHeight = min(1800, 1350+max(0,events.length-1)*100)`. 정산표 이미지 미포함(카톡 단체 공개 부적합). `closeShareModal`: revokeObjectURL + src='' + blob=null.
- **E8 채팅**: `subscribeChatMessages` — orderBy sentAt desc, limit 50, reverse(). `groupConsecutiveMessages` — same userId + ≤60,000ms + 둘다 sentAt truthy = 같은 그룹 (null sentAt = falsy → 시간 비교 스킵 → 같은 userId면 같은 그룹). 빈 상태: `createElement` 동적 생성 (innerHTML clear 후 detach 방지). `_chatSetup` 플래그. 600ms longpress + contextmenu prevent. 1초 send cooldown.
- **module-scoped let 테스트 우회**: window에서 접근 불가 → 순수 함수 직접 호출 or DOM 결과로 간접 검증 (E3~E8 공통).

---

## C 단계 회고 (2026-05-04)

5단계 분할 (C1 정모 생성·진입, C2 대기실·참여, C3 팀 배정, C4 라이브 7단계, C5 종료). 38 커밋, ~4,500줄.

핵심 성과: status forward-only Firestore 규칙으로 이미-종료 정모 재쓰기 permission-denied 자동 보호. 40명 cap: 50개 DOM 행 0.6ms 렌더링. 1초 throttle: 20회 onSnapshot → 2회 render (90% 감소). 게스트 스코어 → 호스트 리더보드 ~1초. 검증 3종 패턴 확립: Node.js 순수 함수 / Playwright 시각 확인 / Firebase MCP 데이터 주입.

---

## D 단계 회고 (2026-05-05)

9개 sub (D0, D8, D1~D7). D0(게이팅 구조) → D8(프록시 멤버) → D1~D6(골프장 DB) → D7(데이터 품질) 순.

- **D0**: `canUserHostTournament()` stub 도입. 현재 항상 true, 추후 유료 게이팅.
- **D1**: courses + teeBoxes 신규. addedBy 잠금, usageCount 잠금.
- **D2**: createCourseWithTeeBoxes 2-step 필수 (동시 batch 시 get(parent) 실패). fetchMyCourses: where('addedBy') + 클라이언트 정렬 (orderBy 복합 인덱스 회피).
- **D3**: prefix 쿼리 + 클라이언트 머지/dedupe. white>blue>black>gold>red>other 자동 선택.
- **D4**: 티박스 정보를 tournament 본 문서에 캐시 (게스트 추가 fetch 불필요). 자유 입력 fallback 유지.
- **D5**: `calculateMemberCourseHandicapFromTournament` 단일 헬퍼. ✨/⚠️ 배지. join 화면 티박스 정보 행.
- **D6**: selectedCourseForTournament vs selectedCourseForRound 완전 격리. rounds 본 문서에도 5개 필드 저장.
- **D7**: usageCount increment-only (케이스 A+B). reports 서브컬렉션. courseDetailReturnTarget 3경로.
- **D8**: 프록시 멤버 독립 currentHole. 실사용 후 호스트 기준 공유로 변경 검토 필요 (마이그레이션 불필요).

---

## E 단계 회고 (2026-05-05)

- **E0**: 보안 규칙만. diff().affectedKeys().hasOnly 패턴. notifications update 금지(불변). type 6종 확정.
- **E1**: GOLF_RULES_CARDS 7개 정적 배열. _swipeSetup + children.length 중복 방지 패턴. dot !important 오버라이드(전역 button 충돌).
- **E2**: gameType + getGameTypeLabel() fallback "스트로크 플레이". 기존 정모 undefined backward compat.
- **E3**: events[] in-memory pendingTournamentEvents. validateEventHole 순수 함수(pars=[] fallback). 골프장/티박스 변경 시 자동 검증·삭제·토스트.
- **E4**: arrayUnion 동시 입력 안전. pop = read-modify-write. inputAt: Date.now() (arrayUnion 내 serverTimestamp 미지원 함정). escapeHtml() XSS 방지.
- **E5**: detectScoreNotification 타입 우선순위. event_win: 등록자 uid + 위너 userName(보안 규칙 mismatch 해결). complete 타입 E0 누락 → E5 배포.
- **E6**: 정산 공식 `amount*(M-1)/(K*M)` 역산 도출. 홀인원 정산 제외(축하 목적). cleanupTournamentNotifications silent fail.
- **E7**: Canvas 메모리 전용(DOM 추가 불필요). 정산표 미포함(카톡 단체 공개 부적합). blob URL 반드시 revokeObjectURL.
- **E8**: groupConsecutiveMessages null sentAt → 같은 userId면 같은 그룹(freshly sent 처리). 빈 상태 createElement 동적 생성(innerHTML clear 후 getElementById 실패 방지). 보안 규칙 변경 0건(E0에서 이미 배포).

---

## F 단계 디자인 결정 로그

- **F2 원칙**: 그린 면적 자제(Golf Canada 톤) — 텍스트/배경 area fill 금지, 버튼/숫자/배지에만 green accent.
- **F2 헤더**: 48px→26px 미니멀. 프로필 HCP = `<span class="metric-large">` 큰 숫자 단독 표시.
- **F2.1 버튼 3단계**: `.btn-primary` 1개만(정모 참여), `.btn-outline`(새 라운드/골프장 등록), `.btn-ghost`(골프룰). `.card > button { margin-bottom: 0 }` 글로벌 12px 상쇄.
- **F3 카드 구조**: 정모 만들기 7개 섹션(기본정보/골프장&티박스/게임설정/팀구성/이벤트홀/게임상금/파정보). `<section class="card">` + `card-title` 헤더.
- **F3 .field-group**: label(secondary색, small, medium-weight) + input/select 묶음. 섹션 내부 간격 담당.
- **F3 .member-row**: 대기방 멤버 행. `.is-me`=accent-light bg + 2px green border, `.is-host`=warning-light bg, `.is-host.is-me`=135deg 그라디언트.
- **F3 .code-display**: 36px bold 모노스페이스, letter-spacing 0.1em, card bg. 대기방 코드 + 생성 완료 코드 공유.
- **F3 .badge**: inline-block, pill shape. `.badge-accent`(green), `.badge-warning`(yellow), `.badge-muted`(gray). 호스트/프록시 배지에 적용.
- **F3 CSS specificity**: `section.team-config-section`(0,1,1) > `.card`(0,1,0) → `.team-config-section` margin을 `margin-bottom`만으로 제한.

---

## 비즈니스 모델 메모

- 호스트성 액션 = 미래 유료/구독 후보: 정모 만들기, 프록시 멤버 추가
- 영구 무료 = 개인 라운드, 정모 참여(게스트), B6 1:1 공유
- `canUserHostTournament()` / `canUserCreateRound()` — 현재 항상 true. 위치: `app.js` `calculateCourseHandicap` 직전.

---

## 미래 작업 (미처리)

**D7 신고 자동 검증**: "3명 이상 사용 시 자동 검증" + 관리자 도구. 신고 누적 시 별도 단계.

**D7 골프장 정보 수정 UI**: 등록자가 이름/티박스 직접 수정. 현재 신고/삭제만 가능.

**D8 설계 재검토**: 멤버별 독립 currentHole → 실사용 후 (A) 호스트 기준 공유로 변경 검토. 마이그레이션 불필요(Firestore 데이터 형태 동일).

**createTournament 호스트 핸디 분기 통합**: D4 인라인 분기 → `calculateMemberCourseHandicapFromTournament`로 통일. D5에서 회귀 위험으로 분리 유지.

**호스팅 이전 — GitHub Pages → Firebase Hosting**: Firebase Hosting 셋업 + firebase-config.js GitHub Actions 주입 + 도메인 제한 갱신(jeongmo-app.web.app 추가, mp9344-crypto.github.io 제거). **현재 API 키 도메인 제한** (2026-05-03): 127.0.0.1 / localhost / jeongmo-app.firebaseapp.com / mp9344-crypto.github.io

**다국어 지원 (i18n)**: 한국어 안정화 + 외국 친구 needs 발생 시. data-i18n + translations.js, 예상 200~300 항목. 영어 → 일본어 순.

---

## 알려진 함정 / 회귀 방지

- `display: flex`가 `.hidden { display: none !important; }` 덮지 못하게 → `!important` 필수
- 전역 `button { width: 100%; padding: 20px }` → flex row 내 버튼은 `width: auto !important` 오버라이드 필요 (`btn-sm`, `chat-send-btn`, `golf-rule-arrow`, `golf-rule-dot` 사례)
- `arrayUnion` 내부 serverTimestamp() 미지원 → `Date.now()` 사용
- module-scoped `let` 변수는 window에서 접근 불가 → 순수 함수 분리 또는 DOM 간접 검증
- `container.innerHTML = ''` 후 기존 element reference 사용 금지 (detach 후 getElementById null 반환)
- Firestore orderBy: 해당 필드 없는 문서 제외 (joinedAt 없는 MCP 주입 멤버 대기실 미표시)
- onSnapshot seenIds Set: removed change로 기처리 문서 재처리 방지
- `renderLeaderboardThrottled` 생성 시 원본 fn 캡처 — 이후 window 교체 무효
- Playwright: 3초 CSS animation → screenshot 타이밍에 따라 미표시. evaluate로 DOM 상태 직접 확인.
- `card > button { margin-bottom: 0 }` 필수: 전역 `button { margin-bottom: 12px }`가 카드 내부 버튼에 적용되어 하단 여백 이중 발생.
- `.golf-rule-arrow` 투명 배경 적용 시 `!important` 필수: 전역 `button { background-color: accent }`가 이길 수 있음.
- **카드 안 grid/flex**: 항상 `minmax(0, 1fr)` + `min-width: 0` 안전 패턴. 카드 padding이 사용 가능 폭을 줄여 9칸/10칸 그리드가 줄바꿈되는 함정 (F3.1 18홀 파/거리 입력).
- **flex 자식 텍스트 ellipsis**: `min-width: 0` 명시 필수. flex 기본값 `min-width: auto`가 콘텐츠 길이를 따라가서 ellipsis 무효화 (F3.1 자동완성 결과 카드).
- **전역 `button { width: 100% }` grid/flex 함정**: 카드 안 작은 버튼은 `width: auto !important` 명시. 누적 셀렉터 (`.btn-sm`, `.chat-send-btn`, `.golf-rule-arrow`, `.golf-rule-dot`, `.course-result-select` 등).
- **카드 padding 계산**: 모바일 480px − 카드 padding(16px×2) = 448px. 9칸 + 8gap이 들어가야 함. 비표준 padding 도입 시 수동 검증 필수.
- **grid 안에 라벨 두지 말 것**: 라벨 + 9칸 input을 같은 grid에 넣으면 10칸이 되어 줄바꿈. 라벨은 grid 밖 wrapper(`.par-row`)에, grid는 input만 (F3.1).
- **OS 네이티브 컴포넌트 한계**: `input[type="date"]` 팝업, `<select>` 펼침, `prompt/alert/confirm`은 CSS 제어 불가. 필요 시 G에서 라이브러리 도입 검토 (Flatpickr 등). PRD 4.6 정책 재검토 필요.

---

## F 단계 디자인 결정 로그

### F2 (메인 + 골프룰) — 2026-05-05

- 헤더: `h1` 48px → 26px, padding 20px → var(--space-sm), 부제 `.label-muted` 적용 (uppercase + letter-spacing)
- 프로필 카드: HCP 숫자를 `.metric-large`(32px 굵은 녹색)로 분리. `profile-hcp-block` + `.label-muted "HCP"` 레이블. `profileHandicapDisplay` JS 텍스트 → 숫자만 ("--" / "12.0")으로 단순화. 카드에 border + shadow-lg (elevated).
- 메인 액션 4개 (`btn-new-round`, `btn-join-by-code`, `btn-register-course`, `btn-golf-rules`): 각각 `<div class="card">` 래퍼 + `.btn-primary` 클래스로 동일 위계. `btn-continue-round`는 JS가 button 자체 hidden 토글하므로 card 래퍼 사용 불가 → 독립 유지.
- 내 골프장 섹션: `<section>` 에 `card` 클래스 추가. `my-course-item` hover 시 border-color → accent.
- 골프룰 카드: border + shadow-md 추가. `.golf-rule-arrow` → 투명 배경 + 녹색 텍스트 + 회색 border, hover 시 accent-light 배경. `.golf-rule-dot` 비활성 → `border-strong` + `scale(0.6)` (시각 6px), 활성 → `scale(1.0)` (실 10px).
- 신규 클래스 8개 (style.css 라인 3545~): `.card`, `.card-elevated`, `.card-header`, `.card-title`, `.card-meta`, `.btn-primary`, `.metric-large`, `.label-muted`
- 전역 `button { ... }` 셀렉터 보존 (F6 마이그레이션 예정)
- 그린 액센트 정책: 버튼/숫자/배지에만. 카드 배경은 흰색.

### F2.1 (메인 4액션 위계) — 2026-05-05

- **그린 면적 1개 원칙**: 화면당 Primary(그린 채움)는 1개. 나머지는 Outline 또는 Ghost.
- 새 라운드 시작 → `.btn-outline` (흰 배경 + 1.5px 녹색 보더 + 녹색 텍스트)
- 정모/공유 코드로 참여 → `.btn-primary` 유지 (유일한 그린 채움)
- 골프장 등록 → `.btn-outline`
- 골프룰 이해 → `.btn-ghost` (흰 배경 + 회색 보더 + 진회색 텍스트)
- 신규 클래스 2개 추가: `.btn-outline`, `.btn-ghost` (각각 `margin-bottom: 0` 포함)
- 이 위계 패턴(Primary 1 / Outline / Ghost)을 F3~F5 화면에도 동일 적용 예정
- 캐시 버스트: `?v=f2_1`
