import React from 'react';
import { render } from '@testing-library/react';
import Square from './Square';

describe('Square component', () => {
    test('Ocean Square initialized', () => {
        const { asFragment } = render(<Square type='Ocean' hit={false}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Ship Square initialized', () => {
        const { asFragment } = render(<Square type='Ship' hit={false} />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('Ship square hit', () => {
        const component = render(<Square type='Ship' hit={false}  hitHandler={() => }/>);
        const instance = component.root;
        const square = instance.findByType('div');
        square.props.onClick();
        expect(div.props.children).toBe('X');
    });
});