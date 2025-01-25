import React, { useEffect, useState } from "react";
import { editExpense, getExpenses } from "../../services/expenseServices";
import { getCategory } from "../../services/categoryServices";
import ReusableTable from "../ui/ReusableTable";
import { FiEye, FiEdit } from "react-icons/fi";

const Expense = () => {
  const [expenses, setExpenses] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Tracks if the modal is in edit mode
  const [formData, setFormData] = useState({}); // Tracks the form data for editing
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();

        const response = res.filter(
          (category) => category.category_type === "expense"
        );
        setCategories(response);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    const fetchExpenses = async () => {
      const response = await getExpenses();

      const formattedExpenses = response.map((expense) => {
        const date = new Date(expense.date);
        const formattedDate = date.toISOString().split("T")[0];
        // const categoryName=categories.filter((category)=>category.id === expense.category)

        return { ...expense, date: formattedDate };
      });

      setExpenses(formattedExpenses);
    };
    fetchCategories();
    fetchExpenses();
  }, []);

  const openDetailModal = (row) => {
    setSelectedExpense(row);
    setIsEditing(false); // Open in detail mode
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setSelectedExpense(row);
    setFormData(row); // Use category.id
    setIsEditing(true); // Open in edit mode
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExpense(null);
    setIsEditing(false);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value);
    
    setFormData({ ...formData, [name]: value }); 
  };

  const handleFormSubmit = async () => {  
    console.log(formData);
    
    await editExpense(selectedExpense.id, formData);
    closeModal();
  };

  const columns = [
    { header: "Expense", accessor: "expense" },
    { header: "Category", accessor: "category_name" },
    { header: "Amount", accessor: "amount" },
    { header: "Date", accessor: "date" },
    {
      header: "Manage",
      accessor: "actions",
      cell: (row) => (
        <div className="actions">
          <button onClick={() => openDetailModal(row)} className="btn">
            <FiEye />
          </button>
          <button onClick={() => openEditModal(row)} className="btn">
            <FiEdit />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      {expenses && (
        <ReusableTable
          columns={columns}
          records={expenses}
          addAddress={"/expenses/add"}
          title={"Expense"}
        />
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Expense" : "Expense Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>

            {isEditing ? (
              // Edit Form
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Expense</label>
                    <input
                      type="text"
                      name="expense"
                      value={formData.expense || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label
                      className="block font-semibold mb-1"
                      htmlFor="category"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      value={formData.category_id} // Use category.id
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Amount</label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={closeModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFormSubmit}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              // Detail View
              selectedExpense && (
                <div className="space-y-4">
                  <p>
                    <strong>Expense:</strong> {selectedExpense.expense}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedExpense.category_name}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${selectedExpense.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedExpense.date}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
