// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * 
 */
myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });

function selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        welcomeUser(username);
        updateTable();
    }
}

function handleResponse(response) {

    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        let originInState = "";
        let nonceInState = "";
    
        try {
            const urlInState = decodeURIComponent(response.state.split('&session_')[0]);
            const decodedUrlInState = myMSALObj.browserCrypto.base64Decode(urlInState);
            originInState = decodedUrlInState.split('"origin":"')[1].split('"')[0];
            nonceInState = decodedUrlInState.split('"nonce":"')[1].split('"')[0];

            if (isGuid(nonceInState) && window.sessionStorage.getItem('nonce') === nonceInState) {
                username = response.account.username;
                welcomeUser(username);
                updateTable();
            } 
            
        } catch (e) { 
            // malformed URI sequence
            console.error(e);
        }
    } else {
        selectAccount();
    }
}

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     * https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request
     */

    window.sessionStorage.setItem('nonce', myMSALObj.browserCrypto.guidGenerator.generateGuid());

    loginRequest.state = myMSALObj.browserCrypto.base64Encode(
        JSON.stringify({
            origin: window.location.origin, 
            nonce: window.sessionStorage.getItem('nonce')
        })            
    );

    myMSALObj.loginRedirect(loginRequest);
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from by passing a username.
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username)
    };

    myMSALObj.logout(logoutRequest);
}


function isGuid(guid) {
    const regexGuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexGuid.test(guid);
}