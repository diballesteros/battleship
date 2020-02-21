import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import _ from 'lodash';
import './PlayerView.css';

class PlayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerShips: [
                {
                    id: 1,
                    positions: [1, 2, 3],
                    hits: [false, false, false]
                },
                {
                    id: 2,
                    positions: [9, 19, 29],
                    hits: [false, false, false]
                },
                {
                    id: 3,
                    positions: [42, 43, 44, 45, 46],
                    hits: [false, false, false, false, false]
                },
                {
                    id: 4,
                    positions: [98, 99],
                    hits: [false, false]
                },
                {
                    id: 5,
                    positions: [62, 72, 82, 92],
                    hits: [false, false, false, false]
                }
            ],
            computerShips: [
                {
                    id: 1,
                    positions: [1, 2, 3],
                    hits: [false, false, false]
                },
                {
                    id: 2,
                    positions: [9, 19, 29],
                    hits: [false, false, false]
                },
                {
                    id: 3,
                    positions: [42, 43, 44, 45, 46],
                    hits: [false, false, false, false, false]
                },
                {
                    id: 4,
                    positions: [98, 99],
                    hits: [false, false]
                },
                {
                    id: 5,
                    positions: [62, 72, 82, 92],
                    hits: [false, false, false, false]
                }
            ],
            playerMoves: [],
            computerMoves: []
        }
    }

    isSunk(positions, isComputer) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        if (sunkStatus && isComputer === true) {
            this.props.resetSuccessfulHit();
        }
        return sunkStatus;
    }

    resolveBoardState(move, shipId, ships, isComputer) {
        const shipIndex = ships.findIndex(ship => ship.id === shipId);
        const hitIndex = ships[shipIndex].positions.indexOf(move);
        ships[shipIndex].hits[hitIndex] = true;
        this.isSunk(ships[shipIndex].hits, isComputer);
        return ships
    };

    receivePlayerAttack(shipId, playerMove) {
        const modifiedPlayerMoves = this.state.playerMoves.slice();
        modifiedPlayerMoves.push(playerMove);
        let modifiedComputerShips = this.state.computerShips.slice();
        if (!_.isNull(shipId)) {
            modifiedComputerShips = this.resolveBoardState(playerMove, shipId, this.state.computerShips.slice(), false);
        }
        
        const modifiedComputerMoves = this.state.computerMoves.slice();
        const computerMove = this.props.getComputerMove();
        modifiedComputerMoves.push(computerMove);
        const modifiedPlayerShips = this.resolveComputerTurn(computerMove);

        this.setState({
            computerShips: modifiedComputerShips,
            playerMoves: modifiedPlayerMoves,
            computerMoves: modifiedComputerMoves,
            playerShips: modifiedPlayerShips
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
            this.props.setSuccessfulHit(move);
            modifiedPlayerShips = this.resolveBoardState(move, foundShip, modifiedPlayerShips, true);
        }
        return modifiedPlayerShips;
    }

    render() {
        return (
            <div className='player_console'>
                <div className='player_board'>
                    <label>My Board</label>
                    <Gameboard
                        ships={this.state.playerShips}
                        myBoard={true}
                        origin={'Player'}
                        playerMoves={this.state.computerMoves} />
                </div>
                <div data-testid='1' className='player_board'>
                    <label>Opponent's Board</label>
                    <Gameboard
                        ships={this.state.computerShips}
                        myBoard={false}
                        receivePlayerAttack={(shipId, i) => this.receivePlayerAttack(shipId, i)}
                        origin={'Opponent'}
                        playerMoves={this.state.playerMoves} />
                </div>
            </div>
        );
    }
}

export default PlayerView;
