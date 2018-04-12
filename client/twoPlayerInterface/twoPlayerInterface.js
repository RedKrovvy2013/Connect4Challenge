
function Connect4TwoPlayerInterfaceController(Connect4) {
    this.move = function(coord) {
        Connect4.move(coord);
    };
}

angular.module('app').directive('twoPlayerInterface', function($timeout) {
    return {
        restrict: 'E',
        scope: {},
        template: require('./twoPlayerInterface.html'),
        controller: Connect4TwoPlayerInterfaceController,
        controllerAs: '$ctrl',
        link: function($scope, elem, attrs, ctrl) {
            $scope.onMove = function() {
                ctrl.move($scope.coord);
            };

            // $timeout(function() {
            //     $scope.isDisabled = true;
            // }, 2000);

            

        }
    };
});
