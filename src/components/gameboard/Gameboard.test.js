import React from 'react';
import { render } from '@testing-library/react';
import Gameboard from './Gameboard';

describe('Gameboard component', () => {
    test('Initialized board', () => {
        const testShips = [
            {
                id: 1,
                positions: [1, 2, 3],
                hits: [false, false, false]
            },
            {
                id: 2,
                positions: [9, 19, 29],
                hits: [false, false, false]
            }
        ];
        const initialBoard = new Array(100);
        for (var i = 0; i < 100; i++) {
            initialBoard[i] = {
                hit: false,
                position: i,
                type: 'ocean',
                id: null
            };
        };
        const { asFragment } = render(<Gameboard ships={testShips} myBoard={true} board={initialBoard}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
