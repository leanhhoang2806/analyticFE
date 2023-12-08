import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Input, Typography } from '@mui/material';
import { postDocument } from '../api/file-upload-api';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
      alert('Please upload a valid CSV or Excel file under 5 MB.');
    }
  };

  const validateFile = (file) => {
    const allowedTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    return file && allowedTypes.includes(file.type) && file.size <= maxSize;
  };

  const handleUpload = () => {
    setOpenModal(false);
    if (selectedFile) {
      postDocument(selectedFile, getAccessTokenSilently, user );
    } else {
      alert('Please select a valid file before uploading.');
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <Input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <Typography variant="body2" color="textSecondary" mt={2}>
              Selected File: {selectedFile.name}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpload} disabled={!selectedFile}>
            Upload File
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FileUpload;
