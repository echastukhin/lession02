const uuid = require('uuid');

const users = [
    {
        id: 1,
        login: 'max',
        password: 'qwerty',
    },
    {
        id: 2,
        login: 'ivan',
        password: 'ytrewq',
    },
];

const sessions = {};

function checkSession(sessionID) {
    return sessions[sessionID];
}

function authMiddleware(req, res, next) {
    const userData = checkSession(req.headers.authorization);
    req.userCredentials = userData;
    next();
}

function checkLogin(login, password) {
    const user = users.find((element) => element.login === login && element.password === password);

    if (user) {
        const sessionID = uuid.v4();
        sessions[sessionID] = {
            id: user.id,
        };
        return sessionID;
    }
    return -1;
}

module.exports = {
    checkLogin,
    checkSession,
    authMiddleware,
};
