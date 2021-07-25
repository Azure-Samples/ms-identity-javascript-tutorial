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

            if (response) {
                logMessage('Web API responded: Hello ' + response['name'] + '!');
            }

            return response;
        }).catch(error => {
            console.error(error);
        });
}