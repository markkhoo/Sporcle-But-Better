const loginUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#').value.trim();
    const password = document.querySelector('#').value.trim();

    if (username && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('#').addEventListener('submit', loginUser);