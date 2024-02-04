import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, updateTicket } from "../redux/actions/ticketActions";

function TicketPopup({ open, handleClose, mode, ticket }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state?.auth?.user?.user?.role);
  const [ticketData, setTicketData] = useState({
    title: "",
    description: "",
    status: "open",
  });

  useEffect(() => {
    setTicketData({ ...ticket });
  }, [ticket]);

  const displayStatus = (status) => {
    switch (status) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "closed":
        return "Closed";
      default:
        return "";
    }
  };

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
    setTicketData({ title: "", description: "", status: "open" });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40%",
          maxHeight: 600,
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
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          <span style={{ fontWeight: "bold" }}>Ticket Number:</span> #
          {ticketData.id}
        </Typography>
        {mode === "view" ? (
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Title: </span>
            {ticketData.title}
          </Typography>
        ) : (
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
            disabled={mode === "view"}
          />
        )}
        {mode === "view" ? (
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Status: </span>
            {displayStatus(ticketData.status)}
          </Typography>
        ) : (
          <FormControl variant="outlined" sx={{ minWidth: 120, my: 2 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              value={ticketData.status}
              disabled={role !== "admin" || mode === "view"}
              label="Status"
              sx={{ borderRadius: 20 }}
              onChange={handleInputChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        )}
        {mode === "view" ? (
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {ticketData.description}
          </Typography>
        ) : (
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
            disabled={mode === "view"}
          />
        )}
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          <span style={{ fontWeight: "bold" }}>Created at: </span>
          {ticketData.created_at}
        </Typography>
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
