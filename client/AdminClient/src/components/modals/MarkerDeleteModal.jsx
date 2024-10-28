
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button,
  Box,
  Typography 
} from '@mui/material';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from "../../config/firebase";
import { toast } from 'sonner';
import { Delete, Login } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../state/userSlice';
import { useNavigate } from 'react-router-dom';

const DeleteMarkerModal = ({ params }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { marker_id: id, description } = params.row;

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setOpen(false);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    
    try {
      // const deleteVal = doc(db, "Markers", id);
      
      const deletePromise = async () => {
        // await deleteDoc(deleteVal);
        console.log("its working!")
        return { success: true };
      };

      toast.promise(deletePromise, {
        loading: 'Deleting marker...',
        success: 'Marker deleted successfully',
        error: 'Failed to delete marker',
      });

      handleClose();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleNavigateToAuth = (e) => {
    e.stopPropagation();
    handleClose();
    navigate('/auth');
  };

  return (
    <>
      <Delete onClick={handleClickOpen} />
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {user ? "Confirm Deletion" : "Authentication Required"}
        </DialogTitle>
        
        {user ? (
          <>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this marker? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose} 
                color="primary"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleDelete} 
                color="error" 
                variant="contained" 
                autoFocus
                disabled={isDeleting}
              >
                Delete
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                <DialogContentText id="alert-dialog-description">
                  This is an admin action. Please log in to delete markers.
                </DialogContentText>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button 
                onClick={handleClose} 
                color="primary"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleNavigateToAuth}
                color="primary" 
                variant="contained" 
                startIcon={<Login />}
                autoFocus
              >
                Go to Login
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default DeleteMarkerModal;