import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createTicket, updateTicket } from "../redux/actions/ticketActions";

function TicketPopup({ open, handleClose, mode, ticket }) {
  const dispatch = useDispatch();
  const [ticketData, setTicketData] = useState({ title: "", description: "" });

  useEffect(() => {
    setTicketData({ ...ticket });
  }, [ticket]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSave = () => {
    if (mode === "create") {
      dispatch(createTicket(ticketData));
    } else if (mode === "edit") {
      dispatch(updateTicket(ticketData));
    }
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
      <DialogTitle>
        {mode === "create"
          ? "Create New Ticket"
          : mode === "edit"
          ? "Edit Ticket"
          : "View Ticket"}
      </DialogTitle>
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
      {mode === "create" || mode === "edit" ? (
        <DialogActions>
          <Button onClick={closePopup}>Cancel</Button>
          <Button
            onClick={() => handleSave(ticketData)}
            variant="contained"
            color="primary"
          >
            {mode === "create" ? "Save" : "Update"}
          </Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}

export default TicketPopup;
