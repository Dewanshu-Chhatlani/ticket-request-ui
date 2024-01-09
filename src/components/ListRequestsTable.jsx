import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  TablePagination,
  IconButton,
  Box,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import TicketPopup from "./TicketPopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";
import { fetchTicket } from "../redux/actions/ticketActions";

function ListRequestsTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const tickets = useSelector((state) => state.ticket.ticket);
  const isLoading = useSelector((state) => state.ticket.loading);

  useEffect(() => {
    dispatch(fetchTicket(page + 1, rowsPerPage));
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
    // Perform search/filter logic here based on the searchText
    // This can filter your 'requests' array based on the search text
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDeleteConfirmation = (ticketData) => {
    // Perform ticket save logic using ticketData
    console.log("Ticket Saved:", ticketData);
    setDeleteOpen(false);
  };

  return (
    <Box mt={4} mx={2}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={searchText}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            value={sortBy}
            onChange={handleSortChange}
            label="Sort By"
            sx={{ height: 32, borderRadius: 20 }} // Reduced height
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="userId">Description</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleClickOpen}
          sx={{ borderRadius: 20 }}
        >
          Create Ticket
        </Button>
      </Box>
      <TicketPopup open={open} handleClose={handleClose} />
      <DeleteConfirmationPopup
        open={deleteOpen}
        handleClose={handleDeleteClose}
        handleDelete={handleDeleteConfirmation}
      />
      <Box mb={2}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ backgroundColor: "#1976d2", color: "white" }}>
                <TableRow>
                  <TableCell sx={{ color: "white" }}>Title</TableCell>
                  <TableCell sx={{ color: "white" }}>Description</TableCell>
                  <TableCell sx={{ color: "white" }}>User ID</TableCell>
                  <TableCell sx={{ color: "white" }}>Created at</TableCell>
                  <TableCell sx={{ color: "white" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((request) => (
                  <TableRow
                    key={request.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ py: 1 }}>{request.title}</TableCell>
                    <TableCell sx={{ py: 1 }}>{request.description}</TableCell>
                    <TableCell sx={{ py: 1 }}>{request.user_id}</TableCell>
                    <TableCell sx={{ py: 1 }}>{request.created_at}</TableCell>
                    <TableCell sx={{ py: 1 }}>
                      <IconButton aria-label="view">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={handleDeleteOpen}
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={90}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ListRequestsTable;
