import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../redux/actions/signInActions";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const signInError = useSelector((state) => state.auth.error);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    dispatch(signInUser(formData));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (signInError) {
      setOpenSnackbar(true);
    }
  }, [signInError]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Redirect to Dashboard upon successful login
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) {
      navigate("/list-requests");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Sign In
      </Typography>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={signInError}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};

export default SignIn;
