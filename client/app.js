var angular = require('angular');
// only require angular here, as it is core include

var app = angular.module('app', []);

require('./twoPlayerEntryForm/twoPlayerEntryForm');
require('./twoPlayerInterface/twoPlayerInterface');

require('./game/game');
require('./game/connect4');
