import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteDialog({open,handleClose,deleteAction,id}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
       fullWidth
      >
        <DialogTitle id="alert-dialog-title" sx={{fontWeight:600}}>
         Delete Action
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{fontWeight:500}}>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteAction(id)} variant="contained" color="error">Delete</Button>
          <Button onClick={handleClose} variant="contained" color="info">
            Cancle
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}