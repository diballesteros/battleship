import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
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
            computerMove: null,
            computerTurn: false
        }
    }

    isSunk(positions) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        if (sunkStatus && this.state.computerTurn === true) {
            this.props.resetSuccessfulHit();
        }
        return sunkStatus;
    }

    resolveBoardState(move, shipId, ships) {
        const shipIndex = ships.findIndex(ship => ship.id === shipId);
        const hitIndex = ships[shipIndex].positions.indexOf(move);
        ships[shipIndex].hits[hitIndex] = true;
        this.isSunk(ships[shipIndex].hits);

        return ships
    };

    receivePlayerAttack(shipId, playerMove) {
        const modifiedComputerShips = this.resolveBoardState(playerMove, shipId, this.state.computerShips.slice());
        this.setState({
            computerShips: modifiedComputerShips
        });
    };

    computerCallback() {
        const computerMove = this.props.getComputerMove();
        this.setState({
            computerTurn: true,
            computerMove: computerMove
        });
    };

    resolveComputerTurn(shipId) {
        let modifiedPlayerShips = this.state.playerShips.slice();
        if (shipId) {
            this.props.setSuccessfulHit(this.state.computerMove);
            modifiedPlayerShips = this.resolveBoardState(this.state.computerMove, shipId, modifiedPlayerShips);
        }
        this.setState({
            computerTurn: false,
            playerShips: modifiedPlayerShips
        });
    }

    render() {
        return (
            <div className='player_console'>
                <div className='player_board'>
                    <label>My Board</label>
                    <Gameboard
                        ships={this.state.playerShips}
                        myBoard={true}
                        computerTurn={this.state.computerTurn}
                        computerMove={this.state.computerMove}
                        resolveComputerTurn={(shipId) => this.resolveComputerTurn(shipId)} />
                </div>
                <div data-testid='1' className='player_board'>
                    <label>Opponent's Board</label>
                    <Gameboard
                        ships={this.state.computerShips}
                        myBoard={false}
                        receivePlayerAttack={(shipId, i) => this.receivePlayerAttack(shipId, i)}
                        computerCallback={() => this.computerCallback()} />
                </div>
            </div>
        );
    }
}

export default PlayerView;
