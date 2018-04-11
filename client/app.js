var angular = require('angular');

var app = angular.module('app', []);

app.service('Game', function() {
    this.isPreGame = true;
    this.isPlaying = false;
    this.isPostGame = false;
    this.addGame = (game) => {
        this.game = game;
    };
    this.init = (p1Name, p2Name) => {
        this.game.init(p1Name, p2Name);
        this.isPlaying = true;
        this.isPreGame = false;
    };
    this.handleGameWinner = (winnerName) => {
        this.isPlaying = false;
        this.isPostGame = true;
    };
    this.resetGame = () => {
        this.isPlaying = false;
        this.isPostGame = false;
        // player can reset during or after game, so set both above to false
        this.game.resetBoard();
        this.isPreGame = true;
    };
});

app.service('Connect4', function(Game) {
    Game.addGame(this);
    this.p1Name = '';
    this.p2Name = '';
    this.board = []; // ..becomes multidimensional array
    this.activePlayer = 0;
    this.init = (p1Name, p2Name) => {
        this.p1Name = p1Name;
        this.p2Name = p2Name;
        this.resetBoard();
        this.activePlayer = 0;
    };
    this.resetBoard = () => {
        // TODO
    };
    this.move = (coord) => {
        // move is legal:
        //   - update board and switch this.activePlayer, or
        //   - move is a winning move, call Game.handleGameWinner(activePlayer)
        // move is not legal:
        //   - do nothing
    }
});
