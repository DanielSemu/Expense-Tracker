import React, { useState, useEffect } from "react";
import { FaCalendar } from "react-icons/fa";
import { getCategory } from "../../services/categoryServices";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { addIncome } from "../../services/incomeServices";

const AddIncome = () => {
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    source: "",
    category: "",
    amount: "",
  });
  const [error, setError] = useState("");

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
    if (!formData.source || !formData.category || !formData.amount) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(formData.amount) || formData.amount <= 0) {
      setError("Amount must be a positive number.");
      return;
    }
    setError("");
    const incomeData = {
      source: formData.source,
      category: formData.category,
      amount: parseFloat(formData.amount),
    };
    try {
      await addIncome(incomeData);
      showSuccessToast("Successfully Added");
    } catch (error) {
      showErrorToast(error);
    }
    setFormData({
      source: "",
      category: "",
      amount: "",
    });
  };

  return (
    <div className="dark">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
        Insert Your Incomes Here
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="source"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Income Source
            </label>
            <input
              type="text"
              id="source"
              value={formData.source}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="income source..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Income Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="" disabled>
                Choose Income Category
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
          Add Income
        </button>
      </form>
    </div>
  );
};

export default AddIncome;
