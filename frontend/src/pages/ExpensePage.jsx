import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Expense from '../components/Expenses/Expense'

const ExpensePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Expense/>}/>
      </Routes>
    </div>
  )
}

export default ExpensePage
