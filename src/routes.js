const router = require('express').Router();
const controller = require('./controllers');
const users = require('./lib/users');

router.get('/getField', (req, res) => {
    res.status(200).send(controller.getField());
});

router.post('/move', (req, res) => {
    if (controller.isMoveAllowed(req) == true) {
        controller.makeMove(req.body.y - 1, req.body.x - 1);
        res.status(200).send('ok');
    } else {
        res.status(400).send('not ok');
    }
});

router.post('/login', (req, res) => {
    const userId = users.checkLogin(req.body.login, req.body.password);
    res.status(200).send(userId);
});


module.exports = router;
