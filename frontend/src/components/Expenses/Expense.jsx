import React, { useEffect,useState } from 'react'
import { getExpenses } from '../../services/expenseServices'

const Expense = () => {
    const [expenses,setExpenses]=useState(null)

    useEffect(()=>{
        const fetchExpenses= async()=>{
            const response=await getExpenses()
            setExpenses(response)
        }
        fetchExpenses()
    },[])

  return (
    <div className='section container'>
      Hello From Expense

      <ul>
    {
        expenses && expenses.map((expense, index) => (
            <li key={index}>{expense.expense}- {expense.amount}- {expense.date}</li>
        ))
    }
</ul>

    </div>
  )
}

export default Expense