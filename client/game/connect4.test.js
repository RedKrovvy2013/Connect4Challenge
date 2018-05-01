var angular = require('angular')

require('./../app')
require('./connect4')

describe('Connect4 Service', function() {

    var Connect4

    beforeEach(angular.mock.module('app'))

    beforeEach(angular.mock.inject(function(_Connect4_) {
        Connect4 = _Connect4_
    }))

    describe('Test Section 1', () => {
        it('should work', () => {
            expect(Connect4.getFoo()).toEqual('foo')
        })
    })

})
