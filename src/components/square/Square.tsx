import React, { memo } from 'react';
import styles from './Square.module.scss';

const onDragOver = (e: React.SyntheticEvent<HTMLDivElement, DragEvent>) => {
  (e.target as HTMLDivElement).style.backgroundColor = 'darkblue';
  e.preventDefault();
};

const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  (e.target as HTMLDivElement).style.removeProperty('background-color');
  e.preventDefault();
};

interface SquareProps {
  isShip?: boolean;
  height?: number | string;
  width?: number | string;
}

const Square: React.FC<SquareProps> = memo(({ isShip = false, height, width }) => {
  return (
    <div
      className={`${styles.square} ${!isShip ? styles.ocean : ''}`}
      style={{
        height: height || undefined,
        minHeight: height || undefined,
        width: width || undefined,
        maxWidth: width || undefined,
      }}
      onDrop={null}
      onDragOver={!isShip ? onDragOver : undefined}
      onDragLeave={!isShip ? onDragLeave : undefined}
      role="presentation"
    />
  );
});

export default Square;
