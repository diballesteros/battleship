import React, { useState } from 'react';
import { animated, useTransition } from 'react-spring';

const Tabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [previousTab, setPreviousTab] = useState(0);

  const items = [
    {
      label: 'TAB',
      key: 1,
      component: 'AAAAAAAAAAAAAAAA',
    },
    {
      label: 'TAB',
      key: 2,
      component: 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB',
    },
    {
      label: 'TAB',
      key: 3,
      component: 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',
    },
  ];

  const transitions = useTransition(items[currentTab], null, {
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
    <div>
      <div>
        {items.map((el, index) => {
          return (
            <div key={`tab-${index + 1}`} onClick={() => setCurrentTab(index)} role="presentation">
              {el.label}
            </div>
          );
        })}
      </div>
      <div style={{ overflowX: 'auto', position: 'relative' }}>
        {transitions.map(({ item, key, props }) => (
          <animated.div
            key={key}
            style={{
              ...props,
              width: '100%',
              height: '200px',
              background: 'linear-gradient(to right, red , yellow)',
            }}
          >
            {item.component}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
