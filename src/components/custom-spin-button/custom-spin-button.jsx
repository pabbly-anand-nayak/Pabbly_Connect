// import React, { useRef, useState } from 'react';

// import { Button, Tooltip } from '@mui/material';

// import { Iconify } from '../iconify';

// const SpinButton = ({
//   onIncrement,
//   onDecrement,
//   incrementTooltip = 'Increment', // Default tooltip text
//   decrementTooltip = 'Decrement', // Default tooltip text
//   increasetooltipPlacement = 'top', // Default placement
//   decreasetooltipPlacement = 'bottom', // Default placement (// Can be: 'top', 'bottom', 'left', 'right')
// }) => {
//   const [isIncrementing, setIsIncrementing] = useState(false);
//   const [isDecrementing, setIsDecrementing] = useState(false);
//   const incrementInterval = useRef(null);
//   const decrementInterval = useRef(null);
//   const repeatDelay = 100;

//   const startIncrementing = () => {
//     setIsIncrementing(true);
//     onIncrement();
//     incrementInterval.current = setInterval(() => {
//       onIncrement();
//     }, repeatDelay);
//   };

//   const startDecrementing = () => {
//     setIsDecrementing(true);
//     onDecrement();
//     decrementInterval.current = setInterval(() => {
//       onDecrement();
//     }, repeatDelay);
//   };

//   const stopIncrementing = () => {
//     setIsIncrementing(false);
//     if (incrementInterval.current) {
//       clearInterval(incrementInterval.current);
//       incrementInterval.current = null;
//     }
//   };

//   const stopDecrementing = () => {
//     setIsDecrementing(false);
//     if (decrementInterval.current) {
//       clearInterval(decrementInterval.current);
//       decrementInterval.current = null;
//     }
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column' }}>
//       <Tooltip title={incrementTooltip} placement={increasetooltipPlacement} arrow>
//         <Button
//           onMouseDown={startIncrementing}
//           onMouseUp={stopIncrementing}
//           onMouseLeave={stopIncrementing}
//           onTouchStart={startIncrementing}
//           onTouchEnd={stopIncrementing}
//           style={{
//             border: 'none',
//             padding: '1px 4px',
//             cursor: 'pointer',
//             height: '16px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             minWidth: 'unset',
//             color: '#637381',
//           }}
//         >
//           <span style={{ fontSize: '10px', lineHeight: 1 }}>▲</span>
//           {/* <span>
//             <Iconify sx={{ width: '16px', height: '16px' }} icon="icon-park-solid:up-one" />
//           </span> */}
//         </Button>
//       </Tooltip>
//       <Tooltip title={decrementTooltip} arrow placement={decreasetooltipPlacement}>
//         <Button
//           onMouseDown={startDecrementing}
//           onMouseUp={stopDecrementing}
//           onMouseLeave={stopDecrementing}
//           onTouchStart={startDecrementing}
//           onTouchEnd={stopDecrementing}
//           style={{
//             border: 'none',
//             padding: '1px 4px',
//             cursor: 'pointer',
//             height: '16px',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             minWidth: 'unset',
//             color: '#637381',
//           }}
//         >
//           <span style={{ fontSize: '10px', lineHeight: 1 }}>▼</span>
//           {/* <span>
//             <Iconify sx={{ width: '16px', height: '16px' }} icon="icon-park-solid:down-one" />
//           </span> */}
//         </Button>
//       </Tooltip>
//     </div>
//   );
// };

// export default SpinButton;

import React, { useRef, useState } from 'react';

import { Box, Tooltip, IconButton, InputAdornment } from '@mui/material';

import { Iconify } from '../iconify';

const SpinButton = ({
  onIncrement,
  onDecrement,
  incrementTooltip = 'Increase tasks',
  decrementTooltip = 'Decrease tasks',
  increasetooltipPlacement = 'top',
  decreasetooltipPlacement = 'bottom',
  disabled = false,
}) => {
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  const incrementInterval = useRef(null);
  const decrementInterval = useRef(null);
  const repeatDelay = 100;

  const startIncrementing = () => {
    if (disabled) return;
    setIsIncrementing(true);
    onIncrement();
    incrementInterval.current = setInterval(() => {
      onIncrement();
    }, repeatDelay);
  };

  const startDecrementing = () => {
    if (disabled) return;
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
    <InputAdornment position="end">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& .iconify': {
            cursor: 'pointer',
            width: '16px',
            height: '16px',
            color: '#637381',
          },
        }}
      >
        <Tooltip title={incrementTooltip} placement={increasetooltipPlacement} arrow>
          <IconButton
            sx={{ width: '16px', height: '16px' }}
            onMouseDown={startIncrementing}
            onMouseUp={stopIncrementing}
            onMouseLeave={stopIncrementing}
            onTouchStart={startIncrementing}
            onTouchEnd={stopIncrementing}
            disabled={disabled}
          >
            <Iconify sx={{ width: '16px', height: '16px' }} icon="icon-park-solid:up-one" />
          </IconButton>
        </Tooltip>

        <Tooltip title={decrementTooltip} placement={decreasetooltipPlacement} arrow>
          <IconButton
            sx={{ width: '16px', height: '16px' }}
            onMouseDown={startDecrementing}
            onMouseUp={stopDecrementing}
            onMouseLeave={stopDecrementing}
            onTouchStart={startDecrementing}
            onTouchEnd={stopDecrementing}
            disabled={disabled}
          >
            <Iconify sx={{ width: '16px', height: '16px' }} icon="icon-park-solid:down-one" />
          </IconButton>
        </Tooltip>
      </Box>
    </InputAdornment>
  );
};

export default SpinButton;
