import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit } from "react-icons/fi";
import ReusableTable from '../ui/ReusableTable'
import { getTransaction } from '../../services/transactionService';

const Transaction = () => {
    const [transaction, setTransactions] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await getTransaction();
          
          setTransactions(response);
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
      fetchCategories();
    }, []);
  
    const columns = [
          { header: "Transaction", accessor: "name" },
          { header: "Amount", accessor: "amount" },
          { header: "Date", accessor: "date" },
          { header: "Category", accessor: "category" },
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
      <div className="container">
        {transaction &&(
          <ReusableTable
          columns={columns}
          records={transaction}
          // addAddress={"/transaction/add"}
          title={"Transaction"}
        />
        )}
        
      </div>
    );
  };
  
export default Transaction