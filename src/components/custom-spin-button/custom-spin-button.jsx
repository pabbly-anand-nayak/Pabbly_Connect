import React, { useRef, useState } from 'react';

import { Button, Tooltip } from '@mui/material';

const SpinButton = ({
  onIncrement,
  onDecrement,
  incrementTooltip = 'Increment', // Default tooltip text
  decrementTooltip = 'Decrement', // Default tooltip text
  increasetooltipPlacement = 'top', // Default placement
  decreasetooltipPlacement = 'bottom', // Default placement (// Can be: 'top', 'bottom', 'left', 'right')
}) => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);
  const repeatDelay = 100;

  const startIncrementing = () => {
    setIsIncrementing(true);
    onIncrement();
    incrementInterval.current = setInterval(() => {
      onIncrement();
    }, repeatDelay);
  };

  const startDecrementing = () => {
    setIsDecrementing(true);
    onDecrement();
    decrementInterval.current = setInterval(() => {
      onDecrement();
    }, repeatDelay);
  };

  const stopIncrementing = () => {
    setIsIncrementing(false);
    if (incrementInterval.current) {
      clearInterval(incrementInterval.current);
      incrementInterval.current = null;
    }
  };

  const stopDecrementing = () => {
    setIsDecrementing(false);
    if (decrementInterval.current) {
      clearInterval(decrementInterval.current);
      decrementInterval.current = null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Tooltip title={incrementTooltip} placement={increasetooltipPlacement} arrow>
        <Button
          onMouseDown={startIncrementing}
          onMouseUp={stopIncrementing}
          onMouseLeave={stopIncrementing}
          onTouchStart={startIncrementing}
          onTouchEnd={stopIncrementing}
          style={{
            border: 'none',
            padding: '1px 4px',
            cursor: 'pointer',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'unset',
            color: '#637381',
          }}
        >
          <span style={{ fontSize: '10px', lineHeight: 1 }}>▲</span>
        </Button>
      </Tooltip>
      <Tooltip title={decrementTooltip} arrow placement={decreasetooltipPlacement}>
        <Button
          onMouseDown={startDecrementing}
          onMouseUp={stopDecrementing}
          onMouseLeave={stopDecrementing}
          onTouchStart={startDecrementing}
          onTouchEnd={stopDecrementing}
          style={{
            border: 'none',
            padding: '1px 4px',
            cursor: 'pointer',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 'unset',
            color: '#637381',
          }}
        >
          <span style={{ fontSize: '10px', lineHeight: 1 }}>▼</span>
        </Button>
      </Tooltip>
    </div>
  );
};

export default SpinButton;
