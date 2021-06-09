import React from 'react';
import { animated, useTransition } from 'react-spring';
import { useDispatch, useSelector } from 'react-redux';
import { SHIPSTORE } from 'constants/constant';
import { handleNext, handlePrevious, setCurrentTab } from 'reducers/Display.slice';
import Square from 'components/square/Square';
import { ReactComponent as PreviousSVG } from 'assets/previous.svg';
import { ReactComponent as NextSVG } from 'assets/next.svg';
import styles from './Tabs.module.scss';

const Tabs: React.FC = () => {
  const dispatch = useDispatch();
  const { currentTab, isVertical, previousTab, squareWidth, squareHeight } = useSelector(
    (state: RootState) => state.display
  );

  const transitions = useTransition(SHIPSTORE[currentTab], (e) => e.model, {
    unique: true,
    from: () => {
      return {
        transform: `translate3d(${(currentTab - previousTab) * 100}%,0,0)`,
        position: 'static',
      };
    },
    enter: {
      transform: 'translate3d(0%,0,0)',
      position: 'static',
    },

    leave: () => ({
      transform: `translate3d(${(previousTab - currentTab) * 100}%,0,0)`,
      zIndex: 1,
      position: 'absolute',
    }),
  });

  const onDrag = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.options}>
        {SHIPSTORE.map((el, index) => {
          return (
            <div
              className={`${styles.option} ${currentTab === index ? styles.selected : ''}`}
              key={`tab-${index + 1}`}
              onClick={() => dispatch(setCurrentTab(index))}
              role="presentation"
            >
              {index}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        <PreviousSVG onClick={() => dispatch(handlePrevious())} />
        <div className={styles.shipContainer}>
          {transitions.map(({ item, key, props }) => (
            <animated.div
              key={key}
              style={{
                ...props,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'column nowrap',
                alignItems: 'center',
              }}
            >
              <span className={styles.model}>{item.model}</span>
              <div
                className={styles.ship}
                draggable
                onDrag={onDrag}
                style={{ flexDirection: isVertical ? 'column' : 'row' }}
              >
                {Array(item.size)
                  .fill('')
                  .map((el, i) => {
                    return (
                      <Square
                        isShip
                        key={`${item.model}-factory-${i + 1}`}
                        height={squareHeight - 1}
                        width={squareWidth - 1}
                      />
                    );
                  })}
              </div>
            </animated.div>
          ))}
        </div>
        <NextSVG onClick={() => dispatch(handleNext())} />
      </div>
    </div>
  );
};

export default Tabs;
