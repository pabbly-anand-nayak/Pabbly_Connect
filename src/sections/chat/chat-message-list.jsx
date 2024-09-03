import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Divider, Typography, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { Lightbox, useLightBox } from 'src/components/light-box';

import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';

// ----------------------------------------------------------------------

const CustomMessage = ({ text1, text2, text3, src }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
      my: 2,
    }}
  >
    <Box
      sx={{
        bgcolor: '#ccf4fe',
        borderRadius: 1,
        width: 320,
        overflow: 'hidden',
        p: 1.5,
      }}
    >
      {src && (
        <Box
          component="img"
          src={src}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      )}
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 3, // 24px margin bottom
        }}
      >
        {text1}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 1,
        }}
      >
        {text2}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          px: 2,
          py: 1,
          color: 'primary',
          mb: 3, // 24px margin bottom
        }}
      >
        {text3}
      </Typography>
      <Divider
        sx={{
          mb: 1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF', // Change color of the icon button
          }}
        >
          <Iconify width={20} icon="material-symbols:call" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF', // Change color of the text
            fontSize: '14px', // Set font size to 12
            fontWeight: '400', // Set font weight to medium
          }}
        >
          Call Now
        </Typography>
      </Box>
      <Divider sx={{ mt: 1, mb: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF', // Change color of the icon button
          }}
        >
          <Iconify width={20} icon="solar:copy-bold" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF', // Change color of the text
            fontSize: '14px', // Set font size to 12
            fontWeight: '400', // Set font weight to medium
          }}
        >
          Coupan Code
        </Typography>
      </Box>
      <Divider sx={{ mb: 1, mt: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: '#007BFF', // Change color of the icon button
          }}
        >
          <Iconify width={20} icon="icon-park-outline:share" />
        </IconButton>
        <Typography
          sx={{
            color: '#007BFF', // Change color of the text
            fontSize: '14px', // Set font size to 12
            fontWeight: '400', // Set font weight to medium
          }}
        >
          Visit Now
        </Typography>
      </Box>
    </Box>
  </Box>
);

export function ChatMessageList({ messages = [], participants, loading }) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  if (loading) {
    return (
      <Stack sx={{ flex: '1 1 auto', position: 'relative' }}>
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            left: 0,
            width: 1,
            height: 2,
            borderRadius: 0,
            position: 'absolute',
          }}
        />
      </Stack>
    );
  }

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, pb: 3, flex: '1 1 auto' }}>
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            participants={participants}
            onOpenLightbox={() => lightbox.onOpen(message.body)}
          />
        ))}
        <CustomMessage
          text1="Hi {{1}}! 🎧🛒"
          text2="Congratulations! 🎉 Your order for the Headway Bassheads has been confirmed. 🙌"
          text3={`Order Details: 
            Product: {{2}}
            Quantity: {{3}}
             Order ID: {{4}}
             Delivery Address: {{5}}
             Estimated Delivery Date: {{6}}`}
          src="/assets/images/chatImage/imagechat.png" // Replace with your custom avatar image path
        />
      </Scrollbar>

      <Lightbox
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        index={lightbox.selected}
      />
    </>
  );
}
