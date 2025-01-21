import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Transaction from '../components/Transaction/Transaction'

const TransactionPage = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Transaction/>}/>
        </Routes>
    </div>
  )
}

export default TransactionPage