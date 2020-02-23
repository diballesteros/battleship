import React from 'react';
import './Square.css';

const onDragOver = (event) => {
    event.target.style.backgroundColor = 'darkblue';
    event.preventDefault();
}

const onDragLeave = (event) => {
    event.target.style.removeProperty('background-color');
    event.preventDefault();
}

const Square = (props) => {
    switch (props.type) {
        case 'ship':
            return <div 
                    onClick={props.resolveSquareClick} 
                    className={`square ship-square ${props.myBoard ? 'my_square' : ''}`}
                    onDrop={props.resolveBoardDrop}
                    onDragOver={props.resolveBoardDrop ? event => onDragOver(event) : null}
                    onDragLeave={props.resolveBoardDrop ? event => onDragLeave(event) : null}
                    >
                        {props.hit ? 'X' : ''}
                    </div>
        case 'grid':
            return <div className='square grid-square'>{props.text}</div>
        default:
            return <div 
                    onClick={props.resolveSquareClick} 
                    className={`square ocean-square ${props.myBoard ? 'my_square' : ''}`}
                    onDrop={props.resolveBoardDrop}
                    onDragOver={event => onDragOver(event)}
                    onDragLeave={event => onDragLeave(event)}>
                        {props.hit ? 'X' : ''}
                    </div>
    }
}

export default Square;
