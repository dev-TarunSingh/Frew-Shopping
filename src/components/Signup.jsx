import * as React from "react";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { userContext } from "../context/userContext";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Signup() {
  const { setUser } = useContext(userContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleSignup = async () => {
    const newUser = {
      name: name,
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(import.meta.env.VITE_SIGNUP_URL, newUser);
      if (res.status === 200) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Signup successful. Please login.
          </Alert>
        );
        setRedirect(true);
      } else if (res.status === 400) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
            Already Signed Up. Please login.
          </Alert>
        );
      } else if (res.status === 500) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Signup failed. Please try again.
          </Alert>
        );
      }
    } catch (err) {
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Signup failed. Please try again.
        </Alert>
      );
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="signup"
    >
      <h1>Signup</h1>
      {alert}
      <Box
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name"
          required
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          required
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          required
          type="password"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleSignup}>
          Signup
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/login")}
        >Login</Button>
      </Box>
    </div>
  );
}