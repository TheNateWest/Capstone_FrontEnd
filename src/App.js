import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Navigation from './Components/Navigation';
import Router from './Router';
import cookie from 'cookie'

function App() {
  const [loggedIn, setLoggedIn] = useState (false)

  const navigate = useNavigate()

  useEffect(()=>{
    const cookies = cookie.parse(document.cookie)
    console.log('these are the current cookies:', cookies)
    if(cookies.token){
      setLoggedIn(true)
      navigate('/home')
    }
  },[navigate])

  useEffect(()=>{
    console.log(loggedIn)
  },[loggedIn])

  return (
    <>
      <Navigation loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
      <Router loggedIn = {loggedIn} setLoggedIn = {setLoggedIn}/>
    </>
  );
}

export default App;
