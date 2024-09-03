import EmojiPicker from 'emoji-picker-react';
import { useRef, useMemo, useState, useCallback } from 'react';

import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import { Tooltip } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uuidv4 } from 'src/utils/uuidv4';
import { fSub, today } from 'src/utils/format-time';

import { sendMessage, createConversation } from 'src/actions/chat';

import { Iconify } from 'src/components/iconify';
import { ChooseTemaplte } from 'src/components/flow-nodes/message-type-nodes/hooks/dailogs/flow-start-node-choose-templates-dailog';

import { useMockedUser } from 'src/auth/hooks';

import { AttachFileDialog } from './hooks/attach-file-dailog';
import { QuickRepliesDialog } from './hooks/quick-replies-dailog';

export function ChatMessageInput({
  disabled,
  recipients,
  onAddRecipients,
  selectedConversationId,
}) {
  const router = useRouter();
  const { user } = useMockedUser();
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [dialogType, setDialogType] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State for toggling the emoji picker

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = (type) => {  
    setDialogType(type);
    handleCloseMenu();
  };

  const handleCloseDialog = () => {
    setDialogType(null);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleSelectEmoji = (emoji) => {
    setMessage(prevMessage => prevMessage + emoji.emoji);
  };

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: today(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: fSub({ minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
    handleCloseMenu();
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async (event) => {
      try {
        if (event.key === 'Enter') {
          if (message) {
            if (selectedConversationId) {
              await sendMessage(selectedConversationId, messageData);
            } else {
              const res = await createConversation(conversationData);

              router.push(`${paths.dashboard.inbox}?id=${res.conversation.id}`);

              onAddRecipients([]);
            }
          }
          setMessage('');
        }
      } catch (error) {
        console.error(error);
      }
    },
    [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]
  );

  return (
    <>
      <InputBase
        name="chat-message"
        id="chat-message-input"
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <>
            <IconButton onClick={handleToggleEmojiPicker}>
              <Iconify icon="eva:smiling-face-fill" />
            </IconButton>
            {showEmojiPicker && (
              <div style={{ position: 'absolute', bottom: '60px', left: '20px' }}>
                <EmojiPicker onEmojiClick={handleSelectEmoji} />
              </div>
            )}
          </>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton
              onClick={() => {
                handleSendMessage();
                handleOpenDialog('attach');
              }}
            >
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleSendMessage();
                handleOpenDialog('quick-replies');
              }}
            >
              <Iconify icon="fa6-solid:reply" />
            </IconButton>
            <IconButton
              onClick={() => {
                handleSendMessage();
                handleOpenDialog('template');
              }}
            >
              <Iconify icon="fluent:mail-template-24-filled" />
            </IconButton>
            <IconButton onClick={handleSendMessage} sx={{ color: '#078DEE' }}>
              <Iconify icon="majesticons:send" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Tooltip title="Click here to attach file." arrow placement="left">
                <MenuItem onClick={() => handleOpenDialog('attach')}>Attach File</MenuItem>
              </Tooltip>
              <Tooltip title="Click here to send message from QuicK Replies." arrow placement="left">
                <MenuItem onClick={() => handleOpenDialog('quick-replies')}>Quick Replies</MenuItem>
              </Tooltip>
              <Tooltip title="Click here to select Template." arrow placement="left">
                <MenuItem onClick={() => handleOpenDialog('template')}>Template</MenuItem>
              </Tooltip>
              {/* Add more menu items if needed */}
            </Menu>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.vars.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />

      {dialogType === 'attach' && <AttachFileDialog open onClose={handleCloseDialog} />}
      {dialogType === 'quick-replies' && <QuickRepliesDialog open onClose={handleCloseDialog} />}
      {dialogType === 'template' && <ChooseTemaplte open onClose={handleCloseDialog} />}
      {/* Add more dialogs if needed */}
    </>
  );
}
