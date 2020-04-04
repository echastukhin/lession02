let currentPlayerId = 1;
let winnerId = 0;

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

function isGameContinue() {
    let status = true;
    if (getWinnerId() > 0) {
        status = false;
    }
    return status;
}

function changePlayer() {
    if (getCurrentPlayerId() == 1) {
        setCurrentPlayerId(2);
    } else {
        setCurrentPlayerId(1);
    }
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
};
