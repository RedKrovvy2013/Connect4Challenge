var angular = require('angular');

var app = angular.module('app', []);

app.service('Game', function() {
    this.isPreGame = true;
    this.isPlaying = false;
    this.isPostGame = false;
    this.insertGame = (game) => {
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
    Game.insertGame(this);
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
        console.log("coord: " + coord);
        console.log("activePlayer: " + this.activePlayer);
        // move is legal:
        //   - update board and switch this.activePlayer, or
        this.activePlayer === 0 ? this.activePlayer = 1 :
                                  this.activePlayer = 0
        //   - move is a winning move, call Game.handleGameWinner(activePlayer)
        // move is not legal:
        //   - do nothing
    };
});

function Connect4TwoPlayerInterfaceController(Connect4) {
    this.move = function(coord) {
        Connect4.move(coord);
    };
}

app.directive('twoPlayerInterface', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: "twoPlayerInterface.html",
        controller: Connect4TwoPlayerInterfaceController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {
            $scope.onMove = function() {
                ctrl.move($scope.coord);
            };
        }
    };
});

function twoPlayerEntryFormController($scope, Game) {
    $scope.Game = Game;
    $scope.$watch("Game.isPreGame", () => {
        this.isShowForm = $scope.Game.isPreGame;
        // auto-inits since we're not doing newVal !== oldVal check,
        // plus makes it easier for future features where we may not want
        // to immediately show entry form
    });
    this.init = function(p1Name, p2Name) {
        Game.init(p1Name, p2Name);
    };
}

app.directive('twoPlayerEntryForm', function() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: "twoPlayerEntryForm.html",
        controller: twoPlayerEntryFormController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {
            $scope.onSubmit = function() {
                ctrl.init($scope.p1Name, $scope.p2Name);
            };
        }
    };
});
