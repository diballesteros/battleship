import React from 'react';
import { render, fireEvent, getAllByText } from '@testing-library/react';
import PlayerView from './PlayerView';

describe('PlayerView Component', () => {
    test('Changing hit status for ships', () => {
        const mockFn = jest.fn();
        mockFn.mockReturnValueOnce(1);
        const { getByTestId } = render(<PlayerView getComputerMove={() => mockFn()}/>);
        const component = getByTestId("1").children[1].children[1].children[1].children[1];
        fireEvent.click(component);
        expect(component).toHaveTextContent('X');
        expect(component.classList.contains('ship-square')).toBeTruthy();
    });

    test('Changing hit status for ocean', () => {
        const mockFn = jest.fn();
        mockFn.mockReturnValueOnce(1);
        const { getByTestId } = render(<PlayerView getComputerMove={() => mockFn()} />);
        const component = getByTestId("1").children[1].children[1].children[1].firstChild;
        fireEvent.click(component);
        expect(component).toHaveTextContent('X');
        expect(component.classList.contains('ocean-square')).toBeTruthy();
    });
});