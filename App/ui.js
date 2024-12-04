// Select DOM elements to work with
const signInButton = document.getElementById('signIn');
const signOutButton = document.getElementById('signOut')
const titleDiv = document.getElementById('title-div');
const welcomeDiv = document.getElementById('welcome-div');
const tableDiv = document.getElementById('table-div');
const footerDiv = document.getElementById('footer');
const tableBody = document.getElementById('table-body-div');

function welcomeUser(username) {
    signInButton.classList.add('d-none');
    signOutButton.classList.remove('d-none');
    titleDiv.classList.add('d-none');
    welcomeDiv.classList.remove('d-none');
    welcomeDiv.innerHTML = `Welcome ${username}!`
}

function updateTable() {

    /**
     * In order to obtain the ID Token in the cached obtained previously, you can initiate a 
     * silent token request by passing the current user's account and the scope "openid".
     */
    myMSALObj.acquireTokenSilent({
        account: myMSALObj.getAccountByUsername(username),
        scopes: ["openid"]
    }).then(response => {

        tableDiv.classList.remove('d-none');
        footerDiv.classList.remove('d-none');
    
        Object.entries(response.idTokenClaims).forEach(claim => {
    
            if (claim[0] === "name" || claim[0] === "preferred_username" || claim[0] === "oid") {
                let row = tableBody.insertRow(0);
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                cell1.innerHTML = claim[0];
                cell2.innerHTML = claim[1];
            }
        });
    });
}