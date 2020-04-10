const router = require('express').Router();
const game = require('./game');
const users = require('./lib/users');

router.get('/getField', users.restrictedMiddleware, (req, res) => {
    const sessionID = req.headers.authorization;
    const statusObj = game.getField(sessionID);
    res.status(statusObj.statusCode).send(statusObj.field);
});

router.post('/move', users.restrictedMiddleware, (req, res) => {
    if (game.isMoveAllowed(req) == true) {
        game.makeMove(req.body.y - 1, req.body.x - 1);
        res.status(200).send('ok');
    } else {
        res.status(400).send('not ok');
    }
});

router.post('/login', (req, res) => {
    const statusObj = users.checkLogin(req.body.login, req.body.password);
    res.status(statusObj.statusCode).send(statusObj.sessionID);
});

router.post('/register', (req, res) => {
    const statusObj = users.register(req.body.login, req.body.password);
    res.status(statusObj.statusCode).send(statusObj.text);
});

router.post('/createNewGame', (req, res) => {
    const userData = users.getUserData(req.headers.authorization);
    const statusObj = game.createNewGame(userData.id, req.headers.authorization);
    res.status(statusObj.statusCode).send(statusObj.gameID.toString);
});

router.post('/showGames', (req, res) => {
    const userData = users.getUserData(req.headers.authorization);
    const statusObj = game.showGames(userData.id);
    res.status(statusObj.statusCode).send(statusObj.userGames);
});


module.exports = router;
