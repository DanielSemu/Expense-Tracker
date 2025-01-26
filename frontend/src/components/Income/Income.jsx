import React, { useEffect, useState } from "react";
import { getCategory } from "../../services/categoryServices";
import ReusableTable from "../ui/ReusableTable";
import { FiEye, FiEdit } from "react-icons/fi";
import { getIncome, editIncome } from "../../services/incomeServices";

const Income = () => {
  const [incomes, setIncome] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Tracks if the modal is in edit mode
  const [formData, setFormData] = useState({}); // Tracks the form data for editing
  const [categories, setCategories] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await getCategory();

      const response = res.filter(
        (category) => category.category_type === "income"
      );
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const fetchIncomes = async () => {
    const response = await getIncome();

    const formattedIncomes = response.map((income) => {
      const date = new Date(income.date);
      const formattedDate = date.toISOString().split("T")[0];
      // const categoryName=categories.filter((category)=>category.id === income.category)

      return { ...income, date: formattedDate };
    });

    setIncome(formattedIncomes);
  };
  useEffect(() => {
    fetchCategories();
    fetchIncomes();
  }, []);

  const openDetailModal = (row) => {
    setSelectedIncome(row);
    setIsEditing(false); // Open in detail mode
    setModalOpen(true);
  };

  const openEditModal = (row) => {
    setSelectedIncome(row);
    setFormData(row); // Use category.id
    setIsEditing(true); // Open in edit mode
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedIncome(null);
    setIsEditing(false);
    setFormData({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async () => {
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(formData.category)
    );

    const updatedIncome = {
      ...selectedIncome,
      ...formData,
      category_name: selectedCategory
        ? selectedCategory.name
        : selectedIncome.category_name, 
    };
    const updatedIncomes = incomes.map((income) =>
      income.id === selectedIncome.id ? updatedIncome : income
    );
    setIncome(updatedIncomes);
    
    await editIncome(selectedIncome.id, formData);
    closeModal();
  };

  const columns = [
    { header: "Source", accessor: "source" },
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
      {incomes && (
        <ReusableTable
          columns={columns}
          records={incomes}
          addAddress={"/income/add"}
          title={"Income"}
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
                    <label className="block font-semibold mb-1">Income Source</label>
                    <input
                      type="text"
                      name="source"
                      value={formData.source || ""}
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
                      value={formData.category || ""} // Use category_id
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
              selectedIncome && (
                <div className="space-y-4">
                  <p>
                    <strong>Income:</strong> {selectedIncome.source}
                  </p>
                  <p>
                    <strong>Category:</strong> {selectedIncome.category_name}
                  </p>
                  <p>
                    <strong>Amount:</strong> ${selectedIncome.amount}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedIncome.date}
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

export default Income;
