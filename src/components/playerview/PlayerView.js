import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';

function createInitialBoard() {
    const initialBoard = new Array(100);
    for (var i = 0; i < 100; i++) {
        initialBoard[i] = {
            hit: false,
            position: i,
            type: 'ocean',
            id: null
        };
    };
    return initialBoard;
}

class PlayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ships: [
                {
                    id: 0,
                    positions: [1, 2, 3],
                    hits: [false, false, false]
                },
                {
                    id: 1,
                    positions: [9, 19, 29],
                    hits: [false, false, false]
                },
                {
                    id: 2,
                    positions: [42, 43, 44, 45, 46],
                    hits: [false, false, false, false, false]
                },
                {
                    id: 3,
                    positions: [98, 99],
                    hits: [false, false]
                },
                {
                    id: 4,
                    positions: [62, 72, 82, 92],
                    hits: [false, false, false, false]
                }
            ],
            computerShips: [
                {
                    id: 0,
                    positions: [1, 2, 3],
                    hits: [false, false, false]
                },
                {
                    id: 1,
                    positions: [9, 19, 29],
                    hits: [false, false, false]
                },
                {
                    id: 2,
                    positions: [42, 43, 44, 45, 46],
                    hits: [false, false, false, false, false]
                },
                {
                    id: 3,
                    positions: [98, 99],
                    hits: [false, false]
                },
                {
                    id: 4,
                    positions: [62, 72, 82, 92],
                    hits: [false, false, false, false]
                }
            ],
            playerBoard: createInitialBoard(),
            computerBoard: createInitialBoard()
        }
    }

    isSunk(positions) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        return sunkStatus;
    }

    receiveAttack(i) {
        if (!this.state.computerBoard[i].hit) {
            const modifiedPlayerBoard = this.state.playerBoard.slice();
            const modifiedPlayerShips = this.state.ships.slice();
            const modifiedComputerShips = this.state.computerShips.slice();
            const modifiedComputerBoard = this.state.computerBoard.slice();
            const computerMove = this.props.performComputerMove();
            modifiedPlayerBoard[computerMove].hit = true;
            modifiedComputerBoard[i].hit = true;
            if (modifiedComputerBoard[i].type === 'ship') {
                const shipIndex = modifiedComputerShips.findIndex(ship => ship.id === modifiedComputerBoard[i].id);
                const hitIndex = modifiedComputerShips[shipIndex].positions.indexOf(i);
                modifiedComputerShips[shipIndex].hits[hitIndex] = true;
                this.isSunk(modifiedComputerShips[shipIndex].hits);
            }
            if (modifiedPlayerBoard[computerMove].type === 'ship') {
                const shipIndex = modifiedPlayerShips.findIndex(ship => ship.id === modifiedPlayerBoard[computerMove].id);
                const hitIndex = modifiedPlayerShips[shipIndex].positions.indexOf(computerMove);
                modifiedPlayerShips[shipIndex].hits[hitIndex] = true;
                this.isSunk(modifiedPlayerShips[shipIndex].hits);
            }
            this.setState({
                computerBoard: modifiedComputerBoard,
                computerShips: modifiedComputerShips,
                board: modifiedPlayerBoard,
                ships: modifiedPlayerShips
            });
        }
    };

    render() {
        return (
            <div className='player_console'>
                <div className='player_board'>
                    <label>My Board</label>
                    <Gameboard
                        ships={this.state.ships}
                        myBoard={true}
                        recieveAttack={(i) => this.receiveAttack(i)}
                        board={this.state.playerBoard} />
                </div>
                <div data-testid="1" className='player_board'>
                    <label>Opponent's Board</label>
                    <Gameboard
                        ships={this.state.computerShips}
                        myBoard={false}
                        receiveAttack={(i) => this.receiveAttack(i)}
                        board={this.state.computerBoard}
                    />
                </div>
            </div>
        );
    }
}

export default PlayerView;
