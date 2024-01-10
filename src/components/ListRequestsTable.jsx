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
  FileCopy as CloneIcon,
} from "@mui/icons-material";

import TicketPopup from "./TicketPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import {
  fetchTicket,
  deleteTicket,
  cloneTicket,
} from "../redux/actions/ticketActions";

function ListRequestsTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [recordForAction, setRecordForAction] = useState({});
  const [mode, setMode] = useState("");

  const { admin } = useSelector((state) => state?.auth?.user?.user);
  const tickets = useSelector((state) => state.ticket.ticket);
  const totalCount = useSelector((state) => state.ticket.total_count);
  const isLoading = useSelector((state) => state.ticket.loading);

  useEffect(() => {
    dispatch(fetchTicket(page + 1, rowsPerPage, sortBy, searchValue));
  }, [dispatch, page, rowsPerPage, sortBy, searchValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    setPage(0);
    setSearchValue(searchText);
  };

  const handleSortChange = (event) => {
    setPage(0);
    setSortBy(event.target.value);
    setSearchValue(searchText);
  };

  const handleCreateButton = () => {
    setOpen(true);
    setMode("create");
    setRecordForAction({ title: "", description: "" });
  };

  const handleEditButton = (ticket) => {
    setOpen(true);
    setMode("edit");
    setRecordForAction(ticket);
  };

  const handleViewButton = (ticket) => {
    setOpen(true);
    setMode("view");
    setRecordForAction(ticket);
  };

  const handleDeleteButton = (ticket) => {
    setConfirmationOpen(true);
    setMode("delete");
    setRecordForAction(ticket);
  };

  const handleCloneButton = (ticket) => {
    setConfirmationOpen(true);
    setMode("clone");
    setRecordForAction(ticket);
  };

  const handlePopupClose = () => {
    setOpen(false);
    setRecordForAction({});
    setMode("");
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setMode("");
    setRecordForAction({});
  };

  const handleConfirmation = () => {
    if (mode === "delete") {
      dispatch(deleteTicket(recordForAction));
    } else if (mode === "clone") {
      dispatch(cloneTicket(recordForAction));
    }
    handleConfirmationClose();
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
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
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
            <MenuItem value="description">Description</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddCircleOutlineIcon />}
          onClick={handleCreateButton}
          sx={{ borderRadius: 20 }}
        >
          Create Ticket
        </Button>
      </Box>
      <TicketPopup
        open={open}
        handleClose={handlePopupClose}
        mode={mode}
        ticket={recordForAction}
      />
      <ConfirmationPopup
        open={confirmationOpen}
        handleClose={handleConfirmationClose}
        handleConfirmation={handleConfirmation}
        mode={mode}
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
                {tickets.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ py: 1 }}>{ticket.title}</TableCell>
                    <TableCell sx={{ py: 1 }}>{ticket.description}</TableCell>
                    <TableCell sx={{ py: 1 }}>{ticket.user_id}</TableCell>
                    <TableCell sx={{ py: 1 }}>{ticket.created_at}</TableCell>
                    <TableCell sx={{ py: 1 }}>
                      <IconButton
                        aria-label="view"
                        onClick={() => handleViewButton(ticket)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditButton(ticket)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteButton(ticket)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      {admin && (
                        <IconButton
                          aria-label="clone"
                          onClick={() => handleCloneButton(ticket)}
                        >
                          <CloneIcon />
                        </IconButton>
                      )}
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
        count={totalCount || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default ListRequestsTable;
