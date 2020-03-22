
const {Given, When, Then} = require('cucumber');
const request = require('supertest');
const assert = require('assert');

const app = require('../src/server')
const game = require('../src/game')
const controller = require('../src/controllers')

Given('пустое поле',() => {
    controller.reset();
});

Given('поле {string}', (string) => {
    // 000|000|000 -> [[0,0,0],[0,0,0],[0,0,0]]
    string = string.replace(/\|/g,"");
    let newField = [[],[],[]];
    for( let i in string ){
        newField[Math.floor(i/3)][i%3] = string[i];
    }
    controller.presetField(newField);
});

When('ходит игрок {int}',(id) => {
    game.setCurrentPlayerId(id);
});

let lastResult = {};

When('игрок ходит в клетку {int}, {int}', (y, x) => {
    return request(app)
            .post('/move')
            .send({y,x})
            .then((res) => {
                lastResult = res;
            });
});

Then('поле становится {string}', (string) => {
    let fieldsString = controller.getField().toString().replace(/,/g,""); 
    assert.equal(fieldsString, string.replace(/\|/g,""));
    
});

Then('возвращается ошибка', () => {
    assert.equal(lastResult.text, 'not ok');
});

Then('победил игрок {int}', (playerId) => {
    assert.equal(playerId, game.getWinner());
});