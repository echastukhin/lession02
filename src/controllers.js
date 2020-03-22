const game = require('./game');

let field = [[0,0,0],[0,0,0],[0,0,0]];

function getField() {
    return field;
}

function makeMove(x, y) {
    field[x][y] = game.getCurrentPlayer();
    game.updateWinners(field);
}

function reset() {
    game.setCurrentWinner(0);
    field = [[0,0,0],[0,0,0],[0,0,0]];
}

function presetField(newField) {
    game.setCurrentWinner(0);
    field = newField;
}

function ifPlaceFree(x,y) {
    let status = 'occupied';
    if( field[x][y] == 0 ) {
        status = 'free';
    }
    return status;
}

module.exports = {
    getField,
    makeMove,
    reset,
    presetField,
    ifPlaceFree
}