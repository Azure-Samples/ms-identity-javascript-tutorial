// Add here the endpoints for MS Graph API services you would like to use.
const graphConfig = {
    graphMeEndpoint: {
        uri: "https://graph.microsoft.com/v1.0/me",
        scopes: ["User.Read"]
    },
    graphMailEndpoint: {
        uri: "https://graph.microsoft.com/v1.0/me/messages",
        scopes: ["Mail.Read"]
    }
};
