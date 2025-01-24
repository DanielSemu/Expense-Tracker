import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Income from '../components/Income/Income'
import AddIncome from '../components/Income/AddIncome'

const IncomePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Income/>}/>
        <Route path='/add' element={<AddIncome/>}/>
      </Routes>
    </div>
  )
}

export default IncomePage
