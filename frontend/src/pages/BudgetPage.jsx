import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Budget from '../components/Budget/Budget'
import AddBudget from '../components/Budget/AddBudget'

const BudgetPage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Budget/>}/>
        <Route path='/add' element={<AddBudget/>}/>
      </Routes>
    </div>
  )
}

export default BudgetPage
