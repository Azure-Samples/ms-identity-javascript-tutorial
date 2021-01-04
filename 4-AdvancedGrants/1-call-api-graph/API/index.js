const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const fetch = require('node-fetch');
const config = require('./config.json');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const options = {
    identityMetadata: `https://${config.authority}/${config.tenantID}/${config.version}/${config.discovery}`,
    issuer: `https://${config.authority}/${config.tenantID}/${config.version}`,
    clientID: config.clientID,
    validateIssuer: config.validateIssuer,
    audience: config.audience,
    loggingLevel: config.loggingLevel,
    passReqToCallback: config.passReqToCallback,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
    done(null, {}, token);
});

const app = express();

app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(bearerStrategy);

// Enable CORS (for local testing only -remove in production/deployment)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// This is where your API methods are exposed
app.get('/api', passport.authenticate('oauth-bearer', { session: false }),
    async (req, res) => {
        console.log('Validated claims: ', JSON.stringify(req.authInfo));

        // the access token the user sent
        const userToken = req.get('authorization');

        // request new token and use it to call resource API on user's behalf
        let tokenObj = await getNewAccessToken(userToken);

        // access the resource with token
        let apiResponse = await callResourceAPI(tokenObj['access_token'], config.resourceUri)

        res.status(200).json(apiResponse);
    }
);

async function getNewAccessToken(userToken) {

    const [bearer, tokenValue] = userToken.split(' ');
    const tokenEndpoint = `https://${config.authority}/${config.tenantName}/oauth2/${config.version}/token`;

    let myHeaders = new fetch.Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
    urlencoded.append('client_id', config.clientID);
    urlencoded.append('client_secret', config.clientSecret);
    urlencoded.append('assertion', tokenValue);
    urlencoded.append('scope', ...config.resourceScope);
    urlencoded.append('requested_token_use', 'on_behalf_of');

    let options = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    let response = await fetch(tokenEndpoint, options);
    let json = response.json();
    return json;
}

async function callResourceAPI(newTokenValue, resourceURI) {
    
    let options = {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${newTokenValue}`,
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
    };
    
    let response = await fetch(resourceURI, options);
	let json = await response.json();
    return json;
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});
