import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'

const MainRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
           <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
  )
}

export default MainRoute