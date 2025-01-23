import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Expense from '../components/Expenses/Expense'
import AddExpense from '../components/Expenses/AddExpense'

const ExpensePage = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Expense/>}/>
        <Route path='/add' element={<AddExpense/>}/>
      </Routes>
    </div>
  )
}

export default ExpensePage
