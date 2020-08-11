---
page_type: sample
languages:
- javascript
- typescript
products:
- angular
- nodejs
- ms-graph
- microsoft-authentication-library
- microsoft-identity-platform
- azure-active-directory
- azure-active-directory-b2c
- azure-app-services
- azure-storage
description: "Microsoft Identity Platform & Microsoft Authentication Library for JavaScript Incremental Tutorial"
urlFragment: "ms-identity-javascript-incremental-tutorial"
---

# Microsoft Identity Platform & Microsoft Authentication Library for JavaScript Incremental Tutorial

Summary

## Contents

### Chapter I: Authentication

| Chapter              | Sample                            | Platform     | Audience   | Using     |
|----------------------|-----------------------------------|--------------|------------|-----------|
| `Authentication`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | pkce-grant |
| `Authentication`     | [ms-identity-javascript-signin]() | JavaScript   | AnyOrg     | pkce-grant |
| `Authentication`     | [ms-identity-b2c-javascript-signin]() | JavaScript | B2C      | pkce-grant |
| `Authentication`     | [ms-identity-javascript-angular-signin]() | Angular   | MyOrg    | implicit-grant |
| `Authentication`     | [ms-identity-javascript-angular-signin]() | Angular   | AnyOrg   | implicit-grant |
| `Authentication`     | [ms-identity-b2c-javascript-angular-signin]() | Angular | B2C    | implicit-grant |
| `Authentication`     | [ms-identity-javascript-nodejs-signin]() | NodeJS   | MyOrg    | auth-code-grant |
| `Authentication`     | [ms-identity-javascript-nodejs-signin]() | NodeJS   | AnyOrg   | auth-code-grant |
| `Authentication`     | [ms-identity-b2c-javascript-nodejs-signin]() | NodeJS | B2C    | auth-code-grant |

### Chapter II: Scopes & Resources I

| Chapter              | Sample                            | Platform     | Audience   | Using     | Calling  |
|----------------------|-----------------------------------|--------------|------------|-----------|----------|
| `Scopes & Resources I` | [ms-identity-javascript-graphapi]() | JavaScript | MyOrg  | pkce-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-javascript-graphapi]() | JavaScript | AnyOrg  | pkce-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-b2c-javascript-graphapi]() | JavaScript | B2C  | pkce-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-b2c-javascript-armapi]() | JavaScript | AnyOrg  | pkce-grant | ARM Rest API |
| `Scopes & Resources I` | [ms-identity-javascript-angular-graphapi]() | Angular | MyOrg  | implicit-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-javascript-angular-graphapi]() | Angular | AnyOrg  | implicit-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-b2c-javascript-angular-graphapi]() | Angular | B2C  | implicit-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-javascript-angular-armapi]() | Angular | AnyOrg  | implicit-grant | ARM Rest API |
| `Scopes & Resources I` | [ms-identity-javascript-nodejs-graphapi]() | NodeJS | MyOrg  | auth-code-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-javascript-nodejs-graphapi]() | NodeJS | AnyOrg  | auth-code-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-b2c-javascript-nodejs-graphapi]() | NodeJS | B2C  | auth-code-grant | MS Graph API |
| `Scopes & Resources I` | [ms-identity-javascript-nodejs-armapi]() | NodeJS | AnyOrg  | auth-code-grant | ARM Rest API |

### Chapter III: Scopes & Resources II

| Chapter              | Sample                            | Platform     | Audience   | Using     | Calling  |
|----------------------|-----------------------------------|--------------|------------|-----------|----------|
| `Scopes & Resources II` | [ms-identity-javascript-nodejs-webapi]() | JavaScript & NodeJS | MyOrg | pkce-grant  | Custom Web API |
| `Scopes & Resources II` | [ms-identity-javascript-nodejs-webapi]() | JavaScript & NodeJS | AnyOrg | pkce-grant  | Custom Web API |
| `Scopes & Resources II` | [ms-identity-b2c-javascript-nodejs-webapi]() | JavaScript & NodeJS | B2C | pkce-grant  | Custom Web API |
| `Scopes & Resources II` | [ms-identity-javascript-angular-nodejs-webapi]() | Angular & NodeJS | MyOrg | implicit-grant  | Custom Web API |
| `Scopes & Resources II` | [ms-identity-javascript-angular-nodejs-webapi]() | Angular & NodeJS | AnyOrg | implicit-grant  | Custom Web API |
| `Scopes & Resources II` | [ms-identity-b2c-javascript-angular-nodejs-webapi]() | Angular & NodeJS | B2C | implicit-grant  | Custom Web API |

### Chapter IV: Advanced Grants

| Chapter              | Sample                            | Platform     | Audience   | Using     | Calling  |
|----------------------|-----------------------------------|--------------|------------|-----------|----------|
| `Advanced Grants` | [ms-identity-javascript-nodejs-webapi-obo]() | JavaScript & NodeJS | AnyOrg | obo-grant  | Custom Web API <> MS Graph API |
| `Advanced Grants` | [ms-identity-javascript-angular-nodejs-webapi-obo]() | Angular & NodeJS | MyOrg | obo-grant  | Custom Web API <> MS Graph API |
| `Advanced Grants` | [ms-identity-javascript-nodejs-webapp-cc]() | NodeJS | MyOrg | client-credentials-grant  | MS Graph API |
| `Advanced Grants` | [ms-identity-javascript-nodejs-deamon-cc]() | NodeJS | MyOrg | client-credentials-grant   | MS Graph API |
| `Advanced Grants` | [ms-identity-javascript-nodejs-deamon-device]() | NodeJS | MyOrg | device-code-grant   | MS Graph API |

### Chapter V: Authorization

| Chapter              | Sample                            | Platform     | Audience   | Using     |
|----------------------|-----------------------------------|--------------|------------|-----------|
| `Authorization`      | [ms-identity-javascript-security-groups]() | JavaScript | MyOrg | pkce-grant  |
| `Authorization`      | [ms-identity-javascript-security-groups]() | JavaScript | AnyOrg | pkce-grant  |
| `Authorization`      | [ms-identity-javascript-app-roles]() | JavaScript | MyOrg | pkce-grant  |
| `Authorization`      | [ms-identity-javascript-app-roles]() | JavaScript | AnyOrg | pkce-grant  |
| `Authorization`      | [ms-identity-javascript-angular-security-groups]() | Angular | MyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-angular-security-groups]() | Angular | AnyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-angular-app-roles]() | Angular | MyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-angular-app-roles]() | Angular | AnyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-nodejs-security-groups]() | Angular | MyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-nodejs-security-groups]() | Angular | MyOrg | implicit-grant  |
| `Authorization`      | [ms-identity-javascript-nodejs-app-roles]() | NodeJS | MyOrg | auth-code-grant  |
| `Authorization`      | [ms-identity-javascript-nodejs-app-roles]() | NodeJS | AnyOrg | auth-code-grant  |

### Chapter VI: Deployment

| Chapter              | Sample                            | Platform     | Audience   | Using     | Service  |
|----------------------|-----------------------------------|--------------|------------|-----------|----------|
| `Deployment`         | [ms-identity-javascript-spa-deployment]() | JavaScript | AnyOrg | pkce-grant  | Azure Storage  |
| `Deployment`         | [ms-identity-javascript-angular-spa-deployment]() | Angular | AnyOrg | implicit-grant  | Azure Storage  |
| `Deployment`         | [ms-identity-javascript-nodejs-webapp-deployment]() | NodeJS | AnyOrg | auth-code-grant  | Azure App Services  |
| `Deployment`         | [ms-identity-javascript-nodejs-webapi-deployment]() | NodeJS | AnyOrg | auth-code-grant  | Azure App Services  |

### Chapter VII: Migration

| Chapter              | Sample                            | Platform     | Audience   | Using     |
|----------------------|-----------------------------------|--------------|------------|-----------|
| `Migration`          | [ms-identity-javascript-adfs-migration]() | JavaScript | MyOrg | pkce-grant |
| `Migration`          | [ms-identity-javascript-angular-adfs-migration]() | JavaScript | MyOrg | implicit-grant |
| `Migration`          | [ms-identity-javascript-nodejs-adfs-migration]() | JavaScript | MyOrg | auth-code-grant |

## Prerequisites

Please refer to each chapter's sub-folder for sample-specific prerequisites.

## More information

- [Microsoft identity platform (Azure Active Directory for developers)](https://docs.microsoft.com/azure/active-directory/develop/)
- [Overview of Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/azure/active-directory/develop/msal-overview)
- [Quickstart: Register an application with the Microsoft identity platform (Preview)](https://docs.microsoft.com/azure/active-directory/develop/quickstart-register-app)
- [Quickstart: Configure a client application to access web APIs (Preview)](https://docs.microsoft.com/azure/active-directory/develop/quickstart-configure-app-access-web-apis)
- [Understanding Azure AD application consent experiences](https://docs.microsoft.com/azure/active-directory/develop/application-consent-experience)
- [Understand user and admin consent](https://docs.microsoft.com/azure/active-directory/develop/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent)
- [Application and service principal objects in Azure Active Directory](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals)
- [National Clouds](https://docs.microsoft.com/azure/active-directory/develop/authentication-national-cloud#app-registration-endpoints)
- [MSAL code samples](https://docs.microsoft.com/azure/active-directory/develop/sample-v2-code)
- [Initialize client applications using MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-initializing-client-applications)
- [Single sign-on with MSAL.js](https://docs.microsoft.com/azure/active-directory/develop/msal-js-sso)
- [Handle MSAL.js exceptions and errors](https://docs.microsoft.com/azure/active-directory/develop/msal-handling-exceptions?tabs=javascript)
- [Logging in MSAL.js applications](https://docs.microsoft.com/azure/active-directory/develop/msal-logging?tabs=javascript)
- [Use MSAL.js to work with Azure AD B2C](https://docs.microsoft.com/azure/active-directory/develop/msal-b2c-overview)

## Community Help and Support

Use [Stack Overgrant](http://stackovergrant.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overgrant first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`msal` `javascript` `angular` `azure-active-directory`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments
