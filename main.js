function showInstruction(message) {
    const instruction = document.getElementById('instruction');
    const instructionText = document.getElementById('instructionText');
    instructionText.textContent = message;
    instruction.style.display = 'flex';
}

function hideInstruction() {
    document.getElementById('instruction').style.display = 'none';
}

const LAST_MATCH_KEY = 'headball.lastMatch';
const AUTO_RESTART_KEY = 'headball.autoRestart';

function saveLastMatch(config) {
    sessionStorage.setItem(LAST_MATCH_KEY, JSON.stringify(config));
}

function getLastMatch() {
    try {
        return JSON.parse(sessionStorage.getItem(LAST_MATCH_KEY));
    } catch (error) {
        return null;
    }
}

function applySavedMatch(config) {
    if (!config) {
        return;
    }

    document.getElementById('username1').value = config.Username1 || '';
    document.getElementById('username2').value = config.Username2 || '';
    document.getElementById('team1').value = config.team1 || '';
    document.getElementById('team2').value = config.team2 || '';

    const ballOption = document.querySelector(`input[name="ball"][value="${config.ballimg}"]`);
    if (ballOption) {
        ballOption.checked = true;
    }
}

function goToMenu() {
    sessionStorage.removeItem(AUTO_RESTART_KEY);
    sessionStorage.removeItem(LAST_MATCH_KEY);
    location.reload();
}

function restartMatch() {
    sessionStorage.setItem(AUTO_RESTART_KEY, '1');
    location.reload();
}

function showMatchResult(winnerText, finalScoreText) {
    const resultTitle = document.getElementById('matchResultTitle');
    const resultScore = document.getElementById('matchResultScore');
    const resultOverlay = document.getElementById('matchResult');

    if (resultTitle) {
        resultTitle.textContent = winnerText;
    }

    if (resultScore) {
        resultScore.textContent = finalScoreText;
    }

    if (resultOverlay) {
        resultOverlay.style.display = 'flex';
    }
}

function PlayGame(){
let Username1 = document.getElementById("username1").value.trim();
let Username2 = document.getElementById("username2").value.trim();
let team1 = document.getElementById("team1").value;
let team2 = document.getElementById("team2").value;
let selectedBall = document.querySelector('input[name="ball"]:checked');

let missingFields = [];

if (!Username1) {
    missingFields.push('Nama Player 1');
}

if (!Username2) {
    missingFields.push('Nama Player 2');
}

if (!team1) {
    missingFields.push('Team Player 1');
}

if (!team2) {
    missingFields.push('Team Player 2');
}

if (!selectedBall) {
    missingFields.push('Pilihan Bola');
}

if (missingFields.length > 0) {
    showInstruction(`Lengkapi semua input terlebih dahulu: ${missingFields.join(', ')}.`);
    return;
}

hideInstruction();
document.getElementById('gamemenu').style.display = 'none'; 
document.getElementById('canvas').style.display = 'block';
document.getElementById('game').style.display = 'block';
let ballimg = selectedBall.value;
let seconds = 60;
let counterInterval;
let score1 = 0;
let score2 = 0;
let gameEnded = false;

saveLastMatch({
    Username1,
    Username2,
    team1,
    team2,
    ballimg,
});

let counterDisplay = document.getElementById('timeroutput');
document.getElementById("p1name").innerHTML = Username1;
document.getElementById("p2name").innerHTML = Username2;
document.getElementById("score1").innerHTML = score1;
document.getElementById("score2").innerHTML = score2;

//console.log(ballimg);

let  flag1 = document.getElementById('flag1');
let  flag2 = document.getElementById('flag2');
let flagimg1 =['source/Flag/Brazil.png'];
let flagimg2 =['source/Flag/England.png'];
let flagimg3 =['source/Flag/Germany.png'];
let flagimg4 =['source/Flag/Italy.png'];
let flagimg5 =['source/Flag/Japan.png'];
let flagimg6 =['source/Flag/Netherlands.png'];
let flagimg7 =['source/Flag/Portugal.png'];
let flagimg8 =['source/Flag/Spain.png'];

if (team1 == 1) {
    flag1.src = flagimg1;
}else if (team1 == 2) {
    flag1.src = flagimg2;
}else if (team1 == 3) {
    flag1.src = flagimg3;
}else if (team1 == 4) {
    flag1.src = flagimg4;
}else if (team1 == 5) {
    flag1.src = flagimg5;
}else if (team1 == 6) {
    flag1.src = flagimg6;
}else if (team1 == 7) {
    flag1.src = flagimg7;
}else if (team1 == 8) {
    flag1.src = flagimg8;
}

if (team2 == 1) {
    flag2.src = flagimg1;
}else if (team2 == 2) {
    flag2.src = flagimg2;
}else if (team2 == 3) {
    flag2.src = flagimg3;
}else if (team2 == 4) {
    flag2.src = flagimg4;
}else if (team2 == 5) {
    flag2.src = flagimg5;
}else if (team2 == 6) {
    flag2.src = flagimg6;
}else if (team2 == 7) {
    flag2.src = flagimg7;
}else if (team2 == 8) {
    flag2.src = flagimg8;
}

function startCounter() {
    counterDisplay.textContent = formatTime(seconds);
  counterInterval = setInterval(updateCounter, 1000);
}

function endMatch() {
    if (gameEnded) {
        return;
    }

    gameEnded = true;
    stopCounter();

    let winnerText = 'Hasil Seri';
    if (score1 > score2) {
        winnerText = `${Username1} Menang`;
    } else if (score2 > score1) {
        winnerText = `${Username2} Menang`;
    }

    showMatchResult(winnerText, `Skor Akhir ${score1} - ${score2}`);
}

function updateCounter() {
    if (seconds <= 0) {
        endMatch();
        return;
  }

    seconds--;
    counterDisplay.textContent = formatTime(seconds);

    if (seconds === 0) {
        endMatch();
    }
}

function stopCounter() {
  clearInterval(counterInterval);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

class Player {
    constructor(x, y, country = '' , country2 = '') {
        this.sw = 270;
        this.dw = 130;

        if (team1 == 1) {
            country = 'Brazil';
        }else if (team1 == 2) {
            country = 'England';
        }else if (team1 == 3) {
            country = 'Germany';
        }else if (team1 == 4) {
            country = 'Italy';
        }else if (team1 == 5) {
            country = 'Japan';
        }else if (team1 == 6) {
            country = 'Netherlands';
        }else if (team1 == 7) {
            country = 'Portugal';
        }else if (team1 == 8) {
            country = 'Spain';
        }

        if (team2 == 1) {
            country2 = 'Brazil';
        }else if (team2 == 2) {
            country2 = 'England';
        }else if (team2 == 3) {
            country2 = 'Germany';
        }else if (team2 == 4) {
            country2 = 'Italy';
        }else if (team2 == 5) {
            country2 = 'Japan';
        }else if (team2 == 6) {
            country2 = 'Netherlands';
        }else if (team2 == 7) {
            country2 = 'Portugal';
        }else if (team2 == 8) {
            country2 = 'Spain';
        }

        //player size
        this.sh = 270;
        this.dh = 100;

        //player potition
        this.sx = 40;
        this.sy = 40;

        this.defaultDx = x;
        this.defaultDy = canvas.height - this.dh - 100;

        this.dx = x;
        this.dy = this.defaultDy;

        this.image = new Image;

        this.idlecon = true;
        this.fallState = 0;
        this.jumpState = 0;
        this.idleState = 0;
        this.frwdState = 0;
        this.backwardState = 0;
        this.forwardcon = false;
        this.backwardcon = false;
        this.jumpcon = false;
        this.downcon = false;

        // p1 Animation

        this.idleAnimation = [];
        for (this.idl = 0; this.idl <= 17; this.idl++) {
            this.image = new Image;
            if (this.idl < 10) {
                this.image.src = `source/Characters/p1/${country}/Idle/Idle_00${this.idl}.png`;
            } else {
                this.image.src = `source/Characters/p1/${country}/Idle/Idle_0${this.idl}.png`;
            }
            this.idleAnimation.push(this.image);
        }

        this.frwdAnimation = [];
        for (this.frwd = 0; this.frwd <= 9; this.frwd++) {
            this.image = new Image;
            if (this.frwd < 10) {
                this.image.src = `source/Characters/p1/${country}/Move Forward/Move Forward_00${this.frwd}.png`;
            } else {
                this.image.src = `source/Characters/p1/${country}/Move Forward/Move Forward_00${this.frwd}.png`;
            }
            this.frwdAnimation.push(this.image);
        }

        this.backwardAnimation = [];
        for (this.bkwd = 0; this.bkwd <= 9; this.bkwd++) {
            this.image = new Image;
            if (this.bkwd < 9) {
                this.image.src = `source/Characters/p1/${country}/Move Backward/Move Backward_00${this.bkwd}.png`;
            } else {
                this.image.src = `source/Characters/p1/${country}/Move Backward/Move Backward_00${this.bkwd}.png`;
            }
            this.backwardAnimation.push(this.image);
        }

        this.jumpAnimation = [];
        for (this.jmp = 0; this.jmp <= 4; this.jmp++) {
            this.image = new Image;
            if (this.jmp < 4) {
                this.image.src = `source/Characters/p1/${country}/Jump/Jump_00${this.jmp}.png`;
            } else {
                this.image.src = `source/Characters/p1/${country}/Jump/Jump_00${this.jmp}.png`;
            }
            this.jumpAnimation.push(this.image);
        }

        this.fallAnimation = [];
        for (this.fll = 0; this.fll <= 4; this.fll++) {
            this.image = new Image;
            if (this.fll < 4) {
                this.image.src = `source/Characters/p1/${country}/Falling Down/Falling Down_00${this.fll}.png`;
            } else {
                this.image.src = `source/Characters/p1/${country}/Falling Down/Falling Down_00${this.fll}.png`;
            }
            this.fallAnimation.push(this.image);
        }

        // p2 Animation

        this.idleAnimation2 = [];
        for (this.idl = 0; this.idl <= 17; this.idl++) {
            this.image = new Image;
            if (this.idl < 10) {
                this.image.src = `source/Characters/p2/${country2}/Idle/Idle_00${this.idl}.png`;
            } else {
                this.image.src = `source/Characters/p2/${country2}/Idle/Idle_0${this.idl}.png`;
            }
            this.idleAnimation2.push(this.image);
        }

        this.frwdAnimation2 = [];
        for (this.frwd = 0; this.frwd <= 9; this.frwd++) {
            this.image = new Image;
            if (this.frwd < 10) {
                this.image.src = `source/Characters/p2/${country2}/Move Forward/Move Forward_00${this.frwd}.png`;
            } else {
                this.image.src = `source/Characters/p2/${country2}/Move Forward/Move Forward_00${this.frwd}.png`;
            }
            this.frwdAnimation2.push(this.image);
        }

        this.backwardAnimation2 = [];
        for (this.bkwd = 0; this.bkwd <= 9; this.bkwd++) {
            this.image = new Image;
            if (this.bkwd < 9) {
                this.image.src = `source/Characters/p2/${country2}/Move Backward/Move Backward_00${this.bkwd}.png`;
            } else {
                this.image.src = `source/Characters/p2/${country2}/Move Backward/Move Backward_00${this.bkwd}.png`;
            }
            this.backwardAnimation2.push(this.image);
        }

        this.jumpAnimation2 = [];
        for (this.jmp = 0; this.jmp <= 4; this.jmp++) {
            this.image = new Image;
            if (this.jmp < 4) {
                this.image.src = `source/Characters/p2/${country2}/Jump/Jump_00${this.jmp}.png`;
            } else {
                this.image.src = `source/Characters/p2/${country2}/Jump/Jump_00${this.jmp}.png`;
            }
            this.jumpAnimation2.push(this.image);
        }

        this.fallAnimation2 = [];
        for (this.fll = 0; this.fll <= 4; this.fll++) {
            this.image = new Image;
            if (this.fll < 4) {
                this.image.src = `source/Characters/p2/${country2}/Falling Down/Falling Down_00${this.fll}.png`;
            } else {
                this.image.src = `source/Characters/p2/${country2}/Falling Down/Falling Down_00${this.fll}.png`;
            }
            this.fallAnimation2.push(this.image);
        }
    }

    draw() {
        ctx.drawImage(this.image, this.sx, this.sx, this.sw, this.sh, this.dx, this.dy, this.dw, this.dh);
    }

    idle() {
        if (frame % 3 == 0) {
            if (this.idleState == 18) {
                this.idleState = 0;
            }
            this.image = this.idleAnimation[this.idleState];
            this.idleState++;
        }
    }

    idle2() {
        if (frame % 3 == 0) {
            if (this.idleState == 18) {
                this.idleState = 0;
            }
            this.image = this.idleAnimation2[this.idleState];
            this.idleState++;
        }
    }

    forward() {
        if(this.dx < 1050){
        this.dx += 3;
        };
        if (frame % 3 == 0) {
            if (this.frwdState == 9) {
                this.frwdState = 0;
            }
            this.image = this.frwdAnimation[this.frwdState];
            this.frwdState++;
        }
    }

    backward() {
        if(this.dx > 50){
        this.dx -= 3;
        }
        if (frame % 3 == 0) {
            if (this.backwardState == 9) {
                this.backwardState = 0;
            }
            this.image = this.backwardAnimation[this.backwardState];
            this.backwardState++;
        }
    }

    forward2() {
        if(this.dx > 50){
        this.dx -= 3;
        }
        if (frame % 3 == 0) {
            if (this.frwdState == 9) {
                this.frwdState = 0;
            }
            this.image = this.frwdAnimation2[this.frwdState];
            this.frwdState++;
        }
    }

    backward2() {
        if(this.dx < 1050){
        this.dx += 3;
        }
        if (frame % 3 == 0) {
            if (this.backwardState == 9) {
                this.backwardState = 0;
            }
            this.image = this.backwardAnimation2[this.backwardState];
            this.backwardState++;
        }
    }

    jump() {
        this.dy -= 5;
        if (this.dy < canvas.height - this.dh * 3) {
            this.jumpcon = false;
            this.downcon = true;
        }
        if (frame % 3 == 0) {
            if (this.jumpState == 4) {
                this.jumpState = 0;
            }
            this.image = this.jumpAnimation[this.jumpState];
            this.jumpState++;
        }
    }
    
    fall() {
        if (this.dy < this.defaultDy) {
            this.dy += 5;
        } else {
            this.downcon = false;
        }
        if (frame % 3 == 0) {
            if (this.fallState == 4) {
                this.fallState = 0;
            }
            this.image = this.fallAnimation[this.fallState];
            this.fallState++;
        }
    }

    jump2() {
        this.dy -= 5;
        if (this.dy < canvas.height - this.dh * 3) {
            this.jumpcon = false;
            this.downcon = true;
        }
        if (frame % 3 == 0) {
            if (this.jumpState == 4) {
                this.jumpState = 0;
            }
            this.image = this.jumpAnimation2[this.jumpState];
            this.jumpState++;
        }
    }

    fall2() {
        if (this.dy < this.defaultDy) {
            this.dy += 5;
        } else {
            this.downcon = false;
        }
        if (frame % 3 == 0) {
            if (this.fallState == 4) {
                this.fallState = 0;
            }
            this.image = this.fallAnimation2[this.fallState];
            this.fallState++;
        }
    }

    resetPosition() {
        this.dx = this.defaultDx;
        this.dy = this.defaultDy;
        this.idlecon = true;
        this.forwardcon = false;
        this.backwardcon = false;
        this.jumpcon = false;
        this.downcon = false;
        this.idleState = 0;
        this.frwdState = 0;
        this.backwardState = 0;
        this.jumpState = 0;
        this.fallState = 0;
        this.image = this.idleAnimation[0];
    }

    isKicked() {
        return (
            ball.x < this.dx + this.dw &&
            ball.x + ball.width > this.dx &&
            ball.y < this.dy + this.dh &&
            ball.y + ball.width > this.dy
        );
    }
}

class Ball {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;

        this.gravity = 0.15;
        this.bounce = 0.87;
        this.speedX = 0;
        this.speedY = this.gravity;

        this.img = new Image;
        if (ballimg == 1){
            this.img.src = "source/Ball 01.png";
        }else if(ballimg == 2){
            this.img.src = "source/Ball 02.png";
        }

    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        if (this.x + this.w - ball.height / 10 >= ball.x &&
            this.x < ball.x + ball.width - ball.width / 10 &&
            this.y + this.h - ball.height / 10 >= ball.y &&
            this.y <= ball.y + ball.height - ball.height / 10) {
            ball.width -= 5;
            ball.height -= 5;
            ability = null;
        }
    }

    move() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedY += this.gravity;

        if(this.x == 1100 && this.y >= 100){
            /*this.speedX = 0;
            this.speedY = 2.5;*/
            score2 += 1;
        }else if(this.x == 50 && this.y >= 100){
            /*this.speedX = 0;
            this.speedY = 2.5;*/
            score1 += 1;
        }

        if (this.y >= canvas.height - this.height - 100) {
            this.speedY = -this.speedY * this.bounce;
        }

        if(this.x == 1100 && this.y >= 100 || this.x == 50 && this.y >= 100){
            this.x = canvas.width / 2 - this.width / 2;
            this.y = 0;
            this.speedX = 0;
            this.speedY = this.gravity;
            p1.resetPosition();
            p2.resetPosition();
            document.getElementById("score1").innerHTML = score1;
            document.getElementById("score2").innerHTML = score2;
        }

        this.draw();
    }
}

class Goal {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 250;
        this.img = new Image;
        this.img.src = "source/Goal - Side.png";
    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Goal2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 250;
        this.img = new Image;
        this.img.src = "source/Goal - Side2.png";

    }

    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const p1 = new Player(170, 100);
const p2 = new Player(880,950);
const ball = new Ball(canvas.width / 2 - 25, 0);
const goal = new Goal(50, 100);
const goal2 = new Goal2(1025, 100);

//Player 1 Movement

window.addEventListener('keydown', (e) => {
    if (e.key == "d" | e.key == "D") {
        p1.idlecon = false;
        p1.forwardcon = true;
    }
    if (e.key == "a" | e.key == "A") {
        p1.idlecon = false;
        p1.backwardcon = true;
    }
    if (e.key == "w" | e.key == "W") {
        p1.idlecon = false;
        if (!p1.downcon) {
            p1.jumpcon = true;
        }
    }
});
window.addEventListener('keyup', (e) => {
    if (e.key == "d" | e.key == "D") {
        p1.forwardcon = false;
        p1.idlecon = true;
    }
    if (e.key == "a" | e.key == "A") {
        p1.backwardcon = false;
        p1.idlecon = true;
    }
});

//Player 2 Movement

window.addEventListener('keydown', (e) => {
    if (e.key == "37" | e.key == "ArrowLeft") {
        p2.idlecon = false;
        p2.forwardcon = true;
    }
    if (e.key == "39" | e.key == "ArrowRight") {
        p2.idlecon = false;
        p2.backwardcon = true;
    }
    if (e.key == "38" | e.key == "ArrowUp") {
        p2.idlecon = false;
        if (!p2.downcon) {
            p2.jumpcon = true;
        }
    }
});

window.addEventListener('keyup', (e) => {
    if (e.key == "37" | e.key == "ArrowLeft") {
        p2.forwardcon = false;
        p2.idlecon = true;
    }
    if (e.key == "39" | e.key == "ArrowRight") {
        p2.backwardcon = false;
        p2.idlecon = true;
    }
});

var frame = 0;
function animate() {
    if (gameEnded) {
        return;
    }

    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    p1.draw();
    ball.move();
    p2.draw();
    goal.draw();
    goal2.draw();

    //Player 1
    if (p1.isKicked()) {
        ball.speedX = 7.5;
        ball.speedY = -2.5;
    }

    if (p1.idlecon) {
        p1.idle();
    }
    if (p1.forwardcon) {
        p1.forward();
    }
    if (p1.backwardcon) {
        p1.backward();
    }
    if (p1.jumpcon) {
        p1.jump();
    }
    if (p1.downcon) {
        p1.fall();
    }

    //Player 2
    if (p2.isKicked()) {
        ball.speedX = -7.5;
        ball.speedY = -2.5;
    }

    if (p2.idlecon) {
        p2.idle2();
    }
    if (p2.forwardcon) {
        p2.forward2();
    }
    if (p2.backwardcon) {
        p2.backward2();
    }
    if (p2.jumpcon) {
        p2.jump2();
    }
    if (p2.downcon) {
        p2.fall2();
    }

    requestAnimationFrame(animate);
}

startCounter();
animate();

}

const savedMatch = getLastMatch();
if (sessionStorage.getItem(AUTO_RESTART_KEY) === '1' && savedMatch) {
    sessionStorage.removeItem(AUTO_RESTART_KEY);
    applySavedMatch(savedMatch);
    PlayGame();
}