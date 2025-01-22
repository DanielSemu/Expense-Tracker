import React, { useEffect,useState } from 'react'
import { getExpenses } from '../../services/expenseServices'
import ReusableTable from '../ui/ReusableTable'
import { FiEye, FiEdit } from "react-icons/fi";

const Expense = () => {
    const [expenses,setExpenses]=useState(null)

    useEffect(()=>{
        const fetchExpenses= async()=>{
            const response=await getExpenses()
            setExpenses(response)
        }
        fetchExpenses()
    },[])

    const columns = [
      { header: "Expense", accessor: "expense" },
      { header: "Category", accessor: "category" },
      { header: "Amount", accessor: "amount" },
      { header: "Date", accessor: "date" },
      {
        header: "Manage",
        accessor: "actions",
        cell: (row) => (
          <div className="actions">
            <button onClick={() => handleDetailStore(row)} className="btn">
              <FiEye />
            </button>
            <button onClick={() => handleEditSupplier(row)} className="btn">
              <FiEdit />
            </button>
            
          </div>
        ),
      },
    ];
  
  return (
    <div className='section container'>
      {expenses &&(
        <ReusableTable
        columns={columns}
        records={expenses}
        addAddress={"/supplier/add"}
        title={"Supplier"}
      />
      )}
      
    </div>
  )
}

export default Expense