// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let homeAccountId = "";
let username = "";

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
        welcomeUser(username);
        updateTable();
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
        //         homeAccountId = currentAccounts[0].homeAccountId;
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

    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);
                
            if (error.errorMessage) {
                // Check for forgot password error
                // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
                if (error.errorMessage.indexOf("AADB2C90118") > -1) {
                    myMSALObj.loginPopup(b2cPolicies.authorities.forgotPassword)
                        .then(response => {
                            console.log(response);
                            window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
                        });
                }
            }
    });
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from by passing an account home ID.
    const logoutRequest = {
        account: myMSALObj.getAccountByHomeId(homeAccountId)
    };

    myMSALObj.logout(logoutRequest);
}

function editProfile() {

    /**
     * to initiate a user-flow/custom-policy, you need to use the corresponding authority string. 
     * MSAL.js allows you to provide an authority on a per-request basis by simply passing 
     * the relevant authority as a part of the request object. 
     */
    
    myMSALObj.loginPopup(b2cPolicies.authorities.editProfile)
      .then(response => {
          console.log(response);
      });
}

selectAccount();