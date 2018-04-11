
angular.module('app').service('Connect4', function(Game) {
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
