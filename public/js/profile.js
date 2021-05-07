const searchUser = async (event) => {
    event.preventDefault();

    let searched = document.querySelector('#searchInput').value;
    searched = searched.trim();

    if (searched) {
        const response = await fetch(`/profile/${searched}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if (response.ok) {
            console.log(response);
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.find-form').addEventListener('submit', searchUser);