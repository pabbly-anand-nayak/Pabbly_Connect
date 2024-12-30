// video-modal.jsx
import { memo } from 'react';
import { CloseIcon } from 'yet-another-react-lightbox';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Dialog, Tooltip, IconButton } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

function VideoModalNew({
  hideBackground,
  thumbnailimage,
  videoId,
  open,
  onClose,
  onOpen,
  sx,
  ...other
}) {
  const theme = useTheme();
  const coverSrc = `${CONFIG.site.basePath}/assets/background/${thumbnailimage}`;

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      {/* <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
        <Card onClick={onOpen} sx={{ width: '100%', height: '100%', cursor: 'pointer' }}>
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
            <img
              src={coverSrc}
              alt="Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Card>
        <IconButton
          aria-label="play"
          onClick={onOpen}
          sx={{
            padding: '0px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#078DEE',
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%': {
                transform: 'translate(-50%, -50%) scale(1)',
                boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
              },
              '70%': {
                transform: 'translate(-50%, -50%) scale(1.1)',
                boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
              },
              '100%': {
                transform: 'translate(-50%, -50%) scale(1)',
                boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
              },
            },
          }}
        >
          <Iconify icon="icon-park-solid:play" width={50} height={50} />
        </IconButton>
      </Tooltip> */}

      <Tooltip disableInteractive title="Click to watch tutorial." arrow placement="top">
        <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <Card onClick={onOpen} sx={{ width: '100%', height: '100%', cursor: 'pointer' }}>
            <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <img
                src={coverSrc}
                alt="Background"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Card>
          <IconButton
            aria-label="play"
            onClick={onOpen}
            sx={{
              padding: '0px',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#078DEE',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  boxShadow: '0 0 0 0 rgba(7, 141, 238, 0.7)',
                },
                '70%': {
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  boxShadow: '0 0 0 10px rgba(7, 141, 238, 0)',
                },
                '100%': {
                  transform: 'translate(-50%, -50%) scale(1)',
                  boxShadow: '0 0 0 0 rgba(7, 141, 238, 0)',
                },
              },
            }}
          >
            <Iconify icon="icon-park-solid:play" width={50} height={50} />
          </IconButton>
        </Box>
      </Tooltip>

      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="lg"
        fullWidth
        sx={{ p: 0, '& .MuiDialog-paper': { width: 1060, height: 596 } }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 5, right: 0, zIndex: 1, color: '#ffffff' }}
        >
          <CloseIcon />
        </IconButton>
        <Box
          component="iframe"
          src={`${videoId}${videoId.includes('?') ? '&' : '?'}autoplay=1&mute=1`}
          sx={{ width: '100%', height: '100%', border: 'none' }}
        />
      </Dialog>
    </div>
  );
}

export default memo(VideoModalNew);
