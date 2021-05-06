const { response } = require("express");


const testObject = {
    id: 7,
    name: "Antarctica",
    countries: [
        {
            id: 2,
            name: "South Georgia and South Sandwich Islands",
            capital: "King Edward Point",
            continent_id: 7
        },
        {
            id: 3,
            name: "French Southern and Antarctic Lands",
            capital: "Port-aux-Français",
            continent_id: 7
        }
    ]
};
// ------ ALL FUNCTIONS ------------------------------------------
// Main Game Function
function mainGame(continent_id) {
    // Fetch Game Data
    fetch(`/gamepage/${continent_id}`, { "method": "GET" })
    .then(response => {
        return response.json();
    })
    .then(data => {

        console.log(data);

        // Start Game

    });
};

// RenderGroup


// ------ ALL LISTENERS ------------------------------------------
// GAME START per continent
document.getElementById("game-1").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(1);
});

document.getElementById("game-2").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(2);
});

document.getElementById("game-3").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(3);
});

document.getElementById("game-4").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(4);
});

document.getElementById("game-5").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(5);
});

document.getElementById("game-6").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(6);
});

document.getElementById("game-7").addEventListener("click", function (event) {
    event.preventDefault();
    mainGame(7);
});

