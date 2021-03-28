import React from 'react';
import './Square.css';

const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.backgroundColor = 'darkblue';
  e.preventDefault();
};

const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.removeProperty('background-color');
  e.preventDefault();
};

const Square: React.FC = () => {
  return (
    <div
      className="square ocean-square"
      onDrop={null}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      role="presentation"
    />
  );
};

export default Square;
