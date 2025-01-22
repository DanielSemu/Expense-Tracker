import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Budget from '../components/Budget/Budget'

const BudgetPage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Budget/>}/>
      </Routes>
    </div>
  )
}

export default BudgetPage
