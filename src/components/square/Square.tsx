import React from 'react';
import styles from './Square.module.scss';

const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.backgroundColor = 'darkblue';
  e.preventDefault();
};

const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  // e.target.style.removeProperty('background-color');
  e.preventDefault();
};

const Square: React.FC = React.memo(() => {
  return (
    <div
      className={`${styles.square} ${styles.ocean}`}
      onDrop={null}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      role="presentation"
    />
  );
});

export default Square;
