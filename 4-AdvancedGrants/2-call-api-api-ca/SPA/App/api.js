function callApi(endpoint, token) {

    const headers = new Headers();
    const bearer = `Bearer ${token}`;

    headers.append("Authorization", bearer);
  
    const options = {
        method: "GET",
        headers: headers
      };
  
    logMessage('Calling Web API...');
    
    fetch(endpoint, options)
      .then(response => response.json())
      .then(response => {

        console.log(response);

        // check for any errors
        if (response['error_codes']) {

          /**
           * Conditional access MFA requirement generates AADSTS50076 error.
           * If this occurs, sample middle-tier API will propagate this to client
           * For more, visit: https://docs.microsoft.com/azure/active-directory/develop/v2-conditional-access-dev-guide
           */
          if (response['error_codes'].includes(50076) || response['error_codes'].includes(50079)) {

            // attach the stringified JSON claims challenge to token request 
            tokenRequest.claims = response['claims'];

            // calls the MSAL.js acquireToken* API
            passTokenToApi();
          }
        } else {
          // if no errors, display user name
          logMessage('Web API responded: Hello ' + response['name'] + '!');
        }
        
        return response;
      }).catch(error => {
        console.error(error);
      });
  }