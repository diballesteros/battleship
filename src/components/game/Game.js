import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';

class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ships: [
                {
                    id: 1,
                    positions: [1,2,3]
                },
                {
                    id: 2,
                    positions: [9,19,29]
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Gameboard ships={this.state.ships} />
            </div>
        );
    }
}

export default Game;
