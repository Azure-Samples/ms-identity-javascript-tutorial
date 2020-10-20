| In this Tutorial | Previous Tutorial | Next Tutorial |
|------------------|-------------------|---------------|
| deployment, storage accounts, app services | [Protect and call a web API](https://github.com/Azure-Samples/ms-identity-javascript-tutorial/tree/master/3-Authorization-II/3-1-call-api) | |

# Deploy your JavaScript Applications to Azure Cloud and use Azure Services to manage your Operations

 1. [Overview](#overview)
 1. [Scenario](#scenario)
 1. [Prerequisites](#prerequisites)
 1. [Setup](#setup)
 1. [Registration](#registration)
 1. [Deployment](#deployment)
 1. [Running the sample](#running-the-sample)
 1. [Explore the sample](#explore-the-sample)
 1. [More information](#more-information)
 1. [Community Help and Support](#community-help-and-support)
 1. [Contributing](#contributing)
 1. [Code of Conduct](#code-of-conduct)

## Overview

This sample demonstrates how to deploy a JavaScript single-page application (SPA) coupled with a Node.js web API to **Azure Cloud** using [Azure Storage](https://docs.microsoft.com/azure/storage/blobs/) and [Azure App Services](https://docs.microsoft.com/azure/app-service/), respectively. In doing so, it also illustrates various deployment concepts, such as [continuous deployment](https://docs.microsoft.com/azure/app-service/deploy-continuous-deployment), [credentials rotation](https://docs.microsoft.com/azure/key-vault/general/authentication), [CORS configuration](https://docs.microsoft.com/azure/app-service/app-service-web-tutorial-rest-api#enable-cors) and etc.

## Scenario

1. The client application uses the **MSAL.js** library to sign-in a user and obtain a JWT **Access Token** from **Azure AD**.
1. The **Access Token** is used as a **bearer** token to *authorize* the user to call the protected Web API.
1. The protected web API responds with the claims in the **Access Token**.

![Overview](./ReadmeFiles/topology_dep.png)

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) must be installed to run this sample.
- A modern web browser. This sample uses **ES6** conventions and will not run on **Internet Explorer**.
- [Visual Studio Code](https://code.visualstudio.com/download) is recommended for running and editing this sample.
- [VS Code Azure Tools Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack) extension is recommended for interacting with **Azure** through VS Code interface.
- An **Azure AD** tenant. For more information, see: [How to get an Azure AD tenant](https://azure.microsoft.com/documentation/articles/active-directory-howto-tenant/)
- A user account in your **Azure AD** tenant.
- An **Azure subscription**. This sample uses **Azure Storage**, **Azure App Services**, **Azure Managed Identity** and **Azure Key Vault**.

## Setup

- Setup the service app:

```console
    cd ms-identity-javascript-tutorial
    cd 3-Authorization-II-3-1-call-api
    cd API
    npm install
```

- Setup the client app:

```console
    cd..
    cd SPA
    npm install
```

## Registration

### Register the service app (Node.js web API)

Use the same app registration credentials that you've obtained during [**chapter 3-1**](../3-Authorization-II/3-1-call-api).

### Register the client app (JavaScript SPA)

Use the same app registration credentials that you've obtained during [**chapter 3-1**](../3-Authorization-II/3-1-call-api).

## Deployment

There are basically **3** stages that you will have to go through in order to deploy your projects and enable authentication:

1. Upload your project files to **Azure** services and obtain published website URIs
1. Update **Azure AD** **App Registration** with URIs you have just obtained
1. Update your configuration files with URIs you have just obtained and re-upload them

### Deploy the service app (Node.js web API)

There are various ways to deploy your applications to **Azure App Service**. Here we provide steps for deployment via **VS Code Azure Tools Extension**.

To use this option, simply [watch the video tutorial](https://docs.microsoft.com/en-us/azure/developer/javascript/tutorial-vscode-azure-app-service-node-01) offered by Microsoft Docs. We summarize the steps below:

1. Initialize a local Git. If you don't have a folder initialized for Git already, type:

```console
    git init
```

Once the initialization is done, commit all your files to your local Git. On Visual Studio Code, you can use the **Source Control** panel on the left bar for this.

2. Deploy your app. Click on the **Azure** icon on the left bar in VS Code. Hover your mouse cursor to **App Service** section and you will see an upward-facing arrow icon. Click on it publish your local files in the `API` folder to **Azure App Services**.

![api_step1](./ReadmeFiles/api_step1.png)
![api_step2](./ReadmeFiles/api_step2.png)

Click **Add Config** if a popup dialog displays regarding configuration to deploy. Choose **Create new Web App** and give it a name, or choose an existing one from the options under **Select Web App**.

![api_step3](./ReadmeFiles/api_step3.png)

3. Configure your app. On the **App Service** portal, click on the **Configuration** blade and set the **stack** property to **Node 12 LTS**.

4. Disable Azure AD authentication

Still on the **App Services** portal, click on the **Authentication/Authorization** blade. There, make sure that the **App Services Authentication** is switched off (and nothing else is checked), as we are using our own authentication logic.  

![disable_easy_auth](./ReadmeFiles/disable_easy_auth.png)

5. Enable cross-origin resource sharing (CORS)

![enable_cors](./ReadmeFiles/enable_cors.png)

#### Update service app's authentication parameters

1. Navigate back to to the [Azure portal](https://portal.azure.com).
1. In the left-hand navigation pane, select the **Azure Active Directory** service, and then select **App registrations**.
1. In the resulting screen, select the `ms-identity-javascript-nodejs-webapi` application.
1. From the *Branding* menu, update the **Home page URL**, to the address of your service, for example [https://node-webapi-1.azurewebsites.com](https://node-webapi-1.azurewebsites.com). Save the configuration.
1. Add the same URI in the list of values of the *Authentication -> Redirect URIs* menu. If you have multiple redirect URIs, make sure that there a new entry using the App service's URI for each redirect URI.

### Deploy the client app (JavaScript SPA)

There are various ways to deploy your applications to **Azure Storage**. Here we provide steps for deployment via **VS Code Azure Tools Extension**. For more alternatives, visit: [Static website hosting in Azure Storage](https://docs.microsoft.com/azure/storage/blobs/storage-blob-static-website#uploading-content).

To use this option, simply [watch the video tutorial](https://docs.microsoft.com/azure/developer/javascript/tutorial-vscode-static-website-node-01) offered by Microsoft Docs. We summarize the steps below:

Create a distributable files folder, where your `html`, `css` and `javascript` files will be located (in the sample, the `SPA/App/` folder is already usable for this). Then follow the steps below:

1. Right click on the `SPA/App/` folder inside. This will open a context menu where you will see the option **Deploy to static website via Azure Storage**. Click on it.

![spa_step1](./ReadmeFiles/spa_step1.png)

2. Follow the dialog window that opens on the top. Select your subscription, then give a name to your storage account.

![spa_step2](./ReadmeFiles/spa_step2.png)

3. Once your storage account is created and your files are uploaded, you will see a notification on the bottom-right corner of VS Code interface. When it's done, you will be notified with the published URI of your static website (e.g. `https://javascriptspa1.z22.web.core.windows.net/`).

![spa_step3](./ReadmeFiles/spa_step3.png)

#### Update the client app's authentication parameters

1. Navigate back to to the [Azure portal](https://portal.azure.com).
1. In the left-hand navigation pane, select the **Azure Active Directory** service, and then select **App registrations**.
1. In the resulting screen, select the `ms-identity-javascript-callapi` application.
1. From the *Branding* menu, update the **Home page URL**, to the address of your service, for example [https://javascriptspa1.z22.web.core.windows.net/](https://javascriptspa1.z22.web.core.windows.net/). Save the configuration.
1. Add the same URI in the list of values of the *Authentication -> Redirect URIs* menu. If you have multiple redirect URIs, make sure that there a new entry using the App service's URI for each redirect URI.

Now you need to update your authentication parameters configuration files. To do so, go to your azure storage account using the VS Code Azure Tools extension as shown below:

![spa_step4](./ReadmeFiles/spa_step3.png)

Open `authConfig.js`. Then:
Open `apiConfig.js`. Then:

## Running the sample

- Run the service app:

```console
    cd ms-identity-javascript-tutorial
    cd 3-Authorization-II-3-1-call-api
    cd API
    npm start
```

- Run the client app:

```console
    cd..
    cd SPA
    npm start
```

## Explore the sample

1. Open your browser and navigate to your deployed client app's URI, for instance: `https://javascriptspa1.z22.web.core.windows.net/`.
1. Click the **sign-in** button on the top right corner.
1. Once you authenticate, click the **Call API** button at the center.

![Screenshot](./ReadmeFiles/screenshot.png)

## We'd love your feedback!

Were we successful in addressing your learning objective? [Do consider taking a moment to share your experience with us.](https://forms.office.com/Pages/ResponsePage.aspx?id=v4j5cvGGr0GRqy180BHbR73pcsbpbxNJuZCMKN0lURpUNDVHTkg2VVhWMTNYUTZEM05YS1hSN01EOSQlQCN0PWcu).

## More information

- [Azure Blob Storage](https://docs.microsoft.com/azure/storage/blobs/)
- [Azure App Services](https://docs.microsoft.com/azure/app-service/)
- [Azure Managed Identity](https://docs.microsoft.com/azure/active-directory/managed-identities-azure-resources/)
- [Azure Key Vault](https://docs.microsoft.com/azure/key-vault/general/)

For more information about how OAuth 2.0 protocols work in this scenario and other scenarios, see [Authentication Scenarios for Azure AD](https://docs.microsoft.com/azure/active-directory/develop/authentication-flows-app-scenarios).

## Community Help and Support

Use [Stack Overflow](http://stackoverflow.com/questions/tagged/msal) to get support from the community.
Ask your questions on Stack Overflow first and browse existing issues to see if someone has asked your question before.
Make sure that your questions or comments are tagged with [`azure-ad` `azure-ad-b2c` `ms-identity` `adal` `msal`].

If you find a bug in the sample, please raise the issue on [GitHub Issues](../../issues).

To provide a recommendation, visit the following [User Voice page](https://feedback.azure.com/forums/169401-azure-active-directory).

## Contributing

If you'd like to contribute to this sample, see [CONTRIBUTING.MD](../../CONTRIBUTING.md).

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information, see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
