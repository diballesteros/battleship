import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Gameboard from './Gameboard';

describe('Gameboard component', () => {
    test('Initialized board', () => {
        const testShips = [
            {
                id: 1,
                positions: [1, 2, 3]
            },
            {
                id: 2,
                positions: [9, 19, 29]
            }
        ];
        const { asFragment } = render(<Gameboard ships={testShips} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Changing hit status', () => {
        const mockFn = jest.fn();
        const testShip = [
            {
                id: 1,
                positions: [1, 2, 3]
            }
        ];
        const { getAllByTestId } = render(<Gameboard ships={testShip} hitHandler={() => mockFn}/>);
        const component = getAllByTestId('1')[0];
        fireEvent.click(component);
        expect(component).toHaveTextContent('X');
    });
});
