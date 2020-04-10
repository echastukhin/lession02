const uuid = require('uuid');

const users = [];
const sessions = {};

function getUserData(sessionID) {
    return sessions[sessionID];
}

function authMiddleware(req, res, next) {
    const userData = getUserData(req.headers.authorization);
    req.userCredentials = userData;
    next();
}

function restrictedMiddleware(req, res, next) {
    if (!req.userCredentials) {
        res.status(401).send();
    } else {
        next();
    }
}

function checkLogin(login, password) {
    const statusObj = {
        statusCode: 401,
        sessionID: undefined,
    };
    const user = users.find((element) => {
        return element.login === login && element.password === password;
    });
    if (user) {
        const sessionID = uuid.v4();
        sessions[sessionID] = {
            id: user.id,
        };
        statusObj.statusCode = 200;
        statusObj.sessionID = sessionID;
    }
    return statusObj;
}

function register(login, password) {
    const statusObj = {
        statusCode: 500,
        text: 'already registered',
    };
    const user = users.find((element) => {
        return element.login === login && element.password === password;
    });

    if (!user) {
        users.push(
            {
                id: users.length,
                login,
                password,
            },
        );
        statusObj.statusCode = 200;
        statusObj.text = 'registered';
    }
    return statusObj;
}

module.exports = {
    authMiddleware,
    restrictedMiddleware,
    register,
    checkLogin,
    getUserData,
};
