const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const config = require('./config');

const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const options = {
    identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID,
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    loggingLevel: config.settings.loggingLevel,
};

const bearerStrategy = new BearerStrategy(options, (token, done) => {
        // send user info using the second argument
        done(null, {}, token);
    }
);

const app = express();

app.use(morgan('dev'));

app.use(passport.initialize());

passport.use(bearerStrategy);

// enable CORS (for testing only -remove in production/deployment)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API endpoint exposed
app.get("/api",
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);

        // service relies on the name claim.  
        res.status(200).json({
            'name': req.authInfo['name'],
            'issued-by': req.authInfo['iss'],
            'issued-for': req.authInfo['aud'],
            'scope': req.authInfo['scp']
        });
    }
);

const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log("Listening on port " + port);
});

module.exports = app;
