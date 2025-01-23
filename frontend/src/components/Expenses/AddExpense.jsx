import React, { useState, useEffect } from "react";
import { FaCalendar } from "react-icons/fa";
import { getCategory } from "../../services/categoryServices";
import { addExpense } from "../../services/expenseServices";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";

const AddExpense = () => {
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    expense: "",
    category: "",
    amount: "",
  });
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    if (!formData.expense || !formData.category || !formData.amount) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(formData.amount) || formData.amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    setError("");
    const expenseData = {
      expense: formData.expense,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };
    try {
      await addExpense(expenseData);
      showSuccessToast("Successfully Added");
    } catch (error) {
      showErrorToast(error);
    }
    setFormData({
      expense: "",
      category: "",
      amount: "",
    });
  };

  return (
    <div className="dark">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
        Insert Your Expenses Here
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="expense"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Expense
            </label>
            <input
              type="text"
              id="expense"
              value={formData.expense}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="expense..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Expense Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>
                Choose Expense Category
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-5">
            <label
              htmlFor="amount"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
