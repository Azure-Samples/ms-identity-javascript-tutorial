// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = '';

/**
 * A promise handler needs to be registered for handling the
 * response returned from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/acquire-token.md
 */
myMSALObj
    .handleRedirectPromise()
    .then(handleResponse)
    .catch((error) => {
        console.error(error);
    });

function selectAccount() {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn('Multiple accounts detected.');
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        showWelcomeMessage(username);
    }
}

function handleResponse(response) {
    if (response !== null) {
        username = response.account.username;
        showWelcomeMessage(username);
    } else {
        selectAccount();
    }
}

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(loginRequest);
}

function signOut() {
    
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from by passing a username.
    const account = myMSALObj.getAccountByUsername(username);
    const logoutRequest = {
        account: account,
    };

    clearStorage(account);
    myMSALObj.logoutRedirect(logoutRequest);
}

function seeProfile() {
    const account = myMSALObj.getAccountByUsername(username);

    getGraphClient({
        account: account,
        scopes: graphConfig.graphMeEndpoint.scopes,
        interactionType: msal.InteractionType.Redirect,
    })
        .api('/me')
        .responseType('raw')
        .get()
        .then((response) => {
            return handleClaimsChallenge(account, response, graphConfig.graphMeEndpoint.uri);
        })
        .then((response) => {
            if (response && response.error === 'claims_challenge_occurred') throw response.error;
            return updateUI(response, graphConfig.graphMeEndpoint.uri);
        })
        .catch((error) => {
            if (error === 'claims_challenge_occurred') {
                const resource = new URL(graphConfig.graphMeEndpoint.uri).hostname;
                const claims =
                    account &&
                    getClaimsFromStorage(`cc.${msalConfig.auth.clientId}.${account.idTokenClaims.oid}.${resource}`)
                        ? window.atob(
                              getClaimsFromStorage(
                                  `cc.${msalConfig.auth.clientId}.${account.idTokenClaims.oid}.${resource}`
                              )
                          )
                        : undefined; // e.g {"access_token":{"xms_cc":{"values":["cp1"]}}}
                let request = {
                    account: account,
                    scopes: graphConfig.graphMeEndpoint.scopes,
                    claims: claims,
                };

                myMSALObj.acquireTokenRedirect(request);
            } else {
                console.log(error);
            }
        });
}

function readContacts() {
    const account = myMSALObj.getAccountByUsername(username);
    getGraphClient({
        account: account,
        scopes: graphConfig.graphContactsEndpoint.scopes,
        interactionType: msal.InteractionType.Redirect,
    })
        .api('/me/contacts')
        .responseType('raw')
        .get()
        .then((response) => {
            return handleClaimsChallenge(account, response, graphConfig.graphContactsEndpoint.uri);
        })
        .then((response) => {
            if (response && response.error === 'claims_challenge_occurred') throw response.error;
            return updateUI(response, graphConfig.graphContactsEndpoint.uri);
        })
        .catch((error) => {
            if (error === 'claims_challenge_occurred') {
                const resource = new URL(graphConfig.graphContactsEndpoint.uri).hostname;
                const claims =
                    account &&
                    getClaimsFromStorage(`cc.${msalConfig.auth.clientId}.${account.idTokenClaims.oid}.${resource}`)
                        ? window.atob(
                              getClaimsFromStorage(
                                  `cc.${msalConfig.auth.clientId}.${account.idTokenClaims.oid}.${resource}`
                              )
                          )
                        : undefined; // e.g {"access_token":{"xms_cc":{"values":["cp1"]}}}

                let request = {
                    account: account,
                    scopes: graphConfig.graphContactsEndpoint.scopes,
                    claims: claims,
                };

                myMSALObj.acquireTokenRedirect(request);
            } else if (error.toString().includes('404')) {
                return updateUI(null, graphConfig.graphContactsEndpoint.uri);
            } else {
                console.log(error);
            }
        });
}
