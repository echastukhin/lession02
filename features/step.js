
const { Given, When, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');

const app = require('../src/server');
const game = require('../src/game');
const controller = require('../src/controllers');

Given('пустое поле', () => {
    controller.reset();
});

Given('поле {string}', (string) => {
    const stringField = string.replace(/\|/g, ''); //  000|000|000 -> 000000000
    const newField = [[], [], []];
    const stringFieldLength = stringField.length;

    // 000|000|000 -> [[0,0,0],[0,0,0],[0,0,0]]
    for (let i = 0; i < stringFieldLength; i++) {
        newField[Math.floor(i / 3)][i % 3] = Number(stringField[i]);
    }
    controller.presetField(newField);
});

When('ходит игрок {int}', (id) => {
    game.setCurrentPlayerId(id);
});

let lastResult = {};

When('игрок ходит в клетку {int}, {int}', (y, x) => {
    return request(app)
        .post('/move')
        .send({ y, x })
        .then((res) => {
            lastResult = res;
        });
});

Then('поле становится {string}', (string) => {
    return request(app)
        .get('/getField')
        .expect(200)
        .then((res) => {
            assert.equal(res.body.toString().replace(/,/g, ''), string.replace(/\|/g, ''));
        });
});

Then('возвращается ошибка', () => {
    assert.equal(lastResult.text, 'not ok');
});

Then('победил игрок {int}', (playerId) => {
    assert.equal(playerId, game.getWinner());
});

Then('ничья', () => {
    assert.equal(game.isDrawnGame(), true);
});
