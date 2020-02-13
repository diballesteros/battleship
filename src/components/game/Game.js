import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: [
                {
                    name: 'Diego',
                    shipsLeft: 1
                },
                {
                    name: 'Computer',
                    shipsLeft: 1
                }
            ],
            ships: [
                {
                    id: 1,
                    positions: [1,2,3],
                    hits: [false, false, false]
                },
                {
                    id: 2,
                    positions: [9,19,29],
                    hits: [false, false, false]
                }
            ]
        }
    }

    hitHandler(id, hitLocation) {
        const modifiedShips = this.state.ships.slice();
        const shipIndex = modifiedShips.findIndex(ship => ship.id === id);
        const hitIndex = modifiedShips[shipIndex].positions.indexOf(hitLocation);
        modifiedShips[shipIndex].hits[hitIndex] = true;
        this.isSunk(modifiedShips[shipIndex].hits);
        this.setState({
            ships: modifiedShips
        });
    }

    isSunk(positions) {
        const sunkStatus = positions.every(position => position === true);
        sunkStatus && console.log('You sunk my battleship!');
        return sunkStatus;
    }

    render() {
        return (
            <div>
                <Gameboard ships={this.state.ships} hitHandler={(id, hitLocation) => this.hitHandler(id, hitLocation)}/>
            </div>
        );
    }
}

export default Game;
