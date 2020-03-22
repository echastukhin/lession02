let currentPlayer = 1;
let currentWinner = 0;

function setCurrentPlayer(id){
    currentPlayer = id;
}

function getCurrentPlayer(){
    return currentPlayer;
}

function getCurrentWinner(){
    return currentWinner;
}

function setCurrentWinner(id){
    currentWinner = id;
}

function isGameContinue() {
    let status = 'continue'
    if( getCurrentWinner() != 0 ){
        status = 'completed';
    }
    return status;
}

function updateWinners(field){
    //gorizontal
    for(let i=0; i<3; i++ ) {
        if( field[i][0] == field[i][1] && field[i][0] == field[i][2] ){
            currentWinner = field[i][0];
        }
    }

    //vertical
    for(let j=0; j<3; j++ ) {
        if( field[0][j] == field[1][j] && field[0][j] == field[2][j] ){
            currentWinner = field[0][j];
        }
    }

    if( field[0][0] == field[1][1] && field[0][0] == field[2][2] ){
        currentWinner = field[0][0];
    }

    if( field[2][0] == field[1][1] && field[2][0] == field[0][2] ){
        currentWinner = field[2][0];
    }
}

module.exports = {
    setCurrentPlayer,
    getCurrentPlayer,
    getCurrentWinner,
    setCurrentWinner,
    isGameContinue,
    updateWinners
}