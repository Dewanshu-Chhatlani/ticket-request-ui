import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../redux/actions/authActions";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const signUpError = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(signUpUser(formData));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { first_name, last_name, email, password } = formData;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (signUpError) {
      setOpenSnackbar(true);
    }
  }, [signUpError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      navigate("/list-requests");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="first_name"
          name="first_name"
          label="First Name"
          variant="outlined"
          margin="normal"
          value={first_name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          id="last_name"
          name="last_name"
          label="Last Name"
          variant="outlined"
          margin="normal"
          value={last_name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handleInputChange}
          fullWidth
          required
        />
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        ) : (
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        )}
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={signUpError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};

export default SignUp;
