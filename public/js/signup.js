const signUpUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#userWant').value.trim();;
    const password = document.querySelector('#userPass').value.trim();;
    const passCheck = document.querySelector('#passCheck').value.trim();

    if (username && password === passCheck) {
        fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            if (response.ok) {
                document.location.replace('/profile');
            };
            return response.json();
        })
        .then(data => {
            if (data == "user.username must be unique"){
                alert("Username taken. Try another username.")
            } else if (data == "Validation len on password failed") {
                alert("Password must at least 8 characters.")
            };
            console.log(data);
        })
    };
};

document.querySelector('.signupUser').addEventListener('submit', signUpUser);

// const response = await fetch('/api/user', {
//     method: 'POST',
//     body: JSON.stringify({
//         username,
//         password,
//     }),
//     headers: { "Content-Type": "application/json" },
// });
// if (response.ok) {
//     document.location.replace('/profile');
// } else {
//     alert(response.statusText);
//     console.log(response.json())
// }