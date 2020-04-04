const game = require('./game');

let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

function getField() {
    return field;
}

function reset() {
    game.setWinnerId(0);
    field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function presetField(newField) {
    game.setWinnerId(0);
    field = newField;
}

function isPlaceFree(row, column) {
    let status = false;
    if (field[row][column] == 0) {
        status = true;
    }
    return status;
}

function isFieldFull() {
    field.forEach((row) => {
        row.forEach((element) => {
            if (element == 0) {
                return false;
            }
        });
    });
    return true;
}

function updateWinners() {
    //  gorizontal
    for (let row = 0; row < 3; row++) {
        if (field[row][0] == field[row][1] && field[row][0] == field[row][2]) {
            game.setWinnerId(field[row][0]);
        }
    }

    //  vertical
    for (let column = 0; column < 3; column++) {
        if (field[0][column] == field[1][column] && field[0][column] == field[2][column]) {
            game.setWinnerId(field[0][column]);
        }
    }

    if (field[0][0] == field[1][1] && field[0][0] == field[2][2]) {
        game.setWinnerId(field[0][0]);
    }

    if (field[2][0] == field[1][1] && field[2][0] == field[0][2]) {
        game.setWinnerId(field[2][0]);
    }

    if (isFieldFull() == true && game.getWinnerId() == 0) {
        game.setWinnerId(-1);
    }
}

function makeMove(row, column) {
    field[row][column] = game.getCurrentPlayerId();
    updateWinners();
    game.changePlayer();
}

function isMoveAllowed(req) {
    let allow = false;
    if (isPlaceFree(req.body.y - 1, req.body.x - 1) == true
    && game.isGameContinue() == true) {
        allow = true;
    }
    return allow;
}

module.exports = {
    getField,
    makeMove,
    isMoveAllowed,
    reset,
    presetField,
    isPlaceFree,
    isFieldFull,
    updateWinners,
};
