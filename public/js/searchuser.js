const getUser  = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#bacon').value;
    console.log(username);

    const response = await fetch(`/search/${username}`, {
        "method": 'GET',
    })
    .then(data => {
        return data.json();
    })
    console.log(response);
};

document.querySelector('#find-form').addEventListener('submit', getUser);
