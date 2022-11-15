import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../App";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";

import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export default function Reset() {
  const [password, setPassword] = useState("");
  const [cf_password, setCf_password] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { access_token } = useParams();
  // console.log(access_token);

  const handleReset = async (e) => {
    setLoading(true);
    e.preventDefault();
    // console.log(password, cf_password);

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      setLoading(false);
    }

    if (password === cf_password && password !== "" && cf_password !== "") {
      let res = await axios.post(
        `${API_URL}/reset_password`,
        { password: password },
        { headers: { Authorization: access_token } }
      );
      if (res.data.statusCode === 200) {
        navigate("/login");
        alert("Password changed successfully!!");
      } else {
        toast.error(res.data.message);
      }
    } else {
      toast.error("Both Passwords should match");
    }
    setLoading(false);
  };
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Reset Password!!
            </Typography>
            <Box
              component="form"
              onSubmit={handleReset}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="cf_password"
                label="Confirm Password"
                name="cf_password"
                type="password"
                onChange={(e) => setCf_password(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? (
                  <Spinner animation="border" variant="light" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
