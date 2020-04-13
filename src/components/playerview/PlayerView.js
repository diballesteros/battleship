import React from 'react';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';
import _ from 'lodash';

const getSunkShipCount = (ships) => {
    let count = 0;
    ships.forEach(ship => {
        if (_.every(ship.hits, (hit) => hit === true)) {
            count++;
        }
    });
    return count;
}

const PlayerView = (props) => {
    return (
        <div className='player_console'>
            <div className='player_board'>
                <label>My Board</label>
                <Gameboard
                    ships={props.playerShips}
                    myBoard={true}
                    origin={'Player'}
                    playerMoves={props.completedComputerMoves} />
                <label>Sunk Ships: {getSunkShipCount(props.playerShips)} / 5</label>
            </div>
            <div data-testid='1' className='player_board'>
                <label>Opponent's Board</label>
                <Gameboard
                    ships={props.computerShips}
                    myBoard={false}
                    origin={'Opponent'}
                    playerMoves={props.playerMoves}
                    receivePlayerAttack={(shipId, i) => props.receivePlayerAttack(shipId, i)} />
                <label>Sunk ships: {getSunkShipCount(props.computerShips)} / 5</label>
            </div>
        </div>
    );
}

export default PlayerView;
