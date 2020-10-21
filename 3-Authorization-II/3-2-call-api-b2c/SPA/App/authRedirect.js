// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId = "";
let username = "";

myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch(error => {
        console.error(error);

        // Check for forgot password error
        // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
        if (error.errorMessage.indexOf("AADB2C90118") > -1) {
            try {
                myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
            } catch(err) {
                console.log(err);
            }
        }
    });

function selectAccount () {

    /**
     * See here for more information on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts  || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        accountId = currentAccounts[0].homeAccountId;
        username = currentAccounts[0].username;
        welcomeUser(username);
    }
}

function handleResponse(response) {
    console.log(response);
    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {
        
        /**
         * We need to reject id tokens that were not issued with the default sign-in policy.
         * "acr" claim in the token tells us what policy is used (NOTE: for new policies (v2.0), use "tfp" instead of "acr").
         * To learn more about B2C tokens, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
         */

        if (response.idTokenClaims['acr'] === b2cPolicies.names.forgotPassword) {
            window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");

            // Choose which account to logout from by passing a username.
            const logoutRequest = {
                account: myMSALObj.getAccountByHomeId(accountId)
            };

            myMSALObj.logout(logoutRequest);
    
        } else if (response.idTokenClaims['acr'] === b2cPolicies.names.editProfile) {
            window.alert("Profile has been updated successfully.");
    
            if (myMSALObj.getAllAccounts()) {
                welcomeUser(username);
            }
    
        } else {
            welcomeUser(username);
        }
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
    const logoutRequest = {
        account: myMSALObj.getAccountByHomeId(accountId)
    };

    myMSALObj.logout(logoutRequest);
}

function editProfile() {
    myMSALObj.loginRedirect(b2cPolicies.authorities.editProfile);
}

function getTokenRedirect(request) {

    /**
    * See here for more info on account retrieval: 
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
    */

   request.account = myMSALObj.getAccountByHomeId(accountId);
   
   return myMSALObj.acquireTokenSilent(request)
       .catch(error => {
           console.warn(error);
           console.warn("silent token acquisition fails. acquiring token using popup");
           if (error instanceof msal.InteractionRequiredAuthError) {
               // fallback to interaction when silent call fails
               return myMSALObj.acquireTokenRedirect(request);
           } else {
               console.warn(error);   
           }
   });
}
 
// Acquires and access token and then passes it to the API call
function passTokenToApi() {
   getTokenRedirect(tokenRequest);
   if (accessToken) {
        try {
            callApi(apiConfig.uri, accessToken);
        } catch(error) {
            console.warn(error); 
        }
    }
}