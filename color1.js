document.getElementById('resetBut').onmousedown = function () {
    this.style.top = ('20px');
    window.location.reload();
};

const ball = document.getElementById('dragDiv');
var ballColor;
var ballCell = document.getElementById('dragWrap');
var colors = ['purple', 'grey', 'brown', 'blue', 'green', 'yellow', 'orange', 'red'];
var colorCell = document.querySelectorAll('.colorTd');
var checkCell = document.querySelectorAll('.checkTd');
var topTable = document.querySelector('.topTable');
var scoreSpan = document.querySelector('.score');
var bonusSpan = document.getElementById('bonus');
var score = 0;
var bonus = 0;

function fillColors() {
    for (let i = 0; i < 9; i++) {
        if (i < 4) {
            colorCell[i].innerHTML = colors[i];
            checkCell[i].firstElementChild.innerHTML = colors[i];
        }
        else if (i === 4) continue;
        else {
            colorCell[i].innerHTML = colors[i - 1];
            checkCell[i].firstElementChild.innerHTML = colors[i - 1];
        }
    }
    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    shuffle(colors);
    ballColor = colors[0];
    ball.style.backgroundColor = ballColor;

    for (let i = 0; i < 9; i++) {
        if (i < 4) {
            colorCell[i].style.backgroundColor = colors[i];
            colorCell[i].style.borderColor = colors[i];

        }
        else if (i === 4) continue;
        else {
            colorCell[i].style.backgroundColor = colors[i - 1];
            colorCell[i].style.borderColor = colors[i - 1];
        }
    }
}

fillColors();

ball.ondragstart = function (e) {
    e.preventDefault();
    return false;
};

ball.ondragend = function (e) {
    e.preventDefault();
    return false;
};

function ballback() {
    topTable.style.zIndex = '-2';
    ballCell.appendChild(ball);
    ball.style.position = 'static';

};

ball.onmousedown = function (e) {

    ballCoords = getCoords(ball);
    tableCoords = getCoords(topTable);

    shiftX = e.pageX - ballCoords.left;
    shiftY = e.pageY - ballCoords.top;


    ball.style.position = 'absolute';
    document.body.appendChild(ball);
    moveAt(e);

    ball.style.zIndex = '100';
    topTable.style.zIndex = '200';

    function moveAt(e) {
        ball.style.left = e.pageX - shiftX + 'px';
        ball.style.top = e.pageY - shiftY + 'px';
    }


    document.onmousemove = function (e) {
        moveAt(e);
    };

    document.onmouseup = function () {
        document.onmousemove = null;
        ballback();
    };


};

for (let i = 0; i < 9; i++) {
    if (i === 4) continue;
    checkCell[i].firstElementChild.addEventListener('mouseenter', check);
}

function check(e) {
    console.log(e.target.innerHTML);
    if (e.target) {
        console.log(e.dataTransfer);
        if (ballColor === e.target.innerHTML) {
            console.log('Hit');
            bonusSpan.innerHTML = bonus;
            score += 100;
            scoreSpan.innerHTML = score;
            bonus += 10;
            score = score + bonus;
            document.onmouseup();
            fillColors()
        }
        else {
            console.log('miss');
            score = score - bonus;
            scoreSpan.innerHTML = score;
            bonus = 0;
            bonusSpan.innerHTML = bonus;
            document.onmouseup();

        }
    }
}

function getCoords(elem) {   // кроме IE8-
    box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        width: box.width,
        height: box.height
    };
}

let time = 30;
let t = time;

function onTimer() {
    if (t > 0 && t <= time)
        document.getElementById('timer').innerHTML = t;
    else if (t <= 0) {
        document.getElementById('timer').innerHTML = "Time out";
    }
    t--;
    setTimeout(onTimer, 1000);
}

onTimer();

setTimeout(gameOver, time * 1000);

function gameOver() {
    ballback();
    document.querySelector('.bottomTable').style.opacity = ('.1');
    document.querySelector('.pop').style.display = ('block');
    document.getElementById('score').innerHTML = scoreSpan.innerHTML;
}
