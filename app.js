// =========================================
// 화면 요소 가져오기
// =========================================
const screenMain = document.getElementById('screen-main');
const screenNewRound = document.getElementById('screen-new-round');
const screenHoleInput = document.getElementById('screen-hole-input');
const screenResult = document.getElementById('screen-result');

const allScreens = [screenMain, screenNewRound, screenHoleInput, screenResult];

// 메인/새 라운드 화면
const btnNewRound = document.getElementById('btn-new-round');
const btnContinueRound = document.getElementById('btn-continue-round');
const btnStartRound = document.getElementById('btn-start-round');
const btnCancelNewRound = document.getElementById('btn-cancel-new-round');
const inputCourseName = document.getElementById('input-course-name');
const parInputsFront = document.getElementById('par-inputs-front');
const parInputsBack = document.getElementById('par-inputs-back');

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

// 결과 화면
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

// =========================================
// 전역 상태
// =========================================
let currentRound = null;

const STORAGE_KEYS = {
    ACTIVE_ROUND: 'golf_active_round',
    COMPLETED_ROUNDS: 'golf_rounds'
};

// =========================================
// localStorage 저장/불러오기
// =========================================

function saveActiveRound() {
    if (currentRound === null) {
        localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
    } else {
        const json = JSON.stringify(currentRound);
        localStorage.setItem(STORAGE_KEYS.ACTIVE_ROUND, json);
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
    const json = JSON.stringify(rounds);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_ROUNDS, json);
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

// =========================================
// 화면 전환
// =========================================
function showScreen(screenToShow) {
    for (let i = 0; i < allScreens.length; i++) {
        allScreens[i].classList.add('hidden');
    }
    screenToShow.classList.remove('hidden');
}

// =========================================
// 메인 화면 — 이어하기 버튼 표시/숨김
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
}

// =========================================
// 새 라운드 폼 관련
// =========================================
function createParInputs() {
    parInputsFront.innerHTML = '';
    for (let i = 1; i <= 9; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = '4';
        input.id = 'par-input-' + i;
        parInputsFront.appendChild(input);
    }

    parInputsBack.innerHTML = '';
    for (let i = 10; i <= 18; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '3';
        input.max = '5';
        input.value = '4';
        input.id = 'par-input-' + i;
        parInputsBack.appendChild(input);
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

    return { courseName: courseName, pars: pars };
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
        currentHole: 1,
        completed: false
    };

    saveActiveRound();
    showScreen(screenHoleInput);
    renderHoleInputScreen();
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
    saveActiveRound();
    renderHoleInputScreen();
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

    // 결과 화면 표시 후 진행 중 데이터만 정리
    showScreen(screenResult);
    renderResultScreen();

    // localStorage에서 진행 중 라운드 삭제 (currentRound는 결과 화면 떠나기 전까지 유지)
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_ROUND);
}

// =========================================
// 결과 화면
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
}

function renderResultTotal(stats) {
    resultTotalScore.textContent = stats.totalScore;
    resultOverUnder.textContent = formatOverUnder(stats.overUnder);
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

function renderScorecardTable(tableElement, round, startHole, endHole) {
    tableElement.innerHTML = '';

    // 1행: 홀 번호
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

    // 2행: 파
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

    // 3행: 스코어 (숫자를 span으로 감싸서 모양 위에 표시)
    const scoreRow = document.createElement('tr');
    const scoreLabel = document.createElement('td');
    scoreLabel.className = 'row-label';
    scoreLabel.textContent = 'Score';
    scoreRow.appendChild(scoreLabel);

    for (let i = startHole; i <= endHole; i++) {
        const td = document.createElement('td');
        const score = round.scores[i - 1];
        const par = round.pars[i - 1];

        // ★ 핵심: 숫자를 span으로 감싸기 (모양 위에 보이게)
        const span = document.createElement('span');
        span.textContent = score;
        td.appendChild(span);

        td.className = getScoreClass(score, par);
        scoreRow.appendChild(td);
    }
    tableElement.appendChild(scoreRow);
}

function renderResultScreen() {
    const stats = calculateStats(currentRound);

    renderResultHeader(currentRound);
    renderResultTotal(stats);
    renderResultHalves(stats);
    renderScoreDistribution(stats);
    renderScorecardTable(scorecardFront, currentRound, 1, 9);
    renderScorecardTable(scorecardBack, currentRound, 10, 18);
}

// =========================================
// 이벤트 리스너 등록
// =========================================
btnNewRound.addEventListener('click', function() {
    createParInputs();
    inputCourseName.value = '';
    showScreen(screenNewRound);
});

btnContinueRound.addEventListener('click', function() {
    const activeRound = loadActiveRound();
    if (activeRound === null) {
        alert('진행 중인 라운드가 없습니다.');
        refreshMainScreen();
        return;
    }
    currentRound = activeRound;
    showScreen(screenHoleInput);
    renderHoleInputScreen();
});

btnStartRound.addEventListener('click', startNewRound);

btnCancelNewRound.addEventListener('click', function() {
    showScreen(screenMain);
});

btnScoreMinus.addEventListener('click', function() {
    changeScore(-1);
});

btnScorePlus.addEventListener('click', function() {
    changeScore(+1);
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
    refreshMainScreen();
    showScreen(screenMain);
});

// =========================================
// 앱 시작 시 초기화
// =========================================
refreshMainScreen();
