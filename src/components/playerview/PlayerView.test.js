import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlayerView from './PlayerView';

describe('PlayerView Component', () => {
    test('Changing hit status for ships', () => {
        const mockFn = jest.fn();
        const testShip = [
            {
                id: 1,
                positions: [0, 1],
                hits: [false, false]
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
        const { container } = render(<PlayerView ships={testShip} hitHandler={() => mockFn} myBoard={false} board={initialBoard} />);
        const component = container.firstChild.firstChild;
        fireEvent.click(component);
        expect(component).toHaveTextContent('X');
        expect(component.classList.contains('ship-square')).toBeTruthy();
    });

    test('Changing hit status for ocean', () => {
        const mockFn = jest.fn();
        const testShip = [
            {
                id: 1,
                positions: [1, 2],
                hits: [false, false]
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
        const { container } = render(<PlayerView ships={testShip} hitHandler={() => mockFn} myBoard={false} board={initialBoard} />);
        const component = container.firstChild.firstChild;
        fireEvent.click(component);
        expect(component).toHaveTextContent('X');
        expect(component.classList.contains('ocean-square')).toBeTruthy();
    });
});
