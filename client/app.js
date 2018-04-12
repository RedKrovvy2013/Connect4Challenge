var angular = require('angular');
// only require angular here, as it is core include

var app = angular.module('app', []);

require('./c4Board/c4Board');
require('./twoPlayerEntryForm/twoPlayerEntryForm');
require('./twoPlayerTurnDisplay/twoPlayerTurnDisplay');

require('./game/game');
require('./game/connect4');
