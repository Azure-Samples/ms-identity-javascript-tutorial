// Select DOM elements to work with
const welcomeDiv = document.getElementById('WelcomeMessage');
const cardDiv = document.getElementById('card-div');
const formDiv = document.getElementById('form-div');
const survey = document.getElementById('survey');

const signInButton = document.getElementById('signIn');
const getUsersButton = document.getElementById('getUsers');
const addUsersButton = document.getElementById('addUsers');
const submitButton = document.getElementById('submitButton');

const tabContent = document.getElementById('nav-tabContent');
const tabList = document.getElementById('list-tab');

getUsersButton.addEventListener('click', async() => {
    formDiv.style.display = 'none';

    let result;

    try {
        result = await getUsers();

        if (result instanceof Error) {
            throw Error;
        } else {
            updateUI(result);
        } 
    } catch (error) {
        console.log(error);
        alert(result);
    }
});

addUsersButton.addEventListener('click', async() => {
    tabContent.style.display = 'none';
    tabList.style.display = 'none';
    formDiv.style.display = 'initial'
});

submitButton.addEventListener('click', async() => {
    formDiv.style.display = 'none';
    tabContent.style.display = 'initial';
    tabList.style.display = 'initial';
    
    /**
     * Following are the mandatory fields when creating a new user.
     * For more information, visit: https://docs.microsoft.com/graph/api/user-post-users
     */
    const newUser = {
        accountEnabled: true,
        displayName: document.getElementById('displayName').value,
        userPrincipalName: document.getElementById('userPrincipalName').value,
        mailNickname: document.getElementById('userPrincipalName').value.split('@')[0],
        passwordProfile: {
            password: document.getElementById('password').value,
            forceChangePasswordNextSignIn: true
        },
    };

    let result;

    try {
        result = await createUser(newUser);

        if (result instanceof Error) {
            throw Error;
        } else {
            alert('User added successfully. Use "Get Users" to see the newly added user.');
        }
    } catch (error) {
        console.log(error);
        alert(result);
    }
});

function showWelcomeMessage(username) {
    // Reconfiguring DOM elements
    cardDiv.style.display = 'initial';
    survey.style.display = 'initial';
    welcomeDiv.innerHTML = `Welcome ${username}`;
    signInButton.setAttribute('onclick', 'signOut();');
    signInButton.setAttribute('class', 'btn btn-success')
    signInButton.innerHTML = 'Sign Out';
}

function updateUI(data) {
    console.log('Graph API responded at: ' + new Date().toString());

    tabContent.style.display = 'initial';
    tabList.style.display = 'initial';
    tabList.innerHTML = ''; // clear tabList at each call


    data.value.map((d, i) => {
        const listItem = document.createElement('a');
        listItem.setAttribute('class', 'list-group-item list-group-item-action')
        listItem.setAttribute('id', 'list' + (i+1) + 'list')
        listItem.setAttribute('data-toggle', 'list')
        listItem.setAttribute('href', '#list' + (i+1))
        listItem.setAttribute('role', 'tab')
        listItem.setAttribute('aria-controls', (i+1))
        listItem.innerHTML = d.displayName;
        tabList.appendChild(listItem)

        const contentItem = document.createElement('div');
        contentItem.setAttribute('class', 'tab-pane fade')
        contentItem.setAttribute('id', 'list' + (i+1))
        contentItem.setAttribute('role', 'tabpanel')
        contentItem.setAttribute('aria-labelledby', 'list' + (i+1) + 'list')

        contentItem.append(dataToTable(d, i));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('id', 'deleteButton' + (i+1));
        deleteButton.setAttribute('class', 'btn btn-primary');

        deleteButton.addEventListener('click', async() => {
            document.getElementById('deleteButton' + (i+1)).remove();
            document.getElementById('userTable' + (i+1)).remove();
            document.getElementById('list' + (i+1)).remove();
            document.getElementById('list' + (i+1) + 'list').remove();

            try {
                await deleteUser(d.id);   
            } catch (error) {
                alert(error);
            }
        });

        contentItem.append(deleteButton);
        tabContent.appendChild(contentItem);
    });
}

function dataToTable(data, i) {
    const tableNode = document.createElement('table');
    tableNode.setAttribute('id', 'userTable' + (i+1));
    tableNode.setAttribute('class', 'table');

    Object.entries(data).filter(datum => datum !== null).map((datum) => {
        const rowNode = document.createElement('tr');
        const dataNode1 = document.createElement('td');
        const dataNode2 = document.createElement('td');
        const valueNode1 = document.createTextNode(datum[0]);
        const valueNode2 = document.createTextNode(datum[1]);
        dataNode1.appendChild(valueNode1);
        dataNode2.appendChild(valueNode2);
        rowNode.appendChild(dataNode1);
        rowNode.appendChild(dataNode2);
        tableNode.appendChild(rowNode);
    });

    return tableNode;
}