var d3 = require('d3');

angular.module('app').directive('c4Board', function($timeout) {
    return {
        restrict: 'E',
        scope: {},
        template: require('./c4Board.html'),
        link: function($scope, elem, attrs, ctrl) {

            var width = 700;
            var height = 600;

            var x = d3.scaleLinear()
                .domain([0, 7])
                .range([0, width]);

            var y = d3.scaleLinear()
                .domain([0, 6])
                .range([0, height]);

            var board = d3.select('svg.c4-board')
                .attr('width', width)
                .attr('height', height);

            doBoardHoles();
            function doBoardHoles() {
                
                var boardHoles = [];
                for(var i=0; i<7; ++i) {
                    for(var j=0; j<6; ++j) {
                        boardHoles.push({x: i+.5, y: j+.5});
                    }
                }

                var backingPathCoords = [{x:0, y:0}, {x:width, y:0}, {x:width, y:height}, {x:0, y:height}];

                var doLine = d3.line()
                    .x(function(d) {
                      return d.x;
                    })
                    .y(function(d) {
                      return d.y;
                    });

                board.append("path")
                    .attr("class", "c4-board__backing")
                    .attr("d", doLine(backingPathCoords))
                    .attr("mask", "url(#c4-board__mask)");
                    // NOTE: mask url must be id

                board.select("#c4-board__mask")
                    .selectAll("circle")
                    .data(boardHoles)
                    .enter()
                    .append("circle")
                    .attr("cx", function(d) {
                        return x(d.x);
                    })
                    .attr("cy", function(d) {
                        return y(d.y);
                    })
                    .attr("r", 30);
            }

        }
    };
});
