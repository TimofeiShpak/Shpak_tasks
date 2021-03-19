class Game {
    isStart = false;
    player = document.querySelector('.player');
    enemy = document.querySelector('.enemy');
    ball = document.querySelector('.ball');
    startButton = document.querySelector('.start');
    modalWrapper = document.querySelector('.modal-wrapper');
    modalBtn = document.querySelector('.modal__btn');
    field = {};
    speed = {};

    toggleModal() {
        this.modalBtn.addEventListener('click', () => {
            this.modalWrapper.classList.toggle('hide');
        });
    }

    getTextForModal(winner, leftScore, rightScore) {
        let result = '';
        if (winner === 'player') {
            result += 'Поздравляем вы выиграли';
        } else if (winner === 'enemy') {
            result += 'К сожалению вы проиграли'
        }
        result += ` со счетом ${leftScore}:${rightScore}`;
        return result;
    }

    openModal(winner, leftScore, rightScore) {
        let modalTextElement = document.querySelector('.modal__text');
        modalTextElement.textContent = this.getTextForModal(winner, leftScore, rightScore);
        this.modalBtn.click();
    }

    initScoreElement() {
        let scoreElements = document.querySelectorAll('.score');
        this.scoreLeft = scoreElements[0];
        this.scoreRight = scoreElements[1];
    }

    getCoordsField() {
        let field = document.querySelector('.field');
        let coords = field.getBoundingClientRect();
        this.field.fieldTop = coords.top;
        this.field.bottomEdge = coords.top + field.offsetHeight;
        this.field.fieldLeft = coords.left;
        this.field.rightEdge = coords.left + field.offsetWidth;
        this.field.centerX = coords.left + field.offsetWidth / 2;
        this.field.centerY = coords.top + field.offsetHeight / 2;
        this.field.coefficient = 1.2 * field.offsetWidth / field.offsetHeight;
        this.field.height = field.offsetHeight;
    }

    startGame() {
        const START_GAME_TEXT = 'Start game';
        const STOP_GAME_TEXT = 'Stop game';

        this.startButton.addEventListener('click', () => {
            this.isStart = !this.isStart;
            this.startButton.textContent = this.isStart ? STOP_GAME_TEXT : START_GAME_TEXT;
        });
    }

    moveAllElementsToCenter() {
        this.player.style.top = this.field.centerY - this.player.offsetWidth / 2 + 'px';
        this.enemy.style.top = this.field.centerY - this.enemy.offsetWidth / 2 + 'px';
        setTimeout(() => this.moveBallToCenter());
    }

    resetField() {
        const TIMER_IS_START = 1000;
        this.isStart = false;
        this.speed = this.getRandomSpeed();
        setTimeout(() => this.moveBallToCenter());
        setTimeout(() => this.isStart = true, TIMER_IS_START);
    }

    getScoreElement(sideEdge) {
        let element;
        if (sideEdge === 'right') {
            element = this.scoreLeft;
        } else if(sideEdge === 'left') {
            element = this.scoreRight;
        }
        return element;
    }

    changeScore(sideEdge) {
        let element = this.getScoreElement(sideEdge);
        element.textContent = ++element.textContent;
    }

    resetGame() {
        this.moveAllElementsToCenter();
        this.scoreRight.textContent = this.scoreLeft.textContent = 0;
        this.startButton.click();
        this.speed = this.getRandomSpeed();
    }

    checkWin(leftScore, rightScore) {
        let winner = leftScore > rightScore ? 'player' : 'enemy';
        this.openModal(winner, leftScore, rightScore);
        this.resetGame();
    }

    checkScore() {
        const REQUIRED_MAX_SCORE = 2;
        let rightScore = +this.scoreRight.textContent;
        let leftScore = +this.scoreLeft.textContent;
        let maxScore = Math.max(leftScore, rightScore);
        if (maxScore === REQUIRED_MAX_SCORE) {
            this.checkWin(leftScore, rightScore);
        } else {
            this.resetField();
        }
    }
}

class Ball extends Game {
    speedValue = 5;

    moveBallToCenter() {
        this.ball.style.left = this.field.centerX - this.ball.offsetWidth / 2 + 'px';
        this.ball.style.top = this.field.centerY - this.ball.offsetHeight / 2 + 'px';
    }

    getCoordsBall() {
        let coords = this.ball.getBoundingClientRect();
        return {
            left : coords.left,
            top : coords.top,
        }
    }

    getDirections(value) {
        let x = value;
        let y = x / this.field.coefficient;
        let directions = [{ x : x, y : y }, { x: -x, y: y },
            { x: -x, y: -y }, { x: x, y: -y }];
        return directions;
    }

    getRandomSpeed() {
        let directions = this.getDirections(this.speedValue);
        let randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    checkTopBall(top, bottomEdge, fieldTop) {
        bottomEdge = bottomEdge - this.ball.offsetHeight;
        if (top < fieldTop || top > bottomEdge) {
            this.speed.y = -this.speed.y;
        }
    }

    changeSpeedX() {
        const DIFFERENCE = 0.5;
        let x = this.speed.x;
        this.speed.x = x < 0 ? -x + DIFFERENCE : -x - DIFFERENCE;
    }

    checkTopRacket(top, element, func) {
        let racket = this.speed.x > 0 ? this.enemy : this.player;
        let minRequiredTop = parseInt(racket.style.top) - element.offsetHeight / 2;
        let maxRequiredTop = minRequiredTop + racket.offsetHeight + element.offsetHeight / 2;
        if (top <= maxRequiredTop && top >= minRequiredTop) {
            func();
        }
    }

    getHorizontalValue(left, fieldLeft, rightEdge, element) {
        const RACKET_MARGIN = 30;
        let racketWidth = this.player.offsetWidth;
        let minRequiredLeft = fieldLeft + racketWidth + RACKET_MARGIN;
        let maxRequiredLeft = fieldLeft;
        let maxRequiredRight = rightEdge - element.offsetWidth;
        let minRequiredRight = maxRequiredRight - racketWidth - RACKET_MARGIN;
        let isNearHorizontalToRacket = (left <= minRequiredLeft) || (left >= minRequiredRight);
        let isNearHorizontalToEdge = (left <= maxRequiredLeft) || (left >= maxRequiredRight);
        let sideEdge = left <= minRequiredLeft ? 'left' : 'right';
        return { isNearHorizontalToRacket, isNearHorizontalToEdge, sideEdge };
    }

    checkBallHorizontal(left, fieldLeft, rightEdge, top) {
        let values = this.getHorizontalValue(left, fieldLeft, rightEdge, this.ball);
        let { isNearHorizontalToRacket, isNearHorizontalToEdge, sideEdge } = values;
        if (isNearHorizontalToRacket) {
            this.checkTopRacket(top, this.ball, this.changeSpeedX.bind(this));
        }
        if (isNearHorizontalToEdge) {
            this.changeScore(sideEdge);
            this.checkScore();
        }
    }

    checkBallCoords(coords) {
        let { top, left } = coords;
        let { fieldTop, bottomEdge, fieldLeft, rightEdge } = this.field;
        this.checkTopBall(top, bottomEdge, fieldTop);
        this.checkBallHorizontal(left, fieldLeft, rightEdge, top);
    }

    getChangedBallCoords() {
        let coords = this.getCoordsBall();
        coords.top += this.speed.y;
        coords.left += this.speed.x;
        this.checkBallCoords(coords);
        return coords;
    }

    moveBall() {
        const INTERVAL_TIME = 25;
        setInterval(() => {
            if (!this.isStart) {
                return false;
            }
            let coords = this.getChangedBallCoords();
            this.ball.style.top = coords.top + 'px'; 
            this.ball.style.left = coords.left + 'px'; 
        }, INTERVAL_TIME);
    }

    initBall() {
        this.moveBall();
        this.speed = this.getRandomSpeed();
    }
}

class Enemy extends Ball {
    checkTop(top) {
        let { fieldTop, bottomEdge } = this.field;
        let maxTop = bottomEdge - this.player.offsetHeight;
        if (top < fieldTop) {
            top = fieldTop;
        } else if (top > maxTop) {
            top = maxTop;
        }
        return top;
    }

    getRequiredTopEnemy() {
        let ballTop = this.getCoordsBall().top;
        let top = ballTop + this.ball.offsetHeight / 2 - this.enemy.offsetHeight / 2;
        let valueTop = parseInt(top);
        return valueTop; 
    }

    checkEnemyTop(enemyTop) {
        let coefficientBallSpeed = this.field.coefficient / 2;
        let stepSize = this.speedValue / coefficientBallSpeed;
        let requiredTop = this.getRequiredTopEnemy();
        let checkedEnemyTop = this.checkTop(enemyTop);
        let result = checkedEnemyTop;

        if (checkedEnemyTop < requiredTop - stepSize) {
            result += stepSize;
        }  else if (checkedEnemyTop > requiredTop + stepSize) {
            result -= stepSize;
        }
        return result;
    }

    getChangedEnemyTop() {
        let enemyTop = parseInt(this.enemy.style.top) || 0;
        let newEnemyTop = this.checkEnemyTop(enemyTop); 
        return newEnemyTop;
    }

    moveEnemy() {
        const INTERVAL_TIME = 50;
        setInterval(() => {
            if (!this.isStart) {
                return false;
            }
            let top = this.getChangedEnemyTop();
            this.enemy.style.top = top + 'px'; 
        }, INTERVAL_TIME);
    }
}

class Player extends Enemy {
    player = document.querySelector('.player');

    mousemove(event) {
        let top = event.clientY - this.shiftY;
        let checkingTop = this.checkTop(top);
        this.player.style.top = checkingTop + 'px';
    }

    controlRacket(event) {
        let mousemove = this.mousemove.bind(this);
        this.shiftY = event.clientY - this.player.getBoundingClientRect().top;
        this.mousemove(event);
        document.addEventListener('mousemove', mousemove);
        document.onmouseup = () => {
            document.removeEventListener('mousemove', mousemove);
            document.onmouseup = null;
        };
    }

    mouseDown() {
        document.addEventListener('mousedown', (event) => {
            let elem = event.target;
            elem.ondragstart = () => false;
            if (!this.isStart) {
                return false;
            }
            if (elem.classList.contains('player')) {
                this.controlRacket(event);
            }
        });
    }

    init() {
        this.toggleModal();
        this.initScoreElement();
        this.getCoordsField();
        this.moveAllElementsToCenter();
        this.startGame();
        this.mouseDown();
        this.moveEnemy();
        this.initBall();
        this.initBonus();
    }
}

let player = new Player;
player.init();
