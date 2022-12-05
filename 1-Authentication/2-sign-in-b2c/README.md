---
page_type: sample
name: Vanilla JavaScript single-page application (SPA) using MSAL.js to authenticate users against Azure AD B2C
description: Vanilla JavaScript single-page application (SPA) using MSAL.js to authenticate users against Azure AD B2C
languages:
 - javascript
products:
 - azure-active-directory-b2c
 - msal-js
 - msal-browser
urlFragment: ms-identity-javascript-tutorial
extensions:
- services: ms-identity
- platform: JavaScript
- endpoint: AAD v2.0
- level: 100
- client: Vanilla JavaScript SPA
---

# Vanilla JavaScript single-page application (SPA) using MSAL.js to authenticate users against Azure AD B2C

* [Overview](#overview)
* [Scenario](#scenario)
* [Contents](#contents)
* [Prerequisites](#prerequisites)
* [Setup the sample](#setup-the-sample)
* [Explore the sample](#explore-the-sample)
* [Troubleshooting](#troubleshooting)
* [About the code](#about-the-code)
* [Next Steps](#next-steps)
* [Contributing](#contributing)
* [Learn More](#learn-more)

## Overview

This sample demonstrates a Vanilla JavaScript single-page application (SPA) that lets users sign-in with [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory/external-identities/b2c/) using the [Microsoft Authentication Library for JavaScript)](https://github.com/AzureAD/microsoft-authentication-library-for-js) (MSAL.js). In doing so, it also illustrates various authentication and **B2C** concepts, such as [ID tokens](https://docs.microsoft.com/azure/active-directory-b2c/tokens-overview#token-types), [external identity providers](https://docs.microsoft.com/azure/active-directory-b2c/technical-overview#external-identity-providers) , [consumer social accounts](https://docs.microsoft.com/azure/active-directory-b2c/technical-overview#consumer-accounts), [single-sign on (SSO)](https://docs.microsoft.com/azure/active-directory-b2c/session-overview), **account selection**, **silent requests** and more.

## Scenario

1. The client application uses **MSAL.js** to obtain an **ID Token** from **Azure AD B2C**.
2. The **ID Token** proves that the user has successfully authenticated against **Azure AD B2C**.

![Overview](./ReadmeFiles/topology_b2c_signin.png)

## Contents

| File/folder           | Description                                                               |
|-----------------------|---------------------------------------------------------------------------|
| `App/authPopup.js`    | Main authentication logic resides here (using popup flow).                |
| `App/authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow. |
| `App/authConfig.js`   | Contains configuration parameters for the sample.                         |
| `App/ui.js`           | Contains UI logic.                                                        |
| `server.js`           | Simple Node server to `index.html`.                                       |

## Prerequisites

* [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
* [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
* [VS Code Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension is recommended for interacting with Azure through VS Code Interface.
* A modern web browser.
* An **Azure AD B2C** tenant. For more information, see: [How to get an Azure AD B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)
* A user account in your **Azure AD B2C** tenant.

## Setup the sample

### Step 1: Clone or download this repository

From your shell or command line:

```console
git clone https://github.com/Azure-Samples/ms-identity-javascript-tutorial.git
```

or download and extract the repository *.zip* file.

> :warning: To avoid path length limitations on Windows, we recommend cloning into a directory near the root of your drive.

### Step 2: Install project dependencies

```console
    cd 1-Authentication\2-sign-in-b2c
    npm install
```

### Step 3: Register the sample application(s) in your tenant

> :warning: This sample comes with a pre-registered application for demo purposes. If you would like to use your own **Azure AD B2C** tenant and application, follow the steps below to register and configure the application on **Azure portal**. Otherwise, continue with the steps for [Running the sample](#step-4-running-the-sample).

* follow the steps below for manually register your apps

#### Choose the Azure AD B2C tenant where you want to create your applications

To manually register the apps, as a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one Azure AD B2C tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired Azure AD B2C tenant.

#### Create User Flows and Custom Policies

Please refer to: [Tutorial: Create userflows in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-user-flows)

> :warning: This sample requires B2C user-flows to emit the **emails** claim in the ID token, which is used as **username** by MSAL. To do so, navigate to the [Azure portal](https://portal.azure.com) and locate the **Azure AD B2C** service. Then, navigate to the **User flows** blade. Select the **User Attributes** tab and make sure **Email Address** is checked. Then select the **Application Claims** tab and make sure **Email Addresses** is checked.
>
> You may want additional claims (such as **object ID** (*oid*) and etc.) to appear in the ID tokens obtained from Azure AD B2C user-flows. In that case, please refer to [User profile attributes](https://learn.microsoft.com/azure/active-directory-b2c/user-profile-attributes) to learn about how to configure your user-flows to emit those claims.

#### Add External Identity Providers

Please refer to: [Tutorial: Add identity providers to your applications in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-add-identity-providers)

#### Register the client app (ms-identity-javascript-c1s2)

1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure Active Directory B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
    1. In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `ms-identity-javascript-c1s2`.
    1. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
    1. Select **Register** to create the application.
1. In the **Overview** blade, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. In the app's registration screen, select the **Authentication** blade to the left.
1. If you don't have a platform added, select **Add a platform** and select the **Single-page application** option.
    1. In the **Redirect URI** section enter the following redirect URIs:
        1. `http://localhost:6420`
        1. `http://localhost:6420/redirect`
    1. Click **Save** to save your changes.

##### Configure the client app (ms-identity-javascript-c1s2) to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `App\authConfig.js` file.
1. Find the key `clientId` and replace the existing value with the application ID (clientId) of `ms-identity-javascript-c1s2` app copied from the Azure portal.

To setup your B2C user-flows, do the following:

1. Find the key `names` and populate it with your policy names e.g. `signUpSignIn`.
1. Find the key `authorities` and populate it with your policy authority strings e.g. `https://<your-tenant-name>.b2clogin.com/<your-tenant-name>.onmicrosoft.com/b2c_1_susi`.
1. Find the key `authorityDomain` and populate it with the domain portion of your authority string e.g. `<your-tenant-name>.b2clogin.com`.


### Step 4: Running the sample

```console
    cd 1-Authentication\2-sign-in-b2c
    npm start
```

## Explore the sample

1. Open your browser and navigate to `http://localhost:6420`.
1. Click on the **sign-in** button on the top right corner.

![Screenshot](./ReadmeFiles/screenshot.png)

> :information_source: Did the sample not work for you as expected? Then please reach out to us using the [GitHub Issues](../../../../issues) page.

> :information_source: if you believe your issue is with the B2C service itself rather than with the sample, please file a support ticket with the B2C team by following the instructions [here](https://docs.microsoft.com/azure/active-directory-b2c/support-options).

## We'd love your feedback!

Were we successful in addressing your learning objective? Consider taking a moment to [share your experience with us](Enter_Survey_Form_Link).

## Troubleshooting

<details>
	<summary>Expand for troubleshooting info</summary>

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community. Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-active-directory` `react` `ms-identity` `adal` `msal`].

To provide feedback on or suggest features for Azure Active Directory, visit [User Voice page](https://feedback.azure.com/d365community/forum/79b1327d-d925-ec11-b6e6-000d3a4f06a4).
</details>

## About the code

### Sign-in

MSAL.js provides 3 login APIs: `loginPopup()`, `loginRedirect()` and `ssoSilent()`:

```javascript
    myMSALObj.loginPopup(loginRequest)
        .then((response) => {
            // your logic
        })
        .catch(error => {
            console.error(error);
        });
```

To use the redirect flow, you must register a handler for redirect promise. **MSAL.js** provides `handleRedirectPromise()` API:

```javascript
    myMSALObj.handleRedirectPromise()
        .then((response) => {
            // your logic
        })
        .catch(err => {
            console.error(err);
        });

    myMSALObj.loginRedirect(loginRequest);
```

The recommended pattern is that you fallback to an **interactive method** should the silent SSO fails.

```javascript

    const silentRequest = {
      scopes: ["openid", "profile"],
      loginHint: "example@domain.net"
    };

    myMSALObj.ssoSilent(silentRequest)
        .then((response) => {
            // your logic
        }).catch(error => {
            console.error("Silent Error: " + error);
            if (error instanceof msal.InteractionRequiredAuthError) {
                myMSALObj.loginRedirect(loginRequest);
            }
        });
```

You can pass custom query string parameters to your sign-in request, using the `extraQueryParameters` property. For instance, in order to customize your B2C user interface, you can:

```javascript
    const loginRequest = {
      scopes: ["openid", "profile"],
      extraQueryParameters: { campaignId: 'hawaii', ui_locales: 'es' }
    };

    myMSALObj.loginRedirect(loginRequest);
```

See here for more: [Customize the user interface of your application in Azure AD B2C](https://docs.microsoft.com/azure/active-directory-b2c/custom-policy-ui-customization)

You can get all the active accounts of a signed-in user with the get `getAllAccounts()` API. If you know the **home ID** of an account, you can select it by:

```javascript
    myMSALObj.getAccountByHomeId(homeId);
```

> :warning: MSAL.js also provides a `getAccountByUsername()` API, which is not recommended with B2C as the B2C server may not return a username and as such, **home ID** is a more robust identifier to select an account.

### Sign-out

The application redirects the user to the **Microsoft identity platform** logout endpoint to sign out. This endpoint clears the user's session from the browser. If your app did not go to the logout endpoint, the user may re-authenticate to your app without entering their credentials again, because they would have a valid single sign-in session with the **Microsoft identity platform** endpoint. See for more: [Send a sign-out request](https://docs.microsoft.com/azure/active-directory/develop/v2-protocols-oidc#send-a-sign-out-request).

The sign-out clears the user's single sign-on session with **Azure AD B2C**, but it might not sign the user out of their **social identity provider** session. If the user selects the same identity provider during a subsequent sign-in, they might re-authenticate without entering their credentials. Here the assumption is that, if a user wants to sign out of the application, it doesn't necessarily mean they want to sign out of their social account (e.g. Facebook) itself.

### ID Token validation

A single-page application does not benefit from validating ID tokens, since the application runs without a back-end and as such, attackers can intercept and edit the keys used for validation of the token.

### Events API

Using the event API, you can register an event callback that will do something when an event is emitted. When registering an event callback in a react component you will need to make sure you do 2 things.

1. The callback is registered only once
1. The callback is unregistered before the component unmounts.

Here, we use the event API when integrating the B2C user-flows (discussed below).

### Integrating user-flows

* **Sign-up/sign-in**

This user-flow allows your users to sign-in to your application if the user has an account already, or sign-up for an account if not. This is the default user-flow that we pass during the initialization of MSAL instance.

* **Password reset**

When a user clicks on the **forgot your password?** link during sign-in, **Azure AD B2C** will throw an error. To initiate the password reset user-flow, you need to catch this error and handle it by sending another login request with the corresponding password reset authority string.

```javascript
    myMSALObj.loginPopup(loginRequest)
        .then(handleResponse)
        .catch(error => {
            console.error(error);

            if (error.errorMessage) {
                if (error.errorMessage.indexOf("AADB2C90118") > -1) {
                myMSALObj.loginPopup(b2cPolicies.authorities.forgotPassword)
                    .then(response => {
                        console.log(response);
                        window.alert("Password has been reset successfully. \nPlease sign-in with your new password.");
                    })
                }
            }
    });
```

In case if you are using redirect flow, you should catch the error inside `handleRedirectPromise()`:

```javascript
    myMSALObj.handleRedirectPromise()
        .then(handleResponse)
        .catch(error => {
            console.error(error);

            if (error.errorMessage.indexOf("AADB2C90118") > -1) {
                try {
                    myMSALObj.loginRedirect(b2cPolicies.authorities.forgotPassword);
                } catch(err) {
                    console.log(err);
                }
            }
        });
```

Then, in `addEventCallback()`:

```javascript
    if (event.payload.idTokenClaims['tfp'] === b2cPolicies.names.forgotPassword) {
            let signUpSignInFlowRequest = {
                authority: b2cPolicies.authorities.signUpSignIn.authority,
            };
            myMSALObj.loginPopup(signUpSignInFlowRequest)
                .then(handleResponse)
                .catch((error) => {
                    console.log(error)
                })
    }
```

* **Edit Profile**

When a user selects the **Edit Profile** button on the navigation bar, we simply initiate a sign-in flow. Like password reset, edit profile user-flow requires users to sign-out and sign-in again.

```javascript
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
                        account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                        account.idTokenClaims.sub === event.payload.idTokenClaims.sub &&
                        account.idTokenClaims['tfp'] === b2cPolicies.names.signUpSignIn
                );

            let signUpSignInFlowRequest = {
                authority: b2cPolicies.authorities.signUpSignIn.authority,
                account: originalSignInAccount,
            };

            // silently login again with the signUpSignIn policy
            myMSALObj.ssoSilent(signUpSignInFlowRequest).catch((error) => {
                console.log(error);
                if (error instanceof msal.InteractionRequiredAuthError) {
                    myMSALObj.loginPopup({
                        ...signUpSignInFlowRequest,
                    });
                }
            });
        }
```

## Next Steps

Learn how to:

* [Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD B2C](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/3-Authorization-II/2-call-api-b2c)
* [JavaScript single-page application calling Microsoft Graph with delegated permissions to manage Azure AD B2C user accounts](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/main/2-Authorization-I/2-call-graph-b2c)

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Learn More

* [What is Azure Active Directory B2C?](https://docs.microsoft.com/azure/active-directory-b2c/overview)
* [Application types that can be used in Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/application-types)
* [Recommendations and best practices for Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/best-practices)
* [Azure AD B2C session](https://docs.microsoft.com/azure/active-directory-b2c/session-overview)
* [Building Zero Trust ready apps](https://aka.ms/ztdevsession)
* [Initialize client applications using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications)
* [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
* [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
* [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)
* [Pass custom state in authentication requests using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request)
* [Prompt behavior in MSAL.js interactive requests](https://docs.microsoft.com/azure/active-directory/develop/msal-js-prompt-behavior)
* [Use MSAL.js to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)