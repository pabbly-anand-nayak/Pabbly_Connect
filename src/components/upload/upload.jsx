import React, { useRef, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

const FileUpload = ({ placeholder, error, disabled, sx, onFileUpload, ...other }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      onFileUpload(file);
    }
    // Reset the file input value to allow selecting the same file again
    event.target.value = '';
  };

  const handleButtonClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'any') {
      setSelectedFile(file);
      onFileUpload(file);
    }
  };

  return (
    <Box
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      sx={{
        padding: '20px 0px 20px 0px',
        width: '100%',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 1,
        alignItems: 'center',
        color: 'text.disabled',
        justifyContent: 'center',
        bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        border: (theme) => `dashed 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.16)}`,
        ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
        ...(error && {
          color: 'error.main',
          borderColor: 'grey',
          bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.08),
        }),
        '&:hover': { opacity: 0.72 },
        ...sx,
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".csv"
        style={{ display: 'none' }}
        {...other}
      />
      <Button size="large" component="span" onClick={handleButtonClick} disabled={disabled}>
        {placeholder || 'Upload File'}
      </Button>
      {selectedFile && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Selected file: {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
