// =========================================
// 화면 요소 가져오기
// =========================================
const screenMain = document.getElementById('screen-main');
const screenNewRound = document.getElementById('screen-new-round');
const screenHoleInput = document.getElementById('screen-hole-input');
const screenResult = document.getElementById('screen-result');
const screenProfile = document.getElementById('screen-profile');

const allScreens = [screenMain, screenNewRound, screenHoleInput, screenResult, screenProfile];

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

// ★ A4 신규: 결과 화면 게임 모드/Net/퍼팅
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
const inputUserName = document.getElementById('input-user-name');
const inputHandicapIndex = document.getElementById('input-handicap-index');
const btnSaveProfile = document.getElementById('btn-save-profile');
const btnCancelProfile = document.getElementById('btn-cancel-profile');

// =========================================
// 전역 상태
// =========================================
let currentRound = null;
let viewingPastRoundId = null;

const STORAGE_KEYS = {
    ACTIVE_ROUND: 'golf_active_round',
    COMPLETED_ROUNDS: 'golf_rounds',
    USER_PROFILE: 'golf_user_profile'
};

// =========================================
// localStorage (변경 없음)
// =========================================
function saveActiveRound() {
    if (currentRound === null) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
    } else {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUND, JSON.stringify(currentRound));
    }
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
// 메인 화면 렌더링 (변경 없음)
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

    item.innerHTML =
        '<div class="past-round-top">' +
            '<span class="past-round-course">' + escapeHtml(round.courseName) + '</span>' +
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
// 프로필 화면 (변경 없음)
// =========================================
function openProfileScreen() {
    const profile = loadUserProfile();

    if (profile !== null) {
        inputUserName.value = profile.name || '';
        inputHandicapIndex.value = (profile.handicapIndex !== null && profile.handicapIndex !== undefined)
            ? profile.handicapIndex
            : '';
    } else {
        inputUserName.value = '';
        inputHandicapIndex.value = '';
    }

    showScreen(screenProfile);
}

function saveProfile() {
    const name = inputUserName.value.trim();

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
// 새 라운드 폼 관련 (변경 없음)
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
        courseHandicap: formData.courseHandicap
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
// 홀 입력 화면 (변경 없음)
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
}

function finishRound() {
    const currentIndex = currentRound.currentHole - 1;
    if (currentRound.scores[currentIndex] === null) {
        currentRound.scores[currentIndex] = currentRound.pars[currentIndex];
    }

    const confirmed = confirm('라운드를 종료할까요?\n종료하면 더 이상 수정할 수 없습니다.');
    if (!confirmed) return;

    currentRound.completed = true;
    addCompletedRound(currentRound);
    console.log('라운드 종료:', currentRound);

    viewingPastRoundId = null;
    showScreen(screenResult);
    renderResultScreen(currentRound);

    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
}

// =========================================
// ★ A4 변경: 결과 화면 (Net Score + 퍼팅 통계)
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

// ★ A4 신규: 퍼팅 통계 계산
function calculatePuttsStats(round) {
    if (!round.putts) {
        return null;  // 옛날 라운드 (퍼팅 데이터 없음)
    }

    const recordedPutts = round.putts.filter(function(p) {
        return p !== null && p !== undefined;
    });

    if (recordedPutts.length === 0) {
        return null;  // 입력 안 한 라운드
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

    // ★ A4 신규: 게임 모드 배지
    const mode = round.gameMode || 'gross';  // 옛날 라운드 호환
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

// ★ A4 신규: Net Score 섹션 렌더링
function renderResultNet(round, stats) {
    const mode = round.gameMode || 'gross';

    if (mode !== 'net') {
        resultNetSection.classList.add('hidden');
        return;
    }

    // Net 모드인데 핸디 정보 없으면 표시 안 함
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

// ★ A4 신규: 퍼팅 통계 렌더링
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

// ★ A4 변경: 결과 화면 렌더링 (Net + 퍼팅 추가)
function renderResultScreen(round) {
    const stats = calculateStats(round);

    renderResultHeader(round);
    renderResultTotal(stats);
    renderResultNet(round, stats);          // ★ 신규
    renderResultHalves(stats);
    renderScoreDistribution(stats);
    renderPuttsStats(round);                // ★ 신규
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
// 이벤트 리스너 등록
// =========================================
btnEditProfile.addEventListener('click', openProfileScreen);
btnSaveProfile.addEventListener('click', saveProfile);
btnCancelProfile.addEventListener('click', function() {
    showScreen(screenMain);
});

btnNewRound.addEventListener('click', openNewRoundScreen);

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

btnStartRound.addEventListener('click', startNewRound);

btnCancelNewRound.addEventListener('click', function() {
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
    currentRound = null;
    viewingPastRoundId = null;
    refreshMainScreen();
    showScreen(screenMain);
});

btnDeleteRound.addEventListener('click', deleteViewingRound);

// =========================================
// 앱 시작 시 초기화
// =========================================
refreshMainScreen();