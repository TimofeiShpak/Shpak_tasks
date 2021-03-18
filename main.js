'use strict';

class Game {
    isStart = false;
    ball = document.querySelector('.ball');
    player = document.querySelector('.player');
    field = {};

    moveBallToCenter() {
        this.ball.style.left = this.field.centerX - this.ball.offsetWidth / 2 + 'px';
        this.ball.style.top = this.field.centerY- this.ball.offsetHeight / 2 + 'px';
    }

    getCoordsBall() {
        const coords = this.ball.getBoundingClientRect();
        this.ballCoords = {
            left : coords.left,
            top : coords.top,
        }
    }

    getCoordsField() {
        const field = document.querySelector('.field');
        const coords = field.getBoundingClientRect();
        this.field.fieldTop = coords.top;
        this.field.bottomEdge = coords.top + field.offsetHeight - this.player.offsetHeight;
        this.field.centerX = coords.left + field.offsetWidth / 2;
        this.field.centerY = coords.top + field.offsetHeight / 2;
    }

    startGame() {
        const START_GAME_TEXT = 'Start game';
        const STOP_GAME_TEXT = 'Stop game';
        const startButton = document.querySelector('.start');

        startButton.addEventListener('click', () => {
            this.isStart = !this.isStart;
            startButton.textContent = this.isStart ? STOP_GAME_TEXT : START_GAME_TEXT;
        });
    }

    checkTop(top) {
        let { fieldTop, bottomEdge} = this.field;
        if (top < fieldTop) {
            top = fieldTop;
        } else if (top > bottomEdge) {
            top = bottomEdge;
        }
        return top;
    }

    mousemove(event) {
        const top = event.clientY - this.shiftY;
        const checkingTop = this.checkTop(top);
        this.player.style.top = checkingTop + 'px';
    }

    controlRacket(event) {
        const mousemove = this.mousemove.bind(this);
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
            const elem = event.target;
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
        this.getCoordsField();
        this.moveBallToCenter();
        this.startGame();
        this.mouseDown();
    }
}

const newGame = new Game;
newGame.init();
