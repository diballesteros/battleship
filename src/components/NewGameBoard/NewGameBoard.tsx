import React from 'react';
import { LETTERROW, NUMBERCOLUMN } from 'constants/constant';
import styles from './NewGameBoard.module.scss';

const NewGameBoard: React.FC = () => {
  const createInitialBoard = () => {
    return new Array(100).map((el, index) => {
      return {
        id: null,
        position: index,
        type: 'OCEAN',
      };
    });
  };

  return (
    <div className={styles.board}>
      <div className={styles.letters}>
        {LETTERROW.map((value) => (
          <span className={styles.indicator} key={value}>
            {value}
          </span>
        ))}
      </div>
      <div className={styles.container}>
        <div className={styles.numbers}>
          {NUMBERCOLUMN.map((value) => (
            <span className={styles.indicator} key={value}>
              {value}
            </span>
          ))}
        </div>
        <div className={styles.innerBoard}>
          {createInitialBoard().map(() => {
            return <span>test</span>;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewGameBoard;
