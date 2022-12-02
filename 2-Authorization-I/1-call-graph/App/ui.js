// Select DOM elements to work with
const welcomeDiv = document.getElementById("WelcomeMessage");
const signInButton = document.getElementById("SignIn");
const cardDiv = document.getElementById("card-div");
const mailButton = document.getElementById("readMail");
const profileButton = document.getElementById("seeProfile");
const profileDiv = document.getElementById("profile-div");

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute("onclick", "signOut();");
    signInButton.setAttribute('class', "btn btn-success")
    signInButton.innerHTML = "Sign Out";
}

function updateUI(data, endpoint) {
    console.log('Graph API responded at: ' + new Date().toString());

    if (endpoint === graphConfig.graphMeEndpoint.uri) {
        profileDiv.innerHTML = '';
        const title = document.createElement('p');
        title.innerHTML = "<strong>Title: </strong>" + data.jobTitle;
        const email = document.createElement('p');
        email.innerHTML = "<strong>Mail: </strong>" + data.mail;
        const phone = document.createElement('p');
        phone.innerHTML = "<strong>Phone: </strong>" + data.businessPhones[0];
        const address = document.createElement('p');
        address.innerHTML = "<strong>Location: </strong>" + data.officeLocation;
        profileDiv.appendChild(title);
        profileDiv.appendChild(email);
        profileDiv.appendChild(phone);
        profileDiv.appendChild(address);

    } else if (endpoint === graphConfig.graphContactsEndpoint.uri) {
        if (!data || data.value.length < 1) {
            alert('Your contacts is empty!');
        } else {
            const tabList = document.getElementById('list-tab');
            tabList.innerHTML = ''; // clear tabList at each readMail call

            data.value.map((d, i) => {
                if (i < 10) {
                    const listItem = document.createElement('a');
                    listItem.setAttribute('class', 'list-group-item list-group-item-action');
                    listItem.setAttribute('id', 'list' + i + 'list');
                    listItem.setAttribute('data-toggle', 'list');
                    listItem.setAttribute('href', '#list' + i);
                    listItem.setAttribute('role', 'tab');
                    listItem.setAttribute('aria-controls', i);
                    listItem.innerHTML =
                        '<strong> Name: ' + d.displayName + '</strong><br><br>' + 'Note: ' + d.personalNotes + '...';
                    tabList.appendChild(listItem);
                }
            });
        }
    }
}