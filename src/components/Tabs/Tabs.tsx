import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';
import { SHIPSTORE } from 'constants/constant';
import styles from './Tabs.module.scss';

const Tabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [previousTab, setPreviousTab] = useState(0);

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
      boxShadow: '0px 0px 5px #000',
    }),
  });
  if (currentTab !== previousTab) setPreviousTab(currentTab);
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
        {transitions.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, red , yellow)',
            }}
          >
            {item.model}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
