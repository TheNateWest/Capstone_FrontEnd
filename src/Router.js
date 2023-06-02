import React from 'react'
import {Routes, Route} from "react-router-dom"
import CreateUser from './pages/CreateUser'
import Home from './pages/Home'
import Login from './pages/Login'
import MyRecipes from './pages/MyRecipes'

export default function Router({loggedIn, setLoggedIn}) {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home loggedIn = {loggedIn}/>}/>
        <Route path="/create-user" element={<CreateUser/>}/>
        <Route path="/my-recipes" element={<MyRecipes/>}/>
    </Routes>
  )
}
