// const { response } = require("express");

// ------ ALL VARIABLES ------------------------------------------
// Global Pointers
const capDisplay = document.getElementById("capitalContainer");
const cList = document.getElementById("countryContainer");
const startButton = document.getElementById("buttonGroup");
const scoreButton = document.getElementById("endScreen");
const currentCorrect = document.getElementById("currentCorrect");
const pointCountries = document.getElementById("totalCountries");
const timerDisplay = document.getElementById("timer");
const displayContinent = document.getElementById("displayContinent");

// Global Variables
let randSeq = [];
let randomizedCapitals = [];
let gameStarted = false;
let capitalIndex = 0;
let gameCapID = 0;
let score = 0;
let stopTime = 0;
let currentContinent = 0;
let totalCountries = 0;

// ------ ALL FUNCTIONS ------------------------------------------
// initialize
init();

function init() {
    displayButton(true);
    displayEndScreen(false);
};

// Main Game Function
function mainGame(continent_id) {
    // Fetch Game Data
    fetch(`/gamepage/${continent_id}`, { "method": "GET" })
        .then(response => {
            return response.json();
        })
        .then(data => {

            // Start Game
            onStartGame(data);
            currentContinent = continent_id;
            renderGroup(data);
        });
};

// Submit Score
function hideOnClick() {
    this.style.setProperty('display', 'none');
    // this.parentElement.innerHTML = "";

    fetch(`/api/game`, {
        method: 'POST',
        body: JSON.stringify({
            score: score,
            time: stopTime,
            continent_id: currentContinent
        }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            if (res.ok) {
                console.log('Score Submitted');
            } else {
                alert(res.statusText);
            };
        });
};

// Game Timer and Display Time
function gameTimer() {
    let timeInterval = setInterval(function () {
        // Stop Interval when game ends
        if (!gameStarted) {
            clearInterval(timeInterval);
        };

        stopTime += 10;

        // Display Time
        timerDisplay.innerHTML = msToTime(stopTime);

    }, 10);
};

// On Start Game Button click
function onStartGame(data) {
    scoreButton.innerHTML = "";
    gameStarted = true;
    score = 0;
    stopTime = 0;
    currentContinent = 0;
    totalCountries = data.countries.length;
    renderScore();
    displayButton(false);
    displayEndScreen(false);
};

// Show and Hide Start Button
function displayButton(displayed) {
    if (displayed === true) {
        startButton.style.setProperty('display', 'initial');
    } else if (displayed === false) {
        startButton.style.setProperty('display', 'none');
    };
};

// Show and Hide End Screen
function displayEndScreen(displayed) {
    if (displayed === true) {
        scoreButton.style.setProperty('display', 'initial');
    } else if (displayed === false) {
        scoreButton.style.setProperty('display', 'none');
    };
};

// Render Group
function renderGroup(quizData) {

    shuffleCapitals(quizData);
    renderCountries(quizData);

    // Display First Capital
    capitalIndex = 0;
    renderCapital();

    // Start Timer
    gameTimer();
};

// Randomize Capitals
function shuffleCapitals(data) {
    // Generate Random Sequence for displaying Capitals
    randSeq = [];
    for (let j = 0; j < data.countries.length; j++) {
        randSeq.push(j);
    };
    randSeq.sort(function (a, b) { return 0.5 - Math.random() });
    // Generate Randomized Capitals
    randomizedCapitals = [];
    for (let k = 0; k < data.countries.length; k++) {
        randomizedCapitals.push(data.countries[randSeq[k]]);
    };
};

// Render Capital
function renderCapital() {
    capDisplay.innerHTML = "";
    // Display Current Capital
    if (randomizedCapitals[capitalIndex] != undefined) {
        let p = document.createElement("h3");
        p.textContent = randomizedCapitals[capitalIndex].capital;
        p.setAttribute("class", "capitalDisplay");
        p.setAttribute("data-id", randomizedCapitals[capitalIndex].id);
        capDisplay.appendChild(p);
        gameCapID = randomizedCapitals[capitalIndex].id;
    } else {
        gameStarted = false;
        displayButton(true);
        cList.innerHTML = "";
        // Render End Game Screen Here
        gameEnd();
    };
};

// Render Countries
function renderCountries(data) {
    displayContinent.innerHTML = continentName(data.id);
    // Create List Elements
    for (let i = 0; i < data.countries.length; i++) {
        let li = document.createElement("li");
        li.textContent = data.countries[i].name;
        li.setAttribute("class", "countryButton");
        li.setAttribute("data-id", data.countries[i].id);
        li.onclick = countryClicked;
        cList.appendChild(li);
    };
};

// Cycle Capitals and Score Calculate
function countryClicked() {
    let countryID = parseInt(this.getAttribute("data-id"));

    if (countryID === gameCapID) {
        score += 1;
    };
    renderScore();

    // Render Capital after score is calculated
    capitalIndex += 1;
    renderCapital();
};

// Display Countries Correct over Total Countries
function renderScore() {
    currentCorrect.innerHTML = score;
    pointCountries.innerHTML = totalCountries;
};

// End Screen and Submit Score
function gameEnd() {
    let final = document.createElement("button");
    final.innerHTML = "Submit Score"
    final.setAttribute("type", "button");
    final.onclick = hideOnClick; // <== Score gets submitted here!
    scoreButton.appendChild(final);

    displayEndScreen(true);
};

// Milliseconds to Time
function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    };

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
};

// Choose Continent Name
function continentName(id) {
    if(id == 1) {
        return "Africa"
    } else if (id == 2) {
        return "Asia"
    } else if (id == 3) {
        return "Australia/Oceania"
    } else if (id == 4) {
        return "Europe"
    } else if (id == 5) {
        return "North America"
    } else if (id == 6) {
        return "South America"
    } else if (id == 7) {
        return "Antarctica"
    } else {
        return "Continent"
    };
};

// ------ ALL LISTENERS ------------------------------------------
// GAME START per continent
document.getElementById("gameAF").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(1);
});

document.getElementById("gameAS").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(2);
});

document.getElementById("gameAU").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(3);
});

document.getElementById("gameEU").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(4);
});

document.getElementById("gameNA").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(5);
});

document.getElementById("gameSA").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(6);
});

document.getElementById("gameAN").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(7);
});







// ------ CODEPEN ------------------------------------------------
// const testObject = {
//     id: 7,
//     name: "Antarctica",
//     countries: [
//         {
//             id: 2,
//             name: "South Georgia and South Sandwich Islands",
//             capital: "King Edward Point",
//             continent_id: 7
//         },
//         {
//             id: 3,
//             name: "French Southern and Antarctic Lands",
//             capital: "Port-aux-Français",
//             continent_id: 7
//         }
//     ]
// };

// // Test Game Start
// document.getElementById("game-7").addEventListener("click", function (event) {
//     event.preventDefault();
//     onStartGame();
//     renderGroup(testObject);
// });

// ------ Codepen Code based on this HTML ---------------------------------
// `
// <body>
//   <div id="buttonGroup">
//     <button type="button" id="game-7">start</button>
//   </div>
//   <div id="endScreen">
// <!--     <button type="button" id="highscore">Submit Score</button> -->
//   </div>
//   <div class="countries">
//     <h1>Antarctica</h1>
//     <ul id="countryContainer">
//     </ul>
//   </div>
//   <div class="capital">
//     <h3>Capital:</h3>
//     <div id="capitalContainer">
//     </div>
//   </div>
// </body>
// `