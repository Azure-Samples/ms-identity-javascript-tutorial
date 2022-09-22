# JavaScript single-page application calling Microsoft Graph with delegated permissions to manage Azure AD B2C user accounts

 1. [Overview](#overview)
 1. [Scenario](#scenario)
 1. [Contents](#contents)
 1. [Prerequisites](#prerequisites)
 1. [Setup](#setup)
 1. [Registration](#registration)
 1. [Running the sample](#running-the-sample)
 1. [Explore the sample](#explore-the-sample)
 1. [About the code](#about-the-code)
 1. [More information](#more-information)
 1. [Community Help and Support](#community-help-and-support)
 1. [Contributing](#contributing)

## Overview

This sample demonstrates how to [manage your B2C users with Microsoft Graph](https://docs.microsoft.com/azure/active-directory-b2c/microsoft-graph-get-started) via a vanilla JavaScript single-page application (SPA) using [delegated permissions](https://docs.microsoft.com/azure/active-directory/develop/delegated-and-app-perms), with the help of [Microsoft Authentication Library of JavaScript](https://github.com/AzureAD/microsoft-authentication-library-for-js) (MSAL.js) for authentication and [Microsoft Graph JavaScript SDK](https://github.com/microsoftgraph/msgraph-sdk-javascript) for querying [Microsoft Graph](https://docs.microsoft.com/graph/overview).

## Scenario

1. The client **JavaScript SPA** uses MSAL.js to sign-in and obtain a JWT access token from **Azure AD B2C**.
2. The access token is used as a *bearer token* to authorize the user to call **Microsoft Graph**.

## Contents

| File/folder       | Description                                                   |
|-------------------|---------------------------------------------------------------|
| `authConfig.js`   | Authentication parameters reside here.                        |
| `authProvider.js` | Main authentication logic resides here.                       |
| `graph.js`        | Contains an implementation of MS Graph JavaScript SDK client. |

## Prerequisites

- A user account with **admin privileges** in your **Azure AD B2C** tenant.

## Setup

Locate the root folder of the sample in a terminal. Then:

```console
    npm install
```

### Registration

> :information_source: If you would like to use an existing B2C app registration that you use for signing-in users with user-flows (audience type 3), you can do so. However, you won't be able to grant delegated permissions via the **Permissions** blade on the App Registration portal. Still, because of [dynamic consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent), this won't be an issue, as you will already sign-in with an admin account that can consent to these permissions for herself. See "[configure the code to use your app registration](#configure-the-code-to-use-your-app-registration)" section below for other differences.

### Choose the Azure AD tenant where you want to create your applications

As a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one Azure AD B2C tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired Azure AD B2C tenant.

### Register the app

1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure AD B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
   - In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `b2c-management-spa`.
   - Under **Supported account types**, select **Accounts in this organizational directory only**.
   - In the **Redirect URI (optional)** section, select **Single-page application** in the combo-box and enter the following redirect URI: `http://localhost:3000`.
1. Select **Register** to create the application.
1. In the app's registration screen, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. Select **Save** to save your changes.
1. In the app's registration screen, select the **API permissions** blade in the left to open the page where we add access to the APIs that your application needs.
   - Select the **Add a permission** button and then,
   - Ensure that the **Microsoft APIs** tab is selected.
   - In the *Commonly used Microsoft APIs* section, select **Microsoft Graph**
   - In the **Delegated permissions** section, select the **User.ReadWrite.All** in the list. Use the search box if necessary.
   - Select the **Add permissions** button at the bottom.
   - Finally, grant **Admin consent** to these permissions.

#### Configure the code to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `App\authConfig.js` file.
1. Find the key `Enter_the_Application_Id_Here` and replace the existing value with the application ID (clientId) of `b2c-management-spa` app copied from the Azure portal.
1. Find the key `Enter_the_Tenant_Info_Here` and replace the existing value with your tenant ID copied form Azure portal.

> :information_source: If you are using an existing B2C app registration that you use for signing-in users with user-flows, replace `Enter_the_Tenant_Info_Here` not with your tenant ID, but with "common".

## Running the sample

Locate the root folder of the sample in a terminal. Then:

```console
    npm start
```

## Explore the sample

1. Open your browser and navigate to `http://localhost:3000`.
1. Click on the **sign-in** button on the top right corner (make sure to sign-in with an administrator account).
1. Click on the **Get Users** button retrieve the users in your tenant.
1. Click on the **Add Users** button to add a new user to your tenant (see [here](https://docs.microsoft.com/graph/api/user-post-users?view=graph-rest-1.0&tabs=http) for requirements when adding a new user)

> :information_source: Did the sample not work for you as expected? Then please reach out to us using the [GitHub Issues](../../../issues) page.

> :information_source: if you believe your issue is with the B2C service itself rather than with the sample, please file a support ticket with the B2C team by following the instructions [here](https://docs.microsoft.com/en-us/azure/active-directory-b2c/support-options).

## We'd love your feedback!

Were we successful in addressing your learning objective? Consider taking a moment to [share your experience with us](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUOUlINE03TVo4TEM4MVRGUUQ2TlBRUUFBSCQlQCN0PWcu).

## About the code

### Getting and passing access tokens

In [authProvider.js](./App/AuthProvider.js), we initialize an **MSAL** client by passing a configuration object as shown below:

```javascript
    const pca = new msal.PublicClientApplication(msalConfig);
```

We then define a method for getting access tokens. To do so, we first attempt to acquire token *silently* from the browser cache, and fallback to an **interactive** method (here, popup) should that fails:

```javascript
    getTokenPopup(request) {
        request.account = pca.getAccountByHomeId(accountId);
    
        return pca.acquireTokenSilent(request)
            .then((response) => {
                // In case the response from B2C server has an empty accessToken field
                // throw an error to initiate interactive token acquisition
                if (!response.accessToken || response.accessToken === "") {
                    throw new msal.InteractionRequiredAuthError;
                }
                return response;
            })
            .catch(error => {
                console.log(error);
                console.log("silent token acquisition fails. acquiring token using popup");
                if (error instanceof msal.InteractionRequiredAuthError) {
                    // fallback to interaction when silent call fails
                    return pca.acquireTokenPopup(request)
                        .then(response => {
                            console.log(response);
                            return response;
                        }).catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log(error);   
                }
            });
    }
```

Finally, we create **MyAuthenticationProvider** class that implements `AuthenticationProvider` interface (see for more: [Using Custom Authentication Provider](https://github.com/microsoftgraph/msgraph-sdk-javascript/blob/dev/docs/CustomAuthenticationProvider.md)). This class is used to instantiate a custom token middleware that is needed for enabling **Microsoft Graph JavaScript SDK** client object to communicate with the **Microsoft Graph API**.

```javascript
    class MyAuthenticationProvider {
        async getAccessToken() {
            return new Promise(async(resolve, reject) => {

                // here we get an access token for MS Graph
                const authResponse = await getTokenPopup(tokenRequest);
    
                if (authResponse.accessToken && authResponse.accessToken.length !== 0) {
                  resolve(authResponse.accessToken);
                } else {
                  reject(Error("Error: cannot obtain access token."));
                }
            });
        }
    }
```

### Querying Microsoft Graph

We first initialize the **Microsoft Graph JavaScript SDK** client:

```javascript
const clientOptions = {
    authProvider: new MyAuthenticationProvider(),
};

const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);
```

After that, we can use it for **CRUD** operations on Graph resources. For instance, to update a user account:

```javascript
    async function updateUser(id, prop) {
        try {
            console.log('Graph API called at: ' + new Date().toString());
            return await client.api(`/users/${id}`).patch(prop);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
```

## More information

- [What is Azure Active Directory B2C?](https://docs.microsoft.com/azure/active-directory-b2c/overview)
- [Application types that can be used in Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/application-types)
- [Recommendations and best practices for Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/best-practices)
- [Azure AD B2C session](https://docs.microsoft.com/azure/active-directory-b2c/session-overview)
- [Initialize client applications using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications)
- [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
- [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
- [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)
- [Pass custom state in authentication requests using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-pass-custom-state-authentication-request)
- [Prompt behavior in MSAL.js interactive requests](https://docs.microsoft.com/azure/active-directory/develop/msal-js-prompt-behavior)
- [Use MSAL.js to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)

For more information about how OAuth 2.0 protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](https://docs.microsoft.com/azure/active-directory/develop/authentication-flows-app-scenarios).

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-active-directory` `azure-ad-b2c` `ms-identity` `msal`].

If you find a bug in the sample, raise the issue on [GitHub Issues](../../../issues).

To provide feedback on or suggest features for Azure Active Directory, visit [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](/CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.