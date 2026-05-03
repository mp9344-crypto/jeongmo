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
const screenHoleInput = document.getElementById('screen-hole-input');
const screenResult = document.getElementById('screen-result');
const screenProfile = document.getElementById('screen-profile');

const allScreens = [
    screenMain,
    screenModeSelect,
    screenShareLink,
    screenJoinRound,
    screenNewRound,
    screenTournamentCreate,
    screenTournamentLink,
    screenHoleInput,
    screenResult,
    screenProfile
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
const tournamentCopyFeedback = document.getElementById('tournament-copy-feedback');
const tournamentLinkMembersList = document.getElementById('tournament-link-members-list');
const btnGoToWaitingRoom = document.getElementById('btn-go-to-waiting-room');
const btnBackToMainFromTournamentLink = document.getElementById('btn-back-to-main-from-tournament-link');

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
let scoreSyncTimer = null;         // 디바운스 타이머
const SCORE_SYNC_DELAY = 500;      // 500ms 디바운스

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
btnBackToMainFromTournamentLink.addEventListener('click', function() {
    showScreen(screenMain);
});

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

    // ★ B6: 공유 라운드면 Firestore 동기화 (디바운스)
    if (currentRound.isShared) {
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

    // ★ B6: 공유 라운드면 Firestore 동기화 (디바운스)
    if (currentRound.isShared) {
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

    // ★ B6: 공유 라운드면 Firestore 동기화 (즉시 - 홀 이동은 디바운스 불필요)
    if (currentRound.isShared) {
        syncMyScoreToFirestore();
    }
}

function finishRound() {
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

    // 멤버 목록 (지금은 호스트만)
    tournamentLinkMembersList.innerHTML = '';
    const memberDiv = document.createElement('div');
    memberDiv.className = 'share-member';
    memberDiv.textContent = '👑 ' + (profile ? profile.name : '나') + ' (호스트)';
    tournamentLinkMembersList.appendChild(memberDiv);

    tournamentCopyFeedback.classList.add('hidden');
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
            renderMembersStrip();
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
    if (!currentRound || !currentRound.isShared) {
        if (membersStrip) membersStrip.classList.add('hidden');
        if (sharedModeBadge) sharedModeBadge.classList.add('hidden');
        return;
    }

    if (sharedModeBadge) sharedModeBadge.classList.remove('hidden');
    if (membersStrip) membersStrip.classList.remove('hidden');

    renderMembersStrip();
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
    showScreen(screenModeSelect);
});

// 코드로 참여 (2단계 C) — 정모 코드 또는 공유 코드 입력으로 참여
btnJoinByCode.addEventListener('click', function() {
    const code = prompt('정모 코드 또는 공유 코드를 입력하세요 (6자리)');
    if (!code) {
        return;
    }
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length !== 6) {
        alert('코드는 6자리여야 합니다.');
        return;
    }
    console.log('🎯 코드로 참여 시도:', trimmed);
    // C2 단계에서 실제 참여 로직 연결됨. 지금은 안내만.
    alert('코드 참여 기능은 C2 단계에서 연결됩니다.\n현재는 링크/QR로 참여해주세요.');
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

btnBackToMainFromResult.addEventListener('click', function() {
    // ★ B6: 공유 라운드였으면 리스너 정리
    if (currentRound && currentRound.isShared) {
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
