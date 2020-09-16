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
description: "Microsoft Identity Platform & Microsoft Authentication Library for JavaScript Tutorial"
urlFragment: "ms-identity-javascript-incremental-tutorial"
---

# Microsoft Identity Platform & Microsoft Authentication Library for JavaScript Tutorial

## Overview

Identity is central to modern web applications. [Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/v2-overview), along with [Azure Active Directory Azure AD](https://docs.microsoft.com/azure/active-directory/fundamentals/active-directory-whatis) and [Azure Azure Active Directory Business to Consumers (Azure AD B2C)](https://docs.microsoft.com/azure/active-directory-b2c/overview) are central to **Azure** cloud ecosystem, underlying all interactions between applications that are using various **Azure** services and services of other providers. This tutorial aims to take you through the fundamentals of modern authentication with JavaScript, using the [Microsoft Authentication Library for JavaScript (MSAL.js)](https://github.com/AzureAD/microsoft-authentication-library-for-js). We recommend following the chapters in successive fashion, in your platform of choice (**Vanilla JavaScript**, **Angular**, **React** (*coming soon*)) but code samples are self contained so feel free to pick samples by topics that you may need at the moment.

> :warning: This is a work in progress. Come back frequently to discover more samples.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed.
- [Visual Studio Code](https://code.visualstudio.com/download) for running and editing.
- [VS Code Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension for interacting with Azure through **VS Code** Interface.
- A modern web browser. While **MSAL.js** fully supports **IE11**, samples use **ES6** conventions and will not run on **Internet Explorer**.

Please refer to each chapter's sub-folder for sample-specific prerequisites.

## Recommendations

- We recommend [jwt.ms](https://jwt.ms) for inspecting your tokens.
- We recommend [Fiddler](https://www.telerik.com/fiddler) for monitoring your network activity and troubleshooting.
- We recommend following [Azure AD Blog](https://techcommunity.microsoft.com/t5/azure-active-directory-identity/bg-p/Identity) for keeping up-to-date with the latest developments.

Please refer to each chapter's sub-folder for sample-specific recommendations.

## Contents

| Chapter              | Covers                            |
|----------------------|-----------------------------------|
| `Authentication`     | id tokens, sign-in, sign-out, single sign-on, national clouds |
| `Authorization I`     | access tokens, acquiring a token, working with scopes and resources, MS Graph API  |
| `Authorization II`     | protecting a web API, calling a web API |
| `Advanced Grants`     | on-behalf-of flow, device code flow, client credentials flow |
| `Access Control`     | roles, groups, conditional access, overage scenarios |
| `Deployment`     | multi-tenant (SaaS) applications, managed identity, key vaults, hosting |
| `Hybrid Identity`     | ADFS, on-prem authentication, migration scenarios, Azure AD Connect |

### Authentication

| Chapter              | Sample                            | Platform     | Library   |
|----------------------|-----------------------------------|--------------|------------|
| `Authentication`     | [Vanilla JavaScript SPA that signs-in users with Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-signin) | JavaScript   | MSAL.js 2.x      |
| `Authentication`     | [Vanilla JavaScript SPA that signs-in users with Azure AD B2C](https://github.com/Azure-Samples/ms-identity-b2c-javascript-signin) | JavaScript   | MSAL.js 2.x     |

| Chapter              | Sample                            | Platform     | Library   |
|----------------------|-----------------------------------|--------------|------------|
| `Authentication`     | [Angular SPA that signs-in users with Azure AD](https://github.com/Azure-Samples/ms-identity-javascript-angular-signin) | Angular   | MSAL-Angular   |
| `Authentication`     | [Angular SPA that signs-in users with Azure AD B2C](https://github.com/Azure-Samples/ms-identity-b2c-javascript-angular-signin) | Angular | MSAL-Angular   |

### Authorization I

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |

| Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization I`     | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

### Authorization II

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |

| Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Authorization II`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

### Advanced Grants

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Advanced Grants`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

### Access Control

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Access Control`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Access Control`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Access Control`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Access Control`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Access Control`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

### Deployment

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Deployment`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Deployment`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Deployment`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Deployment`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Deployment`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

### Hybrid Identity

<!-- | Chapter              | Sample                            | Platform     | Audience   |
|----------------------|-----------------------------------|--------------|------------|
| `Hybrid Identity`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Hybrid Identity`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Hybrid Identity`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Hybrid Identity`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      |
| `Hybrid Identity`   | [ms-identity-javascript-signin]() | JavaScript   | MyOrg      | -->

## More information

- [Microsoft identity platform (Azure Active Directory for developers)](https://docs.microsoft.com/azure/active-directory/develop/)
- [Overview of Microsoft Authentication Library (MSAL)](https://docs.microsoft.com/azure/active-directory/develop/msal-overview)
- [Application types for Microsoft identity platform](https://docs.microsoft.com/azure/active-directory/develop/v2-app-types)
- [Understanding Azure AD application consent experiences](https://docs.microsoft.com/azure/active-directory/develop/application-consent-experience)
- [Understand user and admin consent](https://docs.microsoft.com/azure/active-directory/develop/howto-convert-app-to-be-multi-tenant#understand-user-and-admin-consent)
- [Application and service principal objects in Azure Active Directory](https://docs.microsoft.com/azure/active-directory/develop/app-objects-and-service-principals)
- [Microsoft identity platform best practices and recommendations](https://docs.microsoft.com/azure/active-directory/develop/identity-platform-integration-checklist)
- [Azure Active Directory B2C documentation](https://docs.microsoft.com/azure/active-directory-b2c/)
- [MSAL code samples](https://docs.microsoft.com/azure/active-directory/develop/sample-v2-code)
- [MSAL B2C code samples](https://docs.microsoft.com/azure/active-directory-b2c/code-samples)

## Community Help and Support

Use [Stack Overgrant](http://stackovergrant.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`msal` `javascript` `angular` `azure-active-directory` `azure-ad-b2c`].

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
