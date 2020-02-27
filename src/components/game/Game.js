import React, { Component } from 'react';
import PlayerView from '../playerview/PlayerView';
import _ from 'lodash';
import ShipFactory from '../shipfactory/ShipFactory'
import {FIRSTCOLUMNSQUARES, LASTCOLUMNSQUARES} from '../../constants/constant';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerShips: [],
            computerMoves: [...Array(100).keys()],
            lastSuccessfulMoves: [],
            successfulComputerHit: false
        }
    };

    setShips(builtShips) {
        this.setState({
            playerShips: builtShips
        })
    };

    removeComputerMove(i) {
        const modifiedComputerMoves = this.state.computerMoves.slice();
        const computerHitIndex = this.state.computerMoves.findIndex(move => move === i);
        modifiedComputerMoves.splice(computerHitIndex, 1);
        this.setState({
            computerMoves: modifiedComputerMoves
        })
    };

    getComputerMove() {
        let nextMove;
        if (this.state.successfulComputerHit === true) {
            const startingPoint = this.state.lastSuccessfulMoves.length;
            nextMove = this.getAdjacentSquare(startingPoint - 1);
        } 
        if (_.isUndefined(nextMove) || _.isNull(nextMove)) {
            nextMove = _.sample(this.state.computerMoves);
        }
        this.removeComputerMove(nextMove);
        return nextMove;
    };

    getAdjacentSquare() {
        let square = 0;
        if (this.state.lastSuccessfulMoves.length >= 2) {
            if ((this.state.lastSuccessfulMoves[0] + 1 === this.state.lastSuccessfulMoves[1]) || (this.state.lastSuccessfulMoves[0] - 1 === this.state.lastSuccessfulMoves[1])) {
                for (let i = this.state.lastSuccessfulMoves.length - 1; i > -1; i--) {
                    square = this.getAdjacentHorizontalSquare(i);
                    if (_.isNumber(square)) {
                        return square;
                    }
                }
            } else {
                for (let i = this.state.lastSuccessfulMoves.length - 1; i > -1; i--) {
                    square = this.getAdjacentVerticalSquare(i);
                    if (_.isNumber(square)) {
                        return square;
                    }
                }
            }
        } else {
            for (let i = this.state.lastSuccessfulMoves.length - 1; i > -1; i--) {
                square = this.getAdjacentHorizontalSquare(i);
                if (_.isNumber(square)) {
                    return square;
                }
                square = this.getAdjacentVerticalSquare(i);
                if (_.isNumber(square)) {
                    return square;
                }
            }
        }
    };

    getAdjacentHorizontalSquare(i) {
        if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] - 1) && !FIRSTCOLUMNSQUARES.includes(this.state.lastSuccessfulMoves[i])) {
            return (this.state.lastSuccessfulMoves[i] - 1);
        } else if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] + 1) && !LASTCOLUMNSQUARES.includes(this.state.lastSuccessfulMoves[i])) {
            return (this.state.lastSuccessfulMoves[i] + 1);
        }
    }
    getAdjacentVerticalSquare(i) {
        if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] + 10)) {
            return (this.state.lastSuccessfulMoves[i] + 10);
        } else if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] - 10)) {
            return (this.state.lastSuccessfulMoves[i] - 10);
        }
    }

    setSuccessfulHit(move) {
        const modifiedSuccessfulMoves = this.state.lastSuccessfulMoves.slice();
        modifiedSuccessfulMoves.push(move);
        this.setState({
            successfulComputerHit: true,
            lastSuccessfulMoves: modifiedSuccessfulMoves
        });
    };

    resetSuccessfulHit() {
        this.setState({
            successfulComputerHit: false,
            lastSuccessfulMoves: []
        });
    }

    render() {
        return (
            <div>
                <ShipFactory 
                    setShips={(builtShips) => this.setPlayerShips(builtShips)}/>
                <PlayerView
                    getComputerMove={() => this.getComputerMove()}
                    setSuccessfulHit={(move) => this.setSuccessfulHit(move)}
                    resetSuccessfulHit={(() => this.resetSuccessfulHit())} />
            </div>
        );
    };
};

export default Game;
