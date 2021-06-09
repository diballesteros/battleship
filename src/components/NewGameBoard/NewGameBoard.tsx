import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LETTERROW, NUMBERCOLUMN } from 'constants/constant';
import useDimensions from 'hooks/useDimensions';
import Square from 'components/square/Square';
import { setHeight, setWidth } from 'reducers/Display.slice';
import styles from './NewGameBoard.module.scss';

const NewGameBoard: React.FC = () => {
  const dispatch = useDispatch();
  const [containerRef, containerSize] = useDimensions(true);
  const createInitialBoard = new Array(99).map((el, index) => {
    return {
      id: null,
      position: index,
      type: 'OCEAN',
    };
  });

  useEffect(() => {
    dispatch(setHeight(containerSize?.height));
    dispatch(setWidth(containerSize?.width));
  }, [containerSize]);

  return (
    <div className={styles.board}>
      <div className={styles.letters}>
        {LETTERROW.map((value, i) => (
          <span className={styles.indicator} key={value} ref={i ? containerRef : undefined}>
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
          {new Array(99).fill(<Square />)}
          <Square />
        </div>
      </div>
    </div>
  );
};

export default NewGameBoard;
