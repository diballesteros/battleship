import React, { memo } from 'react';
import styles from './Square.module.scss';

const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.backgroundColor = 'darkblue';
  e.preventDefault();
};

const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.removeProperty('background-color');
  e.preventDefault();
};

interface SquareProps {
  height?: number | string;
  width?: number | string;
}

const Square: React.FC<SquareProps> = memo(({ height, width }) => {
  return (
    <div
      className={`${styles.square} ${styles.ocean}`}
      style={{
        height: height || undefined,
        minHeight: height || undefined,
        width: width || undefined,
        maxWidth: width || undefined,
      }}
      onDrop={null}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      role="presentation"
    />
  );
});

export default Square;
