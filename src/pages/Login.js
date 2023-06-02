import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import cookie from "cookie";
import axios from 'axios';

const Login = (props) => {
  const navigate = useNavigate();

  // const cookies = cookie.parse(document.cookie)
  // if(cookies.token){
  //   navigate("/home")
  // }

  const [error, setError] = useState(false)
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleTextChange = (e) => {
    setError(false)
    const { name, value } = e.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const login = (e) => {
    e.preventDefault();
    axios.post("https://capstone-back-end-self.vercel.app/users/login", {
        username: state.username, 
        password: state.password
    }).then((response) => {
        console.log(response)
        document.cookie = cookie.serialize("token", response.data.token, { maxAge: 60 * 60 * 24 * 7 });
        document.cookie = cookie.serialize("loggedIn", "true", { maxAge: 30 });
        navigate("/home");
    })
    .catch(err => {
      console.log(err, 'in error')
      if(Number(err.response.status) === 400){
        console.log("Wrong Username or Password")
        return setError(true)
      }
    })

  };

  // useEffect(() => {
  //   const cookies = cookie.parse(document.cookie)
  //   if(cookies.token){
  //     navigate("/home")
  //   }
  // }, [])
  return (
    <div className="App">
      <Container maxWidth="sm">
        <form
          className="login-form"
          onSubmit={login}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 40,
          }}
        >
          {error && <p style={{color: "red"}}>Username or Password are incorrect</p>}
          <TextField
            required
            onChange={handleTextChange}
            value={state.username}
            name="username"
            label="Username"
            type="text"
            sx={{backgroundColor:'whitesmoke'}}
          />
          <TextField
            required
            onChange={handleTextChange}
            value={state.password}
            name="password"
            label="Password"
            type="password"
            sx={{backgroundColor:'whitesmoke'}}
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
        <h6>Don't have an account? <Link to="/create-user">Create One!</Link></h6>
      </Container>
    </div>
  );
};

export default Login;

