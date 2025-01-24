import React, { useState, useEffect } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { addCategory } from "../../services/categoryServices";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    category_type: "",
  });
  const [error, setError] = useState("");

 
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category_type) {
      setError("All fields are required.");
      return;
    }
    
    setError("");
    const categoryData = {
      name: formData.name,
      category_type: formData.category_type,
    };
    try {
      await addCategory(categoryData);
      showSuccessToast("Successfully Added");
    } catch (error) {
      showErrorToast(error);
    }
    setFormData({
      name: "",
      category_type: "",
    });
  };

  return (
    <div className="dark">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
        Insert Your Custom Expense or Income Category Here
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Category Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="category..."
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="category_type"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Category_type
            </label>
            <select
              id="category_type"
              value={formData.category_type}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
                <option value="" disabled>Choose  Category Type</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
