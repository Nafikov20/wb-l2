
// переменная для игрового поля
let origBoard;
// игрок ставит крестики, компьютер — нолики
const huPlayer = 'X';
const aiPlayer = 'O';
let mode = 'againstComputer';
let currentPlayer;
// выигрышные комбинации
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

// получаем доступ к HTML-клеткам на доске
const gameBtns = document.querySelectorAll('.game_btn');
// запускаем игру
startGame();

// запуск игры
function startGame() {
    currentPlayer = mode === 'twoPlayers' ? 'X' : huPlayer;
    // формируем игровое поле
    origBoard = Array.from(Array(9).keys());
    // перебираем все клетки, очищаем их, убираем цвет фона и вешаем обработчик клика на каждую
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].innerText = '';
        gameBtns[i].style.removeProperty('background-color');
        gameBtns[i].addEventListener('click', turnClick, false);
    }

}
document.getElementById('modeSelect').addEventListener('change', (event) => {
    mode = event.target.value;
    console.log(mode)
    startGame();
});


// обрабатываем клик на клетке
function turnClick(square) {
    if (mode === 'twoPlayers') {
        // режим игры между двумя игроками
        turn(square.target.id, currentPlayer);
        if (!checkWin(origBoard, currentPlayer) && !checkTie()) {
            switchPlayer();
        }
    } else {
        // режим игры против компьютера
        if (typeof origBoard[square.target.id] == 'number') {
            // ставим там крестик
            turn(square.target.id, huPlayer);

            // если после хода игрок не выиграл и нет ничьей, компьютер находит лучшее место для нолика и ставит его туда
            if (!checkWin(origBoard, huPlayer) && !checkTie()) {
                turn(bestSpot(), aiPlayer);
            }
        }
    }
}

// функция для переключения текущего игрока
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
// функция для определения лучшего хода компьютера
function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}

// обработка хода
function turn(squareId, player) {
    // ставим фигуру на выбранное место
    origBoard[squareId] = player;
    // рисуем её на игровом поле на странице
    document.getElementById(squareId).innerText = player;
    // проверяем, есть ли победа после хода
    let gameWon = checkWin(origBoard, player)
    // если есть — выводим сообщение об этом
    if (gameWon) gameOver(gameWon)
}

// проверяем, выиграл ли кто-то после своего хода
function checkWin(board, player) {
    // проходим по доске и собираем все комбинации, проставленные участником
    let plays = board.reduce((a, e, i) =>
        (e === player) ? a.concat(i) : a, []);
    // на старте считаем, что выигрышной ситуации нет
    let gameWon = null;
    // перебираем все выигрышные комбинации и сравниваем их с ситуацией на доске
    for (let [index, win] of winCombos.entries()) {
        // если одна из них совпадает с тем, что на доске — формируем информацию о победителе
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;
        }
    }
    // возвращаем информацию о победителе
    return gameWon;
}

// конец игры
function gameOver(gameWon) {
    // берём выигрышную комбирацию
    for (let index of winCombos[gameWon.index]) {
        // и раскрашиваем её в нужные цвета
        document.getElementById(index).style.backgroundColor =
            gameWon.player === huPlayer ? "blue" : "red";
    }
    // убираем обработчик нажатия со всех клеток
    for (let i = 0; i < gameBtns.length; i++) {
        gameBtns[i].removeEventListener('click', turnClick, false);
    }
    // выводим сообщение о проигрыше или победе игрока
    alert(gameWon.player === huPlayer ? "Вы выиграли!" : "Вы проиграли.");
}

// функция, которая проверяеят, пустая ли выбранная клетка на поле или нет
function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
}



// проверка на ничью
function checkTie() {
    // если пустых клеток не осталось
    if (emptySquares().length === 0) {
        // перебираем все клетки и раскрашиваем их зелёным
        for (let i = 0; i < gameBtns.length; i++) {
            gameBtns[i].style.backgroundColor = "green";
            // отключаем обработчики нажатий
            gameBtns[i].removeEventListener('click', turnClick, false);
        }
        // выводим сообщение про ничью
        alert("Ничья!")
        return true;
    }
    return false;
}

// алгоритм поиска лучшего хода с минимаксной стратегией
function minimax(newBoard, player) {
    // получаем все клетки, доступные для ходов
    let availSpots = emptySquares();

    // если при текущем расположении побеждает игрок
    if (checkWin(newBoard, huPlayer)) {
        // отнимаем от результата 10 очков
        return {score: -10};
        // если выиграет компьютер
    } else if (checkWin(newBoard, aiPlayer)) {
        // прибавляем 10 очков
        return {score: 10};
        // если ничья, то не менеяем очки
    } else if (availSpots.length === 0) {
        return {score: 0};
    }

    // тут будем хранить все будущие ходы для их оценки
    let moves = [];
    // перебираем доступные клетки
    for (let i = 0; i < availSpots.length; i++) {
        // переменная для следующего шага
        let move = {};
        // делаем шаг в очередную пустую клетку и получаем новое положение на доске
        move.index = newBoard[availSpots[i]];
        // заполняем эту клетку символом того, чей ход мы рассчитываем
        newBoard[availSpots[i]] = player;

        // если считаем ход для компьютера
        if (player === aiPlayer) {
            // рекурсивно вызываем минимаксную функцию для нового положения и указываем, что следующий ход делает человек
            let result = minimax(newBoard, huPlayer);
            move.score = result.score;
            // то же самое, но если считаем ход человека
        } else {
            let result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }
        // запоминаем результат
        newBoard[availSpots[i]] = move.index;
        // добавляем ход в список ходов
        moves.push(move);
    }
    // переменная для лучшего хода
    let bestMove;
    // если считаем ход компьютера
    if(player === aiPlayer) {
        // берём максимально низкое значение
        let bestScore = -10000;
        // перебираем все ходы, что у нас получились
        for(let i = 0; i < moves.length; i++) {
            // если очки текущего хода больше лучшего значения
            if (moves[i].score > bestScore) {
                // запоминаем это как лучшее значение
                bestScore = moves[i].score;
                // запоминаем номер хода
                bestMove = i;
            }
        }
        // то же самое делаем с ходом, если моделируем ход человека
    } else {
        let bestScore = 10000;
        for(let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    // возвращаем лучший ход
    return moves[bestMove];
}