// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accessToken;
let homeAccountId = "";
let username = "";

myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch(error => {
        console.error(error);

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf("AADB2C90118") > -1) {
            try {
                // Password reset policy/authority
                myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
            } catch(err) {
                console.log(err);
            }
        }
    });

function selectAccount () {

    /**
     * See here for more info on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts  || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        homeAccountId = currentAccounts[0].homeAccountId;
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
        homeAccountId = response.account.homeAccountId;
        username = response.account.username;

        /**
         * We need to reject id tokens that were not issued with the default sign-in policy.
         * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */

        if (response.idTokenClaims['acr'] === b2cPolicies.names.forgotPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");

            /**
             * Choose which account to logout from by passing an account home ID.
             * You can also provide a logout redirect Uri that can override the initial configuration.
             */
            const logoutRequest = {
                account: myMSALObj.getAccountByHomeId(accountId),
                postLogoutRedirectUri: "http://localhost:6420"
            };

            myMSALObj.logout(logoutRequest);
    
        } else if (response.idTokenClaims['acr'] === b2cPolicies.names.editProfile) {
            window.alert("Profile has been updated successfully.");
    
            if (myMSALObj.getAllAccounts()) {
                welcomeUser(username)
                updateTable();
            }
    
        } else {
            welcomeUser(username)
            updateTable();
        }
    } else {
        
        selectAccount();

        /**
         * If you already have a session that exists with the authentication server, you can use the ssoSilent() API
         * to make request for tokens without interaction, by providing a "login_hint" property. To try this, comment the 
         * line above and uncomment the section below.
         */

        // myMSALObj.ssoSilent(silentRequest).
        //     then((response) => {
        //         const currentAccounts = myMSALObj.getAllAccounts();
        //                 homeAccountId = currentAccounts[0].homeAccountId;
        //                 username = currentAccounts[0].username;
        //                 welcomeUser(username);
        //                 updateTable()
        //     }).catch(error => {
        //         console.error("Silent Error: " + error);
        //         if (error instanceof msal.InteractionRequiredAuthError) {
        //             signIn();
        //         }
        //     });
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

    // Choose which account to logout from by passing account home ID.
    const logoutRequest = {
        account: myMSALObj.getAccountByHomeId(accountId)
    };

    myMSALObj.logout(logoutRequest);
}

function editProfile() {

    /**
     * to initiate a user-flow/custom-policy, you need to use the corresponding authority string. 
     * MSAL.js allows you to provide an authority on a per-request basis by simply passing 
     * the relevant authority as a part of the request object. 
     */

    myMSALObj.loginRedirect(b2cPolicies.authorities.editProfile);
}

