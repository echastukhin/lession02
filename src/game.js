let currentPlayerId = 1;
let winnerId = 0;

function setCurrentPlayerId(id){
    currentPlayerId = id;
}

function getCurrentPlayerId(){
    return currentPlayerId;
}

function getWinner(){
    return winnerId;
}

function setWinner(id){
    winnerId = id;
}

function isGameContinue() {
    let status = 'continue'
    if( getWinner() != 0 ){
        status = 'completed';
    }
    return status;
}

function changePlayer(){
    if( getCurrentPlayerId() == 1){
        setCurrentPlayerId(2);
    } else {
        setCurrentPlayerId(1);
    }
}

function updateWinners(field){
    //gorizontal
    for(let row=0; row<3; row++ ) {
        if( field[row][0] == field[row][1] && field[row][0] == field[row][2] ){
            winnerId = field[row][0];
        }
    }

    //vertical
    for(let column=0; column<3; column++ ) {
        if( field[0][column] == field[1][column] && field[0][column] == field[2][column] ){
            winnerId = field[0][column];
        }
    }

    if( field[0][0] == field[1][1] && field[0][0] == field[2][2] ){
        winnerId = field[0][0];
    }

    if( field[2][0] == field[1][1] && field[2][0] == field[0][2] ){
        winnerId = field[2][0];
    }
}

module.exports = {
    setCurrentPlayerId,
    getCurrentPlayerId,
    getWinner,
    setWinner,
    isGameContinue,
    changePlayer,
    updateWinners
}