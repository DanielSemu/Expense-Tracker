import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Income from '../components/Income/Income'

const IncomePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Income/>}/>
      </Routes>
    </div>
  )
}

export default IncomePage
