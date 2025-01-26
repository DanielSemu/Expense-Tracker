import React, { useEffect, useState } from 'react'
import { getBudgets } from '../../services/budgetServices'

const Budget = () => {
  const [budgets, setBudgets]=useState([])
  useEffect(() => {
      const fetchBudgets = async () => {
        try {
          const response = await getBudgets();
          console.log(response);
          setBudgets(response)
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
      fetchBudgets();
    }, []);
  return (
    <div>
      {
        budgets &&(
          budgets.map((budget)=><li>{budget.start_date} - {budget.limit} </li>)
        )
      }
    </div>
  )
}

export default Budget
