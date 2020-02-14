import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';

import _ from 'lodash';

import './PlayerView.css';

class PlayerView extends Component {
    constructor(props) {
        super(props);
        const initialBoard = new Array(100);
        for (var i = 0; i < 100; i++) {
            initialBoard[i] = {
                hit: false,
                position: i,
                type: 'ocean',
                id: null
            };
        };
        this.state = {
            ships: [
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
            playerBoard: initialBoard,
            computerBoard: _.cloneDeep(initialBoard)
        }
    }

    isSunk(positions) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        return sunkStatus;
    }

    receiveAttack(i) {
        const modifiedBoard = this.props.myTurn ? this.state.computerBoard.slice() : this.state.playerBoard.slice();
        const modifiedShips = this.props.myTurn ? this.state.computerShips.slice() : this.state.ships.slice();
        debugger;
        if (!modifiedBoard[i].hit) {
            modifiedBoard[i].hit = true;
            if (modifiedBoard[i].type === 'ship') {
                const shipIndex = modifiedShips.findIndex(ship => ship.id === modifiedBoard[i].id);
                const hitIndex = modifiedShips[shipIndex].positions.indexOf(i);
                modifiedShips[shipIndex].hits[hitIndex] = true;
                this.isSunk(modifiedShips[shipIndex].hits);
            }
            this.props.turnHandler();
            if (this.props.myTurn) {
                this.setState({
                    computerBoard: modifiedBoard,
                    computerShips: modifiedShips
                });
            } else {
                this.setState({
                    board: modifiedBoard,
                    ships: modifiedShips
                });
            }
            if (!this.props.myTurn) {
                this.receiveAttack(this.props.performComputerMove());
            }
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
                <div className='player_board'>
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
