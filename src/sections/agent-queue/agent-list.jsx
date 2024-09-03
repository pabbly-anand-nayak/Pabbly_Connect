import styled from '@emotion/styled';
import { useState, useCallback } from 'react';

import { Box, List,Typography, ListItemText, ListItemButton,  } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';



export default function Agentlist({ onItemSelect }) {
  const CustomListItemButton = styled(ListItemButton)(({ theme }) => ({
    
    borderRadius: '6px',
    transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
    padding: '8px 16px', // Adjust as needed
    margin: '2px 0', // Add a small margin to prevent layout shifts

    // Unselected state
    color: '#637381',
    backgroundColor: 'transparent',

    '& .MuiListItemIcon-root': {
      
      color: '#637381',
      transition: 'color 0.2s ease-in-out',
      minWidth: '24px', // Set a fixed minimum width for the icon
      width: '24px', // Set a fixed width for the icon
      height: '24px', // Set a fixed height for the icon
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '16px', // Add some space between icon and text
    },

    '& .MuiListItemText-root': {
      
      margin: 0, // Remove default margins
    },

    // Hover state
    '&:hover': {
      backgroundColor: 'rgba(145, 158, 171, 0.08)',
    },

    // Selected state
    '&.Mui-selected': {
      color: '#1C252E',
      backgroundColor: 'rgba(145, 158, 171, 0.16)',
      '&:hover': {
        backgroundColor: 'rgba(145, 158, 171, 0.24)',
      },
      '& .MuiListItemIcon-root': {
        color: '#1C252E',
      },
    },

    // Prevent text selection on rapid clicks
    userSelect: 'none',

    // Ensure consistent layout
    display: 'flex',
    alignItems: 'center',
  }));
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = useCallback(
    (event, index) => {
      setSelectedIndex(index);
      onItemSelect(index); // Pass the selected index to the parent
    },
    [onItemSelect]
  );
  const dialog = useBoolean();

  return (
    <Box
      sx={{
        backgroundColor:'common.white',
        p:'24px',
        borderRadius:'16px',
        boxShadow: '0px 12px 24px -4px rgba(145, 158, 171, 0.2)',
        width: {
          xs: '100%',
          sm: '100%',
          md: '303px',
        },
      }}
    >
      <Typography fontSize={18} fontWeight={700}>Agents List</Typography>
      <List sx={{ width: '100%' }}>
        {/* Ayush Bisen */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          {/* <ListItemIcon>
            <Iconify icon="mdi:face-agent" width={24} height={24} />
          </ListItemIcon> */}
          <ListItemText
            primary={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
           
                }}
              >
                <span
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Ayush Bisen
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Ankit Mandli */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          {/* <ListItemIcon>
            <Iconify icon="mdi:face-agent" width={24} height={24} />
          </ListItemIcon> */}
          <ListItemText
            primary={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                 
                }}
              >
                <span
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Ankit Mandli
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (23)
                </span>
              </div>
            }
          />
        </CustomListItemButton>

        {/* Nikhil Pate */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          {/* <ListItemIcon>
            <Iconify icon="mdi:face-agent" width={24} height={24} />
          </ListItemIcon> */}
          <ListItemText
            primary={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Nikhil Patel
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>
        {/* Mukesh Raghuwanshi */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          {/* <ListItemIcon>
            <Iconify icon="mdi:face-agent" width={24} height={24} />
          </ListItemIcon> */}
          <ListItemText
            primary={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Mukesh Raghuwanshi
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>
        {/* Rajendra Jatav */}
        <CustomListItemButton
          sx={{
            borderRadius: '6px',
            width: '100%',
          }}
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          {/* <ListItemIcon>
            <Iconify icon="mdi:face-agent" width={24} height={24} />
          </ListItemIcon> */}
          <ListItemText
            primary={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    flexGrow: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  Rajendra Jatav
                </span>
                <span
                  style={{
                    marginLeft: '8px',
                    flexShrink: 0,
                  }}
                >
                  (54)
                </span>
              </div>
            }
          />
        </CustomListItemButton>
      </List>
    </Box>
  );
}
