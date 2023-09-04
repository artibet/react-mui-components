import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

export const ConfirmationDialog = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'ΕΠΙΒΕΒΑΙΩΣΗ',
    cancelText = 'ΑΚΥΡΩΣΗ'
}) => {

    // ---------------------------------------------------------------
    // JSX
    // ---------------------------------------------------------------
    return (
        <Dialog
            open={open}
            onClose={() => { }}    // Prevent closing on backdrop click and esc
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="success" onClick={onConfirm}>{confirmText}</Button>
                <Button color="error" onClick={onCancel}>{cancelText}</Button>
            </DialogActions>
        </Dialog>
    )
}


