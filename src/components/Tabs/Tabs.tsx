import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { SHIPSTORE } from 'constants/constant';
import Square from 'components/square/Square';
import useWindowSize from 'hooks/useWindowSize';
import { ReactComponent as PreviousSVG } from 'assets/previous.svg';
import { ReactComponent as NextSVG } from 'assets/next.svg';
import styles from './Tabs.module.scss';

const Tabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [previousTab, setPreviousTab] = useState(0);
  const [squareHeight, setSquareHeight] = useState(30);
  const [squareWidth, setSquareWidth] = useState(30);
  const [height, width] = useWindowSize();
  console.log(width);

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
  if (currentTab !== previousTab) setPreviousTab(currentTab);

  const handlePrevious = () => {
    setPreviousTab(currentTab);
    setCurrentTab(currentTab - 1);
    if (currentTab === 0) {
      setCurrentTab(4);
    } else {
      setCurrentTab(currentTab - 1);
    }
  };

  const handleNext = () => {
    setPreviousTab(currentTab);
    if (currentTab === 4) {
      setCurrentTab(0);
    } else {
      setCurrentTab(currentTab + 1);
    }
  };

  useEffect(() => {
    setSquareHeight(height / 13.8);
    setSquareWidth(width / 22.5);
  }, [height, setSquareHeight, setSquareWidth, width]);

  console.log(squareHeight);

  return (
    <div className={styles.tabs}>
      <div className={styles.options}>
        {SHIPSTORE.map((el, index) => {
          return (
            <div
              className={`${styles.option} ${currentTab === index ? styles.selected : ''}`}
              key={`tab-${index + 1}`}
              onClick={() => setCurrentTab(index)}
              role="presentation"
            >
              {index}
            </div>
          );
        })}
      </div>
      <div className={styles.content}>
        <PreviousSVG onClick={handlePrevious} />
        <div className={styles.shipContainer}>
          {transitions.map(({ item, key, props }) => (
            <animated.div
              key={key}
              style={{
                ...props,
                width: '100%',
                height: '100%',
              }}
            >
              {item.model}
              <div className={styles.ship}>
                {Array(item.size)
                  .fill('')
                  .map((el, i) => {
                    return (
                      <Square
                        key={`${item.model}-factory-${i + 1}`}
                        width={squareWidth}
                        height={squareHeight}
                      />
                    );
                  })}
              </div>
            </animated.div>
          ))}
        </div>
        <NextSVG onClick={handleNext} />
      </div>
    </div>
  );
};

export default Tabs;
