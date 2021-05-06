const signUpUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#userWant').value.trim();;
    const password = document.querySelector('#userPass').value.trim();;
    const passCheck = document.querySelector('#passCheck').value.trim();

    if (username && password === passCheck) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
            }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.signupUser').addEventListener('submit', signUpUser);