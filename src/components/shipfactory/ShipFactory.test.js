import React from 'react';
import { render } from '@testing-library/react';
import ShipFactory from './ShipFactory';

describe('ShipFactory Component', () => {
    test('Initialized ShipFactory', () => {
        const mockFn = jest.fn();
        const { asFragment } = render(<ShipFactory setShips={() => mockFn()} />);
        expect(asFragment()).toMatchSnapshot();
    });
});
