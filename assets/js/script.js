let pieces = [[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 0, 0],
[1, 1, 1, 1]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 1, 0]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 1]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 1]],
[[0, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 0, 0],
[0, 1, 0, 0]],
[[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 1, 1, 1]],
[[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 1, 1, 0],
[0, 1, 0, 0]],
[[0, 0, 0, 0],
[0, 0, 1, 0],
[0, 1, 1, 0],
[0, 0, 1, 0]],
[[0, 0, 0, 0],
[0, 1, 0, 0],
[0, 1, 1, 0],
[0, 1, 0, 0]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[1, 1, 1, 0],
[0, 1, 0, 0]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 0, 1, 1],
[0, 1, 1, 0]],
[[0, 0, 0, 0],
[0, 0, 0, 0],
[0, 1, 1, 1],
[0, 1, 0, 0]],
[[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 0, 1, 0],
[0, 0, 1, 0]],
[[0, 0, 0, 0],
[0, 1, 1, 0],
[0, 1, 0, 0],
[0, 1, 0, 0]]]

let blockColor = ['red', 'blue', 'cyan', 'violet', 'white', 'deeppink', 'lawngreen', 'lightsalmon', 'gold', 'sienna']
let speed = 3;
let lastPantTime = 0;
let arr = []
var boxR = []
var boxL = []
let goR = true;
let goL = true;
var gO = false
let point = false;
let score = document.getElementById('scoreBoard');
let hiscore = document.getElementById('hiScoreBoard');
let sc = 0
var count = 0;
const gamePlay = new Audio('./sounds/game-play.mp3')
const gameOver = new Audio('./sounds/game-over.mp3')
let hsc = localStorage.getItem("hiscore");
var myReq;



function gameEngine () {

    function isGameOver () {
        if (document.getElementsByClassName('permanent').length > 4) {
            // console.log('hi')
            for (let i = 1; i < 5; i++) {
                if (document.getElementsByClassName('permanent')[document.getElementsByClassName('permanent').length - i].style.gridRowStart == 5) {
                    console.log('gameover');
                    gamePlay.pause()
                    gameOver.play()
                    document.getElementById('gameOver').style.display = 'inline'
                    gO = true;
                    break;
                }
            }
        }
    }

    function getRandInt (min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generatePieces () {
        let p = getRandInt(0, pieces.length - 1)
        let piece = pieces[p]
        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < 4; i++) {
                if (piece[i][j] === 1) {
                    let block = document.createElement('div');
                    block.classList.add('pieces');
                    block.style.gridRowStart = (1 + i);
                    block.style.gridColumnStart = (5 + j);
                    document.getElementById('board').appendChild(block)
                }
            }
        }
        let colour = blockColor[getRandInt(0, blockColor.length - 1)]
        for (let i = 0; i < 4; i++) {
            document.getElementsByClassName('pieces')[i].style.backgroundColor = colour
        }
    }

    function collided () {
        while (document.getElementsByClassName('pieces').length > 0) {
            var element = document.getElementsByClassName('pieces')[0]
            element.classList.remove('pieces')
            element.classList.add('permanent')
        }
        if (!gO) {
            generatePieces();
        }
    }

    function isCollide () {
        for (let i = 0; i < 4; i++){
            if (document.querySelectorAll('.pieces')[i].style.gridRowStart == 25) {
                collided();
            }
        }
        if (count > 24) {
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < document.querySelectorAll('.permanent').length; j++) {

                    if ((document.querySelectorAll('.pieces')[i].style.gridRowEnd == document.querySelectorAll('.permanent')[j].style.gridRowStart) && (document.querySelectorAll('.pieces')[i].style.gridColumnStart == document.querySelectorAll('.permanent')[j].style.gridColumnStart)) {
                        collided();
                        break;
                    }
                }
            }
        }

    }

    function droppingPieces () {
        document.querySelectorAll('.pieces').forEach((e) => {
            let pos = parseInt(e.style.gridRowStart);
            e.style.gridRowStart = pos += 1;
            e.style.gridRowEnd = pos += 1;
        })
    }

    function scoreCheck () {
        for (let i = 25; i > 4; i--) {
            arr = Array.from(document.getElementsByClassName('permanent')).filter(extract)
            function extract (e) {
                if (e.style.gridRowStart == i) {
                    return i;
                }
            }
            // console.log(arr)
            if (arr.length == 14) {
                point = true;
            }
            else {
                point = false;
            }
            if (point) {
                sc = sc + 1;
                if (sc > hsc) {
                    hsc = sc;
                    localStorage.setItem("hiscore", JSON.stringify(hsc));
                    hiscore.innerHTML = "HiScore: " + hsc;
                }
                score.innerHTML = "Score: " + sc;
                arr.forEach((e) => {
                    e.classList.remove('permanent');
                    e.style.backgroundColor = 'transparent';
                })
                arr.splice(0, arr.length);
                Array.from(document.querySelectorAll('.permanent')).filter(e => parseInt(e.style.gridRowStart) < i).forEach((e) => {
                    let pos = parseInt(e.style.gridRowStart);
                    e.style.gridRowStart = pos += 1;
                    e.style.gridRowEnd = pos += 1;
                })
            }
        }
    }

    if (count === 0) {
        generatePieces();
    }
    if (!gO) {
        count += 1;
        scoreCheck()
        isCollide();
        isGameOver();
        droppingPieces();
    }
    else {
        return
    }
}

function main (ctime) {
    if (!gO) {
        gamePlay.play();
        window.requestAnimationFrame(main);
    }
    if (((ctime - lastPantTime) / 1000) < 1 / speed) {
        return;
    }
    else {
        lastPantTime = ctime;
        gameEngine();
    }
}


if (hsc === null) {
    hsc = 0;
    localStorage.setItem("hiscore", JSON.stringify(hsc))
}
else {
    hsc = JSON.parse(hsc);
    hiscore.innerHTML = "HiScore: " + hsc;
}
function isValidL () {
    boxL = []
    for (let i = 3; i >= 0; i--) {
        var row = document.getElementsByClassName('pieces')[i].style.gridRowStart;
        var col = document.getElementsByClassName('pieces')[i].style.gridColumnStart;
        var L = Array.from(document.getElementsByClassName('permanent')).filter((e) => {
            if (e.style.gridRowStart == row && e.style.gridColumnStart == parseInt(col) - 1) {
                return e;
            }
        });
        boxL = boxL.concat(L)
    }

    if (boxL.length === 0) {
        goL = true;
    }
    else {
        goL = false;
    }
    // console.log("L: "+ boxL.length)
}
function isValidR () {
    boxR = []
    for (let i = 0; i < 4; i++) {
        var row = document.getElementsByClassName('pieces')[i].style.gridRowStart;
        var col = document.getElementsByClassName('pieces')[i].style.gridColumnStart;
        var R = Array.from(document.getElementsByClassName('permanent')).filter((e) => {
            if (e.style.gridRowStart == row && e.style.gridColumnStart == (parseInt(col) + 1)) {
                return e;
            }
        });
        boxR = boxR.concat(R)
    }

    if (boxR.length === 0) {
        goR = true;
    }
    else {
        goR = false;
    }

}


function goLeft () {
    console.log(goL)
    if ((document.getElementsByClassName('pieces')[0].style.gridColumnStart > 1) && (goL)) {
        document.querySelectorAll('.pieces').forEach((e) => {
            var cpos = parseInt(e.style.gridColumnStart)
            e.style.gridColumnStart = cpos - 1;
        })
    }
}

function goRight () {

    if ((document.getElementsByClassName('pieces')[3].style.gridColumnStart < 14) && (goR)) {
        document.querySelectorAll('.pieces').forEach((e) => {
            var cpos = parseInt(e.style.gridColumnStart)
            e.style.gridColumnStart = cpos + 1;
        })
    }

}


// window.addEventListener('keydown', e => {
//     myReq = window.requestAnimationFrame(main)
//     document.getElementById('start').style.display = 'none'
//     switch (e.key) {
//         case 'ArrowLeft':
//             isValidL();
//             goLeft();
//             break;
//         case 'ArrowRight':
//             isValidR();
//             goRight();
//             break;
//         default:
//             break;
//     }
// })

let isStarted = false; // Track if the game has started

// Get references to the buttons and the start button by their IDs
const startButton = document.getElementById("startButton");
const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

// Function to handle the "Start" button click
startButton.addEventListener("click", () => {
    if (!isStarted) {
        isStarted = true;
        myReq = window.requestAnimationFrame(main);
        document.getElementById('start').style.display = 'none';
    }
});

// Add click event listeners to the left and right buttons
leftButton.addEventListener("click", () => {
    if (isStarted) {
        isValidL();
        goLeft();
    }
});

rightButton.addEventListener("click", () => {
    if (isStarted) {
        isValidR();
        goRight();
    }
});

// Event listener for keydown event
window.addEventListener('keydown', e => {
    if (!isStarted) {
        // Start the game when any key is pressed
        isStarted = true;
        myReq = window.requestAnimationFrame(main);
        document.getElementById('start').style.display = 'none';
    }

    switch (e.key) {
        case 'ArrowLeft':
            if (isStarted) {
                isValidL();
                goLeft();
            }
            break;
        case 'ArrowRight':
            if (isStarted) {
                isValidR();
                goRight();
            }
            break;
        default:
            break;
    }
});
