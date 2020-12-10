// Select DOM elements to work with
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut')
const titleDiv = document.getElementById('title-div');
const welcomeDiv = document.getElementById('welcome-div');
const tableDiv = document.getElementById('table-div');
const tableBody = document.getElementById('table-body-div');
const footerDiv = document.getElementById('footer');
const editProfileButton = document.getElementById('editProfileButton');

function welcomeUser(username) {
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
    titleDiv.classList.add('d-none');
    editProfileButton.classList.remove('d-none');
    welcomeDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${username}!`
}

function updateTable(idTokenClaims) {
    tableDiv.classList.remove('d-none');
    footerDiv.classList.remove('d-none');

    Object.entries(idTokenClaims).forEach(claim => {

        if (claim[0] === "name" || claim[0] === "oid") {
            let row = tableBody.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.innerHTML = claim[0];
            cell2.innerHTML = claim[1];
        }
    });
}