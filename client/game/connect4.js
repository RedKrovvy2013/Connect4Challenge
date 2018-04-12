
angular.module('app').service('Connect4', function(Game) {
    Game.insertGame(this);
    this.p1Name = '';
    this.p2Name = '';
    this.board = []; // ..becomes multidimensional array
    this.activePlayer = 1;
    this.init = (p1Name, p2Name) => {
        this.p1Name = p1Name;
        this.p2Name = p2Name;
        this.resetBoard();
        this.activePlayer = 1;
    };
    this.resetBoard = () => {
        this.board = [];
        for(var i=0; i < 7; ++i) {
            this.board.push([]);
            for(var j=0; j < 6; ++j) {
                this.board[i].push(0); // 0 -> empty board cell
            }
        }
    };
    this.move = (coord) => {
        // console.log("coord: " + coord);
        // console.log("activePlayer: " + this.activePlayer);
        if(this.moveHelper(coord) === true) {
            // move is legal:
            //   - update board (done by moveHelper)
            if(this.checkForWin()) {
                var winnerName = this.activePlayer === 1 ? this.p1Name : this.p2Name;
                Game.handleWinGame(winnerName);
            } else {
                this.activePlayer === 1 ? this.activePlayer = 2 :
                                          this.activePlayer = 1;
            }
        } else {
            // move is not legal:
            //   - do nothing
        }
        // console.log(this.board);
        return this.board;
    };
    this.moveHelper = (coord) => {
        var boardCol = this.board[coord];
        for(var i=0; i<6; ++i) {
            if(boardCol[i] === 0) {
                boardCol[i] = this.activePlayer;
                return true;
            }
        }
        // the boardCol is already full, so report that move did not occur
        return false;
    };
    this.checkForWin = () => {
        //NOTE: don't need to return who won, as winner is always the active player
        for(var x=0; x<7; ++x) {
            for(var y=0; y<6; ++y) {
                // check for diagonal win:
                if( this.checkForWinHelper({x, y}, (coord)=>{++coord.x,++coord.y}) )
                    return true;
                // check for horizontal win:
                if( this.checkForWinHelper({x, y}, (coord)=>{++coord.x}) )
                    return true;
                // check for vertical win:
                if( this.checkForWinHelper({x, y}, (coord)=>{++coord.y}) )
                    return true;
            }
        }
        return false;
    };
    // NOTE: low input size: just use brute force for less/simpler code
    this.checkForWinHelper = (coord, coordMoveFx) => {
        var tallyMap = [];
        tallyMap[0] = 0; // empty cells tally'd too, declaring for clarity
        tallyMap[1] = 0;
        tallyMap[2] = 0;
        for(var i=0; i<4; ++i) {
            var cellValue = this.board[coord.x][coord.y];
            ++tallyMap[cellValue];

            coordMoveFx(coord);
            // could be up+right | up | right
            if(coord.x > 6) break;
            if(coord.y > 5) break;
        }
        if(tallyMap[1] === 4 || tallyMap[2] === 4)
            return true;
        else
            return false;
    };
});
