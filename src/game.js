
const games = [];

function createNewGame(userID, sessionID) {
    const statusObj = {
        statusCode: 500,
        gameID: -1,
    };
    const gamesLength = games.length;
    games.push(
        {
            gameID: gamesLength,
            ownerID: userID,
            ownerSessionID: sessionID,
            secondPlayerId: '',
            secondPlayerSessionID: '',
            currentPlayerId: this.ownerID,
            winnerID: 0,
            field: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            status: 'active',
        },
    );
    const gamesNewLength = games.length;

    if (gamesNewLength === gamesLength + 1) {
        statusObj.statusCode = 200;
        statusObj.gameID = games[games.length - 1].gameID;
    }
    return statusObj;
}

function getField(sessionID) {
    const statusObj = {
        statusCode: 404,
        field: undefined,
    };
    const game = games.find((element) => {
        return element.ownerSessionID === sessionID || element.secondPlayerSessionID === sessionID;
    });
    if (game) {
        statusObj.statusCode = 200;
        statusObj.field = game.field;
    }
    return statusObj;
}

function showGames(userID) {
    const statusObj = {
        statusCode: 404,
        userGames: [],
    };
    for (const game in games) {
        if (games.hasOwnProperty(ownerSessionID)) {
            statusObj.userGames.push(game);
        }
    }

    return statusObj;
}

function setCurrentPlayerId(id) {
    currentPlayerId = id;
}

function getCurrentPlayerId() {
    return currentPlayerId;
}

function getWinnerId() {
    return winnerId;
}

function setWinnerId(id) {
    winnerId = id;
}

function changePlayer() {
    if (getCurrentPlayerId() == 1) {
        setCurrentPlayerId(2);
    } else {
        setCurrentPlayerId(1);
    }
}

function isGameContinue() {
    let status = true;
    if (getWinnerId() > 0) {
        status = false;
    }
    return status;
}

function reset() {
    setWinnerId(0);
    field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function presetField(newField) {
    setWinnerId(0);
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
            setWinnerId(field[row][0]);
        }
    }

    //  vertical
    for (let column = 0; column < 3; column++) {
        if (field[0][column] == field[1][column] && field[0][column] == field[2][column]) {
            setWinnerId(field[0][column]);
        }
    }

    if (field[0][0] == field[1][1] && field[0][0] == field[2][2]) {
        setWinnerId(field[0][0]);
    }

    if (field[2][0] == field[1][1] && field[2][0] == field[0][2]) {
        setWinnerId(field[2][0]);
    }

    if (isFieldFull() == true && getWinnerId() == 0) {
        setWinnerId(-1);
    }
}

function makeMove(row, column) {
    field[row][column] = getCurrentPlayerId();
    updateWinners();
    changePlayer();
}

function isMoveAllowed(req) {
    let allow = false;
    if (isPlaceFree(req.body.y - 1, req.body.x - 1) == true
    && isGameContinue() == true) {
        allow = true;
    }
    return allow;
}

function isDrawnGame() {
    let answer = false;
    if (winnerId == -1) {
        answer = true;
    }
    return answer;
}

module.exports = {
    setCurrentPlayerId,
    getCurrentPlayerId,
    getWinnerId,
    setWinnerId,
    isGameContinue,
    changePlayer,
    isDrawnGame,
    getField,
    makeMove,
    isMoveAllowed,
    reset,
    presetField,
    isPlaceFree,
    isFieldFull,
    updateWinners,
    createNewGame,
};
