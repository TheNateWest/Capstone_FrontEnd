import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import cookie from 'cookie'

const Navigation = (props) => {
    const navigate = useNavigate()

 const handleLogOut = () => {
    document.cookie = cookie.serialize("token", null, {
        maxAge: 0,
      });
      props.setLoggedIn(false)
      navigate("/");
 }   

  return (
    <AppBar position="relative" className="navigation">
      <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: "1" }}>
          MeSoHungry.com
        </Typography>
        <div className="nav-list" style={{ display: "flex" }}>
          <Link to="/home" style={{ marginRight: 20 }}>
            Home
          </Link>
          {props.loggedIn && (
          <Link to="/my-recipes" style={{ marginRight: 20 }}>
            My Recipes
          </Link>
            
          )}
            {props.loggedIn?(
                <Link to="/" style={{marginRight: 20}} onClick={() => handleLogOut()}>LogOut</Link>           
                 ):(
                
                <Link to="/" style={{marginRight: 20}}>Login</Link>
            )}
          
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
