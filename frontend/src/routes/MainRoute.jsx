import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Home from '../pages/Home'
import { Route, Routes } from 'react-router-dom'
import ExpensePage from '../pages/ExpensePage'
import CategoryPage from '../pages/CategoryPage'
import TransactionPage from '../pages/TransactionPage'

const MainRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
           <Route path='/home' element={<Home/>}/>
           <Route path='/expenses/*' element={<ExpensePage/>}/>
           <Route path='/categories/*' element={<CategoryPage/>}/>
           <Route path='/transactions/*' element={<TransactionPage/>}/>
           
        </Routes>
    </div>
  )
}

export default MainRoute