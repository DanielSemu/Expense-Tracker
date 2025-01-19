import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import ExpensePage from '../pages/ExpensePage'

const MainRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
           <Route path='/home' element={<Home/>}/>
           <Route path='/expenses/*' element={<ExpensePage/>}/>
           
        </Routes>
    </div>
  )
}

export default MainRoute