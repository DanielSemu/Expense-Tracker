import React, { useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import ReusableTable from '../ui/ReusableTable';
import { getTransaction } from '../../services/transactionService';

const Transaction = () => {
  const [transaction, setTransactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleDetailStore = (row) => {
    setSelectedTransaction(row);
    setModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedTransaction(null); // Clear selected transaction
  };

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
        <div className="action">
          <button onClick={() => handleDetailStore(row)} className="btn">
            <FiEye />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {transaction && (
        <ReusableTable
          columns={columns}
          records={transaction}
          title={"Transaction"}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4 text-center">Transaction Details</h2>
            {selectedTransaction && (
              <div className="space-y-4">
                <p>
                  <strong>Transaction:</strong> {selectedTransaction.name}
                </p>
                <p>
                  <strong>Amount:</strong> {selectedTransaction.amount} birr 
                </p>
                <p>
                  <strong>Date:</strong> {selectedTransaction.date}
                </p>
                <p>
                  <strong>Category:</strong> {selectedTransaction.category}
                </p>
              </div>
            )}
            <div className="mt-6 text-center">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transaction;
