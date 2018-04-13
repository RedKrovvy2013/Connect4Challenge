
function winnerDisplayController($scope, Game) {
    $scope.Game = Game;
    $scope.$watch("Game.isPostGame", (newVal, oldVal) => {
        this.isShow = Game.isPostGame;
        this.winnerName = Game.winnerName;
    });
    this.reset = function() {
        Game.resetGame();
    }
}

angular.module('app').directive('winnerDisplay', function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./winnerDisplay.html'),
        controller: winnerDisplayController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {

        }
    };
});
