// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = '';
let username = '';

/**
 * This method adds an event callback function to the MSAL object
 * to handle the response from redirect flow. For more information, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/events.md
 */
myMSALObj.addEventCallback((event) => {
    console.log(event.eventType);
    if (
        (event.eventType === msal.EventType.LOGIN_SUCCESS ||
            event.eventType === msal.EventType.ACQUIRE_TOKEN_SUCCESS) &&
        event.payload.account
    ) {
        /**
         * For the purpose of setting an active account for UI update, we want to consider only the auth
         * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
         * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
         * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */

        if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.editProfile) {
            const originalSignInAccount = myMSALObj
                .getAllAccounts()
                .find(
                    (account) =>
                        account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
                        account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn
                );

            let signUpSignInFlowRequest = {
                authority: b2cPolicies.authorities.signUpSignIn.authority,
                account: originalSignInAccount,
            };

            // silently login again with the signUpSignIn policy
            myMSALObj.ssoSilent(signUpSignInFlowRequest)
            .then(() => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
                if (error instanceof msal.InteractionRequiredAuthError) {
                    myMSALObj.loginPopup({
                        ...signUpSignInFlowRequest,
                    });
                }
            });
        }

        /**
         * Below we are checking if the user is returning from the reset password flow.
         * If so, we will ask the user to reauthenticate with their new password.
         * If you do not want this behavior and prefer your users to stay signed in instead,
         * you can replace the code below with the same pattern used for handling the return from
         * profile edit flow
         */

        if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.forgotPassword) {
            let signUpSignInFlowRequest = {
                authority: b2cPolicies.authorities.signUpSignIn.authority,
            };
            myMSALObj
                .loginPopup(signUpSignInFlowRequest)
                .then(handleResponse)
                .catch((error) => {
                    console.log(error);
                });
        }
    }
});

function selectAccount() {
    /**
     * See here for more info on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (currentAccounts.length === 0) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.log('Multiple accounts detected.');

        const originalSignInAccount = myMSALObj
            .getAllAccounts()
            .find((account) => account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn);

        accountId = originalSignInAccount.homeAccountId;

        username = originalSignInAccount.username ? originalSignInAccount.username : originalSignInAccount.name;
        welcomeUser(username);
        myMSALObj
            .acquireTokenSilent({
                account: myMSALObj.getAccountByHomeId(accountId),
                scopes: ['openid'],
            })
            .then((response) => {
                updateTable(response.idTokenClaims);
            });

    } else if (currentAccounts.length === 1) {
        accountId = currentAccounts[0].homeAccountId;
        username = currentAccounts[0].username;
        welcomeUser(username);

        /**
         * In order to obtain the ID Token in the cached obtained previously, you can initiate a
         * silent token request by passing the current user's account and the scope "openid".
         */
        myMSALObj
            .acquireTokenSilent({
                account: myMSALObj.getAccountByHomeId(accountId),
                scopes: ['openid'],
            })
            .then((response) => {
                updateTable(response.idTokenClaims);
            });
    }
}

// in case of page refresh
selectAccount();

function handleResponse(response) {
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        accountId = response.account.homeAccountId;
        username = response.account.username;
        welcomeUser(username);
        updateTable(response.idTokenClaims);
    } else {
        selectAccount();
    }
}

function signIn() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */
    myMSALObj
        .loginPopup({
            ...loginRequest,
        })
        .then(handleResponse)
        .catch((error) => {
            console.log(error);
            // Error handling
            if (error.errorMessage) {
                // Check for forgot password error
                // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
                if (error.errorMessage.indexOf('AADB2C90118') > -1) {
                    myMSALObj.loginPopup(b2cPolicies.authorities.forgotPassword);
                }
            }
        });
}

function signOut() {
    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from.

    const logoutRequest = {
        mainWindowRedirectUri: 'http://localhost:6420/signout',
    };

    myMSALObj.logoutPopup(logoutRequest);
}

function getTokenPopup(request) {
    /**
     * See here for more information on account retrieval:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    request.account = myMSALObj.getAccountByHomeId(accountId);

    return myMSALObj
        .acquireTokenSilent(request)
        .then((response) => {
            // In case the response from B2C server has an empty accessToken field
            // throw an error to initiate token acquisition
            if (!response.accessToken || response.accessToken === '') {
                throw new msal.InteractionRequiredAuthError();
            }
            return response;
        })
        .catch((error) => {
            console.log(error);
            console.log('silent token acquisition fails. acquiring token using popup');
            if (error instanceof msal.InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                return myMSALObj
                    .acquireTokenPopup({
                        ...request,
                        redirectUri: '/redirect',
                    })
                    .then((response) => {
                        console.log(response);
                        return response;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                console.log(error);
            }
        });
}

function editProfile() {
    myMSALObj.loginPopup({
        ...b2cPolicies.authorities.editProfile,
    });
}