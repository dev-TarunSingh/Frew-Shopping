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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    const newUser = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post(import.meta.env.VITE_LOGIN_URL, newUser);
      if (res.status === 200) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Success
          </Alert>
        );
        console.log(res.data);
        setUser(res.data.name);
        setRedirect(true);
      } else if (res.status === 400) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Wrong Password! Please try again.
          </Alert>
        );
      } else if (res.status === 500) {
        setAlert(
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
            Login failed. Please try again.
          </Alert>
        );
      }
    } catch (err) {
      setAlert(
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Login failed. Please try again.
        </Alert>
      );
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

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
      <h1>Login</h1>
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
        autoComplete="on"
      >
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
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/register")}
        >Signup</Button>
      </Box>
    </div>
  );
}
