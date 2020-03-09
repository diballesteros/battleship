import React from 'react';
import Gameboard from '../gameboard/Gameboard';
import './PlayerView.css';

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
            </div>
            <div data-testid='1' className='player_board'>
                <label>Opponent's Board</label>
                <Gameboard
                    ships={props.computerShips}
                    myBoard={false}
                    origin={'Opponent'}
                    playerMoves={props.playerMoves} 
                    receivePlayerAttack={(shipId, i) => props.receivePlayerAttack(shipId, i)}/>
            </div>
        </div>
    );
}

export default PlayerView;
