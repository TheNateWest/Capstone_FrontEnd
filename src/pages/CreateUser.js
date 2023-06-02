import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import cookie from "cookie";
import axios from "axios";

export default function CreateUser() {
  const navigate = useNavigate()
  const [state, setState] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
  });

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const createUser = (e) => {
    e.preventDefault();
    console.log(state,'state yo')
    axios
      .post("https://capstone-back-end-self.vercel.app/users/register", state)
      .then((response) => {
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 60 * 60 * 24 * 7 });
        navigate("/home")
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <Container maxWidth="sm">
        <form
          className="login-form"
          onSubmit={createUser}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 40,
          }}
        >
          <TextField
                 sx={{backgroundColor:'whitesmoke'}}
                 required
                 onChange={handleTextChange}
                 value={state.username}
                 name="username"
                 label="Username"
                 type="text"
                 />
          <TextField
                 sx={{backgroundColor:'whitesmoke'}}
                 required
                 onChange={handleTextChange}
                 value={state.password}
                 name="password"
                 label="Password"
                 type="password"
                 />
          <TextField
            sx={{backgroundColor:'whitesmoke'}}
            required
            onChange={handleTextChange}
            value={state.email}
            name="email"
            label="Email"
            type="text"
            />
          <TextField
            sx={{backgroundColor:'whitesmoke'}}
            required
            onChange={handleTextChange}
            value={state.fullName}
            name="fullName"
            label="Full Name"
            type="text"
          />
          <Button
            type="submit"
            className="login-button"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </form>
      </Container>
    </div>
  );
}
