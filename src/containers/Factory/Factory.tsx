import React from 'react';
import Square from 'components/square/Square';
import Button from 'components/UI/button/Button';
import styles from './Factory.module.scss';

const Factory: React.FC = () => {
  return (
    <div className={styles.factory}>
      <div className={styles.store}>
        <div className={styles.store__title}>
          <h3>Arrange your board</h3>
          <span>Drag and drop the ship below on a square</span>
        </div>
        <div className={styles.store__container}>
          <div className={styles.model}>
            <span>{false ? 'All ships built! You may start the game.' : `Model: N/A`}</span>
          </div>
          <div className={styles.builder}>
            <div
              className={`${styles.builder__ship} ${false ? styles.horizontal : styles.vertical}`}
              draggable
              // onDrag={onDrag}
            >
              {[...Array(5)].map((e, i) => (
                <Square key={`shipstore-${i + 1}`} type="ship" myBoard />
              ))}
            </div>
          </div>
          <div className={styles.counter}>Ships left: 5/5</div>
          <div className={styles.buttons}>
            <Button disabled clicked={null}>
              Start Game
            </Button>
            <Button clicked={null} disabled={false}>
              Rotate
            </Button>
            <Button disabled={false} clicked={null}>
              Undo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factory;
