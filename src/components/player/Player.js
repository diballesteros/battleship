import React, { Component } from 'react';
import Gameboard from '../gameboard/Gameboard';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <label>My Board</label>
                <Gameboard />
                <label>Opponent's Board</label>
                <Gameboard />
            </div>
        );
    }
}

export default Player;
