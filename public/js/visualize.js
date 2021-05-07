const hideMe = document.getElementById('userID');
const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');

const getID = hideMe.getAttribute('data-ID');
const numAF = 57;
const numAS = 44;
const numAU = 27;
const numEU = 57;
const numNA = 38;
const numSA = 13;
const numAN = 2;

displayVisuals(getID);

function displayVisuals(user_id) {
    // Fetch User Game Data
    fetch(`/api/user/${user_id}`, { "method": "GET" })
        .then(response => {
            return response.json();
        })
        .then(data => {
            let arrAF = [];
            let arrAS = [];
            let arrAU = [];
            let arrEU = [];
            let arrNA = [];
            let arrSA = [];
            let arrAN = [];

            for (let i = 0; i < data.Games.length; i++) {
                if (data.Games[i].Continent.id == 1) {
                    arrAF.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 2) {
                    arrAS.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 3) {
                    arrAU.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 4) {
                    arrEU.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 5) {
                    arrNA.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 6) {
                    arrSA.push(data.Games[i]);
                } else if (data.Games[i].Continent.id == 7) {
                    arrAN.push(data.Games[i]);
                }
            };

            let gamesPlayed = [];
            gamesPlayed.push(
                arrAF.length,
                arrAS.length,
                arrAU.length,
                arrEU.length,
                arrNA.length,
                arrSA.length,
                arrAN.length,
            );

            let scoreData = [];
            scoreData.push(
                scoreCalc(arrAF, numAF),
                scoreCalc(arrAS, numAS),
                scoreCalc(arrAU, numAU),
                scoreCalc(arrEU, numEU),
                scoreCalc(arrNA, numNA),
                scoreCalc(arrSA, numSA),
                scoreCalc(arrAN, numAN)
            );

            // Display Chart AVERAGES--------------------------------------------------
            let nyChart2 = new Chart(chart2, {
                type: 'bar',
                data: {
                    labels: ['Arica', 'Asia', 'Australia', 'Europe', 'N America', 'S America', 'Antarctica'],
                    datasets: [{
                        label: 'Number of Games Played',
                        data: gamesPlayed,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            min: 0,
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    callback: function (value, index, values) {
                                        return value;
                                    }
                                }
                            }],
                        }
                    }
                }
            });
            // ------------------------------------------------------------------------

            // Display Chart AVERAGES--------------------------------------------------
            let nyChart1 = new Chart(chart1, {
                type: 'bar',
                data: {
                    labels: ['Arica', 'Asia', 'Australia', 'Europe', 'N America', 'S America', 'Antarctica'],
                    datasets: [{
                        label: 'Average % Answers Correct',
                        data: scoreData,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 99, 132, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    scales: {
                        x: {
                            suggestedMin: 0,
                            suggestedMax: 100,
                            xAxes: [{
                                stacked: true,
                                ticks: {
                                    callback: function (value, index, values) {
                                        return value + '%';
                                    }
                                }
                            }],
                        }
                    }
                }
            });
            // ------------------------------------------------------------------------
        });
};

// Average the Scores
function scoreCalc(arr, max) {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
        sum += arr[j].score;
    };
    let average = sum / arr.length * 1.00;
    let answer = Math.round(average / max * 10000) / 100.00;
    return answer
};