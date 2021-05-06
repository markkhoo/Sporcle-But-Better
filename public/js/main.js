
const username = document.querySelector('#searchInput').value;

const renderProfile = (stuff) => {
    console.log(stuff);
};


function getUser(username) {
    fetch(`/profile/${username}`, { "method": "GET"})
    .then(response => {
        return response.json();
    })
    .then(data => {
        renderProfile(data);
    })
};

document.querySelector('.find-form').addEventListener('submit', getUser);

