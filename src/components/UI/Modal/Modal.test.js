import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal component', () => {
    test('Modal initalized', () => {
        const { asFragment } = render(<Modal modalText={'Game over'}>New Game</Modal>);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Modal button click', () => {
        const mockFn = jest.fn();
        const { container } = render(<Modal modalText={'Game over'} modalFn={() => mockFn()}>New Game</Modal>);
        const component = container.querySelector('button');
        fireEvent.click(component);
        expect(mockFn).toHaveBeenCalled();
    });
});
