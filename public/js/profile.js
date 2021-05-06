const searchUser = async (event) => {
    event.preventDefault();

    const searched = document.querySelector('#searchInput').value.trim();

    if (searched) {
        const response = await fetch(`/profile/${searched}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            document.location.replace('/searchuser');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.find-form').addEventListener('submit', searchUser);