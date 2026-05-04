// =========================================
// Firebase 초기화 + 익명 로그인 (2단계 B)
// =========================================

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

auth.signInAnonymously()
    .then(function(result) {
        currentUser = result.user;
        console.log('✅ 익명 로그인 성공');
        console.log('   User ID:', currentUser.uid);
    })
    .catch(function(error) {
        console.error('❌ 익명 로그인 실패:', error.code, error.message);
        alert('Firebase 연결 실패. 인터넷 연결을 확인하세요.');
    });

auth.onAuthStateChanged(function(user) {
    if (user) {
        currentUser = user;
        console.log('🔐 로그인 상태 확인됨:', user.uid);
    } else {
        currentUser = null;
        console.log('🚪 로그아웃 상태');
    }
});

// =========================================
// 화면 요소 가져오기
// =========================================
const screenMain = document.getElementById('screen-main');
const screenModeSelect = document.getElementById('screen-mode-select');
const screenShareLink = document.getElementById('screen-share-link');
const screenJoinRound = document.getElementById('screen-join-round');
const screenNewRound = document.getElementById('screen-new-round');
const screenTournamentCreate = document.getElementById('screen-tournament-create');
const screenTournamentLink = document.getElementById('screen-tournament-link');
const screenTournamentJoin = document.getElementById('screen-tournament-join');
const screenTournamentWaiting = document.getElementById('screen-tournament-waiting');
const screenTeamAssignment = document.getElementById('screen-team-assignment');
const screenHoleInput = document.getElementById('screen-hole-input');
const screenLeaderboard = document.getElementById('screen-leaderboard');
const screenTournamentResult = document.getElementById('screen-tournament-result');
const screenResult = document.getElementById('screen-result');
const screenProfile = document.getElementById('screen-profile');
const screenAddProxyMember = document.getElementById('screen-add-proxy-member');

const allScreens = [
    screenMain,
    screenModeSelect,
    screenShareLink,
    screenJoinRound,
    screenNewRound,
    screenTournamentCreate,
    screenTournamentLink,
    screenTournamentJoin,
    screenTournamentWaiting,
    screenTeamAssignment,
    screenHoleInput,
    screenResult,
    screenLeaderboard,
    screenTournamentResult,
    screenProfile,
    screenAddProxyMember
];

// 메인 화면 - 프로필 카드
const profileNameDisplay = document.getElementById('profile-name-display');
const profileHandicapDisplay = document.getElementById('profile-handicap-display');
const btnEditProfile = document.getElementById('btn-edit-profile');

// 메인 화면 - 통계
const statTotalRounds = document.getElementById('stat-total-rounds');
const statAverageScore = document.getElementById('stat-average-score');
const statBestScore = document.getElementById('stat-best-score');

// 메인 화면 - 과거 라운드 목록
const pastRoundsList = document.getElementById('past-rounds-list');

// 메인/새 라운드 화면
const btnNewRound = document.getElementById('btn-new-round');
const btnContinueRound = document.getElementById('btn-continue-round');
const btnStartRound = document.getElementById('btn-start-round');
const btnCancelNewRound = document.getElementById('btn-cancel-new-round');
const btnLoadPrevious = document.getElementById('btn-load-previous');
const inputCourseName = document.getElementById('input-course-name');
const parInputsFront = document.getElementById('par-inputs-front');
const parInputsBack = document.getElementById('par-inputs-back');

// 모드 선택 화면 (2단계 B)
const btnModePersonal = document.getElementById('btn-mode-personal');
const btnModeShared = document.getElementById('btn-mode-shared');
const btnModeTournament = document.getElementById('btn-mode-tournament');
const btnCancelModeSelect = document.getElementById('btn-cancel-mode-select');

// 메인 - 코드 입력 진입점 (2단계 C)
const btnJoinByCode = document.getElementById('btn-join-by-code');

// 정모 만들기 화면 (2단계 C)
const inputTournamentName = document.getElementById('input-tournament-name');
const inputTournamentCourse = document.getElementById('input-tournament-course');
const inputTournamentDate = document.getElementById('input-tournament-date');
const selectTournamentGameMode = document.getElementById('select-tournament-game-mode');
const tournamentGameModeHint = document.getElementById('tournament-game-mode-hint');
const selectTeamCount = document.getElementById('select-team-count');
const selectTeamSize = document.getElementById('select-team-size');
const memberCountDisplay = document.getElementById('member-count-display');
const memberCountWarning = document.getElementById('member-count-warning');
const tournamentParInputsFront = document.getElementById('tournament-par-inputs-front');
const tournamentParInputsBack = document.getElementById('tournament-par-inputs-back');
const btnCreateTournament = document.getElementById('btn-create-tournament');
const btnCancelTournamentCreate = document.getElementById('btn-cancel-tournament-create');

// 정모 코드/링크 화면 (2단계 C - C1-3)
const tournamentNameDisplayOnLink = document.getElementById('tournament-name-display-on-link');
const tournamentMetaDisplay = document.getElementById('tournament-meta-display');
const tournamentCodeDisplay = document.getElementById('tournament-code-display');
const tournamentLinkDisplay = document.getElementById('tournament-link-display');
const btnCopyTournamentLink = document.getElementById('btn-copy-tournament-link');
const btnCopyTournamentCode = document.getElementById('btn-copy-tournament-code');
const tournamentCopyFeedback = document.getElementById('tournament-copy-feedback');
const tournamentCodeCopyFeedback = document.getElementById('tournament-code-copy-feedback');
const tournamentLinkMembersList = document.getElementById('tournament-link-members-list');
const btnGoToWaitingRoom = document.getElementById('btn-go-to-waiting-room');
const btnBackToMainFromTournamentLink = document.getElementById('btn-back-to-main-from-tournament-link');

// 정모 참여 확인 화면 (2단계 C - C2-2)
const tournamentJoinLoading = document.getElementById('tournament-join-loading');
const tournamentJoinInfoCard = document.getElementById('tournament-join-info-card');
const tournamentJoinName = document.getElementById('tournament-join-name');
const tournamentJoinCode = document.getElementById('tournament-join-code');
const tournamentJoinCourse = document.getElementById('tournament-join-course');
const tournamentJoinDate = document.getElementById('tournament-join-date');
const tournamentJoinHost = document.getElementById('tournament-join-host');
const tournamentJoinMode = document.getElementById('tournament-join-mode');
const tournamentJoinMemberCount = document.getElementById('tournament-join-member-count');
const tournamentJoinMyProfile = document.getElementById('tournament-join-my-profile');
const tournamentJoinMyName = document.getElementById('tournament-join-my-name');
const tournamentJoinMyHandicapRow = document.getElementById('tournament-join-my-handicap-row');
const tournamentJoinMyHandicap = document.getElementById('tournament-join-my-handicap');
const tournamentJoinMyCourseHandicapRow = document.getElementById('tournament-join-my-course-handicap-row');
const tournamentJoinMyCourseHandicap = document.getElementById('tournament-join-my-course-handicap');
const tournamentJoinError = document.getElementById('tournament-join-error');
const tournamentJoinErrorMessage = document.getElementById('tournament-join-error-message');
const btnConfirmTournamentJoin = document.getElementById('btn-confirm-tournament-join');
const btnCancelTournamentJoin = document.getElementById('btn-cancel-tournament-join');

// 정모 대기실 화면 (2단계 C - C2-3)
const waitingTournamentName = document.getElementById('waiting-tournament-name');
const waitingTournamentMeta = document.getElementById('waiting-tournament-meta');
const waitingCodeDisplay = document.getElementById('waiting-code-display');
const btnCopyWaitingCode = document.getElementById('btn-copy-waiting-code');
const waitingCodeCopyFeedback = document.getElementById('waiting-code-copy-feedback');
const waitingLinkSection = document.getElementById('waiting-link-section');
const waitingLinkDisplay = document.getElementById('waiting-link-display');
const btnCopyWaitingLink = document.getElementById('btn-copy-waiting-link');
const waitingLinkCopyFeedback = document.getElementById('waiting-link-copy-feedback');
const waitingMembersCount = document.getElementById('waiting-members-count');
const waitingMembersList = document.getElementById('waiting-members-list');
const waitingHostNotice = document.getElementById('waiting-host-notice');
const waitingGuestNotice = document.getElementById('waiting-guest-notice');
const btnGoToTeamAssignment = document.getElementById('btn-go-to-team-assignment');
const btnAddProxyMember = document.getElementById('btn-add-proxy-member');
const btnLeaveTournament = document.getElementById('btn-leave-tournament');
const btnCancelTournament = document.getElementById('btn-cancel-tournament');

// D8: 수동 멤버 추가 모달
const inputProxyName = document.getElementById('input-proxy-name');
const inputProxyHandicap = document.getElementById('input-proxy-handicap');
const btnConfirmAddProxy = document.getElementById('btn-confirm-add-proxy');
const btnCancelAddProxy = document.getElementById('btn-cancel-add-proxy');

// 팀 배정 화면 (2단계 C - C3)
const teamAssignmentMeta = document.getElementById('team-assignment-meta');
const teamAssignmentMemberCount = document.getElementById('team-assignment-member-count');
const teamAssignmentSelection = document.getElementById('team-assignment-selection');
const selectedMemberName = document.getElementById('selected-member-name');
const btnCancelSelection = document.getElementById('btn-cancel-selection');
const teamAssignmentStatus = document.getElementById('team-assignment-status');
const teamCardsGrid = document.getElementById('team-cards-grid');
const btnBackToWaitingFromTeams = document.getElementById('btn-back-to-waiting-from-teams');
const btnAutoAssignRandom = document.getElementById('btn-auto-assign-random');
const btnAutoAssignBalanced = document.getElementById('btn-auto-assign-balanced');
const roundStartStatus = document.getElementById('round-start-status');
const btnStartRoundFromTeams = document.getElementById('btn-start-round-from-teams');

// 공유 링크 화면 (2단계 B)
const shareCodeDisplay = document.getElementById('share-code-display');
const shareLinkDisplay = document.getElementById('share-link-display');
const btnCopyLink = document.getElementById('btn-copy-link');
const copyFeedback = document.getElementById('copy-feedback');
const shareMembersList = document.getElementById('share-members-list');
const btnStartSharedRound = document.getElementById('btn-start-shared-round');
const btnCancelSharedRound = document.getElementById('btn-cancel-shared-round');

// 참여 확인 화면 (2단계 B - B5)
const joinShareCode = document.getElementById('join-share-code');
const joinCourseName = document.getElementById('join-course-name');
const joinHostName = document.getElementById('join-host-name');
const joinMemberCount = document.getElementById('join-member-count');
const joinInfoCard = document.getElementById('join-info-card');
const joinLoading = document.getElementById('join-loading');
const joinError = document.getElementById('join-error');
const joinErrorMessage = document.getElementById('join-error-message');
const btnConfirmJoin = document.getElementById('btn-confirm-join');
const btnCancelJoin = document.getElementById('btn-cancel-join');

// 게임 모드 선택
const selectGameMode = document.getElementById('select-game-mode');
const gameModeHint = document.getElementById('game-mode-hint');
const netInfoBox = document.getElementById('net-info-box');
const displayCourseHandicap = document.getElementById('display-course-handicap');

// 홀 입력 화면
const courseNameDisplay = document.getElementById('course-name-display');
const holeProgress = document.getElementById('hole-progress');
const cumulativeScore = document.getElementById('cumulative-score');
const holeInfo = document.getElementById('hole-info');
const scoreDisplay = document.getElementById('score-display');
const btnScoreMinus = document.getElementById('btn-score-minus');
const btnScorePlus = document.getElementById('btn-score-plus');
const btnPrevHole = document.getElementById('btn-prev-hole');
const btnNextHole = document.getElementById('btn-next-hole');
const btnGoToLeaderboard = document.getElementById('btn-go-to-leaderboard');
const leaderboardMeta = document.getElementById('leaderboard-meta');
const leaderboardModeBadge = document.getElementById('leaderboard-mode-badge');
const leaderboardStatus = document.getElementById('leaderboard-status');
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardTeamList = document.getElementById('leaderboard-team-list');
const btnBackToRoundFromLeaderboard = document.getElementById('btn-back-to-round-from-leaderboard');
const btnEndTournament = document.getElementById('btn-end-tournament');

// C5: 정모 결과 화면 (화면 16)
const resultTournamentMeta = document.getElementById('result-tournament-meta');
const resultWinnerName = document.getElementById('result-winner-name');
const resultWinnerScore = document.getElementById('result-winner-score');
const resultRankingsList = document.getElementById('result-rankings-list');
const resultTeamSectionTitle = document.getElementById('result-team-section-title');
const resultTeamRankingsList = document.getElementById('result-team-rankings-list');
const resultMyScorecard = document.getElementById('result-my-scorecard');
const btnResultBackToMain = document.getElementById('btn-result-back-to-main');

// 퍼팅 입력
const puttsDisplay = document.getElementById('putts-display');
const btnPuttsMinus = document.getElementById('btn-putts-minus');
const btnPuttsPlus = document.getElementById('btn-putts-plus');

// ★ B6 신규: 멤버 미니 스트립 (홀 입력 화면)
const membersStrip = document.getElementById('members-strip');
const sharedModeBadge = document.getElementById('shared-mode-badge');

// 결과 화면
const resultScreenTitle = document.getElementById('result-screen-title');
const resultCourseName = document.getElementById('result-course-name');
const resultDate = document.getElementById('result-date');
const resultTotalScore = document.getElementById('result-total-score');
const resultOverUnder = document.getElementById('result-over-under');
const resultFrontNine = document.getElementById('result-front-nine');
const resultBackNine = document.getElementById('result-back-nine');
const countEagle = document.getElementById('count-eagle');
const countBirdie = document.getElementById('count-birdie');
const countPar = document.getElementById('count-par');
const countBogey = document.getElementById('count-bogey');
const countDoublePlus = document.getElementById('count-double-plus');
const scorecardFront = document.getElementById('scorecard-front');
const scorecardBack = document.getElementById('scorecard-back');
const btnBackToMainFromResult = document.getElementById('btn-back-to-main-from-result');
const btnDeleteRound = document.getElementById('btn-delete-round');

// 결과 화면 게임 모드/Net/퍼팅
const resultGameModeBadge = document.getElementById('result-game-mode-badge');
const resultNetSection = document.getElementById('result-net-section');
const resultHandicapDisplay = document.getElementById('result-handicap-display');
const resultNetScore = document.getElementById('result-net-score');
const resultNetOverUnder = document.getElementById('result-net-over-under');
const puttsStatsSection = document.getElementById('putts-stats-section');
const puttsTotal = document.getElementById('putts-total');
const puttsAverage = document.getElementById('putts-average');
const puttsOne = document.getElementById('putts-one');
const puttsThreePlus = document.getElementById('putts-three-plus');
const puttsCoverageNote = document.getElementById('putts-coverage-note');

// 프로필 화면
const inputProfileName = document.getElementById('input-profile-name');
const inputHandicapIndex = document.getElementById('input-handicap-index');
const btnSaveProfile = document.getElementById('btn-save-profile');
const btnCancelProfile = document.getElementById('btn-cancel-profile');

// =========================================
// 전역 상태
// =========================================
let currentRound = null;
let currentRoundMode = null;       // 'personal' 또는 'shared'
let currentSharedRoundId = null;   // 현재 공유 라운드 코드 (예: "ABC123")
let pendingJoinCode = null;        // B5: URL에서 추출한 참여 대기 코드
let pendingJoinData = null;        // B5: Firestore에서 가져온 라운드 정보
let viewingPastRoundId = null;

// ★ B6 신규: 실시간 동기화 상태
let allMembersData = {};           // { userId: { name, scores, putts, currentHole, ... } }
let roundUnsubscribe = null;       // 라운드 문서 리스너 해제 함수
let membersUnsubscribe = null;     // 멤버 컬렉션 리스너 해제 함수
let scoreSyncTimer = null;         // 디바운스 타이머 (B6 공유 라운드)
let tournamentScoreSyncTimer = null; // 디바운스 타이머 (C4-2 정모 라운드)
// C4-3: 정모 라운드 본인 팀 멤버 onSnapshot unsub + 팀 ID 캐시
let tournamentRoundMembersUnsub = null;
let myTournamentTeamId = null;
let roundTournamentStatusUnsub = null; // C4-7: 재진입 시 status 감지용
// C4-4: 리더보드용 — 정모 전체 멤버 onSnapshot
let leaderboardMembersUnsub = null;
let leaderboardAllMembers = [];
// C4-5: 리더보드용 — 팀 정보 (one-shot fetch)
let leaderboardTeams = [];
// C5: 정모 결과 화면용 캐시
let resultMembers = [];
let resultTeams = [];
let resultTournamentDoc = null;
let autoEndConfirmShown = false;
const SCORE_SYNC_DELAY = 500;      // 500ms 디바운스

// C4-6: 렌더링 throttle 유틸리티
// 첫 호출 즉시 실행 + delayMs 동안 무시 + 무시 기간 끝나면 마지막 args로 1번 더
function createThrottle(fn, delayMs) {
    var lastCallTime = 0;
    var pendingTimeout = null;
    var lastArgs = null;

    return function() {
        lastArgs = arguments;
        var now = Date.now();
        var elapsed = now - lastCallTime;

        if (elapsed >= delayMs) {
            lastCallTime = now;
            fn.apply(null, lastArgs);
        } else if (pendingTimeout === null) {
            pendingTimeout = setTimeout(function() {
                lastCallTime = Date.now();
                pendingTimeout = null;
                fn.apply(null, lastArgs);
            }, delayMs - elapsed);
        }
    };
}

const RENDER_THROTTLE_MS = 1000; // PRD 5.9: 1초당 1회

const STORAGE_KEYS = {
    ACTIVE_ROUND: 'golf_active_round',
    COMPLETED_ROUNDS: 'golf_rounds',
    USER_PROFILE: 'golf_user_profile'
};

// =========================================
// localStorage
// =========================================
function saveActiveRound() {
    if (currentRound === null) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
        return;
    }
    // ★ B6: 공유 라운드는 localStorage에 진행상황 저장 안 함
    // (Firestore가 진실의 원천 - source of truth)
    if (currentRound.isShared) {
        return;
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUND, JSON.stringify(currentRound));
}

function loadActiveRound() {
    const json = localStorage.getItem(STORAGE_KEYS.ACTIVE_ROUND);
    if (json === null) return null;
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('진행 중 라운드 불러오기 실패:', error);
        return null;
    }
}

function saveCompletedRounds(rounds) {
    localStorage.setItem(STORAGE_KEYS.COMPLETED_ROUNDS, JSON.stringify(rounds));
}

function loadCompletedRounds() {
    const json = localStorage.getItem(STORAGE_KEYS.COMPLETED_ROUNDS);
    if (json === null) return [];
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('완료된 라운드 불러오기 실패:', error);
        return [];
    }
}

function addCompletedRound(round) {
    const rounds = loadCompletedRounds();
    rounds.push(round);
    saveCompletedRounds(rounds);
}

function deleteCompletedRound(roundId) {
    const rounds = loadCompletedRounds();
    const filtered = rounds.filter(function(round) {
        return round.id !== roundId;
    });
    saveCompletedRounds(filtered);
}

function findRoundById(roundId) {
    const rounds = loadCompletedRounds();
    for (let i = 0; i < rounds.length; i++) {
        if (rounds[i].id === roundId) {
            return rounds[i];
        }
    }
    return null;
}

function saveUserProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

function loadUserProfile() {
    const json = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (json === null) return null;
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error('프로필 불러오기 실패:', error);
        return null;
    }
}

// =========================================
// D8: 프록시 멤버 헬퍼
// =========================================
function generateProxyMemberId() {
    const ts = Date.now().toString(36);
    const rand = Math.random().toString(36).substring(2, 6);
    return 'proxy_' + ts + rand;
}

function openAddProxyMemberScreen() {
    if (!canUserHostTournament()) {
        alert('호스트 기능은 현재 사용 불가합니다.');
        return;
    }
    inputProxyName.value = '';
    inputProxyHandicap.value = '';
    showScreen(screenAddProxyMember);
}

function confirmAddProxyMember() {
    if (currentTournamentId === null || currentUser === null) {
        alert('정모 정보가 없습니다.');
        return;
    }

    const name = inputProxyName.value.trim();
    const handicapRaw = inputProxyHandicap.value.trim();

    if (!name) { alert('이름을 입력해주세요.'); return; }
    if (name.length > 12) { alert('이름은 12자 이내로 입력해주세요.'); return; }

    const handicapIndex = parseFloat(handicapRaw);
    if (isNaN(handicapIndex) || handicapIndex < 0 || handicapIndex > 54) {
        alert('핸디캡을 0~54 사이로 입력해주세요.');
        return;
    }

    db.collection('tournaments').doc(currentTournamentId).collection('members').get()
        .then(function(snapshot) {
            if (snapshot.size >= currentTournamentMaxMembers) {
                throw new Error('FULL');
            }

            const proxyId = generateProxyMemberId();
            const courseHandicap = calculateCourseHandicap(handicapIndex);

            const memberData = {
                name: name,
                handicapIndex: handicapIndex,
                courseHandicap: courseHandicap,
                teamId: null,
                scores: new Array(18).fill(null),
                putts: new Array(18).fill(null),
                currentHole: 1,
                completed: false,
                proxyMember: true,
                proxyHostId: currentUser.uid,
                joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            return db.collection('tournaments').doc(currentTournamentId)
                .collection('members').doc(proxyId).set(memberData);
        })
        .then(function() {
            console.log('✅ 프록시 멤버 추가 완료:', name);
            showScreen(screenTournamentWaiting);
        })
        .catch(function(error) {
            console.error('❌ 프록시 추가 실패:', error);
            if (error.message === 'FULL') {
                alert('정모 정원이 가득 찼습니다 (' + currentTournamentMaxMembers + '명).');
            } else if (error.code === 'permission-denied') {
                alert('권한이 없습니다. 보안 규칙을 확인하세요.');
            } else {
                alert('프록시 멤버 추가 실패: ' + error.message);
            }
        });
}

function deleteProxyMember(proxyId, proxyName) {
    if (!confirm('"' + proxyName + '" 멤버를 삭제하시겠습니까?\n입력된 스코어도 함께 삭제됩니다.')) return;

    db.collection('tournaments').doc(currentTournamentId)
        .collection('members').doc(proxyId).delete()
        .then(function() {
            console.log('🗑️ 프록시 멤버 삭제:', proxyName);
        })
        .catch(function(error) {
            console.error('❌ 프록시 삭제 실패:', error);
            alert('삭제 실패: ' + error.message);
        });
}

// =========================================
// 호스트성 액션 게이팅 (D0)
// 현재는 항상 true. D7 이후 유료/구독 분기 도입 시 이 함수 수정.
// =========================================
function canUserHostTournament() {
    return true;
}

function canUserCreateRound() {
    return true;
}

function calculateCourseHandicap(handicapIndex) {
    if (handicapIndex === null || handicapIndex === undefined) {
        return null;
    }
    return Math.round(handicapIndex);
}

// =========================================
// 화면 전환
// =========================================
function showScreen(screenToShow) {
    for (let i = 0; i < allScreens.length; i++) {
        allScreens[i].classList.add('hidden');
    }
    screenToShow.classList.remove('hidden');
    window.scrollTo(0, 0);
}

// =========================================
// 메인 화면 렌더링
// =========================================
function refreshMainScreen() {
    const activeRound = loadActiveRound();
    if (activeRound !== null) {
        btnContinueRound.classList.remove('hidden');
        btnContinueRound.textContent =
            '▶ 이어하기 (' + activeRound.courseName +
            ', ' + activeRound.currentHole + '번 홀)';
    } else {
        btnContinueRound.classList.add('hidden');
    }

    renderProfileCard();
    renderOverallStats();
    renderPastRoundsList();
}

function renderProfileCard() {
    const profile = loadUserProfile();

    if (profile === null) {
        profileNameDisplay.textContent = '이름을 설정해주세요';
        profileHandicapDisplay.textContent = 'Handicap: --';
    } else {
        profileNameDisplay.textContent = profile.name;
        if (profile.handicapIndex !== null && profile.handicapIndex !== undefined) {
            profileHandicapDisplay.textContent = 'Handicap Index: ' + profile.handicapIndex.toFixed(1);
        } else {
            profileHandicapDisplay.textContent = 'Handicap: --';
        }
    }
}

function renderOverallStats() {
    const rounds = loadCompletedRounds();

    statTotalRounds.textContent = rounds.length;

    if (rounds.length === 0) {
        statAverageScore.textContent = '--';
        statBestScore.textContent = '--';
        return;
    }

    const totalScores = rounds.map(function(round) {
        return round.scores.reduce(function(a, b) { return a + b; }, 0);
    });

    const sum = totalScores.reduce(function(a, b) { return a + b; }, 0);
    const average = sum / totalScores.length;
    statAverageScore.textContent = average.toFixed(1);

    const best = Math.min.apply(null, totalScores);
    statBestScore.textContent = best;
}

function renderPastRoundsList() {
    const rounds = loadCompletedRounds();

    if (rounds.length === 0) {
        pastRoundsList.innerHTML = '<p class="empty-message">아직 기록된 라운드가 없습니다.</p>';
        return;
    }

    const sortedRounds = rounds.slice().sort(function(a, b) {
        return b.id - a.id;
    });

    pastRoundsList.innerHTML = '';

    for (let i = 0; i < sortedRounds.length; i++) {
        const round = sortedRounds[i];
        const item = createPastRoundItem(round);
        pastRoundsList.appendChild(item);
    }
}

function createPastRoundItem(round) {
    const totalScore = round.scores.reduce(function(a, b) { return a + b; }, 0);
    const totalPar = round.pars.reduce(function(a, b) { return a + b; }, 0);
    const overUnder = totalScore - totalPar;
    const overUnderText = overUnder === 0 ? 'E' : (overUnder > 0 ? '+' + overUnder : overUnder);

    const item = document.createElement('div');
    item.className = 'past-round-item';

    // ★ B6: 공유 라운드 표시 배지
    const sharedBadge = round.isShared ? '<span class="shared-badge-mini">👥</span>' : '';

    item.innerHTML =
        '<div class="past-round-top">' +
            '<span class="past-round-course">' + sharedBadge + escapeHtml(round.courseName) + '</span>' +
            '<span class="past-round-date">' + round.date + '</span>' +
        '</div>' +
        '<div class="past-round-bottom">' +
            '<span class="past-round-score">' + totalScore + '타</span>' +
            '<span class="past-round-overunder">' + overUnderText + '</span>' +
        '</div>';

    item.addEventListener('click', function() {
        showPastRoundDetail(round.id);
    });

    return item;
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// =========================================
// 프로필 화면
// =========================================
function openProfileScreen() {
    const profile = loadUserProfile();

    if (profile !== null) {
        inputProfileName.value = profile.name || '';
        inputHandicapIndex.value = (profile.handicapIndex !== null && profile.handicapIndex !== undefined)
            ? profile.handicapIndex
            : '';
    } else {
        inputProfileName.value = '';
        inputHandicapIndex.value = '';
    }

    showScreen(screenProfile);
}

function saveProfile() {
    const name = inputProfileName.value.trim();

    if (name === '') {
        alert('이름을 입력해주세요.');
        return;
    }

    if (name.length > 20) {
        alert('이름은 20자 이하여야 합니다.');
        return;
    }

    let handicapIndex = null;
    const handicapStr = inputHandicapIndex.value.trim();

    if (handicapStr !== '') {
        const parsed = parseFloat(handicapStr);

        if (isNaN(parsed)) {
            alert('Handicap Index는 숫자여야 합니다.');
            return;
        }

        if (parsed < 0 || parsed > 54) {
            alert('Handicap Index는 0.0 ~ 54.0 사이여야 합니다.');
            return;
        }

        handicapIndex = parsed;
    }

    const profile = {
        name: name,
        handicapIndex: handicapIndex
    };

    saveUserProfile(profile);
    alert('프로필이 저장되었습니다!');

    refreshMainScreen();
    showScreen(screenMain);
}

// =========================================
// 새 라운드 폼 관련
// =========================================
function createParInputs(prefilledPars) {
    parInputsFront.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = prefilledPars ? prefilledPars[i - 1] : '4';
        input.id = 'par-input-' + i;
        parInputsFront.appendChild(input);
    }

    parInputsBack.innerHTML = '';
    for (let i = 10; i <= 18; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = prefilledPars ? prefilledPars[i - 1] : '4';
        input.id = 'par-input-' + i;
        parInputsBack.appendChild(input);
    }
}

function onGameModeChange() {
    const mode = selectGameMode.value;
    const profile = loadUserProfile();

    if (mode === 'gross') {
        gameModeHint.textContent = '총 타수 그대로 비교합니다. 1단계와 동일한 방식.';
        netInfoBox.classList.add('hidden');
    } else if (mode === 'net') {
        gameModeHint.textContent = '핸디캡을 적용한 Net Score로 비교합니다.';

        if (profile === null || profile.handicapIndex === null || profile.handicapIndex === undefined) {
            displayCourseHandicap.textContent = '⚠️ 핸디캡 미설정 (프로필에서 설정 필요)';
        } else {
            const courseHandicap = calculateCourseHandicap(profile.handicapIndex);
            displayCourseHandicap.textContent = courseHandicap;
        }

        netInfoBox.classList.remove('hidden');
    }
}

function readNewRoundForm() {
    const courseName = inputCourseName.value.trim();

    if (courseName === '') {
        alert('골프장 이름을 입력해주세요.');
        return null;
    }

    const pars = [];
    for (let i = 1; i <= 18; i++) {
        const input = document.getElementById('par-input-' + i);
        const par = parseInt(input.value);

        if (par !== 3 && par !== 4 && par !== 5) {
            alert(i + '번 홀의 파는 3, 4, 5 중 하나여야 합니다.');
            return null;
        }
        pars.push(par);
    }

    const gameMode = selectGameMode.value;
    const profile = loadUserProfile();
    let courseHandicap = null;

    if (gameMode === 'net') {
        if (profile === null || profile.handicapIndex === null || profile.handicapIndex === undefined) {
            const proceed = confirm(
                'Net 모드를 선택했지만 핸디캡이 설정되지 않았습니다.\n' +
                '핸디캡 0으로 진행할까요? (취소하면 프로필 설정 필요)'
            );
            if (!proceed) return null;
            courseHandicap = 0;
        } else {
            courseHandicap = calculateCourseHandicap(profile.handicapIndex);
        }
    }

    return {
        courseName: courseName,
        pars: pars,
        gameMode: gameMode,
        courseHandicap: courseHandicap
    };
}

function startNewRound() {
    const existing = loadActiveRound();
    if (existing !== null) {
        const confirmed = confirm(
            '진행 중인 라운드가 있습니다.\n' +
            '새로 시작하면 진행 중 라운드는 삭제됩니다. 계속할까요?'
        );
        if (!confirmed) return;
    }

    const formData = readNewRoundForm();
    if (formData === null) return;

    currentRound = {
        id: Date.now(),
        courseName: formData.courseName,
        date: new Date().toISOString().split('T')[0],
        pars: formData.pars,
        scores: [null, null, null, null, null, null, null, null, null,
                 null, null, null, null, null, null, null, null, null],
        putts: [null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null],
        currentHole: 1,
        completed: false,
        gameMode: formData.gameMode,
        courseHandicap: formData.courseHandicap,
        isShared: false
    };

    saveActiveRound();
    showScreen(screenHoleInput);
    renderHoleInputScreen();
}

function openNewRoundScreen() {
    inputCourseName.value = '';
    createParInputs(null);

    selectGameMode.value = 'gross';
    onGameModeChange();

    const rounds = loadCompletedRounds();
    if (rounds.length > 0) {
        btnLoadPrevious.classList.remove('hidden');
    } else {
        btnLoadPrevious.classList.add('hidden');
    }

    showScreen(screenNewRound);
}

// =========================================
// 정모 만들기 (2단계 C) - 화면/폼 로직만, Firebase는 C1-3에서
// =========================================

const TOURNAMENT_MAX_MEMBERS = 40;
const TOURNAMENT_MAX_TEAMS = 10;

// 팀 색상 풀 (10개) - colorIndex 1~10
const TEAM_COLORS = [
    null, // index 0 안 씀 (1-based)
    { name: '빨강', main: '#dc2626', bg: '#fee2e2' },
    { name: '파랑', main: '#2563eb', bg: '#dbeafe' },
    { name: '초록', main: '#16a34a', bg: '#dcfce7' },
    { name: '주황', main: '#ea580c', bg: '#ffedd5' },
    { name: '보라', main: '#9333ea', bg: '#f3e8ff' },
    { name: '청록', main: '#0891b2', bg: '#cffafe' },
    { name: '분홍', main: '#db2777', bg: '#fce7f3' },
    { name: '노랑', main: '#ca8a04', bg: '#fef9c3' },
    { name: '회색', main: '#475569', bg: '#e2e8f0' },
    { name: '갈색', main: '#78350f', bg: '#fed7aa' }
];

function createTournamentParInputs(prefilledPars) {
    tournamentParInputsFront.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = prefilledPars ? prefilledPars[i - 1] : '4';
        input.id = 'tournament-par-input-' + i;
        input.className = 'par-input-tournament';
        tournamentParInputsFront.appendChild(input);
    }

    tournamentParInputsBack.innerHTML = '';
    for (let i = 10; i <= 18; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = prefilledPars ? prefilledPars[i - 1] : '4';
        input.id = 'tournament-par-input-' + i;
        input.className = 'par-input-tournament';
        tournamentParInputsBack.appendChild(input);
    }
}

function updateMemberCountPreview() {
    const teamCount = parseInt(selectTeamCount.value, 10);
    const teamSize = parseInt(selectTeamSize.value, 10);
    const total = teamCount * teamSize;

    memberCountDisplay.textContent = total;

    const previewBox = memberCountDisplay.parentElement;
    if (total > TOURNAMENT_MAX_MEMBERS) {
        previewBox.classList.add('over-cap');
        memberCountWarning.classList.remove('hidden');
        btnCreateTournament.disabled = true;
        btnCreateTournament.style.opacity = '0.5';
    } else {
        previewBox.classList.remove('over-cap');
        memberCountWarning.classList.add('hidden');
        btnCreateTournament.disabled = false;
        btnCreateTournament.style.opacity = '1';
    }
}

function onTournamentGameModeChange() {
    const mode = selectTournamentGameMode.value;
    if (mode === 'gross') {
        tournamentGameModeHint.textContent = '총 타수 그대로 비교합니다. 핸디 무관, 실력 그대로.';
    } else {
        tournamentGameModeHint.textContent = '총 타수에서 Course Handicap을 빼서 공정하게 비교합니다.';
    }
}

function readTournamentForm() {
    const name = inputTournamentName.value.trim();
    const courseName = inputTournamentCourse.value.trim();
    const date = inputTournamentDate.value;
    const gameMode = selectTournamentGameMode.value;
    const teamCount = parseInt(selectTeamCount.value, 10);
    const teamSize = parseInt(selectTeamSize.value, 10);

    if (!name) {
        alert('정모 이름을 입력해주세요.');
        return null;
    }
    if (!courseName) {
        alert('골프장 이름을 입력해주세요.');
        return null;
    }
    if (!date) {
        alert('날짜를 선택해주세요.');
        return null;
    }
    const maxMembers = teamCount * teamSize;
    if (maxMembers > TOURNAMENT_MAX_MEMBERS) {
        alert('최대 ' + TOURNAMENT_MAX_MEMBERS + '명까지 참여 가능합니다.');
        return null;
    }

    // 파 정보 수집
    const pars = [];
    for (let i = 1; i <= 18; i++) {
        const input = document.getElementById('tournament-par-input-' + i);
        if (!input) {
            alert('파 입력 필드 누락 (홀 ' + i + '). 페이지를 새로고침해주세요.');
            return null;
        }
        const v = parseInt(input.value, 10);
        if (isNaN(v) || v < 3 || v > 5) {
            alert((i) + '번 홀의 파를 3~5 사이로 입력해주세요. (현재: "' + input.value + '")');
            input.focus();
            return null;
        }
        pars.push(v);
    }

    if (pars.length !== 18) {
        alert('파 정보 수집 오류 (' + pars.length + '/18). 페이지를 새로고침해주세요.');
        return null;
    }

    return {
        name: name,
        courseName: courseName,
        date: date,
        gameMode: gameMode,
        teamCount: teamCount,
        teamSize: teamSize,
        maxMembers: maxMembers,
        pars: pars,
        tier: 'free'  // 미래 수익화 대비 (현재 모든 정모 free)
    };
}

function openTournamentCreateScreen() {
    // 폼 초기화
    inputTournamentName.value = '';
    inputTournamentCourse.value = '';

    // 날짜 기본값: 오늘
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    inputTournamentDate.value = yyyy + '-' + mm + '-' + dd;

    selectTournamentGameMode.value = 'net';
    onTournamentGameModeChange();

    selectTeamCount.value = '4';
    selectTeamSize.value = '4';
    updateMemberCountPreview();

    createTournamentParInputs(null);

    showScreen(screenTournamentCreate);
}

// 정모 만들기 화면 이벤트 (C1-2 단계: console.log만)
selectTeamCount.addEventListener('change', updateMemberCountPreview);
selectTeamSize.addEventListener('change', updateMemberCountPreview);
selectTournamentGameMode.addEventListener('change', onTournamentGameModeChange);

btnCreateTournament.addEventListener('click', function() {
    const formData = readTournamentForm();
    if (formData === null) {
        return;
    }
    console.log('🟡 정모 만들기 (Firestore 저장 시작):');
    console.log(formData);
    createTournament(formData);
});

btnCancelTournamentCreate.addEventListener('click', function() {
    showScreen(screenMain);
});

// 정모 코드/링크 화면 이벤트 (C1-3)
btnCopyTournamentLink.addEventListener('click', copyTournamentLink);
btnCopyTournamentCode.addEventListener('click', copyTournamentCodeOnly);
btnBackToMainFromTournamentLink.addEventListener('click', function() {
    showScreen(screenMain);
});

// 정모 참여 확인 화면 이벤트 (C2-2)
btnConfirmTournamentJoin.addEventListener('click', joinTournament);
btnCancelTournamentJoin.addEventListener('click', function() {
    pendingTournamentJoin = null;
    showScreen(screenMain);
});

// 정모 대기실 화면 이벤트 (C2-3)
btnGoToWaitingRoom.addEventListener('click', function() {
    if (currentTournamentId === null) {
        alert('정모 정보가 없습니다.');
        showScreen(screenMain);
        return;
    }
    enterTournamentWaitingRoom(currentTournamentId);
});

btnCopyWaitingCode.addEventListener('click', function() {
    const code = waitingCodeDisplay.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function() {
            waitingCodeCopyFeedback.classList.remove('hidden');
            setTimeout(function() { waitingCodeCopyFeedback.classList.add('hidden'); }, 2000);
        }).catch(function() { alert('복사 실패'); });
    }
});

btnCopyWaitingLink.addEventListener('click', function() {
    const link = waitingLinkDisplay.value;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function() {
            waitingLinkCopyFeedback.classList.remove('hidden');
            setTimeout(function() { waitingLinkCopyFeedback.classList.add('hidden'); }, 2000);
        }).catch(function() { alert('복사 실패'); });
    } else {
        waitingLinkDisplay.select();
        waitingLinkDisplay.setSelectionRange(0, 99999);
        try {
            document.execCommand('copy');
            waitingLinkCopyFeedback.classList.remove('hidden');
            setTimeout(function() { waitingLinkCopyFeedback.classList.add('hidden'); }, 2000);
        } catch (err) {
            alert('복사 실패');
        }
    }
});

btnGoToTeamAssignment.addEventListener('click', function() {
    if (currentTournamentId === null) {
        alert('정모 정보가 없습니다.');
        return;
    }
    if (currentUser === null || currentTournamentHostId !== currentUser.uid) {
        alert('호스트만 팀 배정을 할 수 있습니다.');
        return;
    }
    if (lastWaitingMemberIds.size < 2) {
        alert('참여자가 2명 이상이어야 팀 배정이 가능합니다.');
        return;
    }
    showTeamAssignmentScreen();
});

btnBackToWaitingFromTeams.addEventListener('click', function() {
    if (currentTournamentId === null) {
        showScreen(screenMain);
        return;
    }
    showScreen(screenTournamentWaiting);
});

btnAutoAssignRandom.addEventListener('click', function() {
    handleAutoAssign('random');
});
btnAutoAssignBalanced.addEventListener('click', function() {
    handleAutoAssign('balanced');
});

btnCancelSelection.addEventListener('click', clearSelection);
btnStartRoundFromTeams.addEventListener('click', handleStartRound);

screenTeamAssignment.addEventListener('click', function(e) {
    if (selectedMemberIdForMove === null) return;
    if (e.target.closest('.team-card')) return;
    if (e.target.closest('.team-selection-bar')) return;
    if (e.target.closest('button')) return;
    clearSelection();
});

btnAddProxyMember.addEventListener('click', openAddProxyMemberScreen);
btnConfirmAddProxy.addEventListener('click', confirmAddProxyMember);
btnCancelAddProxy.addEventListener('click', function() { showScreen(screenTournamentWaiting); });
btnLeaveTournament.addEventListener('click', leaveTournamentAsGuest);
btnCancelTournament.addEventListener('click', cancelTournamentAsHost);

function loadPreviousRound() {
    const rounds = loadCompletedRounds();
    if (rounds.length === 0) {
        alert('이전 라운드가 없습니다.');
        return;
    }

    const sortedRounds = rounds.slice().sort(function(a, b) {
        return b.id - a.id;
    });
    const latestRound = sortedRounds[0];

    inputCourseName.value = latestRound.courseName;
    createParInputs(latestRound.pars);

    alert('"' + latestRound.courseName + '"의 정보를 불러왔습니다.');
}

// =========================================
// 홀 입력 화면
// =========================================
function renderHoleInputScreen() {
    courseNameDisplay.textContent = currentRound.courseName;

    const holeIndex = currentRound.currentHole - 1;
    holeProgress.textContent = currentRound.currentHole + '/18 홀';

    let totalScore = 0;
    let totalPar = 0;
    for (let i = 0; i < 18; i++) {
        if (currentRound.scores[i] !== null) {
            totalScore += currentRound.scores[i];
            totalPar += currentRound.pars[i];
        }
    }
    const overUnder = totalScore - totalPar;
    const overUnderText = overUnder > 0 ? '+' + overUnder : overUnder;
    cumulativeScore.textContent = '현재 ' + overUnderText + ' (' + totalScore + '타)';

    const currentPar = currentRound.pars[holeIndex];
    holeInfo.textContent = currentRound.currentHole + '번 홀 (Par ' + currentPar + ')';

    let displayScore = currentRound.scores[holeIndex];
    if (displayScore === null) {
        displayScore = currentPar;
    }
    scoreDisplay.textContent = displayScore;

    btnScoreMinus.disabled = (displayScore <= 1);
    btnPrevHole.disabled = (currentRound.currentHole === 1);

    if (currentRound.currentHole === 18) {
        btnNextHole.textContent = '라운드 종료 ✓';
    } else {
        btnNextHole.textContent = '다음 홀 →';
    }

    renderPuttsDisplay();

    // ★ B6: 공유 라운드면 멤버 스트립과 배지 표시
    renderSharedModeUI();

    // C4-4: 정모 라운드일 때만 리더보드 버튼 표시
    if (currentRound.tournamentId) {
        btnGoToLeaderboard.classList.remove('hidden');
    } else {
        btnGoToLeaderboard.classList.add('hidden');
    }
}

function renderPuttsDisplay() {
    const holeIndex = currentRound.currentHole - 1;
    const putts = currentRound.putts ? currentRound.putts[holeIndex] : null;

    if (!currentRound.putts) {
        currentRound.putts = [null, null, null, null, null, null, null, null, null,
                              null, null, null, null, null, null, null, null, null];
    }

    if (putts === null || putts === undefined) {
        puttsDisplay.textContent = '-';
    } else {
        puttsDisplay.textContent = putts;
    }

    btnPuttsMinus.disabled = (putts === null || putts === 0);

    const score = currentRound.scores[holeIndex];
    if (score !== null && putts !== null && putts >= score) {
        btnPuttsPlus.disabled = true;
    } else {
        btnPuttsPlus.disabled = false;
    }
}

function changeScore(delta) {
    const holeIndex = currentRound.currentHole - 1;

    let currentScore = currentRound.scores[holeIndex];
    if (currentScore === null) {
        currentScore = currentRound.pars[holeIndex];
    }

    const newScore = currentScore + delta;
    if (newScore < 1) return;

    currentRound.scores[holeIndex] = newScore;

    const putts = currentRound.putts[holeIndex];
    if (putts !== null && putts > newScore) {
        currentRound.putts[holeIndex] = newScore;
    }

    saveActiveRound();
    renderHoleInputScreen();

    if (currentRound.tournamentId) {
        scheduleSyncMyScoreToTournament();
    } else if (currentRound.isShared && currentRound.shareCode) {
        scheduleSyncMyScoreToFirestore();
    }
}

function changePutts(delta) {
    const holeIndex = currentRound.currentHole - 1;
    let currentPutts = currentRound.putts[holeIndex];

    if (currentPutts === null || currentPutts === undefined) {
        currentPutts = 0;
    }

    const newPutts = currentPutts + delta;

    if (newPutts < 0) return;

    const score = currentRound.scores[holeIndex];
    if (score !== null && newPutts > score) {
        return;
    }

    currentRound.putts[holeIndex] = newPutts;
    saveActiveRound();
    renderPuttsDisplay();

    if (currentRound.tournamentId) {
        scheduleSyncMyScoreToTournament();
    } else if (currentRound.isShared && currentRound.shareCode) {
        scheduleSyncMyScoreToFirestore();
    }
}

function goToHole(holeNumber) {
    const currentIndex = currentRound.currentHole - 1;
    if (currentRound.scores[currentIndex] === null) {
        currentRound.scores[currentIndex] = currentRound.pars[currentIndex];
    }

    if (holeNumber < 1 || holeNumber > 18) return;
    currentRound.currentHole = holeNumber;
    saveActiveRound();
    renderHoleInputScreen();

    if (currentRound.tournamentId) {
        syncMyScoreToTournament();
    } else if (currentRound.isShared && currentRound.shareCode) {
        syncMyScoreToFirestore();
    }
}

// C5: 정모 라운드 완료 처리 — 본인 스코어 completed:true sync 후 리더보드로
function handleFinishTournamentRound() {
    var lastIndex = currentRound.currentHole - 1;
    if (currentRound.scores[lastIndex] === null) {
        currentRound.scores[lastIndex] = currentRound.pars[lastIndex];
    }

    var confirmed = confirm('라운드를 완료할까요?\n\n완료 후 호스트가 정모를 종료하면 결과 화면으로 이동합니다.');
    if (!confirmed) return;

    currentRound.completed = true;
    saveActiveRound();

    syncMyScoreToTournament();
    alert('✅ 라운드 완료!\n\n호스트가 정모를 종료할 때까지 대기해주세요.\n🏆 리더보드에서 순위를 확인할 수 있습니다.');
}

function finishRound() {
    if (currentRound !== null && currentRound.tournamentId) {
        handleFinishTournamentRound();
        return;
    }
    const currentIndex = currentRound.currentHole - 1;
    if (currentRound.scores[currentIndex] === null) {
        currentRound.scores[currentIndex] = currentRound.pars[currentIndex];
    }

    const confirmed = confirm('라운드를 종료할까요?\n종료하면 더 이상 수정할 수 없습니다.');
    if (!confirmed) return;

    currentRound.completed = true;

    // ★ B6: 공유 라운드와 개인 라운드 분기
    if (currentRound.isShared) {
        finishSharedRound();
    } else {
        finishPersonalRound();
    }
}

function finishPersonalRound() {
    addCompletedRound(currentRound);
    console.log('라운드 종료 (개인):', currentRound);

    viewingPastRoundId = null;
    showScreen(screenResult);
    renderResultScreen(currentRound);

    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
}

// ★ B6: 공유 라운드 종료
function finishSharedRound() {
    // 1. 본인 멤버 데이터에 completed 마킹 (마지막 동기화 + completed 필드)
    if (currentSharedRoundId !== null && currentUser !== null) {
        const updateData = {
            scores: currentRound.scores,
            putts: currentRound.putts,
            currentHole: currentRound.currentHole,
            completed: true,
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        db.collection('rounds').doc(currentSharedRoundId)
            .collection('members').doc(currentUser.uid)
            .update(updateData)
            .then(function() {
                console.log('✅ 공유 라운드 완료 마킹 성공');
            })
            .catch(function(error) {
                console.error('❌ 공유 라운드 완료 마킹 실패:', error);
            });
    }

    // 2. 로컬 과거 라운드에도 저장 (사용자 결정: 통계 통합)
    const localCopy = {
        id: Date.now(),
        courseName: currentRound.courseName,
        date: currentRound.date,
        pars: currentRound.pars.slice(),
        scores: currentRound.scores.slice(),
        putts: currentRound.putts.slice(),
        currentHole: 18,
        completed: true,
        gameMode: currentRound.gameMode,
        courseHandicap: currentRound.courseHandicap,
        isShared: true,
        shareCode: currentSharedRoundId
    };
    addCompletedRound(localCopy);
    console.log('라운드 종료 (공유, 로컬 복사본 저장):', localCopy);

    // 3. 결과 화면으로 (리스너는 결과 화면에서 메인 갈 때 정리)
    viewingPastRoundId = null;
    showScreen(screenResult);
    renderResultScreen(currentRound);
}

// =========================================
// 결과 화면 (Net Score + 퍼팅 통계)
// =========================================
function calculateStats(round) {
    let totalScore = 0;
    let totalPar = 0;
    let frontNine = 0;
    let backNine = 0;
    let eagles = 0;
    let birdies = 0;
    let pars = 0;
    let bogeys = 0;
    let doublePlus = 0;

    for (let i = 0; i < 18; i++) {
        const score = round.scores[i];
        const par = round.pars[i];

        totalScore += score;
        totalPar += par;

        if (i < 9) {
            frontNine += score;
        } else {
            backNine += score;
        }

        const diff = score - par;
        if (diff <= -2) {
            eagles++;
        } else if (diff === -1) {
            birdies++;
        } else if (diff === 0) {
            pars++;
        } else if (diff === 1) {
            bogeys++;
        } else {
            doublePlus++;
        }
    }

    return {
        totalScore: totalScore,
        totalPar: totalPar,
        overUnder: totalScore - totalPar,
        frontNine: frontNine,
        backNine: backNine,
        eagles: eagles,
        birdies: birdies,
        pars: pars,
        bogeys: bogeys,
        doublePlus: doublePlus
    };
}

function calculatePuttsStats(round) {
    if (!round.putts) {
        return null;
    }

    const recordedPutts = round.putts.filter(function(p) {
        return p !== null && p !== undefined;
    });

    if (recordedPutts.length === 0) {
        return null;
    }

    const total = recordedPutts.reduce(function(a, b) { return a + b; }, 0);
    const average = total / recordedPutts.length;

    let onePuttCount = 0;
    let threePlusCount = 0;
    for (let i = 0; i < recordedPutts.length; i++) {
        if (recordedPutts[i] === 1) onePuttCount++;
        if (recordedPutts[i] >= 3) threePlusCount++;
    }

    return {
        total: total,
        average: average,
        onePutt: onePuttCount,
        threePlus: threePlusCount,
        recordedHoles: recordedPutts.length
    };
}

function formatOverUnder(overUnder) {
    if (overUnder === 0) return 'E (Even Par)';
    if (overUnder > 0) return '+' + overUnder + ' over par';
    return overUnder + ' under par';
}

function formatDate(isoDate) {
    const parts = isoDate.split('-');
    return parts[0] + '년 ' + parseInt(parts[1]) + '월 ' + parseInt(parts[2]) + '일';
}

function getScoreClass(score, par) {
    const diff = score - par;
    if (diff <= -2) return 'score-eagle';
    if (diff === -1) return 'score-birdie';
    if (diff === 0) return 'score-par';
    if (diff === 1) return 'score-bogey';
    return 'score-double-plus';
}

function renderResultHeader(round) {
    resultCourseName.textContent = round.courseName;
    resultDate.textContent = formatDate(round.date);

    const mode = round.gameMode || 'gross';
    if (mode === 'net') {
        resultGameModeBadge.textContent = 'NET';
        resultGameModeBadge.classList.add('net-mode');
    } else {
        resultGameModeBadge.textContent = 'GROSS';
        resultGameModeBadge.classList.remove('net-mode');
    }
}

function renderResultTotal(stats) {
    resultTotalScore.textContent = stats.totalScore;
    resultOverUnder.textContent = formatOverUnder(stats.overUnder);
}

function renderResultNet(round, stats) {
    const mode = round.gameMode || 'gross';

    if (mode !== 'net') {
        resultNetSection.classList.add('hidden');
        return;
    }

    if (round.courseHandicap === null || round.courseHandicap === undefined) {
        resultNetSection.classList.add('hidden');
        return;
    }

    const handicap = round.courseHandicap;
    const netTotal = stats.totalScore - handicap;
    const netOverUnder = netTotal - stats.totalPar;

    resultHandicapDisplay.textContent = handicap;
    resultNetScore.textContent = netTotal;
    resultNetOverUnder.textContent = formatOverUnder(netOverUnder);

    resultNetSection.classList.remove('hidden');
}

function renderResultHalves(stats) {
    resultFrontNine.textContent = stats.frontNine;
    resultBackNine.textContent = stats.backNine;
}

function renderScoreDistribution(stats) {
    countEagle.textContent = stats.eagles;
    countBirdie.textContent = stats.birdies;
    countPar.textContent = stats.pars;
    countBogey.textContent = stats.bogeys;
    countDoublePlus.textContent = stats.doublePlus;
}

function renderPuttsStats(round) {
    const puttsStats = calculatePuttsStats(round);

    if (puttsStats === null) {
        puttsStatsSection.classList.add('hidden');
        return;
    }

    puttsTotal.textContent = puttsStats.total;
    puttsAverage.textContent = puttsStats.average.toFixed(1);
    puttsOne.textContent = puttsStats.onePutt;
    puttsThreePlus.textContent = puttsStats.threePlus;
    puttsCoverageNote.textContent = '기록된 홀: ' + puttsStats.recordedHoles + ' / 18';

    puttsStatsSection.classList.remove('hidden');
}

function renderScorecardTable(tableElement, round, startHole, endHole) {
    tableElement.innerHTML = '';

    const headerRow = document.createElement('tr');
    const headerLabel = document.createElement('th');
    headerLabel.className = 'row-label';
    headerLabel.textContent = 'Hole';
    headerRow.appendChild(headerLabel);

    for (let i = startHole; i <= endHole; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }
    tableElement.appendChild(headerRow);

    const parRow = document.createElement('tr');
    const parLabel = document.createElement('td');
    parLabel.className = 'row-label';
    parLabel.textContent = 'Par';
    parRow.appendChild(parLabel);

    for (let i = startHole; i <= endHole; i++) {
        const td = document.createElement('td');
        td.textContent = round.pars[i - 1];
        parRow.appendChild(td);
    }
    tableElement.appendChild(parRow);

    const scoreRow = document.createElement('tr');
    const scoreLabel = document.createElement('td');
    scoreLabel.className = 'row-label';
    scoreLabel.textContent = 'Score';
    scoreRow.appendChild(scoreLabel);

    for (let i = startHole; i <= endHole; i++) {
        const td = document.createElement('td');
        const score = round.scores[i - 1];
        const par = round.pars[i - 1];

        const span = document.createElement('span');
        span.textContent = score;
        td.appendChild(span);

        td.className = getScoreClass(score, par);
        scoreRow.appendChild(td);
    }
    tableElement.appendChild(scoreRow);
}

function renderResultScreen(round) {
    const stats = calculateStats(round);

    renderResultHeader(round);
    renderResultTotal(stats);
    renderResultNet(round, stats);
    renderResultHalves(stats);
    renderScoreDistribution(stats);
    renderPuttsStats(round);
    renderScorecardTable(scorecardFront, round, 1, 9);
    renderScorecardTable(scorecardBack, round, 10, 18);

    if (viewingPastRoundId !== null) {
        resultScreenTitle.textContent = '📜 과거 라운드 상세';
        btnDeleteRound.classList.remove('hidden');
    } else {
        resultScreenTitle.textContent = '🏌️ 라운드 결과';
        btnDeleteRound.classList.add('hidden');
    }
}

function showPastRoundDetail(roundId) {
    const round = findRoundById(roundId);
    if (round === null) {
        alert('라운드를 찾을 수 없습니다.');
        return;
    }

    viewingPastRoundId = roundId;
    showScreen(screenResult);
    renderResultScreen(round);
}

function deleteViewingRound() {
    if (viewingPastRoundId === null) return;

    const round = findRoundById(viewingPastRoundId);
    if (round === null) return;

    const confirmed = confirm(
        '"' + round.courseName + '" (' + round.date + ') 라운드를 삭제할까요?\n' +
        '삭제하면 복구할 수 없습니다.'
    );
    if (!confirmed) return;

    deleteCompletedRound(viewingPastRoundId);
    viewingPastRoundId = null;

    refreshMainScreen();
    showScreen(screenMain);
}

// =========================================
// 공유 라운드 — Firestore 관련 함수 (2단계 B)
// =========================================

// 6자리 공유 코드 생성 (대문자 + 숫자, 헷갈리는 글자 제외)
function generateShareCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
}

// 공유 링크 만들기 (현재 호스팅 환경 기반)
function buildShareLink(code) {
    const base = window.location.origin + window.location.pathname;
    return base + '?r=' + code;
}

// Firestore에 공유 라운드 만들기
function createSharedRound(formData) {
    if (currentUser === null) {
        alert('로그인 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    const profile = loadUserProfile();
    if (profile === null) {
        alert('프로필이 설정되지 않았습니다.');
        return;
    }

    const shareCode = generateShareCode();
    const userId = currentUser.uid;

    console.log('🔵 공유 라운드 생성 중...', shareCode);

    // 1. 라운드 문서 만들기
    const roundData = {
        courseName: formData.courseName,
        pars: formData.pars,
        gameMode: formData.gameMode,
        hostId: userId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        status: 'active'
    };

    db.collection('rounds').doc(shareCode).set(roundData)
        .then(function() {
            console.log('✅ 라운드 문서 생성 완료');

            // 2. 호스트를 멤버로 추가
            const memberData = {
                name: profile.name,
                handicapIndex: profile.handicapIndex !== null ? profile.handicapIndex : null,
                courseHandicap: formData.courseHandicap,
                scores: new Array(18).fill(null),
                putts: new Array(18).fill(null),
                currentHole: 1,
                completed: false,
                joinedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            return db.collection('rounds').doc(shareCode)
                .collection('members').doc(userId).set(memberData);
        })
        .then(function() {
            console.log('✅ 호스트 멤버 등록 완료');
            currentSharedRoundId = shareCode;
            showShareLinkScreen(shareCode);
        })
        .catch(function(error) {
            console.error('❌ 공유 라운드 생성 실패:', error);
            alert('공유 라운드 생성 실패: ' + error.message);
        });
}

// =========================================
// 정모 — Firestore 관련 함수 (2단계 C - C1-3)
// =========================================

// 현재 활성 정모 ID (정모 만들기/참여 후 저장)
let currentTournamentId = null;

// 정모 링크 만들기 (공유 라운드와 구분: ?t=)
function buildTournamentLink(code) {
    const base = window.location.origin + window.location.pathname;
    return base + '?t=' + code;
}

// Firestore에서 정모 정보 가져오기 (참여용)
// 반환: { tournamentData, hostName, currentMemberCount } 또는 throw Error
function fetchTournament(tournamentId) {
    return db.collection('tournaments').doc(tournamentId).get()
        .then(function(doc) {
            if (!doc.exists) {
                throw new Error('NOT_FOUND');
            }

            const tournamentData = doc.data();

            // 1. 종료된 정모 — 결과 화면으로 안내 (C5)
            if (tournamentData.status === 'completed') {
                tournamentData.id = doc.id;
                return {
                    tournamentData: tournamentData,
                    hostName: tournamentData.hostName || '알 수 없음',
                    currentMemberCount: 0
                };
            }

            // 2. 진행 중인 정모 — 호스트/기존 멤버는 재진입 허용 (C4-7)
            if (tournamentData.status === 'in_progress') {
                return {
                    tournamentData: tournamentData,
                    hostName: tournamentData.hostName || '알 수 없음',
                    currentMemberCount: 0
                };
            }

            // 3. 멤버 수 확인 (cap 검증) — 기존 호스트/멤버는 제외
            const userId = currentUser ? currentUser.uid : null;
            return db.collection('tournaments').doc(tournamentId)
                .collection('members').get()
                .then(function(membersSnapshot) {
                    const memberCount = membersSnapshot.size;
                    const isExisting = userId && (
                        tournamentData.hostId === userId ||
                        membersSnapshot.docs.some(function(d) { return d.id === userId; })
                    );

                    if (!isExisting && memberCount >= tournamentData.maxMembers) {
                        throw new Error('FULL');
                    }

                    return {
                        tournamentData: tournamentData,
                        hostName: tournamentData.hostName || '알 수 없음',
                        currentMemberCount: memberCount
                    };
                });
        });
}

// Firestore에 정모 만들기
function createTournament(formData) {
    if (currentUser === null) {
        alert('로그인 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    const profile = loadUserProfile();
    if (profile === null) {
        alert('프로필이 설정되지 않았습니다.');
        return;
    }

    const tournamentId = generateShareCode();
    const userId = currentUser.uid;

    console.log('🏌️ 정모 생성 중...', tournamentId);

    // 버튼 더블클릭 방지
    btnCreateTournament.disabled = true;
    btnCreateTournament.textContent = '생성 중...';

    // Course Handicap 계산 (Net 모드일 때 호스트 본인 핸디 적용)
    const hostCourseHandicap = (profile.handicapIndex !== null && profile.handicapIndex !== undefined)
        ? calculateCourseHandicap(profile.handicapIndex)
        : 0;

    // 1. 정모 본 문서 만들기
    const tournamentData = {
        name: formData.name,
        courseName: formData.courseName,
        date: formData.date,
        pars: formData.pars,
        gameMode: formData.gameMode,
        teamCount: formData.teamCount,
        teamSize: formData.teamSize,
        maxMembers: formData.maxMembers,
        hostId: userId,
        hostName: profile.name,
        status: 'waiting',
        tier: 'free',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        startedAt: null,
        completedAt: null
    };

    db.collection('tournaments').doc(tournamentId).set(tournamentData)
        .then(function() {
            console.log('✅ 정모 본 문서 생성 완료');

            // 2. 호스트를 멤버로 추가
            const memberData = {
                name: profile.name,
                handicapIndex: profile.handicapIndex !== null ? profile.handicapIndex : null,
                courseHandicap: hostCourseHandicap,
                teamId: null,
                scores: new Array(18).fill(null),
                putts: new Array(18).fill(null),
                currentHole: 1,
                completed: false,
                joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            return db.collection('tournaments').doc(tournamentId)
                .collection('members').doc(userId).set(memberData);
        })
        .then(function() {
            console.log('✅ 호스트 멤버 등록 완료');
            currentTournamentId = tournamentId;
            showTournamentLinkScreen(tournamentId, formData);
        })
        .catch(function(error) {
            console.error('❌ 정모 생성 실패:', error);
            alert('정모 생성 실패: ' + error.message + '\n\n인터넷 연결 또는 보안 규칙을 확인하세요.');
        })
        .then(function() {
            // 성공/실패 모두 버튼 복구 (finally 대용)
            btnCreateTournament.disabled = false;
            btnCreateTournament.textContent = '정모 만들기 →';
        });
}

// =========================================
// 정모 참여 (C2-2)
// =========================================

// 현재 참여 화면에 띄워진 정모 정보 (참여 버튼 클릭 시 사용)
let pendingTournamentJoin = null;
// { tournamentId, tournamentData, courseHandicap }

// 정모 참여 확인 화면 표시
function showTournamentJoinScreen(tournamentId, tournamentData, hostName, memberCount) {
    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('프로필이 설정되지 않았습니다. 먼저 이름을 설정해주세요.');
        openProfileScreen();
        return;
    }

    // 화면 초기화
    tournamentJoinLoading.classList.add('hidden');
    tournamentJoinError.classList.add('hidden');
    tournamentJoinInfoCard.classList.remove('hidden');
    tournamentJoinMyProfile.classList.remove('hidden');
    btnConfirmTournamentJoin.disabled = false;
    btnConfirmTournamentJoin.textContent = '✅ 정모 참여하기';

    // 정모 정보 채우기
    tournamentJoinName.textContent = tournamentData.name;
    tournamentJoinCode.textContent = tournamentId;
    tournamentJoinCourse.textContent = tournamentData.courseName;
    tournamentJoinDate.textContent = tournamentData.date;
    tournamentJoinHost.textContent = hostName;
    tournamentJoinMode.textContent = tournamentData.gameMode === 'net' ? 'Net (핸디 적용)' : 'Gross (총 타수)';
    tournamentJoinMemberCount.textContent = memberCount + ' / ' + tournamentData.maxMembers + '명';

    // 본인 정보 채우기
    tournamentJoinMyName.textContent = profile.name;

    // Net 모드면 핸디 표시 (Gross는 핸디 행 숨김)
    let courseHandicap = 0;
    if (tournamentData.gameMode === 'net') {
        courseHandicap = (profile.handicapIndex !== null && profile.handicapIndex !== undefined)
            ? calculateCourseHandicap(profile.handicapIndex)
            : 0;

        tournamentJoinMyHandicap.textContent = profile.handicapIndex !== null ? profile.handicapIndex : '-';
        tournamentJoinMyCourseHandicap.textContent = courseHandicap;

        tournamentJoinMyHandicapRow.classList.remove('hidden');
        tournamentJoinMyCourseHandicapRow.classList.remove('hidden');
    } else {
        tournamentJoinMyHandicapRow.classList.add('hidden');
        tournamentJoinMyCourseHandicapRow.classList.add('hidden');
    }

    // 참여 대기 상태 보관
    pendingTournamentJoin = {
        tournamentId: tournamentId,
        tournamentData: tournamentData,
        courseHandicap: courseHandicap
    };

    showScreen(screenTournamentJoin);
}

// 실제 정모 참여 (Firestore에 멤버 등록)
function joinTournament() {
    if (pendingTournamentJoin === null) {
        alert('참여할 정모 정보가 없습니다. 페이지를 새로고침하고 다시 시도해주세요.');
        return;
    }
    if (currentUser === null) {
        alert('로그인 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('프로필이 설정되지 않았습니다.');
        return;
    }

    const tournamentId = pendingTournamentJoin.tournamentId;
    const tournamentData = pendingTournamentJoin.tournamentData;
    const courseHandicap = pendingTournamentJoin.courseHandicap;
    const userId = currentUser.uid;

    console.log('🟢 정모 참여 시작:', tournamentId, '/', profile.name);

    // 더블클릭 방지
    btnConfirmTournamentJoin.disabled = true;
    btnConfirmTournamentJoin.textContent = '참여 중...';

    // 1. 다시 한번 cap 검증 (race condition 대비)
    db.collection('tournaments').doc(tournamentId).collection('members').get()
        .then(function(membersSnapshot) {
            if (membersSnapshot.size >= tournamentData.maxMembers) {
                throw new Error('FULL');
            }

            // 2. 본인이 이미 멤버인지 다시 한번 확인 (중복 방지)
            const alreadyMember = membersSnapshot.docs.some(function(doc) {
                return doc.id === userId;
            });
            if (alreadyMember) {
                throw new Error('ALREADY_JOINED');
            }

            // 3. 멤버 등록
            const memberData = {
                name: profile.name,
                handicapIndex: profile.handicapIndex !== null ? profile.handicapIndex : null,
                courseHandicap: courseHandicap,
                teamId: null,
                scores: new Array(18).fill(null),
                putts: new Array(18).fill(null),
                currentHole: 1,
                completed: false,
                joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };

            return db.collection('tournaments').doc(tournamentId)
                .collection('members').doc(userId).set(memberData);
        })
        .then(function() {
            console.log('✅ 정모 참여 완료');
            currentTournamentId = tournamentId;
            pendingTournamentJoin = null;

            // 버튼 복구
            btnConfirmTournamentJoin.disabled = false;
            btnConfirmTournamentJoin.textContent = '✅ 정모 참여하기';

            // 대기실로 진입
            enterTournamentWaitingRoom(tournamentId);
        })
        .catch(function(error) {
            console.error('❌ 정모 참여 실패:', error);

            if (error.message === 'FULL') {
                alert('정원이 찼습니다. 다른 분이 먼저 참여한 것 같아요.');
            } else if (error.message === 'ALREADY_JOINED') {
                alert('이미 참여 중인 정모입니다.');
                showScreen(screenMain);
            } else {
                alert('정모 참여 실패: ' + error.message);
            }
            btnConfirmTournamentJoin.disabled = false;
            btnConfirmTournamentJoin.textContent = '✅ 정모 참여하기';
        });
}

// =========================================
// 정모 대기실 (C2-3)
// =========================================

// 대기실 onSnapshot 리스너 (메모리 누수 방지용 unsubscribe 핸들)
let tournamentWaitingTournamentUnsub = null;  // tournaments/{id} 문서
let tournamentWaitingMembersUnsub = null;     // tournaments/{id}/members 컬렉션

// 현재 대기실에 표시된 멤버 ID 목록 (애니메이션용)
let lastWaitingMemberIds = new Set();

// 대기실 진입 (호스트든 게스트든 공통)
function enterTournamentWaitingRoom(tournamentId) {
    if (!tournamentId) {
        console.error('❌ enterTournamentWaitingRoom: tournamentId 없음');
        return;
    }

    currentTournamentId = tournamentId;

    // 이전 리스너 정리 (중복 방지)
    cleanupTournamentWaitingListeners();
    lastWaitingMemberIds = new Set();

    // UI 초기화
    waitingTournamentName.textContent = '🏌️ 정모 대기실';
    waitingTournamentMeta.textContent = '정보 로딩 중...';
    waitingCodeDisplay.textContent = tournamentId;
    waitingLinkDisplay.value = buildTournamentLink(tournamentId);
    waitingMembersList.innerHTML = '';
    waitingMembersCount.textContent = '...';
    waitingCodeCopyFeedback.classList.add('hidden');
    waitingLinkCopyFeedback.classList.add('hidden');

    // 안내 박스 일단 숨김 (아래 호스트 판별 후 결정)
    waitingHostNotice.classList.add('hidden');
    waitingGuestNotice.classList.add('hidden');
    btnGoToTeamAssignment.classList.add('hidden');
    btnAddProxyMember.classList.add('hidden');
    btnLeaveTournament.classList.add('hidden');
    waitingLinkSection.classList.add('hidden');

    showScreen(screenTournamentWaiting);

    // Firestore 리스너 시작
    const tournamentRef = db.collection('tournaments').doc(tournamentId);

    // 1. 정모 본 문서 리스너 (status 변경 감지 - 라운드 시작 등)
    tournamentWaitingTournamentUnsub = tournamentRef.onSnapshot(function(doc) {
        if (!doc.exists) {
            console.warn('⚠️ 정모가 삭제되었습니다');
            // 호스트가 본인이 취소한 경우엔 별도 alert 안 띄움 (이미 cancelTournamentAsHost가 처리)
            const wasHost = currentUser !== null && currentTournamentHostId === currentUser.uid;
            if (!wasHost) {
                alert('정모가 취소되었습니다.\n메인 화면으로 돌아갑니다.');
            }
            leaveTournamentWaitingRoom();
            return;
        }

        const tData = doc.data();
        renderTournamentWaitingHeader(tournamentId, tData);

        // C4-1: status 변화 감지 → 자동 화면 전환
        if (tData.status === 'in_progress') {
            console.log('🏌️ 정모 시작 감지 → 라운드 화면 진입');
            if (!screenHoleInput.classList.contains('hidden') &&
                currentRound !== null &&
                currentRound.tournamentId === currentTournamentId) {
                console.log('이미 라운드 화면 — 중복 진입 방지');
                return;
            }
            currentTournamentDoc = tData;
            enterTournamentRound(currentTournamentId, tData);
            return;
        }
        if (tData.status === 'completed') {
            console.log('🏁 정모 종료 감지 (대기실 중)');
            enterTournamentResultScreen(tData);
        }
    }, function(error) {
        console.error('❌ 정모 리스너 오류:', error);
    });

    // 2. 멤버 컬렉션 리스너 (참여/이탈 실시간 감지)
    tournamentWaitingMembersUnsub = tournamentRef.collection('members')
        .orderBy('joinedAt', 'asc')
        .onSnapshot(function(snapshot) {
            const members = [];
            snapshot.forEach(function(doc) {
                members.push({ id: doc.id, ...doc.data() });
            });
            console.log('🔄 대기실 멤버 업데이트:', members.length + '명');
            renderTournamentWaitingMembers(members);
        }, function(error) {
            console.error('❌ 대기실 멤버 리스너 오류:', error);
        });
}

function cleanupTournamentWaitingListeners() {
    if (tournamentWaitingTournamentUnsub !== null) {
        tournamentWaitingTournamentUnsub();
        tournamentWaitingTournamentUnsub = null;
        console.log('🧹 대기실 정모 리스너 해제');
    }
    if (tournamentWaitingMembersUnsub !== null) {
        tournamentWaitingMembersUnsub();
        tournamentWaitingMembersUnsub = null;
        console.log('🧹 대기실 멤버 리스너 해제');
    }
}

// C4-1: 정모 라운드 진입 (호스트/게스트 공통)
function enterTournamentRound(tournamentId, tournamentDoc) {
    if (currentUser === null) {
        alert('로그인 정보가 없습니다. 새로고침해주세요.');
        return;
    }

    console.log('🏌️ 정모 라운드 진입:', tournamentId);

    db.collection('tournaments').doc(tournamentId)
        .collection('members').doc(currentUser.uid).get()
        .then(function(memberDoc) {
            if (!memberDoc.exists) {
                alert('이 정모의 멤버가 아닙니다.\n\n메인 화면으로 돌아갑니다.');
                cleanupTournamentWaitingListeners();
                showScreen(screenMain);
                return;
            }

            const memberData = memberDoc.data();
            const isHost = (currentUser.uid === tournamentDoc.hostId);

            myTournamentTeamId = memberData.teamId || null;

            currentRound = {
                id: tournamentId,
                tournamentId: tournamentId,
                courseName: tournamentDoc.courseName,
                date: tournamentDoc.date || new Date().toISOString().split('T')[0],
                pars: tournamentDoc.pars,
                scores: memberData.scores || new Array(18).fill(null),
                putts: memberData.putts || new Array(18).fill(null),
                currentHole: memberData.currentHole || 1,
                completed: memberData.completed || false,
                gameMode: tournamentDoc.gameMode,
                courseHandicap: memberData.courseHandicap || 0,
                isShared: true,
                isHost: isHost,
                shareCode: null,
                teamId: myTournamentTeamId
            };

            showScreen(screenHoleInput);
            renderTournamentModeBadge(tournamentDoc);
            renderHoleInputScreen();
            // C4-3: 본인 팀 멤버 onSnapshot 시작
            subscribeTournamentTeamMembers(tournamentId, myTournamentTeamId);

            // C4-7: 새로고침 시 자동 복귀 위해 URL에 ?t=정모코드 유지
            try {
                const targetSearch = '?t=' + tournamentId;
                if (window.location.search !== targetSearch) {
                    window.history.replaceState({}, '', window.location.pathname + targetSearch);
                    console.log('🔗 URL 갱신:', targetSearch);
                }
            } catch (e) { /* 무시 */ }

            console.log('✅ 정모 라운드 진입 완료. 현재 홀:', currentRound.currentHole);
        })
        .catch(function(error) {
            console.error('❌ 정모 라운드 진입 실패:', error);
            alert('정모 라운드 진입 실패: ' + error.message + '\n\n메인 화면으로 돌아갑니다.');
            cleanupTournamentWaitingListeners();
            showScreen(screenMain);
        });
}

// C4-3: 정모 본인 팀 멤버 라이브 구독 (미니 스트립용)
function subscribeTournamentTeamMembers(tournamentId, teamId) {
    if (tournamentRoundMembersUnsub !== null) {
        tournamentRoundMembersUnsub();
        tournamentRoundMembersUnsub = null;
    }

    if (teamId === null || teamId === undefined) {
        console.warn('⚠️ 본인 팀 ID 없음 — 미니 스트립 표시 안 함');
        return;
    }

    console.log('👥 정모 팀 멤버 구독 시작:', teamId);

    tournamentRoundMembersUnsub = db.collection('tournaments').doc(tournamentId)
        .collection('members').where('teamId', '==', teamId)
        .onSnapshot(function(snapshot) {
            var newMembersData = {};
            snapshot.forEach(function(doc) {
                newMembersData[doc.id] = doc.data();
            });
            allMembersData = newMembersData;
            console.log('🔄 팀 멤버 데이터 갱신:', Object.keys(allMembersData).length + '명');

            if (!screenHoleInput.classList.contains('hidden')) {
                renderMembersStripThrottled();
            }
        }, function(error) {
            console.error('❌ 팀 멤버 구독 에러:', error);
        });
}

// C4-3: 정모 라운드 떠날 때 정리
function cleanupTournamentRoundListeners() {
    if (tournamentRoundMembersUnsub !== null) {
        tournamentRoundMembersUnsub();
        tournamentRoundMembersUnsub = null;
        console.log('🧹 정모 팀 멤버 구독 해제');
    }
    if (roundTournamentStatusUnsub !== null) {
        roundTournamentStatusUnsub();
        roundTournamentStatusUnsub = null;
        console.log('🧹 라운드 tournament status 구독 해제');
    }
    flushAndClearTournamentScoreSync();
    myTournamentTeamId = null;
    allMembersData = {};
    cleanupLeaderboardListener();
    try {
        if (window.location.search) {
            window.history.replaceState({}, '', window.location.pathname);
        }
    } catch (e) { /* 무시 */ }
}

// C4-4: 리더보드 화면 진입 — 정모 전체 멤버 구독 시작
function showLeaderboardScreen() {
    if (currentRound === null || !currentRound.tournamentId) {
        alert('정모 라운드 정보가 없습니다.');
        return;
    }

    const tournamentId = currentRound.tournamentId;
    leaderboardMeta.textContent = currentRound.courseName + ' · ' + currentRound.date;
    leaderboardModeBadge.textContent = currentRound.gameMode === 'net' ? 'Net' : 'Gross';

    leaderboardList.innerHTML = '';
    leaderboardTeamList.innerHTML = '';
    leaderboardTeams = [];
    autoEndConfirmShown = false;
    leaderboardStatus.classList.remove('hidden');

    var isHost = currentUser && currentTournamentDoc && currentUser.uid === currentTournamentDoc.hostId;
    if (isHost) {
        btnEndTournament.classList.remove('hidden');
    } else {
        btnEndTournament.classList.add('hidden');
    }

    showScreen(screenLeaderboard);

    fetchLeaderboardTeams(tournamentId);
    subscribeAllTournamentMembers(tournamentId);
}

// C5: 호스트가 정모 종료 버튼 클릭 or 자동 종료 확인
function handleEndTournament() {
    if (!currentTournamentDoc || !currentUser) return;
    var tournamentId = currentTournamentDoc.id || currentRound.tournamentId;
    if (!tournamentId) { alert('정모 ID를 찾을 수 없습니다.'); return; }

    btnEndTournament.disabled = true;
    btnEndTournament.textContent = '⏳ 종료 중...';

    db.collection('tournaments').doc(tournamentId).update({
        status: 'completed',
        completedAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(function() {
        console.log('🏁 정모 종료 처리 완료:', tournamentId);
        // subscribeTournamentStatusForRound의 completed 감지가 enterTournamentResultScreen 호출
    }).catch(function(error) {
        console.error('❌ 정모 종료 실패:', error);
        alert('정모 종료에 실패했습니다.\n\n오류: ' + error.message);
        btnEndTournament.disabled = false;
        btnEndTournament.textContent = '🏁 정모 종료';
    });
}

// C4-5: 팀 정보 one-shot fetch (리더보드 팀 순위용)
function fetchLeaderboardTeams(tournamentId) {
    db.collection('tournaments').doc(tournamentId)
        .collection('teams').get()
        .then(function(snapshot) {
            leaderboardTeams = [];
            snapshot.forEach(function(doc) {
                var data = doc.data();
                data.id = doc.id;
                leaderboardTeams.push(data);
            });
            console.log('🏆 리더보드 팀 정보 fetch:', leaderboardTeams.length + '개');
            if (leaderboardAllMembers.length > 0) {
                renderLeaderboard();
            }
        })
        .catch(function(error) {
            console.error('❌ 팀 정보 fetch 실패:', error);
            leaderboardTeams = [];
            renderLeaderboard();
        });
}

// C4-4: 정모 전체 멤버 구독 (리더보드 전용)
function subscribeAllTournamentMembers(tournamentId) {
    if (leaderboardMembersUnsub !== null) {
        leaderboardMembersUnsub();
        leaderboardMembersUnsub = null;
    }

    console.log('🏆 리더보드 — 정모 전체 멤버 구독 시작:', tournamentId);

    leaderboardMembersUnsub = db.collection('tournaments').doc(tournamentId)
        .collection('members')
        .onSnapshot(function(snapshot) {
            leaderboardAllMembers = [];
            snapshot.forEach(function(doc) {
                var data = doc.data();
                data.id = doc.id;
                leaderboardAllMembers.push(data);
            });
            console.log('🔄 리더보드 데이터 갱신:', leaderboardAllMembers.length + '명');

            leaderboardStatus.classList.add('hidden');
            renderLeaderboardThrottled();
        }, function(error) {
            console.error('❌ 리더보드 구독 에러:', error);
            leaderboardStatus.textContent = '❌ 데이터 로딩 실패: ' + error.message;
        });
}

// C4-4: 리더보드 떠날 때 정리
function cleanupLeaderboardListener() {
    if (leaderboardMembersUnsub !== null) {
        leaderboardMembersUnsub();
        leaderboardMembersUnsub = null;
        console.log('🧹 리더보드 구독 해제');
    }
    leaderboardAllMembers = [];
    leaderboardTeams = [];
}

// C5: 정모 결과 화면 진입
function enterTournamentResultScreen(tournamentDocData) {
    var tDoc = tournamentDocData || currentTournamentDoc;
    if (!tDoc) { alert('정모 정보를 찾을 수 없습니다.'); showScreen(screenMain); return; }
    var tournamentId = tDoc.id || (currentRound && currentRound.tournamentId);
    if (!tournamentId) { alert('정모 ID를 찾을 수 없습니다.'); showScreen(screenMain); return; }

    resultTournamentDoc = tDoc;
    resultMembers = [];
    resultTeams = [];

    cleanupLeaderboardListener();
    cleanupTournamentRoundListeners();

    resultTournamentMeta.textContent = (tDoc.courseName || '-') + ' · ' + (tDoc.date || '-');
    showScreen(screenTournamentResult);

    // 멤버 + 팀 one-shot fetch
    Promise.all([
        db.collection('tournaments').doc(tournamentId).collection('members').get(),
        db.collection('tournaments').doc(tournamentId).collection('teams').get()
    ]).then(function(results) {
        results[0].forEach(function(doc) {
            var d = doc.data(); d.id = doc.id; resultMembers.push(d);
        });
        results[1].forEach(function(doc) {
            var d = doc.data(); d.id = doc.id; resultTeams.push(d);
        });
        renderTournamentResult();
    }).catch(function(err) {
        console.error('❌ 결과 데이터 로딩 실패:', err);
        resultRankingsList.innerHTML = '<p class="hint">데이터 로딩 실패: ' + err.message + '</p>';
    });
}

// C5: 결과 화면 렌더링 (우승자 + 순위 + 팀 + 나의 스코어카드)
function renderTournamentResult() {
    if (!resultTournamentDoc || resultMembers.length === 0) return;
    var pars = resultTournamentDoc.pars || new Array(18).fill(4);
    var isNetMode = resultTournamentDoc.gameMode === 'net';
    var myUid = currentUser ? currentUser.uid : null;

    var memberStats = resultMembers.map(function(m) { return computeMemberStats(m, pars); });

    memberStats.sort(function(a, b) {
        if (a.playedHoles === 0 && b.playedHoles > 0) return 1;
        if (b.playedHoles === 0 && a.playedHoles > 0) return -1;
        if (a.playedHoles === 0 && b.playedHoles === 0) return a.name.localeCompare(b.name);
        var aKey = isNetMode ? a.netOverPar : a.grossOverPar;
        var bKey = isNetMode ? b.netOverPar : b.grossOverPar;
        if (aKey !== bKey) return aKey - bKey;
        return a.name.localeCompare(b.name);
    });

    // 우승자 카드
    var winner = memberStats[0];
    if (winner && winner.playedHoles > 0) {
        resultWinnerName.textContent = winner.name;
        var scoreStr = isNetMode
            ? (winner.net.toFixed(1) + ' (' + formatOverUnder(winner.netOverPar) + ')')
            : (winner.total + '타 (' + formatOverUnder(winner.grossOverPar) + ')');
        resultWinnerScore.textContent = scoreStr;
    } else {
        resultWinnerName.textContent = '-';
        resultWinnerScore.textContent = '';
    }

    // 개인 순위
    renderResultRankings(memberStats, isNetMode, myUid);

    // 팀 순위
    if (resultTeams.length > 0) {
        resultTeamSectionTitle.classList.remove('hidden');
        resultTeamRankingsList.classList.remove('hidden');
        renderResultTeamRankings(memberStats, isNetMode);
    } else {
        resultTeamSectionTitle.classList.add('hidden');
        resultTeamRankingsList.classList.add('hidden');
    }

    // 나의 스코어카드
    var myMember = resultMembers.find(function(m) { return m.id === myUid; });
    renderMyScorecard(myMember, pars, isNetMode);
}

function renderResultRankings(memberStats, isNetMode, myUid) {
    resultRankingsList.innerHTML = '';
    var rank = 0;
    memberStats.forEach(function(s, idx) {
        rank = idx + 1;
        var row = document.createElement('div');
        row.className = 'leaderboard-row';
        if (s.id === myUid) row.classList.add('leaderboard-row-me');

        var rankEl = document.createElement('span');
        rankEl.className = 'lb-rank';
        rankEl.textContent = s.playedHoles === 0 ? '-' : rank;
        row.appendChild(rankEl);

        var nameEl = document.createElement('span');
        nameEl.className = 'lb-name';
        nameEl.textContent = s.name + (s.id === myUid ? ' (나)' : '');
        row.appendChild(nameEl);

        var holeEl = document.createElement('span');
        holeEl.className = 'lb-hole';
        holeEl.textContent = s.completed ? '✓ 18홀' : (s.playedHoles + '/18');
        row.appendChild(holeEl);

        var scoreEl = document.createElement('span');
        scoreEl.className = 'lb-score';
        if (s.playedHoles === 0) {
            scoreEl.textContent = '-';
        } else if (isNetMode) {
            scoreEl.textContent = s.net.toFixed(1) + ' (' + formatOverUnder(s.netOverPar) + ')';
        } else {
            scoreEl.textContent = s.total + '타 (' + formatOverUnder(s.grossOverPar) + ')';
        }
        row.appendChild(scoreEl);

        resultRankingsList.appendChild(row);
    });
}

function renderResultTeamRankings(memberStats, isNetMode) {
    var teamStatsMap = {};
    resultTeams.forEach(function(t) {
        teamStatsMap[t.id] = {
            teamId: t.id, teamName: t.name, colorIndex: t.colorIndex,
            memberCount: 0, totalGross: 0, totalPlayedHoles: 0,
            totalPar: 0, totalProRatedHandicap: 0
        };
    });
    memberStats.forEach(function(s) {
        if (!s.teamId || !teamStatsMap[s.teamId]) return;
        var t = teamStatsMap[s.teamId];
        t.memberCount++;
        t.totalGross += s.total;
        t.totalPlayedHoles += s.playedHoles;
        t.totalPar += s.totalPar;
        t.totalProRatedHandicap += s.proRatedHandicap;
    });
    var teamList = Object.values(teamStatsMap).map(function(t) {
        t.grossOverPar = t.totalGross - t.totalPar;
        t.totalNet = Math.round((t.totalGross - t.totalProRatedHandicap) * 10) / 10;
        t.netOverPar = Math.round((t.grossOverPar - t.totalProRatedHandicap) * 10) / 10;
        t.sortKey = isNetMode ? t.netOverPar : t.grossOverPar;
        return t;
    });
    teamList.sort(function(a, b) {
        if (a.totalPlayedHoles === 0 && b.totalPlayedHoles > 0) return 1;
        if (b.totalPlayedHoles === 0 && a.totalPlayedHoles > 0) return -1;
        return a.sortKey - b.sortKey;
    });

    resultTeamRankingsList.innerHTML = '';
    teamList.forEach(function(t, idx) {
        var color = (TEAM_COLORS && TEAM_COLORS[t.colorIndex]) || { main: '#64748b', bg: '#f1f5f9' };
        var row = document.createElement('div');
        row.className = 'leaderboard-row leaderboard-team-row';
        row.style.backgroundColor = color.bg;
        row.style.borderLeft = '4px solid ' + color.main;

        var rankEl = document.createElement('span');
        rankEl.className = 'lb-rank';
        rankEl.textContent = t.totalPlayedHoles === 0 ? '-' : (idx + 1);
        row.appendChild(rankEl);

        var nameEl = document.createElement('span');
        nameEl.className = 'lb-name';
        nameEl.style.color = color.main;
        nameEl.style.fontWeight = '700';
        nameEl.textContent = t.teamName + ' (' + t.memberCount + '명)';
        row.appendChild(nameEl);

        var holeEl = document.createElement('span');
        holeEl.className = 'lb-hole';
        holeEl.textContent = t.totalPlayedHoles + '/' + (t.memberCount * 18);
        row.appendChild(holeEl);

        var scoreEl = document.createElement('span');
        scoreEl.className = 'lb-score';
        if (t.totalPlayedHoles === 0) {
            scoreEl.textContent = '-';
        } else if (isNetMode) {
            scoreEl.textContent = t.totalNet.toFixed(1) + ' (' + formatOverUnder(t.netOverPar) + ')';
        } else {
            scoreEl.textContent = t.totalGross + '타 (' + formatOverUnder(t.grossOverPar) + ')';
        }
        row.appendChild(scoreEl);
        resultTeamRankingsList.appendChild(row);
    });
}

function renderMyScorecard(myMember, pars, isNetMode) {
    resultMyScorecard.innerHTML = '';
    if (!myMember) {
        resultMyScorecard.innerHTML = '<p class="hint">나의 스코어 데이터 없음</p>';
        return;
    }
    var scores = myMember.scores || [];
    var courseHandicap = myMember.courseHandicap || 0;

    var table = document.createElement('div');
    table.className = 'scorecard-table';

    // 헤더 행
    var header = document.createElement('div');
    header.className = 'scorecard-row scorecard-header';
    ['홀', 'Par', '타수', '+/-'].forEach(function(h) {
        var cell = document.createElement('span');
        cell.textContent = h;
        header.appendChild(cell);
    });
    table.appendChild(header);

    var totalScore = 0;
    var totalPar = 0;
    for (var i = 0; i < 18; i++) {
        var par = pars[i] || 4;
        var score = (scores[i] !== null && scores[i] !== undefined) ? scores[i] : null;
        totalPar += par;
        if (score !== null) totalScore += score;

        var row = document.createElement('div');
        row.className = 'scorecard-row';

        var holeCell = document.createElement('span');
        holeCell.textContent = i + 1;
        row.appendChild(holeCell);

        var parCell = document.createElement('span');
        parCell.textContent = par;
        row.appendChild(parCell);

        var scoreCell = document.createElement('span');
        scoreCell.textContent = score !== null ? score : '-';
        row.appendChild(scoreCell);

        var diffCell = document.createElement('span');
        if (score !== null) {
            var diff = score - par;
            diffCell.textContent = diff === 0 ? 'E' : (diff > 0 ? '+' + diff : diff);
            diffCell.className = diff < 0 ? 'score-under' : (diff > 1 ? 'score-double' : (diff === 1 ? 'score-bogey' : ''));
        } else {
            diffCell.textContent = '-';
        }
        row.appendChild(diffCell);
        table.appendChild(row);
    }

    // 합계 행
    var totalRow = document.createElement('div');
    totalRow.className = 'scorecard-row scorecard-total';
    var totalOverPar = totalScore - totalPar;
    [
        '합계', totalPar,
        totalScore || '-',
        totalScore ? formatOverUnder(totalOverPar) : '-'
    ].forEach(function(val) {
        var cell = document.createElement('span');
        cell.textContent = val;
        totalRow.appendChild(cell);
    });
    table.appendChild(totalRow);

    if (isNetMode && courseHandicap) {
        var netRow = document.createElement('div');
        netRow.className = 'scorecard-row scorecard-net';
        var netScore = Math.round((totalScore - courseHandicap) * 10) / 10;
        var netOverPar = Math.round((totalOverPar - courseHandicap) * 10) / 10;
        ['Net', '-', netScore, formatOverUnder(netOverPar)].forEach(function(val) {
            var cell = document.createElement('span');
            cell.textContent = val;
            netRow.appendChild(cell);
        });
        table.appendChild(netRow);
    }

    resultMyScorecard.appendChild(table);
}

// C4-5: 멤버 1명의 통계 계산 (Gross + Net 양쪽)
function computeMemberStats(member, pars) {
    var scores = member.scores || new Array(18).fill(null);
    var total = 0;
    var totalPar = 0;
    var playedHoles = 0;
    for (var i = 0; i < 18; i++) {
        if (scores[i] !== null && scores[i] !== undefined) {
            total += scores[i];
            totalPar += pars[i];
            playedHoles++;
        }
    }
    var grossOverPar = total - totalPar;
    var courseHandicap = (member.courseHandicap !== null && member.courseHandicap !== undefined)
        ? member.courseHandicap : 0;
    var proRatedHandicap = playedHoles > 0 ? (playedHoles / 18) * courseHandicap : 0;
    var net = total - proRatedHandicap;
    var netOverPar = grossOverPar - proRatedHandicap;
    var completed = member.completed === true || playedHoles === 18;

    return {
        id: member.id,
        name: member.name || '?',
        teamId: member.teamId,
        playedHoles: playedHoles,
        total: total,
        totalPar: totalPar,
        grossOverPar: grossOverPar,
        net: Math.round(net * 10) / 10,
        netOverPar: Math.round(netOverPar * 10) / 10,
        courseHandicap: courseHandicap,
        proRatedHandicap: proRatedHandicap,
        completed: completed
    };
}

// C4-5: overUnder 값을 표시 문자열로
function formatOverUnder(value) {
    if (value === 0) return 'E';
    if (value > 0) return '+' + value;
    return String(value);
}

// C4-4/C4-5: 리더보드 렌더링 (Gross/Net 자동 분기 + 팀 순위)
function renderLeaderboard() {
    if (currentRound === null || !currentRound.pars) {
        leaderboardList.innerHTML = '<p class="hint">정모 정보 누락</p>';
        leaderboardTeamList.innerHTML = '';
        return;
    }

    var pars = currentRound.pars;
    var isNetMode = currentRound.gameMode === 'net';
    var myUid = currentUser ? currentUser.uid : null;

    // === 1. 개인 통계 계산 ===
    var memberStats = leaderboardAllMembers.map(function(m) {
        return computeMemberStats(m, pars);
    });

    // === 2. 개인 정렬 ===
    memberStats.sort(function(a, b) {
        if (a.playedHoles === 0 && b.playedHoles > 0) return 1;
        if (b.playedHoles === 0 && a.playedHoles > 0) return -1;
        if (a.playedHoles === 0 && b.playedHoles === 0) return a.name.localeCompare(b.name);
        var aKey = isNetMode ? a.netOverPar : a.grossOverPar;
        var bKey = isNetMode ? b.netOverPar : b.grossOverPar;
        if (aKey !== bKey) return aKey - bKey;
        if (a.playedHoles !== b.playedHoles) return b.playedHoles - a.playedHoles;
        return a.name.localeCompare(b.name);
    });

    // === 3. 개인 순위 부여 ===
    var prevKey = null;
    var prevPlayed = null;
    var currentRankVal = 0;
    var displayedCount = 0;
    memberStats.forEach(function(s) {
        displayedCount++;
        var key = isNetMode ? s.netOverPar : s.grossOverPar;
        if (s.playedHoles === 0) {
            s.rank = '-';
        } else if (prevKey === null || key !== prevKey || s.playedHoles !== prevPlayed) {
            currentRankVal = displayedCount;
            s.rank = currentRankVal;
            prevKey = key;
            prevPlayed = s.playedHoles;
        } else {
            s.rank = currentRankVal;
        }
    });

    // === 4. 개인 DOM 렌더링 ===
    leaderboardList.innerHTML = '';
    if (memberStats.length === 0) {
        leaderboardList.innerHTML = '<p class="hint">멤버 정보 없음</p>';
    } else {
        memberStats.forEach(function(s) {
            var row = document.createElement('div');
            row.className = 'leaderboard-row';
            if (s.id === myUid) row.classList.add('leaderboard-row-me');
            if (s.completed) row.classList.add('leaderboard-row-completed');

            var rankEl = document.createElement('span');
            rankEl.className = 'lb-rank';
            rankEl.textContent = (s.rank === '-') ? '-' : s.rank;
            row.appendChild(rankEl);

            var nameEl = document.createElement('span');
            nameEl.className = 'lb-name';
            nameEl.textContent = s.name + (s.id === myUid ? ' (나)' : '');
            row.appendChild(nameEl);

            var holeEl = document.createElement('span');
            holeEl.className = 'lb-hole';
            holeEl.textContent = s.completed ? '✓ 18홀' : (s.playedHoles + '/18');
            row.appendChild(holeEl);

            var scoreEl = document.createElement('span');
            scoreEl.className = 'lb-score';
            if (s.playedHoles === 0) {
                scoreEl.textContent = '-';
            } else if (isNetMode) {
                scoreEl.textContent = s.net.toFixed(1) + ' (' + formatOverUnder(s.netOverPar) + ')';
            } else {
                scoreEl.textContent = s.total + '타 (' + formatOverUnder(s.grossOverPar) + ')';
            }
            row.appendChild(scoreEl);

            leaderboardList.appendChild(row);
        });
    }

    // === 5. 팀별 합계 계산 ===
    if (leaderboardTeams.length === 0) {
        leaderboardTeamList.innerHTML = '<p class="hint">팀 정보 로딩 중...</p>';
        return;
    }

    var teamStatsMap = {};
    leaderboardTeams.forEach(function(t) {
        teamStatsMap[t.id] = {
            teamId: t.id,
            teamName: t.name,
            colorIndex: t.colorIndex,
            memberCount: 0,
            totalGross: 0,
            totalPlayedHoles: 0,
            totalPar: 0,
            totalProRatedHandicap: 0,
            membersStarted: 0
        };
    });

    memberStats.forEach(function(s) {
        if (!s.teamId || !teamStatsMap[s.teamId]) return;
        var t = teamStatsMap[s.teamId];
        t.memberCount++;
        t.totalGross += s.total;
        t.totalPlayedHoles += s.playedHoles;
        t.totalPar += s.totalPar;
        t.totalProRatedHandicap += s.proRatedHandicap;
        if (s.playedHoles > 0) t.membersStarted++;
    });

    var teamStatsList = Object.keys(teamStatsMap).map(function(tid) {
        var t = teamStatsMap[tid];
        t.grossOverPar = t.totalGross - t.totalPar;
        t.totalNet = Math.round((t.totalGross - t.totalProRatedHandicap) * 10) / 10;
        t.netOverPar = Math.round((t.grossOverPar - t.totalProRatedHandicap) * 10) / 10;
        t.sortKey = isNetMode ? t.netOverPar : t.grossOverPar;
        return t;
    });

    // === 6. 팀 정렬 ===
    teamStatsList.sort(function(a, b) {
        if (a.totalPlayedHoles === 0 && b.totalPlayedHoles > 0) return 1;
        if (b.totalPlayedHoles === 0 && a.totalPlayedHoles > 0) return -1;
        if (a.totalPlayedHoles === 0 && b.totalPlayedHoles === 0) return (a.colorIndex || 0) - (b.colorIndex || 0);
        if (a.sortKey !== b.sortKey) return a.sortKey - b.sortKey;
        if (a.totalPlayedHoles !== b.totalPlayedHoles) return b.totalPlayedHoles - a.totalPlayedHoles;
        return (a.colorIndex || 0) - (b.colorIndex || 0);
    });

    // === 7. 팀 순위 부여 ===
    var prevTeamKey = null;
    var prevTeamPlayed = null;
    var currentTeamRank = 0;
    var teamDisplayed = 0;
    teamStatsList.forEach(function(t) {
        teamDisplayed++;
        if (t.totalPlayedHoles === 0) {
            t.rank = '-';
        } else if (prevTeamKey === null || t.sortKey !== prevTeamKey || t.totalPlayedHoles !== prevTeamPlayed) {
            currentTeamRank = teamDisplayed;
            t.rank = currentTeamRank;
            prevTeamKey = t.sortKey;
            prevTeamPlayed = t.totalPlayedHoles;
        } else {
            t.rank = currentTeamRank;
        }
    });

    // === 8. 팀 DOM 렌더링 ===
    leaderboardTeamList.innerHTML = '';
    if (teamStatsList.length === 0) {
        leaderboardTeamList.innerHTML = '<p class="hint">팀 정보 없음</p>';
        return;
    }

    teamStatsList.forEach(function(t) {
        var color = (TEAM_COLORS && TEAM_COLORS[t.colorIndex]) || { main: '#64748b', bg: '#f1f5f9' };

        var row = document.createElement('div');
        row.className = 'leaderboard-row leaderboard-team-row';
        row.style.backgroundColor = color.bg;
        row.style.borderLeft = '4px solid ' + color.main;

        var rankEl = document.createElement('span');
        rankEl.className = 'lb-rank';
        rankEl.textContent = (t.rank === '-') ? '-' : t.rank;
        row.appendChild(rankEl);

        var nameEl = document.createElement('span');
        nameEl.className = 'lb-name';
        nameEl.style.color = color.main;
        nameEl.style.fontWeight = '700';
        nameEl.textContent = t.teamName + ' (' + t.memberCount + '명)';
        row.appendChild(nameEl);

        var holeEl = document.createElement('span');
        holeEl.className = 'lb-hole';
        var totalPossible = t.memberCount * 18;
        holeEl.textContent = t.totalPlayedHoles + '/' + totalPossible;
        row.appendChild(holeEl);

        var scoreEl = document.createElement('span');
        scoreEl.className = 'lb-score';
        if (t.totalPlayedHoles === 0) {
            scoreEl.textContent = '-';
        } else if (isNetMode) {
            scoreEl.textContent = t.totalNet.toFixed(1) + ' (' + formatOverUnder(t.netOverPar) + ')';
        } else {
            scoreEl.textContent = t.totalGross + '타 (' + formatOverUnder(t.grossOverPar) + ')';
        }
        row.appendChild(scoreEl);

        leaderboardTeamList.appendChild(row);
    });

    // C5: 전원 완료 시 자동 종료 안내 (호스트에게만)
    if (!autoEndConfirmShown && memberStats.length > 0 &&
        memberStats.every(function(s) { return s.completed; })) {
        var isHost = currentUser && currentTournamentDoc &&
            currentUser.uid === currentTournamentDoc.hostId;
        if (isHost) {
            autoEndConfirmShown = true;
            setTimeout(function() {
                var go = confirm('🏁 모든 멤버가 라운드를 완료했습니다!\n\n정모를 종료하고 결과 화면으로 이동할까요?');
                if (go) handleEndTournament();
            }, 300);
        }
    }
}

// C4-6: 1초 throttle 적용된 리더보드 렌더링 (라이브 갱신용)
var renderLeaderboardThrottled = createThrottle(renderLeaderboard, RENDER_THROTTLE_MS);

// C4-1: 화면 3 상단 정모 배지 렌더링
function renderTournamentModeBadge(tournamentDoc) {
    const sharedBadge = document.getElementById('shared-mode-badge');
    if (sharedBadge) sharedBadge.classList.add('hidden');

    const tBadge = document.getElementById('tournament-mode-badge');
    const tBadgeName = document.getElementById('tournament-mode-badge-name');
    if (tBadge && tBadgeName) {
        tBadgeName.textContent = tournamentDoc.name || '정모';
        tBadge.classList.remove('hidden');
    }
}

// 대기실 헤더(이름·메타·정모 코드 안내) 렌더링
function renderTournamentWaitingHeader(tournamentId, tournamentData) {
    // 다른 함수에서 사용할 캐시
    currentTournamentHostId = tournamentData.hostId;
    currentTournamentMaxMembers = tournamentData.maxMembers;
    currentTournamentTeamCount = tournamentData.teamCount;

    waitingTournamentName.textContent = '🏌️ ' + tournamentData.name;

    const gameModeLabel = tournamentData.gameMode === 'net' ? 'Net' : 'Gross';
    waitingTournamentMeta.textContent = tournamentData.courseName + ' · ' +
                                        tournamentData.date + ' · ' +
                                        gameModeLabel;

    // 호스트인지 판별
    const isHost = currentUser !== null && currentUser.uid === tournamentData.hostId;

    if (isHost) {
        waitingHostNotice.classList.remove('hidden');
        waitingGuestNotice.classList.add('hidden');
        btnGoToTeamAssignment.classList.remove('hidden');
        btnGoToTeamAssignment.textContent = '🎯 팀 배정';
        btnAddProxyMember.classList.remove('hidden');
        btnLeaveTournament.classList.add('hidden');
        btnCancelTournament.classList.remove('hidden');
        // 호스트는 링크도 보임 (단톡방 공유)
        waitingLinkSection.classList.remove('hidden');
        updateTeamAssignmentButton();
    } else {
        waitingHostNotice.classList.add('hidden');
        waitingGuestNotice.classList.remove('hidden');
        btnGoToTeamAssignment.classList.add('hidden');
        btnAddProxyMember.classList.add('hidden');
        btnLeaveTournament.classList.remove('hidden');
        btnCancelTournament.classList.add('hidden');
        // 게스트는 링크 영역 숨김 (어차피 단톡방 공유는 호스트의 일)
        waitingLinkSection.classList.add('hidden');
    }
}

// 멤버 리스트 렌더링
function renderTournamentWaitingMembers(members) {
    if (currentUser === null) return;

    // C3-3: 팀 배정 화면용 캐시
    currentWaitingMembers = members;

    // 인원 카운트
    // tournament 데이터에서 maxMembers 가져오려면 해당 onSnapshot 데이터가 필요한데
    // 여기서는 우선 멤버 수만 표시. (cap 표시는 헤더 렌더링에서)
    // 추후 필요 시 tournament 데이터 캐시 활용
    const myUid = currentUser.uid;
    const myMember = members.find(function(m) { return m.id === myUid; });
    const isHost = members.some(function(m) {
        // 호스트는 별도 표시: tournament.hostId 활용
        // 여기서는 currentTournament 데이터 부재 시 일단 첫 멤버 가정 못하므로
        // tournamentWaitingTournamentUnsub의 lastDoc 데이터 가져오는 게 정석
        // 간단히: hostId는 정모 본 문서에 있고, 대기실 진입 시 캐시 가능
        return false;
    });

    // 정모 본 문서에서 hostId 가져오기 위해 별도로 캐시
    // (renderTournamentWaitingHeader에서 set, 여기서 read)
    const hostId = currentTournamentHostId;

    waitingMembersList.innerHTML = '';

    // 새로 들어온 멤버 ID 식별 (애니메이션용)
    const currentMemberIds = new Set(members.map(function(m) { return m.id; }));
    const justJoinedIds = new Set();
    currentMemberIds.forEach(function(id) {
        if (!lastWaitingMemberIds.has(id)) {
            justJoinedIds.add(id);
        }
    });

    members.forEach(function(member) {
        const div = document.createElement('div');
        div.className = 'waiting-member';

        const isMe = member.id === myUid;
        const isThisHost = member.id === hostId;
        const isProxy = member.proxyMember === true;
        const isMyProxy = isProxy && member.proxyHostId === myUid;

        if (isMe) div.classList.add('is-me');
        if (isThisHost) div.classList.add('is-host');
        if (justJoinedIds.has(member.id) && !lastWaitingMemberIds.has(member.id) && lastWaitingMemberIds.size > 0) {
            div.classList.add('just-joined');
        }

        // 이름 영역
        const nameWrap = document.createElement('div');
        nameWrap.className = 'waiting-member-name';

        const icon = document.createElement('span');
        icon.textContent = isThisHost ? '👑' : (isProxy ? '🤝' : '👤');
        nameWrap.appendChild(icon);

        const nameText = document.createElement('span');
        nameText.className = 'waiting-member-name-text';
        nameText.textContent = member.name + (isMe ? ' (나)' : '');
        nameWrap.appendChild(nameText);

        if (isThisHost) {
            const badge = document.createElement('span');
            badge.className = 'waiting-member-badge';
            badge.textContent = '호스트';
            nameWrap.appendChild(badge);
        }

        if (isProxy) {
            const proxyBadge = document.createElement('span');
            proxyBadge.className = 'waiting-member-badge waiting-member-badge-proxy';
            proxyBadge.textContent = '대리';
            nameWrap.appendChild(proxyBadge);
        }

        div.appendChild(nameWrap);

        // 핸디 표시
        const hcpSpan = document.createElement('span');
        hcpSpan.className = 'waiting-member-handicap';
        if (member.courseHandicap !== null && member.courseHandicap !== undefined) {
            hcpSpan.textContent = 'HCP ' + member.courseHandicap;
        } else {
            hcpSpan.textContent = '-';
        }
        div.appendChild(hcpSpan);

        // 호스트가 본인 프록시 삭제 버튼
        if (isMyProxy && hostId === myUid) {
            const delBtn = document.createElement('button');
            delBtn.className = 'btn-delete-proxy';
            delBtn.textContent = '🗑️';
            delBtn.addEventListener('click', function() {
                deleteProxyMember(member.id, member.name);
            });
            div.appendChild(delBtn);
        }

        waitingMembersList.appendChild(div);
    });

    // 카운트 업데이트 (max는 currentTournamentMaxMembers에서)
    if (currentTournamentMaxMembers !== null) {
        waitingMembersCount.textContent = members.length + '/' + currentTournamentMaxMembers;
    } else {
        waitingMembersCount.textContent = members.length + '명';
    }

    lastWaitingMemberIds = currentMemberIds;
    updateTeamAssignmentButton();

    // C3-3: 팀 배정 화면이 보이고 있으면 멤버 변동 즉시 반영
    if (!screenTeamAssignment.classList.contains('hidden')) {
        db.collection('tournaments').doc(currentTournamentId)
            .collection('teams').get()
            .then(function(snapshot) {
                const teams = [];
                snapshot.forEach(function(doc) {
                    const data = doc.data();
                    data.id = doc.id;
                    teams.push(data);
                });
                renderTeamCardsWithMembers(teams, currentWaitingMembers);
                teamAssignmentMemberCount.textContent =
                    '참여자: ' + currentWaitingMembers.length + '명 / 팀: ' + currentTournamentTeamCount + '개';
            })
            .catch(function(err) {
                console.warn('팀 배정 화면 자동 갱신 중 teams 조회 실패:', err);
            });
    }
}

function updateTeamAssignmentButton() {
    if (currentUser === null || currentTournamentHostId !== currentUser.uid) return;
    const memberCount = lastWaitingMemberIds.size;
    if (memberCount >= 2) {
        btnGoToTeamAssignment.disabled = false;
        btnGoToTeamAssignment.style.opacity = '1';
        btnGoToTeamAssignment.title = '';
    } else {
        btnGoToTeamAssignment.disabled = true;
        btnGoToTeamAssignment.style.opacity = '0.5';
        btnGoToTeamAssignment.title = '참여자가 2명 이상 있어야 팀 배정 가능';
    }
}

function ensureTeamsExist(tournamentId, teamCount) {
    return db.collection('tournaments').doc(tournamentId)
        .collection('teams').get()
        .then(function(snapshot) {
            if (snapshot.size >= teamCount) {
                console.log('ℹ️ 팀 이미 존재 (' + snapshot.size + '개) - 재생성 안 함');
                return { created: false, count: snapshot.size };
            }

            console.log('🔨 팀 ' + teamCount + '개 생성 중... (현재: ' + snapshot.size + '개)');
            const batch = db.batch();
            for (let i = 1; i <= teamCount; i++) {
                const teamRef = db.collection('tournaments').doc(tournamentId)
                                  .collection('teams').doc('team-' + i);
                batch.set(teamRef, {
                    name: i + '팀',
                    colorIndex: i,
                    memberIds: [],
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                }, { merge: true });
            }
            return batch.commit().then(function() {
                console.log('✅ 팀 ' + teamCount + '개 생성 완료');
                return { created: true, count: teamCount };
            });
        });
}

function renderTeamCardsWithMembers(teams, members) {
    teamCardsGrid.innerHTML = '';

    // 기존 외부 미배정 영역 제거 (C3-3 잔재 정리)
    const oldUnassigned = document.querySelector('.unassigned-members-area');
    if (oldUnassigned) oldUnassigned.remove();

    teams.sort(function(a, b) {
        return (a.colorIndex || 0) - (b.colorIndex || 0);
    });

    // 팀별 멤버 그룹화 (members.teamId 기반 — 단일 출처)
    const membersByTeam = {};
    teams.forEach(function(t) { membersByTeam[t.id] = []; });
    const unassigned = [];

    members.forEach(function(m) {
        if (m.teamId && membersByTeam[m.teamId]) {
            membersByTeam[m.teamId].push(m);
        } else {
            unassigned.push(m);
        }
    });

    const isHost = currentUser !== null && currentTournamentHostId === currentUser.uid;
    const hasSelection = selectedMemberIdForMove !== null;

    // 1. 팀 카드들
    teams.forEach(function(team) {
        const color = TEAM_COLORS[team.colorIndex] || TEAM_COLORS[9];
        const teamMembers = membersByTeam[team.id] || [];
        const card = createTeamCard(team.id, team.name, color, teamMembers, isHost, hasSelection, false);
        teamCardsGrid.appendChild(card);
    });

    // 2. 미배정 카드 (호스트만 그리드 안에 포함)
    if (isHost) {
        const unassignedCard = createTeamCard(
            '__unassigned__',
            '⏬ 미배정',
            { name: '회색', main: '#64748b', bg: '#f1f5f9' },
            unassigned,
            true,
            hasSelection,
            true
        );
        teamCardsGrid.appendChild(unassignedCard);
    } else if (unassigned.length > 0) {
        const div = document.createElement('div');
        div.className = 'unassigned-members-area';
        div.innerHTML = '<div class="unassigned-header">⏳ 미배정 (' + unassigned.length + '명)</div>';
        const wrap = document.createElement('div');
        wrap.className = 'unassigned-chips';
        unassigned.forEach(function(m) {
            const chip = document.createElement('div');
            chip.className = 'team-member-chip unassigned-chip';
            chip.textContent = m.name +
                (m.handicapIndex !== null && m.handicapIndex !== undefined
                    ? ' (' + m.handicapIndex + ')' : '');
            wrap.appendChild(chip);
        });
        div.appendChild(wrap);
        teamCardsGrid.parentNode.insertBefore(div, teamCardsGrid.nextSibling);
    }

    updateSelectionBar();
    updateRoundStartButton();
}

function createTeamCard(teamId, teamName, color, teamMembers, isHost, hasSelection, isUnassignedCard) {
    const card = document.createElement('div');
    card.className = 'team-card';
    if (isUnassignedCard) card.classList.add('team-card-unassigned');
    if (hasSelection) card.classList.add('drop-target');
    card.style.borderColor = color.main;
    card.style.backgroundColor = color.bg;
    card.dataset.teamId = teamId;

    if (isHost) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.team-member-chip')) return;
            handleCardClickForMove(teamId);
        });
    }

    const header = document.createElement('div');
    header.className = 'team-card-header';
    header.style.color = color.main;

    if (isHost && !isUnassignedCard) {
        header.classList.add('team-card-header-editable');
        const nameSpan = document.createElement('span');
        nameSpan.textContent = teamName;
        const editIcon = document.createElement('span');
        editIcon.className = 'team-card-edit-icon';
        editIcon.textContent = ' ✏️';
        header.appendChild(nameSpan);
        header.appendChild(editIcon);
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            startEditingTeamName(teamId, teamName, header, color);
        });
    } else {
        header.textContent = teamName;
    }
    card.appendChild(header);

    const meta = document.createElement('div');
    meta.className = 'team-card-meta';
    if (isUnassignedCard) {
        meta.textContent = teamMembers.length + '명';
    } else {
        let avgText = '';
        if (teamMembers.length > 0) {
            const validHcps = teamMembers
                .map(function(m) { return m.handicapIndex; })
                .filter(function(h) { return h !== null && h !== undefined; });
            if (validHcps.length > 0) {
                const sum = validHcps.reduce(function(a, b) { return a + b; }, 0);
                avgText = ' · 평균 핸디 ' + (sum / validHcps.length).toFixed(1);
            }
        }
        meta.textContent = teamMembers.length + '명' + avgText;
    }
    card.appendChild(meta);

    const memberArea = document.createElement('div');
    memberArea.className = 'team-card-members';
    if (teamMembers.length === 0) {
        memberArea.innerHTML = '<p class="team-card-empty">' +
            (isUnassignedCard ? '미배정 멤버 없음' : '아직 배정된 멤버 없음') + '</p>';
    } else {
        teamMembers.forEach(function(m) {
            const chip = document.createElement('div');
            chip.className = 'team-member-chip clickable';
            if (selectedMemberIdForMove === m.id) chip.classList.add('chip-selected');
            chip.dataset.memberId = m.id;
            chip.textContent = m.name +
                (m.handicapIndex !== null && m.handicapIndex !== undefined
                    ? ' (' + m.handicapIndex + ')' : '');
            if (isHost) {
                chip.addEventListener('click', function(e) {
                    e.stopPropagation();
                    handleChipClickForSelect(m.id, m.name);
                });
            }
            memberArea.appendChild(chip);
        });
    }
    card.appendChild(memberArea);

    return card;
}

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
}

function computeRandomAssignment(members, teamIds) {
    const shuffled = shuffleArray(members.map(function(m) { return m.id; }));
    const teamIdByMemberId = {};
    const membersByTeamId = {};
    teamIds.forEach(function(t) { membersByTeamId[t] = []; });
    shuffled.forEach(function(uid, idx) {
        const teamId = teamIds[idx % teamIds.length];
        teamIdByMemberId[uid] = teamId;
        membersByTeamId[teamId].push(uid);
    });
    return { teamIdByMemberId: teamIdByMemberId, membersByTeamId: membersByTeamId };
}

function computeBalancedAssignment(members, teamIds) {
    const sorted = members.slice().sort(function(a, b) {
        const ha = (a.handicapIndex !== null && a.handicapIndex !== undefined) ? a.handicapIndex : 18;
        const hb = (b.handicapIndex !== null && b.handicapIndex !== undefined) ? b.handicapIndex : 18;
        if (ha !== hb) return ha - hb;
        return Math.random() - 0.5;
    });

    const teamIdByMemberId = {};
    const membersByTeamId = {};
    teamIds.forEach(function(t) { membersByTeamId[t] = []; });

    const N = teamIds.length;
    sorted.forEach(function(member, idx) {
        const round = Math.floor(idx / N);
        const posInRound = idx % N;
        const teamIdx = (round % 2 === 0) ? posInRound : (N - 1 - posInRound);
        const teamId = teamIds[teamIdx];
        teamIdByMemberId[member.id] = teamId;
        membersByTeamId[teamId].push(member.id);
    });
    return { teamIdByMemberId: teamIdByMemberId, membersByTeamId: membersByTeamId };
}

function applyAssignmentToFirestore(tournamentId, assignment) {
    const batch = db.batch();

    Object.keys(assignment.teamIdByMemberId).forEach(function(uid) {
        const memberRef = db.collection('tournaments').doc(tournamentId)
            .collection('members').doc(uid);
        batch.update(memberRef, {
            teamId: assignment.teamIdByMemberId[uid],
            lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    });

    Object.keys(assignment.membersByTeamId).forEach(function(teamId) {
        const teamRef = db.collection('tournaments').doc(tournamentId)
            .collection('teams').doc(teamId);
        batch.update(teamRef, {
            memberIds: assignment.membersByTeamId[teamId]
        });
    });

    return batch.commit();
}

function handleAutoAssign(mode) {
    if (currentUser === null || currentTournamentHostId !== currentUser.uid) {
        alert('호스트만 자동 배정할 수 있습니다.');
        return;
    }
    if (currentTournamentId === null || currentTournamentTeamCount === null) {
        alert('정모 정보 누락. 화면을 새로고침해주세요.');
        return;
    }
    if (currentWaitingMembers.length < 2) {
        alert('참여자가 2명 이상이어야 배정 가능합니다.');
        return;
    }

    // C3-4: 자동 배정 시 수동 선택 해제
    if (selectedMemberIdForMove !== null) {
        selectedMemberIdForMove = null;
        teamAssignmentSelection.classList.add('hidden');
    }

    const hasAnyAssignment = currentWaitingMembers.some(function(m) {
        return m.teamId !== null && m.teamId !== undefined;
    });
    if (hasAnyAssignment) {
        if (!confirm('기존 배정이 모두 재배정됩니다. 계속하시겠습니까?')) return;
    }

    const teamIds = [];
    for (let i = 1; i <= currentTournamentTeamCount; i++) {
        teamIds.push('team-' + i);
    }

    const assignment = (mode === 'balanced')
        ? computeBalancedAssignment(currentWaitingMembers, teamIds)
        : computeRandomAssignment(currentWaitingMembers, teamIds);

    console.log('🎲 자동 배정 (' + mode + '):', assignment.membersByTeamId);

    btnAutoAssignRandom.disabled = true;
    btnAutoAssignBalanced.disabled = true;
    teamAssignmentStatus.classList.remove('hidden');
    teamAssignmentStatus.textContent = '⏳ 배정 적용 중...';

    applyAssignmentToFirestore(currentTournamentId, assignment)
        .then(function() {
            console.log('✅ 자동 배정 적용 완료');
            teamAssignmentStatus.classList.add('hidden');
            return db.collection('tournaments').doc(currentTournamentId)
                .collection('teams').get();
        })
        .then(function(snapshot) {
            const teams = [];
            snapshot.forEach(function(doc) {
                const data = doc.data();
                data.id = doc.id;
                teams.push(data);
            });
            renderTeamCardsWithMembers(teams, currentWaitingMembers);
        })
        .catch(function(error) {
            console.error('❌ 자동 배정 실패:', error);
            teamAssignmentStatus.textContent = '❌ 배정 실패: ' + error.message;
            alert('배정 실패: ' + error.message + '\n\n보안 규칙 또는 네트워크를 확인해주세요.');
        })
        .then(function() {
            btnAutoAssignRandom.disabled = false;
            btnAutoAssignBalanced.disabled = false;
        });
}

// C3-4: 멤버 칩 클릭 → 선택 상태 진입/변경/해제
function handleChipClickForSelect(memberId, memberName) {
    if (selectedMemberIdForMove === memberId) {
        clearSelection();
    } else {
        selectedMemberIdForMove = memberId;
        selectedMemberName.textContent = memberName;
        teamAssignmentSelection.classList.remove('hidden');
        rerenderTeamAssignmentScreen();
    }
}

function clearSelection() {
    selectedMemberIdForMove = null;
    teamAssignmentSelection.classList.add('hidden');
    rerenderTeamAssignmentScreen();
}

// 카드 클릭 → 선택된 멤버 이동
function handleCardClickForMove(targetTeamId) {
    if (selectedMemberIdForMove === null) return;

    const member = currentWaitingMembers.find(function(m) {
        return m.id === selectedMemberIdForMove;
    });
    if (!member) {
        console.warn('선택된 멤버를 찾을 수 없음:', selectedMemberIdForMove);
        clearSelection();
        return;
    }

    const oldTeamId = member.teamId || null;
    const newTeamId = (targetTeamId === '__unassigned__') ? null : targetTeamId;

    if (oldTeamId === newTeamId) {
        clearSelection();
        return;
    }

    if (newTeamId !== null) {
        const targetMembers = currentWaitingMembers.filter(function(m) {
            return m.teamId === newTeamId;
        });
        const teamSize = currentTournamentMaxMembers / currentTournamentTeamCount;
        if (targetMembers.length >= teamSize) {
            const teamName = getTeamNameFromId(newTeamId);
            const ok = confirm(
                '⚠️ ' + teamName + ' 정원(' + teamSize + '명) 초과됩니다.\n' +
                '현재 ' + targetMembers.length + '명, 옮기면 ' + (targetMembers.length + 1) + '명.\n\n' +
                '그래도 옮기시겠습니까?'
            );
            if (!ok) return;
        }
    }

    moveMemberToTeam(member.id, oldTeamId, newTeamId);
}

function getTeamNameFromId(teamId) {
    const idx = parseInt(teamId.replace('team-', ''), 10);
    if (!isNaN(idx)) return idx + '팀';
    return teamId;
}

function moveMemberToTeam(memberId, oldTeamId, newTeamId) {
    const tournamentId = currentTournamentId;
    const batch = db.batch();

    const memberRef = db.collection('tournaments').doc(tournamentId)
        .collection('members').doc(memberId);
    batch.update(memberRef, {
        teamId: newTeamId,
        lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    if (oldTeamId !== null) {
        const oldTeamRef = db.collection('tournaments').doc(tournamentId)
            .collection('teams').doc(oldTeamId);
        batch.update(oldTeamRef, {
            memberIds: firebase.firestore.FieldValue.arrayRemove(memberId)
        });
    }

    if (newTeamId !== null) {
        const newTeamRef = db.collection('tournaments').doc(tournamentId)
            .collection('teams').doc(newTeamId);
        batch.update(newTeamRef, {
            memberIds: firebase.firestore.FieldValue.arrayUnion(memberId)
        });
    }

    selectedMemberIdForMove = null;
    teamAssignmentSelection.classList.add('hidden');

    batch.commit()
        .then(function() {
            console.log('✅ 멤버 이동 완료:', memberId, oldTeamId, '→', newTeamId);
        })
        .catch(function(error) {
            console.error('❌ 멤버 이동 실패:', error);
            alert('멤버 이동 실패: ' + error.message);
            rerenderTeamAssignmentScreen();
        });
}

function rerenderTeamAssignmentScreen() {
    if (screenTeamAssignment.classList.contains('hidden')) return;
    if (currentTournamentId === null) return;

    db.collection('tournaments').doc(currentTournamentId)
        .collection('teams').get()
        .then(function(snapshot) {
            const teams = [];
            snapshot.forEach(function(doc) {
                const data = doc.data();
                data.id = doc.id;
                teams.push(data);
            });
            renderTeamCardsWithMembers(teams, currentWaitingMembers);
        })
        .catch(function(err) {
            console.warn('팀 배정 화면 재렌더링 중 teams 조회 실패:', err);
        });
}

function updateSelectionBar() {
    if (selectedMemberIdForMove === null) {
        teamAssignmentSelection.classList.add('hidden');
        return;
    }
    const member = currentWaitingMembers.find(function(m) {
        return m.id === selectedMemberIdForMove;
    });
    if (member) {
        selectedMemberName.textContent = member.name;
        teamAssignmentSelection.classList.remove('hidden');
    } else {
        clearSelection();
    }
}

function startEditingTeamName(teamId, currentName, headerEl, color) {
    if (headerEl.querySelector('.team-name-edit-input')) return;

    headerEl.innerHTML = '';
    headerEl.classList.remove('team-card-header-editable');

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'team-name-edit-input';
    input.value = currentName;
    input.style.color = color.main;
    headerEl.appendChild(input);
    input.focus();
    input.select();

    let committed = false;

    function saveEdit() {
        if (committed) return;
        const newName = input.value.trim();
        if (!newName) {
            alert('팀 이름을 입력해주세요.');
            input.focus();
            return;
        }
        committed = true;
        db.collection('tournaments').doc(currentTournamentId)
            .collection('teams').doc(teamId)
            .update({ name: newName })
            .then(function() {
                console.log('✅ 팀 이름 변경:', teamId, '→', newName);
                rerenderTeamAssignmentScreen();
            })
            .catch(function(err) {
                console.error('❌ 팀 이름 변경 실패:', err);
                alert('팀 이름 변경 실패: ' + err.message);
                rerenderTeamAssignmentScreen();
            });
    }

    function cancelEdit() {
        if (committed) return;
        committed = true;
        rerenderTeamAssignmentScreen();
    }

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            saveEdit();
        } else if (e.key === 'Escape') {
            cancelEdit();
        }
    });

    input.addEventListener('blur', function() {
        setTimeout(cancelEdit, 100);
    });
}

function updateRoundStartButton() {
    if (!roundStartStatus || !btnStartRoundFromTeams) return;
    const isHost = currentUser !== null && currentTournamentHostId === currentUser.uid;
    if (!isHost || currentTournamentTeamCount === null) {
        btnStartRoundFromTeams.disabled = true;
        return;
    }

    const unassignedCount = currentWaitingMembers.filter(function(m) {
        return !m.teamId;
    }).length;

    const teamMemberCounts = {};
    for (let i = 1; i <= currentTournamentTeamCount; i++) {
        teamMemberCounts['team-' + i] = 0;
    }
    currentWaitingMembers.forEach(function(m) {
        if (m.teamId && teamMemberCounts[m.teamId] !== undefined) {
            teamMemberCounts[m.teamId]++;
        }
    });
    const emptyTeamCount = Object.keys(teamMemberCounts).filter(function(k) {
        return teamMemberCounts[k] === 0;
    }).length;

    if (unassignedCount > 0) {
        roundStartStatus.textContent = '⚠️ 미배정 ' + unassignedCount + '명이 있습니다.';
        btnStartRoundFromTeams.disabled = true;
    } else if (emptyTeamCount > 0) {
        roundStartStatus.textContent = '⚠️ 빈 팀이 ' + emptyTeamCount + '개 있습니다.';
        btnStartRoundFromTeams.disabled = true;
    } else {
        roundStartStatus.textContent = '✅ 모든 멤버가 팀에 배정되었습니다!';
        btnStartRoundFromTeams.disabled = false;
    }
}

function handleStartRound() {
    if (!confirm('라운드를 시작하시겠습니까?\n시작 후에는 팀 배정을 변경할 수 없습니다.')) return;

    btnStartRoundFromTeams.disabled = true;

    db.collection('tournaments').doc(currentTournamentId)
        .update({
            status: 'in_progress',
            startedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(function() {
            console.log('✅ 라운드 시작:', currentTournamentId);
            // C4-1: 호스트도 onSnapshot이 in_progress 감지 → enterTournamentRound() 호출
            // 명시적 화면 전환 없음 — onSnapshot 콜백이 처리
        })
        .catch(function(err) {
            console.error('❌ 라운드 시작 실패:', err);
            alert('라운드 시작 실패: ' + err.message);
            btnStartRoundFromTeams.disabled = false;
        });
}

function showTeamAssignmentScreen() {
    if (currentTournamentTeamCount === null) {
        alert('정모 정보 로딩 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    teamAssignmentMeta.textContent = '정모 코드: ' + currentTournamentId;
    teamAssignmentMemberCount.textContent =
        '참여자: ' + lastWaitingMemberIds.size + '명 / 팀: ' + currentTournamentTeamCount + '개';

    teamCardsGrid.innerHTML = '';
    teamAssignmentStatus.classList.remove('hidden');
    teamAssignmentStatus.textContent = '⏳ 팀 정보 로딩 중...';
    showScreen(screenTeamAssignment);

    ensureTeamsExist(currentTournamentId, currentTournamentTeamCount)
        .then(function() {
            return db.collection('tournaments').doc(currentTournamentId)
                .collection('teams').get();
        })
        .then(function(snapshot) {
            const teams = [];
            snapshot.forEach(function(doc) {
                const data = doc.data();
                data.id = doc.id;
                teams.push(data);
            });

            teamAssignmentStatus.classList.add('hidden');
            renderTeamCardsWithMembers(teams, currentWaitingMembers);
        })
        .catch(function(error) {
            console.error('❌ 팀 로딩/생성 실패:', error);
            teamAssignmentStatus.textContent =
                '❌ 팀 정보 로딩 실패: ' + error.message + ' (보안 규칙 또는 네트워크 확인)';
        });
}

// 정모 본 문서 캐시 (렌더링 시 사용)
let currentTournamentHostId = null;
let currentTournamentMaxMembers = null;
let currentTournamentTeamCount = null;
// C4-1: tournament 본 문서 캐시 (pars, gameMode, courseName 등 라운드 진입 시 사용)
let currentTournamentDoc = null;

// 대기실에서 받은 최신 멤버 데이터 (팀 배정 화면에서 사용)
// 형식: [{ id, name, handicapIndex, courseHandicap, teamId, ... }, ...]
let currentWaitingMembers = [];
// C3-4: 현재 선택된 멤버 ID (null이면 선택 없음)
let selectedMemberIdForMove = null;

// 대기실 떠나기 (리스너 정리 + 메인 복귀)
function leaveTournamentWaitingRoom() {
    cleanupTournamentRoundListeners();   // C4-3: onSnapshot + score sync 통합 정리
    cleanupTournamentWaitingListeners();
    currentTournamentId = null;
    currentTournamentHostId = null;
    currentTournamentMaxMembers = null;
    currentTournamentTeamCount = null;
    currentTournamentDoc = null;
    currentWaitingMembers = [];
    lastWaitingMemberIds = new Set();
    showScreen(screenMain);
}

// 게스트가 정모 나가기 (본인 멤버 문서 삭제)
function leaveTournamentAsGuest() {
    if (currentTournamentId === null || currentUser === null) return;

    if (!confirm('이 정모에서 나가시겠습니까?\n다시 참여하려면 호스트의 링크가 필요합니다.')) {
        return;
    }

    const tournamentId = currentTournamentId;
    const userId = currentUser.uid;

    btnLeaveTournament.disabled = true;
    btnLeaveTournament.textContent = '나가는 중...';

    db.collection('tournaments').doc(tournamentId)
        .collection('members').doc(userId).delete()
        .then(function() {
            console.log('✅ 정모 나가기 완료');
            leaveTournamentWaitingRoom();
        })
        .catch(function(error) {
            console.error('❌ 정모 나가기 실패:', error);
            alert('정모 나가기 실패: ' + error.message);
            btnLeaveTournament.disabled = false;
            btnLeaveTournament.textContent = '정모 나가기';
        });
}

// 호스트가 정모 취소 (모든 멤버 삭제 + 정모 본 문서 삭제) - C2-4
function cancelTournamentAsHost() {
    if (currentTournamentId === null || currentUser === null) return;

    // 호스트 권한 재확인
    if (currentTournamentHostId !== currentUser.uid) {
        alert('호스트만 정모를 취소할 수 있습니다.');
        return;
    }

    // 강한 confirm — 멤버가 있을 경우 더 강조
    const memberCountText = waitingMembersCount.textContent;
    const warningMessage =
        '⚠️ 정모를 취소하시겠습니까?\n\n' +
        '• 현재 참여자: ' + memberCountText + '\n' +
        '• 모든 멤버가 자동으로 나가게 됩니다\n' +
        '• 정모 코드와 링크는 더 이상 작동하지 않습니다\n' +
        '• 이 작업은 되돌릴 수 없습니다\n\n' +
        '정말로 취소하시겠습니까?';

    if (!confirm(warningMessage)) {
        return;
    }

    const tournamentId = currentTournamentId;

    btnCancelTournament.disabled = true;
    btnCancelTournament.textContent = '취소 중...';

    console.log('🗑️ 정모 취소 시작:', tournamentId);

    // 1. 모든 멤버 문서 먼저 삭제 (Firestore는 서브컬렉션을 자동 삭제 안함)
    db.collection('tournaments').doc(tournamentId)
        .collection('members').get()
        .then(function(membersSnapshot) {
            const batch = db.batch();
            membersSnapshot.forEach(function(doc) {
                batch.delete(doc.ref);
            });
            return batch.commit();
        })
        .then(function() {
            console.log('✅ 모든 멤버 문서 삭제 완료');
            // 2. 정모 본 문서 삭제
            // (이 시점에 게스트들의 onSnapshot이 doc.exists=false 감지 → 자동 메인 복귀)
            return db.collection('tournaments').doc(tournamentId).delete();
        })
        .then(function() {
            console.log('✅ 정모 본 문서 삭제 완료');
            alert('✅ 정모가 취소되었습니다.\n모든 멤버에게도 안내됩니다.');
            leaveTournamentWaitingRoom();
        })
        .catch(function(error) {
            console.error('❌ 정모 취소 실패:', error);

            let userMessage;
            if (error.code === 'permission-denied' ||
                (error.message && error.message.indexOf('permissions') !== -1)) {
                userMessage = '정모 취소 실패: 권한이 없습니다.\n\n' +
                              'Firestore 보안 규칙이 최신 버전인지 확인하세요.\n' +
                              '(Firebase Console → Firestore → 규칙 → 게시)';
            } else if (error.code === 'unavailable' ||
                       (error.message && error.message.indexOf('network') !== -1)) {
                userMessage = '정모 취소 실패: 인터넷 연결을 확인하고 다시 시도해주세요.';
            } else {
                userMessage = '정모 취소 실패: ' + error.message;
            }
            alert(userMessage);

            btnCancelTournament.disabled = false;
            btnCancelTournament.textContent = '⚠️ 정모 취소하고 나가기';
        });
}

// 정모 코드/링크 화면 표시
function showTournamentLinkScreen(tournamentId, formData) {
    const link = buildTournamentLink(tournamentId);
    const profile = loadUserProfile();

    tournamentNameDisplayOnLink.textContent = formData.name;

    // 메타 정보: "골프장 · 날짜 · 모드 · N명"
    const gameModeLabel = formData.gameMode === 'net' ? 'Net' : 'Gross';
    const metaText = formData.courseName + ' · ' + formData.date +
                     ' · ' + gameModeLabel +
                     ' · 최대 ' + formData.maxMembers + '명';
    tournamentMetaDisplay.textContent = metaText;

    tournamentCodeDisplay.textContent = tournamentId;
    tournamentLinkDisplay.value = link;

    // Net 정모 안내 (호스트가 단톡방에 함께 보낼 수 있도록)
    const netNoticeBox = document.getElementById('tournament-net-notice');
    if (netNoticeBox) {
        if (formData.gameMode === 'net') {
            netNoticeBox.classList.remove('hidden');
        } else {
            netNoticeBox.classList.add('hidden');
        }
    }

    // 멤버 목록 (지금은 호스트만)
    tournamentLinkMembersList.innerHTML = '';
    const memberDiv = document.createElement('div');
    memberDiv.className = 'share-member';
    memberDiv.textContent = '👑 ' + (profile ? profile.name : '나') + ' (호스트)';
    tournamentLinkMembersList.appendChild(memberDiv);

    tournamentCopyFeedback.classList.add('hidden');
    if (tournamentCodeCopyFeedback) {
        tournamentCodeCopyFeedback.classList.add('hidden');
    }
    showScreen(screenTournamentLink);
}

// 정모 링크 클립보드 복사
function copyTournamentLink() {
    const link = tournamentLinkDisplay.value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link)
            .then(showTournamentCopyFeedback)
            .catch(fallbackCopyTournament);
    } else {
        fallbackCopyTournament();
    }
}

function fallbackCopyTournament() {
    tournamentLinkDisplay.select();
    tournamentLinkDisplay.setSelectionRange(0, 99999);
    try {
        document.execCommand('copy');
        showTournamentCopyFeedback();
    } catch (err) {
        alert('복사 실패. 직접 선택해서 복사해주세요.');
    }
}

function showTournamentCopyFeedback() {
    tournamentCopyFeedback.classList.remove('hidden');
    setTimeout(function() {
        tournamentCopyFeedback.classList.add('hidden');
    }, 2000);
}

// 정모 코드만 클립보드 복사 (C2-2 추가)
function copyTournamentCodeOnly() {
    const code = tournamentCodeDisplay.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code)
            .then(showTournamentCodeCopyFeedback)
            .catch(fallbackCopyTournamentCode);
    } else {
        fallbackCopyTournamentCode();
    }
}

function fallbackCopyTournamentCode() {
    // textarea 생성해서 selectionrange로 복사
    const code = tournamentCodeDisplay.textContent;
    const textarea = document.createElement('textarea');
    textarea.value = code;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showTournamentCodeCopyFeedback();
    } catch (err) {
        alert('복사 실패. 직접 선택해서 복사해주세요.');
    }
    document.body.removeChild(textarea);
}

function showTournamentCodeCopyFeedback() {
    tournamentCodeCopyFeedback.classList.remove('hidden');
    setTimeout(function() {
        tournamentCodeCopyFeedback.classList.add('hidden');
    }, 2000);
}

// 공유 링크 화면 표시
function showShareLinkScreen(shareCode) {
    const link = buildShareLink(shareCode);
    const profile = loadUserProfile();

    shareCodeDisplay.textContent = shareCode;
    shareLinkDisplay.value = link;

    // 멤버 목록 (지금은 호스트만)
    shareMembersList.innerHTML = '';
    const memberDiv = document.createElement('div');
    memberDiv.className = 'share-member';
    memberDiv.textContent = '👑 ' + (profile ? profile.name : '나') + ' (호스트)';
    shareMembersList.appendChild(memberDiv);

    copyFeedback.classList.add('hidden');
    showScreen(screenShareLink);
}

// 클립보드 복사
function copyShareLink() {
    const link = shareLinkDisplay.value;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link)
            .then(function() {
                showCopyFeedback();
            })
            .catch(function(error) {
                console.error('클립보드 복사 실패:', error);
                fallbackCopy();
            });
    } else {
        fallbackCopy();
    }
}

function fallbackCopy() {
    shareLinkDisplay.select();
    try {
        document.execCommand('copy');
        showCopyFeedback();
    } catch (error) {
        alert('복사 실패. 링크를 직접 선택해서 복사하세요.');
    }
}

function showCopyFeedback() {
    copyFeedback.classList.remove('hidden');
    setTimeout(function() {
        copyFeedback.classList.add('hidden');
    }, 2000);
}

// =========================================
// 공유 라운드 — 참여 (URL 라우팅) (2단계 B - B5)
// =========================================

// URL에서 공유 코드 추출
function extractShareCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('r');

    if (code === null || code === '') return null;

    // 6자리 영숫자 검증 (generateShareCode 형식)
    const validPattern = /^[A-HJ-NP-Z2-9]{6}$/;
    if (!validPattern.test(code)) {
        console.warn('⚠️ 잘못된 공유 코드 형식:', code);
        return null;
    }

    return code;
}

// URL에서 정모 코드 추출 (?t=ABCDEF) - C1-3
function extractTournamentCodeFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('t');

    if (code === null || code === '') return null;

    // 6자리 영숫자 검증 (generateShareCode와 같은 형식)
    const validPattern = /^[A-HJ-NP-Z2-9]{6}$/;
    if (!validPattern.test(code)) {
        console.warn('⚠️ 잘못된 정모 코드 형식:', code);
        return null;
    }

    return code;
}

// URL에서 ?t=... 또는 ?r=... 제거 (참여 후 깔끔하게)
function clearTournamentCodeFromUrl() {
    if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// URL에서 ?r=... 제거 (참여 후 깔끔하게)
function clearShareCodeFromUrl() {
    if (window.history && window.history.replaceState) {
        const newUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, document.title, newUrl);
    }
}

// 라운드 정보를 Firestore에서 가져오기
function fetchSharedRound(shareCode) {
    return db.collection('rounds').doc(shareCode).get()
        .then(function(doc) {
            if (!doc.exists) {
                throw new Error('NOT_FOUND');
            }

            const roundData = doc.data();

            // 호스트 멤버 정보도 같이 가져오기 (호스트 이름 표시용)
            return db.collection('rounds').doc(shareCode)
                .collection('members').doc(roundData.hostId).get()
                .then(function(hostDoc) {
                    return {
                        roundData: roundData,
                        hostName: hostDoc.exists ? (hostDoc.data().name || '알 수 없음') : '알 수 없음'
                    };
                });
        });
}

// 참여 화면 표시
function showJoinRoundScreen(shareCode) {
    // 화면 초기화
    joinShareCode.textContent = shareCode;
    joinCourseName.textContent = '-';
    joinHostName.textContent = '-';
    joinMemberCount.textContent = '-';

    joinInfoCard.classList.add('hidden');
    joinError.classList.add('hidden');
    joinLoading.classList.remove('hidden');
    btnConfirmJoin.disabled = true;

    showScreen(screenJoinRound);

    // Firestore에서 정보 가져오기
    fetchSharedRound(shareCode)
        .then(function(result) {
            const roundData = result.roundData;
            const hostName = result.hostName;

            // ★ B6: 본인이 호스트인 경우 → 바로 홀 입력 화면으로 (이어하기)
            if (currentUser !== null && currentUser.uid === roundData.hostId) {
                console.log('ℹ️ 본인이 호스트 - 라운드 이어하기로 진입');
                pendingJoinCode = null;
                pendingJoinData = null;
                enterSharedHoleInput(shareCode, true);
                return;
            }

            // 멤버 수 조회
            return db.collection('rounds').doc(shareCode)
                .collection('members').get()
                .then(function(membersSnapshot) {
                    pendingJoinData = {
                        shareCode: shareCode,
                        roundData: roundData,
                        hostName: hostName,
                        memberCount: membersSnapshot.size
                    };

                    // 화면 업데이트
                    joinCourseName.textContent = roundData.courseName;
                    joinHostName.textContent = hostName;
                    joinMemberCount.textContent = membersSnapshot.size + '명';

                    joinLoading.classList.add('hidden');
                    joinInfoCard.classList.remove('hidden');
                    btnConfirmJoin.disabled = false;
                });
        })
        .catch(function(error) {
            console.error('❌ 라운드 조회 실패:', error);

            joinLoading.classList.add('hidden');
            joinInfoCard.classList.add('hidden');
            joinError.classList.remove('hidden');
            btnConfirmJoin.disabled = true;

            if (error.message === 'NOT_FOUND') {
                joinErrorMessage.textContent = '⚠️ 라운드를 찾을 수 없습니다.\n링크가 만료되었거나 잘못된 코드입니다.';
            } else {
                joinErrorMessage.textContent = '⚠️ 오류: ' + (error.message || '알 수 없는 오류');
            }
        });
}

// 라운드 참여 확정 (members 서브컬렉션에 추가)
// ★ B6: alert 제거, 참여 성공 시 즉시 홀 입력 화면으로
function confirmJoinRound() {
    if (pendingJoinData === null) {
        alert('참여할 라운드 정보가 없습니다.');
        return;
    }

    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('프로필이 설정되지 않았습니다. 프로필을 먼저 설정해주세요.');
        openProfileScreen();
        return;
    }

    if (currentUser === null) {
        alert('로그인 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    const shareCode = pendingJoinData.shareCode;
    const roundData = pendingJoinData.roundData;
    const userId = currentUser.uid;

    btnConfirmJoin.disabled = true;
    btnConfirmJoin.textContent = '⏳ 참여 중...';

    // ★ B6: 호스트가 정한 게임모드에 본인 핸디캡 적용
    const myCourseHandicap = (roundData.gameMode === 'net' && profile.handicapIndex !== null && profile.handicapIndex !== undefined)
        ? calculateCourseHandicap(profile.handicapIndex)
        : null;

    const memberData = {
        name: profile.name,
        handicapIndex: profile.handicapIndex !== null ? profile.handicapIndex : null,
        courseHandicap: myCourseHandicap,
        scores: new Array(18).fill(null),
        putts: new Array(18).fill(null),
        currentHole: 1,
        completed: false,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    db.collection('rounds').doc(shareCode)
        .collection('members').doc(userId).set(memberData, { merge: true })
        .then(function() {
            console.log('✅ 라운드 참여 완료:', shareCode);

            currentSharedRoundId = shareCode;
            currentRoundMode = 'shared';
            pendingJoinCode = null;
            pendingJoinData = null;

            btnConfirmJoin.disabled = false;
            btnConfirmJoin.textContent = '✅ 참여하기';

            // ★ B6: alert 없이 바로 홀 입력 화면으로
            enterSharedHoleInput(shareCode, false);
        })
        .catch(function(error) {
            console.error('❌ 라운드 참여 실패:', error);
            alert('참여 실패: ' + error.message);
            btnConfirmJoin.disabled = false;
            btnConfirmJoin.textContent = '✅ 참여하기';
        });
}

// 앱 시작 시 URL 라우팅 처리
function handleInitialRouting() {
    // 정모 코드 (?t=...) 우선 확인
    const tournamentCode = extractTournamentCodeFromUrl();
    if (tournamentCode !== null) {
        console.log('🏌️ 정모 링크 감지:', tournamentCode);

        // URL 정리 (새로고침해도 다시 묻지 않게)
        clearTournamentCodeFromUrl();

        // 프로필 체크
        const profile = loadUserProfile();
        if (profile === null || !profile.name) {
            alert('정모에 참여하려면 먼저 이름을 설정해주세요.\n프로필 설정 후 다시 링크를 클릭하세요.');
            openProfileScreen();
            return;
        }

        // 익명 로그인 완료 후 정모 진입 처리
        waitForAuthAndHandleTournament(tournamentCode);
        return;
    }

    // 공유 라운드 코드 (?r=...) 처리 (기존 로직)
    const shareCode = extractShareCodeFromUrl();

    if (shareCode === null) {
        // URL에 ?r=... 없음 → 평소대로 메인
        return;
    }

    console.log('🔗 공유 링크 감지:', shareCode);
    pendingJoinCode = shareCode;

    // URL 정리 (새로고침해도 다시 묻지 않게)
    clearShareCodeFromUrl();

    // 프로필 체크
    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('공유 라운드에 참여하려면 먼저 이름을 설정해주세요.\n프로필 설정 후 다시 링크를 클릭하세요.');
        openProfileScreen();
        return;
    }

    // 익명 로그인 완료 후 참여 화면으로
    waitForAuthAndShowJoin(shareCode);
}

// 정모 진입 처리 (인증 완료 대기 후) - C2-1
function waitForAuthAndHandleTournament(tournamentCode) {
    if (currentUser !== null) {
        handleTournamentEntry(tournamentCode);
        return;
    }

    // 인증 완료까지 짧게 대기 (최대 5초)
    let waitCount = 0;
    const waitInterval = setInterval(function() {
        waitCount++;
        if (currentUser !== null) {
            clearInterval(waitInterval);
            handleTournamentEntry(tournamentCode);
        } else if (waitCount > 50) {
            clearInterval(waitInterval);
            alert('로그인 대기 시간 초과. 페이지를 새로고침해주세요.');
        }
    }, 100);
}

// C4-7: in_progress 정모 — 호스트/기존 멤버 재진입, 신규 사용자 차단
function handleInProgressTournamentEntry(tournamentCode, tournamentData) {
    if (currentUser === null) {
        alert('로그인 정보가 없습니다. 새로고침해주세요.');
        showScreen(screenMain);
        return;
    }

    const isHost = (currentUser.uid === tournamentData.hostId);

    function doRoundEntry() {
        currentTournamentId = tournamentCode;
        currentTournamentDoc = tournamentData;
        subscribeTournamentStatusForRound(tournamentCode);
        enterTournamentRound(tournamentCode, tournamentData);
    }

    if (isHost) {
        console.log('🏠 호스트가 in_progress 정모 재진입 → 화면 3');
        doRoundEntry();
        return;
    }

    db.collection('tournaments').doc(tournamentCode)
        .collection('members').doc(currentUser.uid).get()
        .then(function(memberDoc) {
            if (memberDoc.exists) {
                console.log('👤 기존 멤버 재진입 → 화면 3');
                doRoundEntry();
            } else {
                console.log('🚫 신규 사용자가 in_progress 정모 진입 시도 — 차단');
                alert(
                    '🚫 이 정모는 라운딩 진행 중입니다.\n\n' +
                    '이미 시작된 정모는 새 멤버를 받을 수 없습니다.\n\n' +
                    '본인이 정모 멤버인데 다른 기기에서 접속하신 경우:\n' +
                    '처음 참여하신 기기에서 진입해주세요.'
                );
                showScreen(screenMain);
            }
        })
        .catch(function(error) {
            console.error('❌ 멤버 확인 실패:', error);
            alert('정모 정보 확인 실패: ' + error.message);
            showScreen(screenMain);
        });
}

// C4-7: 재진입 시 tournament 본 문서 onSnapshot (대기실 거치지 않은 경우)
function subscribeTournamentStatusForRound(tournamentId) {
    if (tournamentWaitingTournamentUnsub !== null) {
        tournamentWaitingTournamentUnsub();
        tournamentWaitingTournamentUnsub = null;
    }
    if (roundTournamentStatusUnsub !== null) {
        roundTournamentStatusUnsub();
        roundTournamentStatusUnsub = null;
    }

    console.log('📡 라운드용 tournament status 구독:', tournamentId);

    roundTournamentStatusUnsub = db.collection('tournaments').doc(tournamentId)
        .onSnapshot(function(doc) {
            if (!doc.exists) return;
            const data = doc.data();
            data.id = doc.id;
            currentTournamentDoc = data;
            if (data.status === 'completed') {
                console.log('🏁 정모 종료 감지 (라운드 중)');
                enterTournamentResultScreen(data);
            }
        }, function(error) {
            console.error('❌ tournament status 구독 에러:', error);
        });
}

// 정모 코드로 진입 — 정보 fetch 후 분기
// (C2-1에서는 검증과 안내만, 참여 화면 자체는 C2-2에서)
function handleTournamentEntry(tournamentCode) {
    console.log('🏌️ 정모 진입 처리:', tournamentCode);

    fetchTournament(tournamentCode)
        .then(function(result) {
            const tournamentData = result.tournamentData;
            const hostName = result.hostName;
            const memberCount = result.currentMemberCount;

            // C5: 종료된 정모 → 결과 화면
            if (tournamentData.status === 'completed') {
                currentTournamentDoc = tournamentData;
                enterTournamentResultScreen(tournamentData);
                return;
            }

            // C4-7: 진행 중인 정모 — 호스트/기존 멤버 재진입 분기
            if (tournamentData.status === 'in_progress') {
                return handleInProgressTournamentEntry(tournamentCode, tournamentData);
            }

            // ★ 본인이 호스트인 경우 → 자기가 만든 정모 링크 클릭
            //    → 정모 코드/링크 화면으로 (이어서 관리 가능)
            if (currentUser !== null && currentUser.uid === tournamentData.hostId) {
                console.log('ℹ️ 본인이 호스트 - 정모 코드 화면으로');
                currentTournamentId = tournamentCode;
                showTournamentLinkScreen(tournamentCode, tournamentData);
                return;
            }

            // ★ 본인이 이미 참여한 멤버인 경우 → 대기실로 (C2-3에서 구현)
            //    지금은 안내만
            return db.collection('tournaments').doc(tournamentCode)
                .collection('members').doc(currentUser.uid).get()
                .then(function(memberDoc) {
                    if (memberDoc.exists) {
                        console.log('ℹ️ 이미 참여 중인 멤버 - 대기실로 자동 진입');
                        currentTournamentId = tournamentCode;
                        enterTournamentWaitingRoom(tournamentCode);
                        return;
                    }

                    // ★ 새로 참여하는 사용자 — Net 정모면 핸디 체크
                    const profile = loadUserProfile();
                    if (tournamentData.gameMode === 'net') {
                        if (profile === null ||
                            profile.handicapIndex === null ||
                            profile.handicapIndex === undefined) {
                            alert('이 정모는 Net 모드입니다.\n\n참여하려면 Handicap Index를 먼저 설정해주세요.\n프로필 설정 화면으로 이동합니다.');
                            openProfileScreen();
                            return;
                        }
                    }

                    // 검증 통과 — 참여 화면(C2-2)으로
                    showTournamentJoinScreen(tournamentCode, tournamentData, hostName, memberCount);
                });
        })
        .catch(function(error) {
            console.error('❌ 정모 진입 실패:', error);

            if (error.message === 'NOT_FOUND') {
                alert('해당 정모를 찾을 수 없습니다.\n\n코드를 다시 확인하거나, 호스트에게 새 링크를 요청하세요.');
            } else if (error.message === 'FULL') {
                alert('이 정모는 정원이 가득 찼습니다.\n\n호스트에게 문의하세요.');
            } else {
                alert('정모 정보를 불러올 수 없습니다.\n\n오류: ' + error.message);
            }
        });
}

// 익명 로그인 완료를 기다린 후 참여 화면 표시
function waitForAuthAndShowJoin(shareCode) {
    if (currentUser !== null) {
        showJoinRoundScreen(shareCode);
        return;
    }

    // 1초마다 체크 (최대 10초)
    let attempts = 0;
    const checkInterval = setInterval(function() {
        attempts++;
        if (currentUser !== null) {
            clearInterval(checkInterval);
            showJoinRoundScreen(shareCode);
        } else if (attempts >= 10) {
            clearInterval(checkInterval);
            alert('Firebase 연결 실패. 인터넷 연결을 확인하고 다시 시도하세요.');
        }
    }, 1000);
}

// =========================================
// ★ B6: 공유 라운드 — 실시간 동기화 + 홀 입력 진입
// =========================================

// 공유 라운드 홀 입력 화면 진입 (호스트/게스트 공통)
function enterSharedHoleInput(shareCode, isHost) {
    if (currentUser === null) {
        alert('로그인 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    console.log('▶ 공유 라운드 홀 입력 진입:', shareCode, isHost ? '(호스트)' : '(게스트)');

    currentSharedRoundId = shareCode;
    currentRoundMode = 'shared';

    // 1. 라운드 문서 + 본인 멤버 문서 가져와서 currentRound 구성
    const roundRef = db.collection('rounds').doc(shareCode);
    const myMemberRef = roundRef.collection('members').doc(currentUser.uid);

    Promise.all([roundRef.get(), myMemberRef.get()])
        .then(function(results) {
            const roundDoc = results[0];
            const myMemberDoc = results[1];

            if (!roundDoc.exists) {
                throw new Error('라운드를 찾을 수 없습니다.');
            }
            if (!myMemberDoc.exists) {
                throw new Error('멤버 정보를 찾을 수 없습니다.');
            }

            const roundData = roundDoc.data();
            const myData = myMemberDoc.data();

            // currentRound 구성 (Firestore 데이터 + 공유 모드 메타)
            currentRound = {
                id: shareCode,                           // 공유 코드를 ID로
                courseName: roundData.courseName,
                date: new Date().toISOString().split('T')[0],
                pars: roundData.pars,
                scores: myData.scores || new Array(18).fill(null),
                putts: myData.putts || new Array(18).fill(null),
                currentHole: myData.currentHole || 1,
                completed: false,
                gameMode: roundData.gameMode,
                courseHandicap: myData.courseHandicap !== undefined ? myData.courseHandicap : null,
                isShared: true,                          // ★ 공유 라운드 표시
                shareCode: shareCode,
                isHost: isHost
            };

            // 2. 실시간 리스너 설정
            setupSharedRoundListeners(shareCode);

            // 3. 홀 입력 화면 진입
            showScreen(screenHoleInput);
            renderHoleInputScreen();
        })
        .catch(function(error) {
            console.error('❌ 공유 라운드 진입 실패:', error);
            alert('공유 라운드 진입 실패: ' + error.message);
            cleanupSharedListeners();
            currentSharedRoundId = null;
            currentRoundMode = null;
            currentRound = null;
            showScreen(screenMain);
        });
}

// 실시간 리스너 설정 (라운드 문서 + 멤버 컬렉션)
function setupSharedRoundListeners(shareCode) {
    // 기존 리스너 정리 (중복 방지)
    cleanupSharedListeners();

    const roundRef = db.collection('rounds').doc(shareCode);

    // 라운드 문서 리스너 (status, gameMode 등 변경 감지)
    roundUnsubscribe = roundRef.onSnapshot(function(doc) {
        if (!doc.exists) {
            console.warn('⚠️ 라운드가 삭제되었습니다.');
            alert('라운드가 더 이상 존재하지 않습니다.');
            backToMainFromShared();
            return;
        }

        const roundData = doc.data();

        // 게임모드 변경 감지 (호스트가 바꿨을 때)
        if (currentRound && currentRound.gameMode !== roundData.gameMode) {
            console.log('🔄 게임모드 변경 감지:', roundData.gameMode);
            currentRound.gameMode = roundData.gameMode;
        }
    }, function(error) {
        console.error('❌ 라운드 리스너 오류:', error);
    });

    // 멤버 컬렉션 리스너 (모든 멤버 스코어/현재홀 변경 감지)
    membersUnsubscribe = roundRef.collection('members').onSnapshot(function(snapshot) {
        const newMembersData = {};
        snapshot.forEach(function(doc) {
            newMembersData[doc.id] = doc.data();
        });
        allMembersData = newMembersData;

        console.log('🔄 멤버 데이터 업데이트:', Object.keys(allMembersData).length + '명');

        // 홀 입력 화면이 열려있으면 멤버 스트립 다시 그리기
        if (!screenHoleInput.classList.contains('hidden')) {
            renderMembersStripThrottled();
        }
    }, function(error) {
        console.error('❌ 멤버 리스너 오류:', error);
    });
}

// 리스너 정리 (메모리 누수 방지 - PRD 4.8)
function cleanupSharedListeners() {
    if (roundUnsubscribe !== null) {
        roundUnsubscribe();
        roundUnsubscribe = null;
        console.log('🧹 라운드 리스너 해제');
    }
    if (membersUnsubscribe !== null) {
        membersUnsubscribe();
        membersUnsubscribe = null;
        console.log('🧹 멤버 리스너 해제');
    }
    if (scoreSyncTimer !== null) {
        clearTimeout(scoreSyncTimer);
        scoreSyncTimer = null;
    }
    allMembersData = {};
}

// 본인 스코어를 Firestore에 동기화 (디바운스)
function scheduleSyncMyScoreToFirestore() {
    if (scoreSyncTimer !== null) {
        clearTimeout(scoreSyncTimer);
    }
    scoreSyncTimer = setTimeout(function() {
        syncMyScoreToFirestore();
    }, SCORE_SYNC_DELAY);
}

// C4-2: 정모 라운드 본인 스코어 → tournaments/{id}/members/{uid} 동기화 (debounce)
function scheduleSyncMyScoreToTournament() {
    if (tournamentScoreSyncTimer !== null) {
        clearTimeout(tournamentScoreSyncTimer);
    }
    tournamentScoreSyncTimer = setTimeout(function() {
        syncMyScoreToTournament();
    }, SCORE_SYNC_DELAY);
}

// C4-2: 정모 라운드 본인 스코어 즉시 동기화 (홀 이동 등)
function syncMyScoreToTournament() {
    if (tournamentScoreSyncTimer !== null) {
        clearTimeout(tournamentScoreSyncTimer);
        tournamentScoreSyncTimer = null;
    }

    if (!currentRound || !currentRound.tournamentId) return;
    if (currentUser === null) return;

    const tournamentId = currentRound.tournamentId;
    const userId = currentUser.uid;
    const updates = {
        scores: currentRound.scores,
        putts: currentRound.putts,
        currentHole: currentRound.currentHole,
        completed: currentRound.completed,
        lastUpdatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    console.log('💾 정모 스코어 sync:', tournamentId, 'hole', currentRound.currentHole);

    db.collection('tournaments').doc(tournamentId)
        .collection('members').doc(userId)
        .update(updates)
        .then(function() {
            console.log('✅ 정모 스코어 sync 완료');
        })
        .catch(function(error) {
            console.error('❌ 정모 스코어 sync 실패:', error);
            if (error.code === 'permission-denied') {
                alert('스코어 저장 권한이 없습니다. 호스트에게 문의하세요.');
            }
        });
}

// C4-2: 정모 라운드 떠날 때 pending sync 타이머 정리
function flushAndClearTournamentScoreSync() {
    if (tournamentScoreSyncTimer !== null) {
        clearTimeout(tournamentScoreSyncTimer);
        tournamentScoreSyncTimer = null;
    }
}

// 본인 스코어 즉시 동기화
function syncMyScoreToFirestore() {
    if (scoreSyncTimer !== null) {
        clearTimeout(scoreSyncTimer);
        scoreSyncTimer = null;
    }

    if (!currentRound || !currentRound.isShared) return;
    if (currentSharedRoundId === null || currentUser === null) return;

    const updateData = {
        scores: currentRound.scores,
        putts: currentRound.putts,
        currentHole: currentRound.currentHole
    };

    db.collection('rounds').doc(currentSharedRoundId)
        .collection('members').doc(currentUser.uid)
        .update(updateData)
        .then(function() {
            console.log('✅ 스코어 동기화 완료 (홀', currentRound.currentHole + ')');
        })
        .catch(function(error) {
            console.error('❌ 스코어 동기화 실패:', error);
        });
}

// 공유 모드 UI 렌더링 (배지 + 멤버 스트립)
function renderSharedModeUI() {
    if (!currentRound) {
        if (membersStrip) membersStrip.classList.add('hidden');
        if (sharedModeBadge) sharedModeBadge.classList.add('hidden');
        return;
    }

    if (currentRound.tournamentId) {
        // C4-3: 정모 라운드 — 배지는 renderTournamentModeBadge가 처리, 스트립만 표시
        if (membersStrip) membersStrip.classList.remove('hidden');
        renderMembersStrip();
    } else if (currentRound.isShared && currentRound.shareCode) {
        // B6: 1:1 공유 라운드 — 이전 정모 세션의 tournament badge 숨기기
        var tBadge = document.getElementById('tournament-mode-badge');
        if (tBadge) tBadge.classList.add('hidden');
        if (sharedModeBadge) sharedModeBadge.classList.remove('hidden');
        if (membersStrip) membersStrip.classList.remove('hidden');
        renderMembersStrip();
    } else {
        if (membersStrip) membersStrip.classList.add('hidden');
        if (sharedModeBadge) sharedModeBadge.classList.add('hidden');
    }
}

// 멤버 미니 스트립 렌더링 (이름 · 홀 · 스코어 · 퍼팅)
function renderMembersStrip() {
    if (!membersStrip) return;
    if (!currentRound || !currentRound.isShared) return;

    const myUid = currentUser ? currentUser.uid : null;
    const memberIds = Object.keys(allMembersData);

    if (memberIds.length === 0) {
        membersStrip.innerHTML = '<div class="member-chip-loading">⏳ 멤버 정보 로딩 중...</div>';
        return;
    }

    // 정렬: 본인 먼저, 그 다음 이름순
    memberIds.sort(function(a, b) {
        if (a === myUid) return -1;
        if (b === myUid) return 1;
        const nameA = (allMembersData[a].name || '').toLowerCase();
        const nameB = (allMembersData[b].name || '').toLowerCase();
        return nameA.localeCompare(nameB);
    });

    membersStrip.innerHTML = '';

    for (let i = 0; i < memberIds.length; i++) {
        const uid = memberIds[i];
        const m = allMembersData[uid];
        const chip = createMemberChip(m, uid === myUid);
        membersStrip.appendChild(chip);
    }
}

// C4-6: 1초 throttle 적용된 멤버 스트립 렌더링 (라이브 갱신용)
var renderMembersStripThrottled = createThrottle(renderMembersStrip, RENDER_THROTTLE_MS);

// 멤버 칩 1개 만들기 (이름 · 홀 · 스코어 · 퍼팅)
function createMemberChip(memberData, isMe) {
    // 누적 스코어/퍼팅/홀 계산
    let totalScore = 0;
    let totalPar = 0;
    let totalPutts = 0;
    let puttsRecorded = 0;
    let lastPlayedHole = 0;
    const pars = currentRound.pars;

    for (let i = 0; i < 18; i++) {
        if (memberData.scores && memberData.scores[i] !== null && memberData.scores[i] !== undefined) {
            totalScore += memberData.scores[i];
            totalPar += pars[i];
            lastPlayedHole = i + 1;
        }
        if (memberData.putts && memberData.putts[i] !== null && memberData.putts[i] !== undefined) {
            totalPutts += memberData.putts[i];
            puttsRecorded++;
        }
    }

    const overUnder = totalScore - totalPar;
    let overUnderText;
    if (lastPlayedHole === 0) {
        overUnderText = 'E';
    } else if (overUnder === 0) {
        overUnderText = 'E';
    } else if (overUnder > 0) {
        overUnderText = '+' + overUnder;
    } else {
        overUnderText = String(overUnder);
    }

    const currentHole = memberData.currentHole || 1;
    const completed = memberData.completed === true;

    const chip = document.createElement('div');
    chip.className = 'member-chip' + (isMe ? ' member-chip-me' : '') + (completed ? ' member-chip-done' : '');

    const name = memberData.name || '알 수 없음';
    const holeText = completed ? '✓ 18홀' : currentHole + '홀';
    const puttsText = puttsRecorded > 0 ? '· P ' + totalPutts : '';

    chip.innerHTML =
        '<div class="chip-name">' + (isMe ? '👤 ' : '') + escapeHtml(name) + '</div>' +
        '<div class="chip-stats">' +
            '<span class="chip-hole">' + holeText + '</span>' +
            '<span class="chip-score">' + overUnderText + '</span>' +
            (puttsText ? '<span class="chip-putts">' + puttsText + '</span>' : '') +
        '</div>';

    return chip;
}

// 공유 라운드에서 메인으로 (리스너 정리 포함)
function backToMainFromShared() {
    cleanupSharedListeners();
    currentSharedRoundId = null;
    currentRoundMode = null;
    currentRound = null;
    refreshMainScreen();
    showScreen(screenMain);
}

// =========================================
// 이벤트 리스너 등록
// =========================================
btnEditProfile.addEventListener('click', openProfileScreen);
btnSaveProfile.addEventListener('click', saveProfile);
btnCancelProfile.addEventListener('click', function() {
    showScreen(screenMain);
});

btnNewRound.addEventListener('click', function() {
    if (!canUserCreateRound()) {
        alert('라운드 생성 기능은 현재 사용 불가합니다.');
        return;
    }
    showScreen(screenModeSelect);
});

// 코드로 참여 (2단계 C) — 정모 코드 또는 공유 코드 입력으로 참여
btnJoinByCode.addEventListener('click', function() {
    const code = prompt('정모 코드 또는 공유 코드를 입력하세요 (6자리)');
    if (!code) {
        return;
    }
    const trimmed = code.trim().toUpperCase();
    const validPattern = /^[A-HJ-NP-Z2-9]{6}$/;
    if (!validPattern.test(trimmed)) {
        alert('잘못된 코드 형식입니다.\n\n6자리 영문 대문자/숫자로 구성되어야 합니다.\n(헷갈리는 글자 I, O, 0, 1은 사용하지 않습니다)');
        return;
    }
    console.log('🎯 코드로 참여 시도:', trimmed);

    // 정모 코드인지 공유 라운드 코드인지 모름 → 정모 먼저 시도
    // 정모로 찾으면 정모, 못 찾으면 공유 라운드 시도
    db.collection('tournaments').doc(trimmed).get()
        .then(function(doc) {
            if (doc.exists) {
                // 정모 발견 → 정모 진입 처리
                console.log('ℹ️ 정모 코드로 확인됨');
                const profile = loadUserProfile();
                if (profile === null || !profile.name) {
                    alert('정모에 참여하려면 먼저 이름을 설정해주세요.');
                    openProfileScreen();
                    return;
                }
                handleTournamentEntry(trimmed);
            } else {
                // 정모 없음 → 공유 라운드로 시도
                console.log('ℹ️ 정모 아님 — 공유 라운드로 시도');
                pendingJoinCode = trimmed;
                const profile = loadUserProfile();
                if (profile === null || !profile.name) {
                    alert('참여하려면 먼저 이름을 설정해주세요.');
                    openProfileScreen();
                    return;
                }
                waitForAuthAndShowJoin(trimmed);
            }
        })
        .catch(function(error) {
            console.error('❌ 코드 조회 실패:', error);
            alert('코드 조회 실패: ' + error.message);
        });
});

btnContinueRound.addEventListener('click', function() {
    const activeRound = loadActiveRound();
    if (activeRound === null) {
        alert('진행 중인 라운드가 없습니다.');
        refreshMainScreen();
        return;
    }
    currentRound = activeRound;

    if (!currentRound.putts) {
        currentRound.putts = [null, null, null, null, null, null, null, null, null,
                              null, null, null, null, null, null, null, null, null];
    }

    showScreen(screenHoleInput);
    renderHoleInputScreen();
});

btnStartRound.addEventListener('click', function() {
    if (currentRoundMode === 'shared') {
        // 공유 라운드: Firestore에 만들고 공유 링크 화면으로
        const formData = readNewRoundForm();
        if (formData === null) return;

        createSharedRound(formData);
    } else {
        // 개인 라운드: 1단계 그대로
        startNewRound();
    }
});

btnCancelNewRound.addEventListener('click', function() {
    currentRoundMode = null;
    showScreen(screenMain);
});

// 모드 선택 화면 이벤트
btnModePersonal.addEventListener('click', function() {
    currentRoundMode = 'personal';
    console.log('🟢 개인 라운드 모드 선택');
    openNewRoundScreen();
});

btnModeShared.addEventListener('click', function() {
    console.log('🔵 공유 라운드 모드 선택 시도');

    // 프로필 체크: 이름이 있어야 친구들에게 보여줄 수 있음
    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('공유 라운드를 만들려면 먼저 이름을 설정해주세요.\n프로필 설정 화면으로 이동합니다.');
        openProfileScreen();
        return;
    }

    currentRoundMode = 'shared';
    console.log('🔵 공유 라운드 모드 확정 (호스트:', profile.name + ')');
    openNewRoundScreen();
});

// 정모 모드 (2단계 C)
btnModeTournament.addEventListener('click', function() {
    console.log('🟡 정모 모드 선택 시도');

    if (!canUserHostTournament()) {
        alert('호스트 기능은 현재 사용 불가합니다.');
        return;
    }

    const profile = loadUserProfile();
    if (profile === null || !profile.name) {
        alert('정모를 만들려면 먼저 이름을 설정해주세요.\n프로필 설정 화면으로 이동합니다.');
        openProfileScreen();
        return;
    }

    console.log('🟡 정모 호스트:', profile.name);
    openTournamentCreateScreen();
});

btnCancelModeSelect.addEventListener('click', function() {
    showScreen(screenMain);
});

btnLoadPrevious.addEventListener('click', loadPreviousRound);
selectGameMode.addEventListener('change', onGameModeChange);

btnScoreMinus.addEventListener('click', function() {
    changeScore(-1);
});

btnScorePlus.addEventListener('click', function() {
    changeScore(+1);
});

btnPuttsMinus.addEventListener('click', function() {
    changePutts(-1);
});

btnPuttsPlus.addEventListener('click', function() {
    changePutts(+1);
});

btnPrevHole.addEventListener('click', function() {
    goToHole(currentRound.currentHole - 1);
});

btnNextHole.addEventListener('click', function() {
    if (currentRound.currentHole === 18) {
        finishRound();
    } else {
        goToHole(currentRound.currentHole + 1);
    }
});

btnGoToLeaderboard.addEventListener('click', showLeaderboardScreen);

btnEndTournament.addEventListener('click', function() {
    var confirmed = confirm('🏁 정모를 종료하시겠습니까?\n\n종료하면 모든 멤버가 결과 화면으로 이동합니다.');
    if (confirmed) handleEndTournament();
});

btnResultBackToMain.addEventListener('click', function() {
    resultMembers = [];
    resultTeams = [];
    resultTournamentDoc = null;
    currentRound = null;
    showScreen(screenMain);
});

btnBackToRoundFromLeaderboard.addEventListener('click', function() {
    cleanupLeaderboardListener();
    if (currentRound !== null && currentRound.tournamentId) {
        showScreen(screenHoleInput);
    } else {
        showScreen(screenMain);
    }
});

btnBackToMainFromResult.addEventListener('click', function() {
    if (currentRound && currentRound.tournamentId) {
        // C4-3: 정모 라운드 — onSnapshot + score sync 정리
        cleanupTournamentRoundListeners();
    } else if (currentRound && currentRound.isShared) {
        // B6: 공유 라운드
        cleanupSharedListeners();
        currentSharedRoundId = null;
        currentRoundMode = null;
    }
    currentRound = null;
    viewingPastRoundId = null;
    refreshMainScreen();
    showScreen(screenMain);
});

btnDeleteRound.addEventListener('click', deleteViewingRound);

// =========================================
// 2단계 B: 공유 링크 화면 이벤트
// =========================================
btnCopyLink.addEventListener('click', copyShareLink);

// ★ B6: 호스트 "라운드 시작하기" → 홀 입력 화면 진입
btnStartSharedRound.addEventListener('click', function() {
    if (currentSharedRoundId === null) {
        alert('공유 라운드 정보가 없습니다.');
        showScreen(screenMain);
        return;
    }
    enterSharedHoleInput(currentSharedRoundId, true);
});

btnCancelSharedRound.addEventListener('click', function() {
    if (confirm('정말 취소하시겠습니까? 만든 공유 라운드는 그대로 남습니다.')) {
        currentSharedRoundId = null;
        currentRoundMode = null;
        showScreen(screenMain);
    }
});

// =========================================
// 2단계 B - B5: 라운드 참여 화면 이벤트
// =========================================
btnConfirmJoin.addEventListener('click', confirmJoinRound);

btnCancelJoin.addEventListener('click', function() {
    if (confirm('참여를 취소하시겠습니까?')) {
        pendingJoinCode = null;
        pendingJoinData = null;
        showScreen(screenMain);
    }
});

// =========================================
// 앱 시작 시 초기화
// =========================================
refreshMainScreen();
handleInitialRouting();   // ★ B5: URL에 공유 코드 있으면 참여 흐름 시작

// C4-6: 페이지 떠날 때 모든 onSnapshot 정리
function cleanupAllListenersOnUnload() {
    cleanupTournamentWaitingListeners();
    cleanupTournamentRoundListeners();
    cleanupSharedListeners();
}

window.addEventListener('beforeunload', cleanupAllListenersOnUnload);
