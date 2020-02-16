import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';

class PlayerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerShips: [
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
            computerMove: false
        }
    }

    isSunk(positions) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        return sunkStatus;
    }

    resolveBoardState(move, shipId, ships) {
        const shipIndex = ships.findIndex(ship => ship.id === shipId);
        const hitIndex = ships[shipIndex].positions.indexOf(move);
        ships[shipIndex].hits[hitIndex] = true;
        this.isSunk(ships[shipIndex].hits);

        return ships
    };

    receiveAttack(shipId, playerMove) {
        // const modifiedPlayerShips = this.state.playerShips.slice();
        // const computerMove = this.props.getComputerMove();

        const modifiedComputerShips = this.resolveBoardState(playerMove, shipId, this.state.computerShips.slice());
        // const playerState = this.resolveBoardState(computerMove, modifiedPlayerShips);

        this.setState({
            computerShips: modifiedComputerShips
            // ships: playerState[1]
        });
};

    performComputerMove () {
        console.log('test');
    }

    render() {
        return (
            <div className='player_console'>
                <div className='player_board'>
                    <label>My Board</label>
                    <Gameboard
                        ships={this.state.playerShips}
                        myBoard={true} />
                </div>
                <div data-testid='1' className='player_board'>
                    <label>Opponent's Board</label>
                    <Gameboard
                        ships={this.state.computerShips}
                        myBoard={false}
                        receiveAttack={(shipId, i) => this.receiveAttack(shipId,i)} 
                        performComputerMove={() => this.performComputerMove()}/>
                </div>
            </div>
        );
    }
}

export default PlayerView;
