var angular = require('angular')
var sinon = require('sinon')
var {expect} = require('chai')

require('./../app')
require('./connect4')
var {module, inject} = angular.mock

describe('Connect4 Service', function() {

    var Connect4
    // var GameSpy
    // var sandbox
    // var Game

    beforeEach(module('app'))

    // beforeEach(module(function($provide) {
    //     $provide.value("Game", { insertGame: GameSpy })
    // }))
    // beforeEach(angular.mock.inject(function(_Connect4_, $injector) {
    //     Connect4 = _Connect4_
    //     sandbox = sinon.sandbox.create()
    //     Game = $injector.get('Game')
    //     sandbox.stub(Game, "insertGame")
    // }))

    beforeEach(inject(function(_Connect4_) {
        Connect4 = _Connect4_
        Connect4.init()
    }))

    describe('init()', () => {
        it('should reset board subarrays to contain 0s', () => {
            Connect4.board = [[1, 1], [1, 1]]
            Connect4.init()
            Connect4.board.forEach((subArray)=>{
                subArray.forEach((datum)=>expect(datum).to.equal(0))
            })
        })
        it('should reset activePlayer to 1', () => {
            Connect4.activePlayer = 2
            Connect4.init()
            expect(Connect4.activePlayer).to.equal(1)
        })
    })

    describe('move()', () => {
        it('should do no normal processing if turn is occuring', () => {
            // this stops user from being able to move during turn phase,
            // which is when coin animation occurs
            var spy = sinon.stub(Connect4, "moveHelper")
            Connect4.isTurningFlag = true
            Connect4.move()
            expect(spy.called).to.be.false
        })
    })

    describe('checkForWin()', () => {
        it('should return true for a board with a win condition', () => {
            for(var i=0; i<4; ++i) {
                Connect4.board[i][0] = 1 // 1 is for player1-owned coords
            }
            var result = Connect4.checkForWin()
            expect(result).to.be.true
        })
        it('should return false for a board with no win condition', () => {
            // default board has no win condtion..
            var result = Connect4.checkForWin()
            expect(result).to.be.false
        })
    })

    // describe('Collaboration with Game service', () => {
    //     it('should call "insertGame"', () => {
    //         expect(Game.insertGame.called).to.be.true
    //     })
    // })

})
