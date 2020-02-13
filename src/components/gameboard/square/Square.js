import React from 'react';
import './Square.css';

const Square = (props) => {
    switch (props.type) {
        case "ship":
            return <div onClick={props.receiveAttack} className="square ship-square" data-testid={props.id}>{props.hit ? 'X' : ''}</div>
        default:
            return <div onClick={props.receiveAttack} className="square ocean-square">{props.hit ? 'X' : ''}</div>
    }
}

export default Square;
