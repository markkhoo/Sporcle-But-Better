// const searchUser = async (event) => {
//     event.preventDefault();

//     let username = document.querySelector('#searchInput').value;
//     searched = searched.trim();

//     if (username) {
//         const response = await fetch(`/profile/${username}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json'},
//             body: JSON.stringify(data)
//         });
//         if (response.ok) {
//             document.location.redirect(response);
//         } else {
//             alert(response.statusText);
//         }
//     }
// };

// document.querySelector('.find-form').addEventListener('submit', searchUser);