import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { Box } from '@mui/material';

const codeString = `{
    "Message": "The application processed the request but returned a blank response. Refer to the HTTP status code above for details. The application processed therequest but returned a blank response. Refer to the HTTP status code above for details.",
    "Message": "The application processed the request but returned a blank response. Refer to the HTTP status code above for details. The application processed therequest but returned a blank response. Refer to the HTTP status code above for details.",
    "Message": "The application processed the request but returned a blank response. Refer to the HTTP status code above for details. The application processed therequest but returned a blank response. Refer to the HTTP status code above for details.",
    "Message": "The application processed the request but returned a blank response. Refer to the HTTP status code above for details. The application processed therequest but returned a blank response. Refer to the HTTP status code above for details.",
    "Message": "The application processed the request but returned a blank response. Refer to the HTTP status code above for details. The application processed therequest but returned a blank response. Refer to the HTTP status code above for details.",
  }`;

const CodeViewer = () => (
  <Box
    sx={{
      // height: 'auto',
      // overflowY: '300',
      // overflowX: '300',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#888',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#555',
      },
    }}
  >
    <SyntaxHighlighter
      language="javascript"
      style={atomDark}
      customStyle={{
        borderRadius: '4px',
        padding: '16px',
        fontSize: '14px',
        width: '100%',
        maxWidth: '860px',
        boxSizing: 'border-box',
        minWidth: 'auto', // Optional: set a minimum width
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  </Box>
);

export default CodeViewer;
