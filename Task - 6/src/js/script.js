const makeRandomBtn = document.getElementById('make-random');
const notificationStart = document.querySelector('.notification');
const reloadGame = document.getElementById('reload-game');
const formSendNumber = document.getElementById('send-number');
const responseInput = document.getElementById('response-input');
const responseSubmit = document.getElementById('response-submit');
const countWrap = document.querySelector('.count');
const hintWrap = document.querySelector('.hint');
const rangeWrap = document.querySelector('.range');
const increaseRange = document.getElementById('increase-range');

let valueRandomNumber = '';
let sendNum = '';
let count = 0;
let range = 101;

reloadGame.disabled = true;

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

increaseRange.addEventListener('click', () => {
    range = 1001
    if(range === 1001) {
        rangeWrap.textContent = 'Диапазон увеличен на 1000';
        increaseRange.disabled = true;
    }
})

function startGame() {
    console.log(range, 'range')
    valueRandomNumber = generateRandomNumber(range);
    increaseRange.disabled = true;
    if (valueRandomNumber !== '') {
        makeRandomBtn.disabled = true;
        notificationStart.textContent = 'Игра начата';
        reloadGame.disabled = false;
        responseInput.disabled = false;
        responseSubmit.disabled = false;
    }
}

function resetGame() {
    count = 0;
    range = 101;
    responseInput.value = '';
    countWrap.textContent = '0';
    hintWrap.textContent = '';
    rangeWrap.textContent = '';
    increaseRange.disabled = false;
    startGame();
}


function checkNumbers(randomNum, userNum) {
    count++;
    countWrap.textContent = String(count);

    if (randomNum === userNum) {
        hintWrap.textContent = 'Победа';
    } else if (randomNum > userNum) {
        hintWrap.textContent = 'Слишком мало';
    } else {
        hintWrap.textContent = 'Слишком много';
    }

    if (count === 3) {
        hintWrap.textContent = randomNum % 2 === 0 ? 'Четное' : 'Нечетное';
        console.log(randomNum % 2 === 0 ? 'Четное' : 'Нечетное');
    }
}

makeRandomBtn.addEventListener('click', startGame);
reloadGame.addEventListener('click', resetGame);

formSendNumber.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formSendNumber);
    sendNum = formData.get('number');

    if (isNaN(sendNum) || sendNum < 1 || sendNum > 100) {
        alert('Пожалуйста, введите число от 1 до 100.');
        return;
    }

    checkNumbers(Number(valueRandomNumber), Number(sendNum));
});