var d3 = require('d3');

function c4BoardController($scope, Connect4, Game) {
    this.nextTurnDelay = 650;
    this.move = function(coord) {
        var newBoard = Connect4.move(coord, this.nextTurnDelay);
        $scope.update(newBoard);
        // NOTE: could observe board changing, but this seems better
    };
    $scope.Game = Game;
    $scope.$watch("Game.isPreGame", () => {
        this.isShow = !Game.isPreGame;
        if(Game.isPreGame)
            $scope.resetCoinGroups();
    });
    // Game.init("Jen", "Mike");
}

angular.module('app').directive('c4Board', function($timeout) {
    return {
        restrict: 'E',
        scope: {},
        template: require('./c4Board.html'),
        controller: c4BoardController,
        controllerAs: "$ctrl",
        link: function($scope, elem, attrs, ctrl) {

            var width = 700;
            var colWidth = width / 7;
            var height = 600;
            var topMargin = 100;
            var totalHeight = height + topMargin;

            var xScale = d3.scaleLinear()
                .domain([0, 7])
                .range([0, width]);

            var yScale = d3.scaleLinear()
                .domain([0, 6])
                .range([height, 0]);

            var board = d3.select('svg.c4-board')
                .attr('width', width)
                .attr('height', totalHeight);

            doBoardHoles();
            function doBoardHoles() {

                var boardHoles = [];
                for(var i=0; i<7; ++i) {
                    for(var j=0; j<6; ++j) {
                        boardHoles.push({x: i+.5, y: j+.5});
                    }
                }

                var doLine = d3.line()
                    .x(function(d) {
                      return d.x;
                    })
                    .y(function(d) {
                      return d.y;
                    });

                var boardBackingG = board.append("g")
                    .attr("class", "c4-board__backing-g")
                    .attr("transform", "translate(0, " + topMargin + ")")
                    .attr("mask", "url(#c4-board__mask)");

                boardBackingG.append("path")
                    .attr("class", "c4-board__backing")
                    .attr("d", doLine( [{x:0, y:0}, {x:width, y:0}, {x:width, y:height}, {x:0, y:height}] ));
                    // NOTE: mask url must be id

                boardBackingG.append("path")
                    .attr("class", "c4-board__frost-top")
                    .attr("d", doLine( [{x:0, y:0}, {x:width, y:0}, {x:width, y:1}, {x:0, y:1}] ));

                boardBackingG
                    .selectAll("circle")
                    .data(boardHoles)
                    .enter()
                    .append("circle")
                    .attr("class", "c4-board__circle-frosted")
                    .attr("fill", "url(#hole-gradient)")
                    .attr("cx", function(d) {
                        return xScale(d.x);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.y);
                    })
                    .attr("r", 31);

                board.select("#c4-board__mask")
                    .selectAll("circle")
                    .data(boardHoles)
                    .enter()
                    .append("circle")
                    .attr("class", "c4-board__circle-mask")
                    .attr("cx", function(d) {
                        return xScale(d.x);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.y);
                    })
                    .attr("r", 30);

            }

            document.querySelector('svg.c4-board')
                .addEventListener("click", function(e) {
                    ctrl.move(calcClickedCol(e.offsetX));
                    $scope.$apply();
                    // console.log(calcClickedCol(e.offsetX));
                    //TODO: make sure offsetX works on other browsers/systems
                });

            function calcClickedCol(x) {
                colLeftBound = x - (x % colWidth);
                colIndex = colLeftBound / colWidth;
                return colIndex;
            }

            var coinGPrefix = "c4-board__coinsG";
            var coinsG1 = board.insert('g', ":first-child")
                .attr("transform", "translate(0, " + topMargin + ")")
                .attr("class", `${coinGPrefix}-p1`);
            var coinsG2 = board.insert('g', ":first-child")
                .attr("transform", "translate(0, " + topMargin + ")")
                .attr("class", `${coinGPrefix}-p2`);

            initCoinGroups(coinsG1);
            initCoinGroups(coinsG2);
            function initCoinGroups(coinsG) {
                coinsG.selectAll("g")
                    .data([1,2,3,4,5,6,7]) // can be any data, as long as length is 7
                    .enter().append("g")
                    .attr("transform", function(d, i) {
                        return `translate( ${xScale(i+.5)} )`;
                    })
            }

            $scope.resetCoinGroups = function() {
                resetCoinGroup(coinsG1);
                resetCoinGroup(coinsG2);
                function resetCoinGroup(coinsG) {
                    coinsG.selectAll("g")
                        .data([[],[],[],[],[],[],[]])
                        .selectAll("circle")
                        .data((d)=>d)
                        .exit()
                        .remove()
                }
            }

            $scope.update = function(boardData) {

                var p1Data = [];
                var p2Data = [];
                for(var x=0; x<7; ++x) {
                    p1Data.push([]);
                    p2Data.push([]);
                    for(var y=0; y<6; ++y) {
                        var cellState = boardData[x][y];
                        switch(cellState) {
                            case 1:
                                p1Data[x].push(y);
                                break;
                            case 2:
                                p2Data[x].push(y);
                                break;
                        }
                    }
                }

                doPlayerData(p1Data, "p1");
                doPlayerData(p2Data, "p2");
                function doPlayerData(playerData, playerIdStr) {
                    var coinsG;
                    if(playerIdStr==="p1")
                        coinsG = coinsG1;
                    if(playerIdStr==="p2")
                        coinsG = coinsG2;

                    coinsG.selectAll("g")
                        .data(playerData)
                        .selectAll("circle")
                        .data((d)=>d)
                        .enter().append("circle")
                        .attr("class", `c4-board__coin--${playerIdStr}`)
                        .attr("fill", (function() {
                            if(playerIdStr==="p1") return 'url(#red-coin-gradient)';
                            if(playerIdStr==="p2") return 'url(#blue-coin-gradient)';
                        })())
                        .attr("r", 23)
                        .attr("cy", function(d) {
                            return yScale(d + 6.5);
                        })
                        .transition()
                        .duration(ctrl.nextTurnDelay)
                        .ease(d3.easeSinIn)
                        .attr("cy", function(d) {
                            return yScale(d + .5);
                        })

                }

            };

        }
    };
});
