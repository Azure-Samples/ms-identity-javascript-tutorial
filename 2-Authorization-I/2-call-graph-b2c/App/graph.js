const clientOptions = {
	authProvider: new MyAuthenticationProvider(),
};

const client = MicrosoftGraph.Client.initWithMiddleware(clientOptions);

async function getUsers() {
    try {
        console.log('Graph API called at: ' + new Date().toString());
        return await client.api('/users').get();
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deleteUser(id) {
    try {
        console.log('Graph API called at: ' + new Date().toString());
        return await client.api(`/users/${id}`).delete();
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function createUser(user) {
    try {
        console.log('Graph API called at: ' + new Date().toString());
        return await client.api('/users').post(user);
    } catch (error) {
        console.log(error);
        return error;
    }
}