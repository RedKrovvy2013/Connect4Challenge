var d3 = require('d3');

angular.module('app').directive('c4Board', function($timeout) {
    return {
        restrict: 'E',
        scope: {},
        template: '<svg class="c4-board"></svg>',
        link: function($scope, elem, attrs, ctrl) {


            var sampleData = [];
            for(var i=0; i<7; ++i) {
                for(var j=0; j<6; ++j) {
                    sampleData.push({x: i+.5, y: j+.5});
                }
            }

            var width = 700;
            var height = 600;

            var bgPathCoords = [{x:0, y:0}, {x:width, y:0}, {x:width, y:height}, {x:0, y:height}];

            var straight = d3.line()
                .x(function(d) {
                  return d.x;
                })
                .y(function(d) {
                  return d.y;
                });

            var board = d3.select('svg.c4-board')
                .attr('width', width)
                .attr('height', height);

            board.append("path")
                .attr("class", "c4-board__backing")
                .attr("d", straight(bgPathCoords))
                .attr("mask", "url(#boardMask)");

            var x = d3.scaleLinear()
                .domain([0, 7])
                .range([0, width]);

            var y = d3.scaleLinear()
                .domain([0, 6])
                .range([0, height]);

            var boardMask = board
                .append('svg:mask')
                .attr("id", "boardMask")

            boardMask
                .append("rect")
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', "100%")
                .attr('height', "100%")
                .style('fill','white')

            boardMask
                .selectAll("circle")
                .data(sampleData)
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
    };
});
