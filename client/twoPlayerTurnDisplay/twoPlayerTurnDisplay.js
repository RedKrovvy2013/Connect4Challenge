
function Connect4TwoPlayerTurnDisplayController($scope, Game, Connect4) {
    $scope.Game = Game;
    $scope.$watch("Game.isPreGame", (newVal, oldVal) => {
        this.isShow = !Game.isPreGame;
        if(oldVal===true) {
            this.p1Name = Connect4.p1Name;
            this.p2Name = Connect4.p2Name;
        }
    });
    $scope.Connect4 = Connect4;
    $scope.$watch("Connect4.activePlayer", () => {
        switch(Connect4.activePlayer) {
            case 1:
                this.isP1_disabled = false;
                this.isP2_disabled = true;
                break;
            case 2:
                this.isP1_disabled = true;
                this.isP2_disabled = false;
                break;
        }
    });
}

angular.module('app').directive('twoPlayerTurnDisplay', function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./twoPlayerTurnDisplay.html'),
        controller: Connect4TwoPlayerTurnDisplayController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {

        }
    };
});
