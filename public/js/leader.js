const container = document.getElementById('leaderContainer');

fetch('/api/leader', { "method": "GET" })
.then(res => {return res.json()})
.then(data => {
    for(let i = 0; i < data.length; i++) {
        let div = document.createElement('div');
        let h2 = document.createElement('h2');
        h2.textContent = data[i].continent;
        div.appendChild(h2);
        let ul = document.createElement('ul');
        for(let j = 0; j < data[i].games.length; j++){
            let li = document.createElement('li');
            li.textContent = `${cap_first_letter(data[i].games[j].user.username)}: ${data[i].games[j].score}/${format_country_num(data[i].id)} - ${msToTime(data[i].games[j].time)}`;
            ul.appendChild(li);
        };
        div.appendChild(ul);
        container.appendChild(div);
    };
});

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

// Capitalize first letter in string
function cap_first_letter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
};

// Max Country Conversion
function format_country_num(id){
    switch (id) {
        case 1: return 57;
        case 2: return 44;
        case 3: return 27;
        case 4: return 57;
        case 5: return 38;
        case 6: return 13;
        case 7: return 2;
    }
};