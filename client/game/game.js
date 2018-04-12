
angular.module('app').service('Game', function() {
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
    this.handleWinGame = (winnerName) => {
        console.log(`${winnerName} wins!`);
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
