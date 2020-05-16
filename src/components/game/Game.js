import React, { Component } from 'react';
import PlayerView from '../playerview/PlayerView';
import ShipFactory from '../shipfactory/ShipFactory';
import { toast } from "react-toastify";
import { FIRSTCOLUMNSQUARES, LASTCOLUMNSQUARES } from '../../constants/constant';
import './Game.css';
import _ from 'lodash';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerShips: [],
            computerShips: [],
            computerMoves: [...Array(100).keys()],
            lastSuccessfulMoves: [],
            successfulComputerHit: false,
            playerMoves: [],
            completedComputerMoves: [],
            gameResolved: false
        }
    };

    setShips(builtShips, builtComputerShips) {
        this.setState({
            playerShips: builtShips,
            computerShips: builtComputerShips
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
    };

    getAdjacentVerticalSquare(i) {
        if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] + 10)) {
            return (this.state.lastSuccessfulMoves[i] + 10);
        } else if (this.state.computerMoves.includes(this.state.lastSuccessfulMoves[i] - 10)) {
            return (this.state.lastSuccessfulMoves[i] - 10);
        }
    };

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
    };

    isSunk(positions, isComputer) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && toast.info(`${isComputer ? 'Allied battleship has been sunk!' : 'Enemy battleship has been sunk!'}`, {
            position: toast.POSITION.BOTTOM_CENTER
        });
        if (sunkStatus && isComputer === true) {
            this.resetSuccessfulHit();
        }
        return sunkStatus;
    };

    resolveBoardState(move, shipId, ships, isComputer) {
        const shipIndex = ships.findIndex(ship => ship.id === shipId);
        const hitIndex = ships[shipIndex].positions.indexOf(move);
        ships[shipIndex].hits[hitIndex] = true;
        ships[shipIndex].isSunk = this.isSunk(ships[shipIndex].hits, isComputer);
        return ships
    };

    receivePlayerAttack(shipId, playerMove) {
        const modifiedPlayerMoves = this.state.playerMoves.slice();
        modifiedPlayerMoves.push(playerMove);
        let modifiedComputerShips = this.state.computerShips.slice();
        if (!_.isNull(shipId)) {
            modifiedComputerShips = this.resolveBoardState(playerMove, shipId, this.state.computerShips.slice(), false);
        }

        const modifiedComputerMoves = this.state.completedComputerMoves.slice();
        const computerMove = this.getComputerMove();
        modifiedComputerMoves.push(computerMove);
        const modifiedPlayerShips = this.resolveComputerTurn(computerMove);

        const gameResolved = this.resolveGameState(modifiedPlayerShips, modifiedComputerShips);

        this.setState({
            computerShips: modifiedComputerShips,
            playerMoves: modifiedPlayerMoves,
            completedComputerMoves: modifiedComputerMoves,
            playerShips: modifiedPlayerShips,
            gameResolved: gameResolved
        });
    };

    resolveComputerTurn(move) {
        let modifiedPlayerShips = this.state.playerShips.slice();
        let foundShip = -1;
        modifiedPlayerShips.forEach((ship) => {
            if (ship.positions.includes(move)) {
                foundShip = ship.id
            }
        });
        if (foundShip > -1) {
            this.setSuccessfulHit(move);
            modifiedPlayerShips = this.resolveBoardState(move, foundShip, modifiedPlayerShips, true);
        }
        return modifiedPlayerShips;
    };

    resolveGameState(playerShips, computerShips) {
        const playerShipsSunk = _.every(playerShips, (ship) => ship.isSunk === true);
        const computerShipsSunk = _.every(computerShips, (ship) => ship.isSunk === true)
        if (playerShipsSunk) {
            toast.error(`${'You lose!'}`, {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return true;
        } else if (computerShipsSunk) {
            toast.success(`${'You win!'}`, {
                position: toast.POSITION.BOTTOM_CENTER
            });
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="game-view">
                <label className="game-title">BATTLESHIP</label>
                {
                    this.state.playerShips.length === 5 ?
                        <PlayerView
                            receivePlayerAttack={(shipId, playerMove) => this.receivePlayerAttack(shipId, playerMove)}
                            playerShips={this.state.playerShips}
                            playerMoves={this.state.playerMoves}
                            computerShips={this.state.computerShips}
                            completedComputerMoves={this.state.completedComputerMoves} /> :
                        <ShipFactory
                            setShips={(builtShips, builtComputerShips) => this.setShips(builtShips, builtComputerShips)} />
                }
            </div>
        );
    };
};

export default Game;
