import React from 'react';
import { useDispatch } from 'react-redux';
import { rotate } from 'reducers/Display.slice';
import Button from 'components/UI/button/Button';
import Tabs from 'components/Tabs/Tabs';
import styles from './Factory.module.scss';

const Factory: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.factory}>
      <div className={styles.store}>
        <div className={styles.store__title}>
          <h3>Build your board</h3>
          <span>Drag and drop the ship below on a square</span>
        </div>
        <div className={styles.store__container}>
          <div className={styles.builder}>
            <Tabs />
          </div>
          <div className={styles.counter}>Ships left: 5/5</div>
          <div className={styles.buttons}>
            <Button disabled clicked={null}>
              Start Game
            </Button>
            <Button clicked={() => dispatch(rotate())} disabled={false}>
              Rotate
            </Button>
            <Button disabled={false} clicked={null}>
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factory;
