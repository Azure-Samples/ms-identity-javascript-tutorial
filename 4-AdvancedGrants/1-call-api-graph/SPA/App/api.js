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

			if (response['error_codes']) {
				/**
				 * If the user has not consented to required scopes, 
				 * an AADSTS65001 error will be thrown.
				 */
				if (response['error_codes'].includes(65001)) {

					// calls the MSAL.js acquireToken* API
					passTokenToApi();
				}
			} else {
				// if no errors, display user name
				logMessage('Web API responded: Hello ' + response['displayName'] + '!');
			}

			return response;
		}).catch(error => {
			console.error(error);
		});
}