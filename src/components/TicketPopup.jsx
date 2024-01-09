import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createTicket } from "../redux/actions/ticketActions";

function TicketPopup({ open, handleClose }) {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState({ title: "", description: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSave = () => {
    dispatch(createTicket(ticketData));
    closePopup();
  };

  const closePopup = () => {
    handleClose();
    setTicketData({ title: "", description: "" });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40%",
          maxHeight: 450,
        },
      }}
      maxWidth="md"
    >
      <DialogTitle>Create New Ticket</DialogTitle>
      <DialogContent dividers>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          value={ticketData.title}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={ticketData.description}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup}>Cancel</Button>
        <Button
          onClick={() => handleSave(ticketData)}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TicketPopup;
