import React, { useEffect,useState } from 'react'
import { getExpenses } from '../../services/expenseServices'
import ReusableTable from '../ui/ReusableTable'
import { FiEye, FiEdit } from "react-icons/fi";
import { getIncome } from '../../services/incomeServices';

const Income = () => {
    const [incomes,setIncomes]=useState(null)

    useEffect(()=>{
        const fetchExpenses= async()=>{
            const response=await getIncome()
            console.log(response);
            
            setIncomes(response)
        }
        fetchExpenses()
    },[])

    const columns = [
      { header: "Source", accessor: "source" },
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
    <div className='container'>
      {incomes &&(
        <ReusableTable
        columns={columns}
        records={incomes}
        addAddress={"/income/add"}
        title={"Income"}
      />
      )}
      
    </div>
  )
}

export default Income 