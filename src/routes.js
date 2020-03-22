const router = require('express').Router();
const controller = require('./controllers');
const game = require('./game');

router.get('/getField', (req, res) => {
    res.status(200).send(controller.getField());
  });
  
router.post('/move', (req, res) => {
    if (controller.ifPlaceFree(req.body.x-1, req.body.y-1) == 'free' && game.isGameContinue() == 'continue' ) {
        controller.makeMove(req.body.x-1, req.body.y-1);
        res.status(200).send('ok');
    } else {
        res.status(400).send('not ok');
    }
});

module.exports = router;