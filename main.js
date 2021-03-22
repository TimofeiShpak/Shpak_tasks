const Module = (function () {
    const TEXT_WIN = 'Поздравляем вы выиграли';
    const TEXT_LOSE = 'К сожалению вы проиграли';
    const TEXT_SCORE = 'со счетом';
    const START_GAME_TEXT = 'Продолжить игру';
    const STOP_GAME_TEXT = 'Остановить игру';
    const TIMER_IS_START = 500;
    const MIN_SPEED_Y = 1;
    const TIME_IS_REVERSE = 400;
    const RACKET_MARGIN = 30;
    const INTERVAL_TIME = 25;
    const COEFFICIENT_SPEED_ENEMY = 0.8;
    const MAX_SCORE = 5;
    const TIME_BONUS = 5000;

    let speedValue = 5;
    let difference = 1;
    let scoreLeft = 0;
    let scoreRight = 0;
    let speedBonus = 0;
    let myModule = {};
    let field = {};
    let speed = {};
    let isReverseHorizontal = false;
    let isStart = false;
    let isBonus = false;
    let invulnerability = '';
    let name = '';
    let player = document.querySelector('.player');
    let enemy = document.querySelector('.enemy');
    let ball = document.querySelector('.ball');
    let startButton = document.querySelector('.start');
    let stopButton = document.querySelector('.stop');
    let modalWrapper = document.querySelector('.modal-wrapper');
    let modalBtn = document.querySelector('.modal__btn');
    let fieldElement = document.querySelector('.field');
    let bonus;
    let timeoutBonus;

    function toggleModal() {
        modalBtn.addEventListener('click', () => {
            modalWrapper.classList.toggle('hide');
        });
    }

    function initScoreElement() {
        let scoreElements = document.querySelectorAll('.score');
        scoreLeft = scoreElements[0];
        scoreRight = scoreElements[1];
    }

    function getCoordsField() {
        let coords = fieldElement.getBoundingClientRect();
        field.fieldTop = coords.top;
        field.bottomEdge = coords.bottom;
        field.fieldLeft = coords.left;
        field.rightEdge = coords.right;
        field.centerX = coords.left + coords.width / 2;
        field.centerY = coords.top + coords.height / 2;
        field.coefficient = coords.width / coords.height;
        field.height = coords.height;
    }

    function moveBallToCenter() {
        ball.style.left = field.centerX - ball.offsetWidth / 2 + 'px';
        ball.style.top = field.centerY - ball.offsetHeight / 2 + 'px';
    }

    function moveAllElementsToCenter() {
        player.style.top = field.centerY - player.offsetWidth / 2 + 'px';
        enemy.style.top = field.centerY - enemy.offsetWidth / 2 + 'px';
        setTimeout(() => moveBallToCenter());
    }

    function changeIsStart(value) {
        isStart = value;
        stopButton.textContent = isStart ? STOP_GAME_TEXT : START_GAME_TEXT;
    }
    
    function continueGame() {
        changeIsStart(false)
        setTimeout(() => {
            changeIsStart(true)
        }, TIMER_IS_START);
    }

    function resetGame() {
        deleteBonus();
        changeIsStart(false);
        moveAllElementsToCenter();
        scoreRight.textContent = 0;
        scoreLeft.textContent = 0;
        speed = getRandomSpeed();
        stopButton.classList.remove('hide');
        invulnerability = '';
        fieldElement.classList.remove('left-side', 'right-side');
        player.classList.remove('sm', 'bg');
        enemy.classList.remove('sm', 'bg');
    }

    function startGame() {
        startButton.addEventListener('click', () => {
            resetGame();
            continueGame();
        });
    }

    function stopGame() {
        stopButton.addEventListener('click', () => {
            changeIsStart(!isStart);
        });
    }

    function resetField() {
        clearTimeout(timeoutBonus);
        isStart = false;
        speed = getRandomSpeed();
        difference = 1;
        setTimeout(() => moveBallToCenter());
        setTimeout(() => isStart = true, TIMER_IS_START);
    }

    function getScoreElement(sideEdge) {
        let element;
        if (sideEdge === 'right') {
            element = scoreLeft;
        } else if(sideEdge === 'left') {
            element = scoreRight;
        }
        return element;
    }

    function changeScore(sideEdge) {
        let element = getScoreElement(sideEdge);
        let valueScore = ++element.textContent;
        element.textContent = valueScore;
        checkScore(valueScore);
    }

    function getTextForModal(winner, leftScore, rightScore) {
        let result = '';
        if (winner === 'player') {
            result += TEXT_WIN;
        } else if (winner === 'enemy') {
            result += TEXT_LOSE;
        }
        result += ` ${TEXT_SCORE} ${leftScore}:${rightScore}`;
        return result;
    }

    function openModal(winner, leftScore, rightScore) {
        let modalTextElement = document.querySelector('.modal__text');
        modalTextElement.textContent = getTextForModal(winner, leftScore, rightScore);
        modalBtn.click();
    }

    function checkWin(leftScore, rightScore) {
        let winner = leftScore > rightScore ? 'player' : 'enemy';
        openModal(winner, leftScore, rightScore);
        resetGame();
        stopButton.classList.add('hide');
    }

    function checkScore(valueScore) {
        if (valueScore === MAX_SCORE) {
            let leftScore = scoreLeft.textContent;
            let rightScore = scoreRight.textContent;
            checkWin(leftScore, rightScore);
        } else {
            resetField();
        }
    }

    function getCoordsBall() {
        let coords = ball.getBoundingClientRect();
        return {
            left : coords.left,
            top : coords.top,
        }
    }

    function getDirections(valueX, valueY) {
        let x = valueX;
        let y = valueY;
        let directions = [{ x : x, y : y }, { x: -x, y: y },
            { x: -x, y: -y }, { x: x, y: -y }];
        return directions;
    }

    function getRandomSpeed() {
        let randomY = Math.random() * speedValue + MIN_SPEED_Y;
        let directions = getDirections(speedValue, randomY);
        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    function checkTopBall(coords, bottomEdge, fieldTop) {
        let top = coords.top;
        let bottomEdgeForBall = bottomEdge - ball.offsetHeight;
        if (top < fieldTop || top > bottomEdgeForBall) {
            speed.y = -speed.y;
            coords.top += speed.y;
        }
    }

    function changeSpeedX() {
        if (isReverseHorizontal) {
            return false;
        }
        let x = speed.x;
        speed.x = x < 0 ? -x + difference : -x - difference;
        speed.y = getRandomSpeed().y;
        isReverseHorizontal = true;
        setTimeout(() => isReverseHorizontal = false, TIME_IS_REVERSE)
    }

    function checkTopRacket(top, element, speed, func) {
        let racket = speed > 0 ? enemy : player;
        let minRequiredTop = parseInt(racket.style.top) - element.offsetHeight / 2;
        let maxRequiredTop = minRequiredTop + racket.offsetHeight + element.offsetHeight / 2;
        if (top <= maxRequiredTop && top >= minRequiredTop) {
            func();
        }
    }

    function getHorizontalValue(left, fieldLeft, rightEdge, element, extraLeft = 0) {
        let racketWidth = player.offsetWidth;
        let minRequiredLeftRocket = fieldLeft + racketWidth + RACKET_MARGIN;
        let maxRequiredLeftRocket = minRequiredLeftRocket + speed.x - extraLeft;
        let maxRequiredLeft = fieldLeft;
        let maxRequiredRight = rightEdge - element.offsetWidth;
        let minRequiredRightRocket = maxRequiredRight - racketWidth - RACKET_MARGIN;
        let maxRequiredRightRocket = minRequiredRightRocket + speed.x + extraLeft;
        let isNearHorizontalToRacket = (left <= minRequiredLeftRocket && left >= maxRequiredLeftRocket) 
            || (left >= minRequiredRightRocket && left <= maxRequiredRightRocket);
        let isNearHorizontalToEdge = (left <= maxRequiredLeft) || (left >= maxRequiredRight);
        let sideEdge = left <= minRequiredLeftRocket ? 'left' : 'right';
        return { isNearHorizontalToRacket, isNearHorizontalToEdge, sideEdge };
    }

    function checkBallHorizontal(coords, fieldLeft, rightEdge) {
        let { top, left } = coords;
        let values = getHorizontalValue(left, fieldLeft, rightEdge, ball);
        let { isNearHorizontalToRacket, isNearHorizontalToEdge, sideEdge } = values;

        if (invulnerability === sideEdge && isNearHorizontalToEdge) {
            changeSpeedX();
        } else if (isNearHorizontalToEdge) {
            changeScore(sideEdge);
        } else if (isNearHorizontalToRacket) {
            checkTopRacket(top, ball, speed.x, changeSpeedX);
        }
    }

    function checkBallCoords(coords) {
        let { fieldTop, bottomEdge, fieldLeft, rightEdge } = field;
        checkTopBall(coords, bottomEdge, fieldTop);
        checkBallHorizontal(coords, fieldLeft, rightEdge);
    }

    function getChangedBallCoords() {
        let coords = getCoordsBall();
        coords.top += speed.y;
        coords.left += speed.x;
        checkBallCoords(coords);
        return coords;
    }

    function moveBall() {
        setInterval(() => {
            if (!isStart) {
                return false;
            }
            let coords = getChangedBallCoords();
            ball.style.top = coords.top + 'px'; 
            ball.style.left = coords.left + 'px'; 
        }, INTERVAL_TIME);
    }

    function initBall() {
        moveBall();
        speed = getRandomSpeed();
    }


    function checkTop(top) {
        let { fieldTop, bottomEdge } = field;
        let maxTop = bottomEdge - player.offsetHeight;
        if (top < fieldTop) {
            top = fieldTop;
        } else if (top > maxTop) {
            top = maxTop;
        }
        return top;
    }

    function getRequiredTopEnemy() {
        let ballTop = getCoordsBall().top;
        let top = ballTop + ball.offsetHeight / 2 - enemy.offsetHeight / 2;
        return top; 
    }

    function checkEnemyTop(enemyTop) {
        let stepSize = speedValue * COEFFICIENT_SPEED_ENEMY;
        let requiredTop = getRequiredTopEnemy();
        let checkedEnemyTop = checkTop(enemyTop);
        let result = checkedEnemyTop;

        if (checkedEnemyTop < requiredTop - stepSize) {
            result += stepSize;
        }  else if (checkedEnemyTop > requiredTop + stepSize) {
            result -= stepSize;
        }
        return result;
    }

    function getChangedEnemyTop() {
        let enemyTop = parseInt(enemy.style.top) || 0;
        let newEnemyTop = checkEnemyTop(enemyTop); 
        return newEnemyTop;
    }

    function moveEnemy() {
        setInterval(() => {
            if (!isStart) {
                return false;
            }
            let top = getChangedEnemyTop();
            enemy.style.top = top + 'px'; 
        }, INTERVAL_TIME);
    }

    function mousemove(event) {
        let top = event.clientY - shiftY;
        let checkingTop = checkTop(top);
        player.style.top = checkingTop + 'px';
    }

    function controlRacket(event) {
        shiftY = event.clientY - player.getBoundingClientRect().top;
        mousemove(event);
        document.addEventListener('mousemove', mousemove);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', mousemove);
            document.onmouseup = null;
        };
    }

    function mouseDown() {
        document.addEventListener('mousedown', (event) => {
            let elem = event.target;
            elem.ondragstart = () => false;
            if (!isStart) {
                return false;
            }
            if (elem.classList.contains('player')) {
                controlRacket(event);
            }
        });
    }

    function getNames() {
        let names = ['sm', 'bg', 'sd', 's+', 's-'];
        let randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }

    function getRandomTop() {
        let randomHeight = Math.random() * (field.height - 40);
        let topBonus = randomHeight + field.fieldTop;
        return topBonus;
    }

    function changeSizeRocket(sideEdge) {
        let element = sideEdge === 'left' ? player : enemy;
        let className = name;
        element.classList.add(className);
        setTimeout(() => element.classList.remove(className), TIME_BONUS);
    }

    function setInvulnerability(sideEdge) {
        fieldElement.classList.add(`${sideEdge}-side`);
        invulnerability = sideEdge;
        setTimeout(() => {
            invulnerability = '';
            fieldElement.classList.remove(`${sideEdge}-side`);
        }, TIME_BONUS);
    }

    function changeValueSpeed(type) {
        if (type === 's+') {
            speed.x *= 2;
            speed.y *= 2;
            difference *= 2;
        } else {
            speed.x /= 2;
            speed.y /= 2;
            difference /= 2;
        }
    }

    function deleteBonus() {
        if (isBonus) {
            clearInterval(intervalBonus);
            bonus.remove();
        }
    }

    function changeSpeedBall() {
        let nameForChange = name === 's+' ? 's-' : 's+';
        changeValueSpeed(name);
        timeoutBonus = setTimeout(() => changeValueSpeed(nameForChange), TIME_BONUS);
    }

    function takeBonus(sideEdge) {
        if (name === 'sm' || name === 'bg') {
            changeSizeRocket(sideEdge);
        } else if (name === 'sd') {
            setInvulnerability(sideEdge);
        } else if (name === 's+' || name === 's-') {
            changeSpeedBall();
        }
        deleteBonus();
    }

    function checkBonusHorizontal(left) {
        let top = parseInt(bonus.style.top);
        let { fieldLeft, rightEdge } = field;
        let values = getHorizontalValue(left, fieldLeft, rightEdge, bonus, RACKET_MARGIN);
        let { isNearHorizontalToRacket, sideEdge } = values;
        if (isNearHorizontalToRacket) {
            checkTopRacket(top, bonus, speedBonus, takeBonus.bind(null, sideEdge));
        }
    }

    function checkLeftBonus(left) {
        const RACKET_MARGIN = 30;
        let minLeft = field.fieldLeft - bonus.offsetWidth + RACKET_MARGIN;
        let maxLeft = field.rightEdge - RACKET_MARGIN;
        if (left < minLeft || left > maxLeft) {
            deleteBonus();
        }
        checkBonusHorizontal(left);
    }

    function getChangedBonusCoords() {
        let left = parseInt(bonus.style.left);
        left += speedBonus;
        checkLeftBonus(left);
        return left; 
    }

    function moveBonus() {
        const INTERVAL_TIME = 50;
        speedBonus = -5 || getRandomSpeed().x;
        intervalBonus = setInterval(() => {
            if (!isStart && isBonus) {
                return false;
            }
            let left = getChangedBonusCoords();
            bonus.style.left = left + 'px'; 
        }, INTERVAL_TIME);
    }

    function createBonus() {
        name = getNames();
        bonus = document.createElement('div');
        bonus.classList.add('bonus');
        bonus.textContent = name;
        bonus.style.top = getRandomTop() + 'px';
        bonus.style.left = field.centerX - bonus.offsetWidth / 2 + 'px';
        fieldElement.prepend(bonus);
        moveBonus();
        isBonus = true;
    }

    function initBonus() {
        const INTERVAL_TIME = 10000;
        setInterval(() => {
            if (!isStart) {
                return false;
            }
            createBonus();
        }, INTERVAL_TIME)
    }

    function resize() {
        window.addEventListener('resize', () => {
            getCoordsField();
            moveAllElementsToCenter();
        });
    }

    myModule.init = () => {
        toggleModal();
        initScoreElement();
        getCoordsField();
        resize();
        moveAllElementsToCenter();
        startGame();
        mouseDown();
        moveEnemy();
        initBall();
        stopGame();
        initBonus();
    }

    return myModule;
})();

Module.init();
