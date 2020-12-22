import React from 'react';
import './Button.css';

interface ButtonProps {
  children: string;
  clicked: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, clicked, disabled }) => (
  <button onClick={clicked} disabled={disabled} type="button">
    {children}
  </button>
);

export default Button;
