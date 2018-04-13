
function twoPlayerEntryFormController($scope, Game) {
    $scope.Game = Game;
    $scope.$watch("Game.isPreGame", () => {
        this.isShow = $scope.Game.isPreGame;
        // auto-inits since we're not doing newVal !== oldVal check,
        // plus makes it easier for future features where we may not want
        // to immediately show entry form
    });
    this.init = function(p1Name, p2Name) {
        Game.init(p1Name, p2Name);
    };
}

angular.module('app').directive('twoPlayerEntryForm', function() {
    return {
        restrict: 'E',
        scope: {},
        template: require('./twoPlayerEntryForm.html'),
        controller: twoPlayerEntryFormController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {
            $scope.onSubmit = function() {
                ctrl.init($scope.p1Name, $scope.p2Name);
                $scope.p1Name = '';
                $scope.p2Name = '';
            };
        }
    };
});
