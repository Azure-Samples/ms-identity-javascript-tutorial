# Vanilla JavaScript single-page application (SPA) using MSAL.js to authorize users for calling a protected web API on Azure AD B2C

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
 1. [Code of Conduct](#code-of-conduct)

## Overview

This sample demonstrates a Vanilla JavaScript single-page application that lets users authenticate against [Azure Active Directory B2C](https://azure.microsoft.com/services/active-directory/external-identities/b2c/) using the [Microsoft Authentication Library for JavaScript](https://github.com/AzureAD/microsoft-authentication-library-for-js) (MSAL.js), then acquires an **Access Token** for a web API that is also protected by **Azure AD B2C**. In doing so, it also illustrates various authorization and B2C concepts, such as [Access Tokens](https://docs.microsoft.com/azure/active-directory/develop/access-tokens), [Refresh Tokens](https://docs.microsoft.com/azure/active-directory-b2c/tokens-overview#token-types), [Token Lifetimes and Configuration](https://docs.microsoft.com/azure/active-directory-b2c/tokens-overview#configuration), **silent requests** and more.

## Scenario

1. The client application uses the **MSAL.js** to obtain an **Access Token** from **Azure AD B2C**.
1. The **Access Token** is used as a **bearer** to *authorize* the user to call a protected web API.
1. The protected web API responds with the claims in the **Access Token**.

![Overview](./ReadmeFiles/topology_b2c_callapi.png)

## Contents

| File/folder           | Description                                |
|-----------------------|--------------------------------------------|
| `SPA/public/authPopup.js`    | Main authentication logic resides here (using Popup flow). |
| `SPA/public/authRedirect.js` | Use this instead of `authPopup.js` for authentication with redirect flow. |
| `SPA/public/authConfig.js`   | Contains configuration parameters for the sample. |
| `SPA/public/policies.js`     | Contains B2C custom policies and user-flows.  |
| `API/index.js`   | Main application logic resides here.                     |
| `API/authConfig.js`   | Contains authentication parameters for the sample. |

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
- [VS Code Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension is recommended for interacting with Azure through VS Code Interface.
- An Azure Active Directory B2C (Azure AD B2C) tenant. For more information on how to get an Azure AD tenant, see: [Create an Azure Active Directory B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)
- A user account in your Azure AD B2C tenant.

## Setup

### Step 1: Clone or download this repository

From your shell or command line:

```console
    git clone https://github.com/Azure-Samples/ms-identity-javascript-tutorial.git
```

or download and extract the repository .zip file.

> :warning: To avoid path length limitations on Windows, we recommend cloning into a directory near the root of your drive.

### Step 2: Install project dependencies

```console
    cd ms-identity-javascript-tutorial
    cd 3-Authorization-II/2-call-api-b2c
    cd API
    npm install
    cd..
    cd SPA
    npm install
```

## Registration

> :information_source: This sample comes with a pre-registered application for testing purposes. If you would like to use your own **Azure AD B2C** tenant and application, follow the steps below to register and configure the applications in the **Azure Portal**. Otherwise, continue with the steps for [Running the sample](#running-the-sample).

### Choose the Azure AD B2C tenant where you want to create your applications

As a first step you'll need to:

1. Sign in to the [Azure portal](https://portal.azure.com).
1. If your account is present in more than one Azure AD B2C tenant, select your profile at the top right corner in the menu on top of the page, and then **switch directory** to change your portal session to the desired Azure AD B2C tenant.

1. #### Create User Flows and Custom Policies

Please refer to: [Tutorial: Create userflows in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-user-flows)

> :warning: This sample requires B2C user-flows to emit the **emails** claim in the ID token, which is used as **username** by MSAL. To do so, navigate to the [Azure portal](https://portal.azure.com) and locate the **Azure AD B2C** service. Then, navigate to the **User flows** blade. Select the **User Attributes** tab and make sure **Email Address** is checked. Then select the **Application Claims** tab and make sure **Email Addresses** is checked. 
>
> You may want additional claims (such as **object ID** (*oid*) and etc.) to appear in the ID tokens obtained from Azure AD B2C user-flows. In that case, please refer to [User profile attributes](https://learn.microsoft.com/azure/active-directory-b2c/user-profile-attributes) to learn about how to configure your user-flows to emit those claims.

#### Add External Identity Providers

Please refer to: [Tutorial: Add identity providers to your applications in Azure Active Directory B2C](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-add-identity-providers)

### Register the service app (msal-node-api)

1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure Active Directory B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
    1. In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `msal-node-api`.
    1. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
    1. Select **Register** to create the application.
1. In the **Overview** blade, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. In the app's registration screen, select the **Expose an API** blade to the left to open the page where you can publish the permission as an API for which client applications can obtain [access tokens](https://aka.ms/access-tokens) for. The first thing that we need to do is to declare the unique [resource](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow) URI that the clients will be using to obtain access tokens for this API. To declare an resource URI(Application ID URI), follow the following steps:
    1. Select **Set** next to the **Application ID URI** to generate a URI that is unique for this app.
    1. For this sample, accept the proposed Application ID URI (`https://{tenantName}.onmicrosoft.com/{clientId}`) by selecting **Save**.

#### Publish Delegated Permissions

1. All APIs must publish a minimum of one [scope](https://docs.microsoft.com/azure/active-directory/develop/v2-oauth2-auth-code-flow#request-an-authorization-code), also called [Delegated Permission](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent#permission-types), for the client apps to obtain an access token for a *user* successfully. To publish a scope, follow these steps:
1. Select **Add a scope** button open the **Add a scope** screen and Enter the values as indicated below:
    1. For **Scope name**, use `ToDoList.Read`.
    1. For **Admin consent display name** type in *Read users ToDo list using the 'msal-node-api'*.
    1. For **Admin consent description** type in *Allow the app to read the user's ToDo list using the 'msal-node-api'*.
    1. Keep **State** as **Enabled**.
    1. Select the **Add scope** button on the bottom to save this scope.
    > Repeat the steps above for another scope named **ToDoList.ReadWrite**
1. Select the **Manifest** blade on the left.
    1. Set `accessTokenAcceptedVersion` property to **2**.
    1. Select on **Save**.

> :information_source:  Follow [the principle of least privilege when publishing permissions](https://learn.microsoft.com/security/zero-trust/develop/protected-api-example) for a web API.

#### Configure the service app (msal-node-api) to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `API\authConfig.json` file.
1. Find the key `clientID` and replace the existing value with the application ID (clientId) of `msal-node-api` app copied from the Azure portal.
1. Find the key `tenantID` and replace the existing value with your Azure AD tenant/directory ID.
1. Find the key `policyName` and replace the existing value with Enter_The_Your_policy_Name.

### Register the client app (msal-javascript-spa)

1. Navigate to the [Azure portal](https://portal.azure.com) and select the **Azure Active Directory B2C** service.
1. Select the **App Registrations** blade on the left, then select **New registration**.
1. In the **Register an application page** that appears, enter your application's registration information:
    1. In the **Name** section, enter a meaningful application name that will be displayed to users of the app, for example `msal-javascript-spa`.
    1. Under **Supported account types**, select **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
    1. Select **Register** to create the application.
1. In the **Overview** blade, find and note the **Application (client) ID**. You use this value in your app's configuration file(s) later in your code.
1. In the app's registration screen, select the **Authentication** blade to the left.
1. If you don't have a platform added, select **Add a platform** and select the **Single-page application** option.
    1. In the **Redirect URI** section enter the following redirect URIs:
        1. `http://localhost:3000`
        1. `http://localhost:3000/redirect`
    1. Click **Save** to save your changes.
1. Since this app signs-in users, we will now proceed to select **delegated permissions**, which is is required by apps signing-in users.
    1. In the app's registration screen, select the **API permissions** blade in the left to open the page where we add access to the APIs that your application needs:
    1. Select the **Add a permission** button and then:
    1. Ensure that the **My APIs** tab is selected.
    1. In the list of APIs, select the API `msal-node-api`.
    1. In the **Delegated permissions** section, select **ToDoList.Read**, **ToDoList.ReadWrite** in the list. Use the search box if necessary.
    1. Select the **Add permissions** button at the bottom.
1. At this stage, the permissions are assigned correctly, but since it's a B2C tenant, the users themselves cannot consent to these permissions. To get around this problem, we'd let the [tenant administrator consent on behalf of all users in the tenant](https://docs.microsoft.com/azure/active-directory/develop/v2-admin-consent). Select the **Grant admin consent for {tenant}** button, and then select **Yes** when you are asked if you want to grant consent for the requested permissions for all accounts in the tenant. You need to be a tenant admin to be able to carry out this operation.

#### Configure the client app (msal-javascript-spa) to use your app registration

Open the project in your IDE (like Visual Studio or Visual Studio Code) to configure the code.

> In the steps below, "ClientID" is the same as "Application ID" or "AppId".

1. Open the `SPA\public\authConfig.js` file.
1. Find the key `Enter_the_Application_Id_Here` and replace the existing value with the application ID (clientId) of `msal-javascript-spa` app copied from the Azure portal.
1. Find the key `Enter_the_Tenant_Info_Here` and replace the existing value with your Azure AD tenant/directory ID.
1. Find the key `Enter_the_Web_Api_Scope_Here` and replace the existing value with Scope.
1. Find the key `policyName` and replace the existing value with Enter_The_Your_policy_Name.
1. Find the key `b2cDomain` and replace the existing value with Enter_The_Tenant_Domain_name.
1. Find the key `b2cPolicies.names` and replace it with the names (IDs) of your policies/user-flows e.g. `b2c_1_susi`.
1. Find the key `b2cPolicies.authorities` abd replace it with the authority strings of your policies/user-flows e.g. `https://fabrikamb2c.b2clogin.com/fabrikamb2c.onmicrosoft.com/b2c_1_susi`.
1. Find the key `b2cPolicies.authorityDomain` abd replace it with the domain of your authority e.g. `fabrikamb2c.b2clogin.com`.

## Running the sample

```console
    cd ms-identity-javascript-tutorial
    cd 3-Authorization-II/2-call-api-b2c
    cd API
    npm start
    cd..
    cd SPA
    npm start
```

## Explore the sample

1. Open your browser and navigate to `http://localhost:6420`.
1. Click on the **sign-in** button on the top right corner.
1. Once you authenticate, click the **Call API** button at the center.

![Screenshot](./ReadmeFiles/screenshot.png)

## We'd love your feedback!

Were we successful in addressing your learning objective? Consider taking a moment to [share your experience with us.](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUNDVHTkg2VVhWMTNYUTZEM05YS1hSN01EOSQlQCN0PWcu).

## About the code

### Acquire a Token

**Access Token** requests in **MSAL.js** are meant to be *per-resource-per-scope(s)*. This means that an **Access Token** requested for resource **A** with scope `scp1`:

- cannot be used for accessing resource **A** with scope `scp2`, and,
- cannot be used for accessing resource **B** of any scope.

The intended recipient of an **Access Token** is represented by the `aud` claim; in case the value for the `aud` claim does not mach the resource APP ID URI, the token should be considered invalid. Likewise, the permissions that an Access Token grants is represented by the `scp` claim. See [Access Token claims](https://docs.microsoft.com/azure/active-directory/develop/access-tokens#payload-claims) for more information.

**MSAL.js** exposes 3 APIs for acquiring a token: `acquireTokenPopup()`, `acquireTokenRedirect()` and `acquireTokenSilent()`:

```javascript
    myMSALObj.acquireTokenPopup(request)
        .then(response => {
            // do something with response
        })
        .catch(error => {
            console.log(error)
        });
```

For `acquireTokenRedirect()`, you must register a redirect promise handler:

```javascript
    myMSALObj.handleRedirectPromise()
        .then(response => {
            // do something with response
        })
        .catch(error => {
            console.log(error);
        });

    myMSALObj.acquireTokenRedirect(request);
```

### CORS Settings

For the purpose of the sample, **cross-origin resource sharing** (CORS) is enabled for **all** domains and methods, using the Express.js cors middleware. This is insecure and only used for demonstration purposes here. In production, you should modify this as to allow only the domains that you designate. If your web API is going to be hosted on **Azure App Service**, we recommend configuring CORS on the App Service itself. This is illustrated in [app.js](./API/app.js):

```javascript
    const express = require('express');
    const cors = require('cors');

    const app = express();
    app.use(cors());
```

### Access token validation

On the web API side, [passport-azure-ad](https://github.com/AzureAD/passport-azure-ad) verifies the incoming access token's signature and validates it's payload against the `issuer` and `audience` claims (defined in `BearerStrategy` constructor) using the `passport.authenticate()` API. In the `BearerStrategy` callback, you can add further validation steps as shown below (see [app.js](./API/app.js)):

```javascript
    const options = {
    identityMetadata: `https://${authConfig.metadata.b2cDomain}/${authConfig.credentials.tenantName}/${authConfig.policies.policyName}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
    clientID: authConfig.credentials.clientID,
    audience: authConfig.credentials.clientID,
    policyName: authConfig.policies.policyName,
    isB2C: authConfig.settings.isB2C,
    validateIssuer: authConfig.settings.validateIssuer,
    loggingLevel: authConfig.settings.loggingLevel,
    passReqToCallback: authConfig.settings.passReqToCallback,
};

const bearerStrategy = new passportAzureAd.BearerStrategy(options, (token, done) => {
    /**
     * Below you can do extended token validation and check for additional claims, such as:
     * - check if the delegated permissions in the 'scp' are the same as the ones declared in the application registration.
     *
     * Bear in mind that you can do any of the above checks within the individual routes and/or controllers as well.
     * For more information, visit: https://learn.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
     */

    /**
     * Lines below verifies if the caller's client ID is in the list of allowed clients.
     * This ensures only the applications with the right client ID can access this API.
     * To do so, we use "azp" claim in the access token. Uncomment the lines below to enable this check.
     */

    // const myAllowedClientsList = [
    //     /* add here the client IDs of the applications that are allowed to call this API */
    // ]

    // if (!myAllowedClientsList.includes(token.azp)) {
    //     return done(new Error('Unauthorized'), {}, "Client not allowed");
    // }


    /**
     * Access tokens that have no 'scp' (for delegated permissions).
     */
    if (!token.hasOwnProperty('scp')) {
        return done(new Error('Unauthorized'), null, 'No delegated permissions found');
    }

    done(null, {}, token);
});


app.use(passport.initialize());

passport.use(bearerStrategy);
```

Clients should treat access tokens as opaque strings, as the contents of the token are intended for the resource only (such as a web API or Microsoft Graph). For validation and debugging purposes, developers can decode **JWT**s (*JSON Web Tokens*) using a site like [jwt.ms](https://jwt.ms).

### Access to data

Controllers should check if the presented access token has the necessary permissions to access the data, depending on the type of permission. This is illustrated in [todolist.js](./API/controllers/todolist.js):

```javascript
    exports.getTodo = (req, res, next) => {
        if (hasRequiredDelegatedPermissions(req.authInfo, authConfig.protectedRoutes.todolist.delegatedPermissions.read)) {
            try {
                const id = req.params.id;
                const todo = db.get('todos').find({ id: id }).value();
                res.status(200).send(todo);
            } catch (error) {
                next(error);
            }
        } else {
            next(new Error('User does not have the required permissions'));
        }
    };
```

When granting access to data based on scopes, be sure to follow [the principle of least privilege](https://docs.microsoft.com/azure/active-directory/develop/secure-least-privileged-access).

## More information

Configure your application:

- [Use Microsoft Authentication Library for JavaScript to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)
- [Tutorial: Create an Azure Active Directory B2C tenant](https://docs.microsoft.com/azure/active-directory-b2c/tutorial-create-tenant)
- [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
- [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
- [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)

Learn more about **Microsoft identity platform** and **Azure AD B2C**:

- [Microsoft identity platform (Azure Active Directory for developers)](https://docs.microsoft.com/azure/active-directory/develop/)
- [Overview of Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/azure/active-directory/develop/msal-overview)
- [What is Azure Active Directory B2C?](https://docs.microsoft.com/azure/active-directory-b2c/overview)
- [Azure AD B2C User Flows](https://docs.microsoft.com/azure/active-directory-b2c/user-flow-overview)
- [Azure AD B2C Custom Policies](https://docs.microsoft.com/azure/active-directory-b2c/custom-policy-overview)

For more information about how OAuth 2.0 protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](https://docs.microsoft.com/azure/active-directory/develop/authentication-flows-app-scenarios).

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-ad` `azure-ad-b2c` `ms-identity` `msal`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](../../CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
