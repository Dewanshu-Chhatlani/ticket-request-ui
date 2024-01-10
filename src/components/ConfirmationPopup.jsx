import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmationPopup({ open, handleClose, handleConfirmation, mode }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent dividers>
        <p>
          Are you sure you want to {mode === "delete" ? "delete" : "clone"}?
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleConfirmation}
          variant="contained"
          color={mode === "delete" ? "error" : "warning"}
        >
          {mode === "delete" ? "Delete" : "Clone"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationPopup;
