import React, { useState, useEffect } from "react";
import { getCategory } from "../../services/categoryServices";
import { showErrorToast, showSuccessToast } from "../../utils/toastUtils";
import { addBudget } from "../../services/budgetServices";

const AddBudget = () => {
  const [categories, setCategories] = useState(null);
  const [formData, setFormData] = useState({
    limit: "",
    category: "",
    start_date: "",
    end_date: "",
  });
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

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
    if (!formData.limit || !formData.category ) {
      setError("All fields are required.");
      return;
    }
    if (isNaN(formData.limit) || formData.limit <= 0) {
      setError("Budget Limit must be a positive number.");
      return;
    }
    setError("");
    const budgetData = {
      limit: formData.limit,
      category_id: parseInt(formData.category),
      start_date: formData.start_date,
      end_date:formData.end_date,
    };
    // console.log(budgetData);
    
    try {
      await addBudget(budgetData);
      showSuccessToast("Successfully Added");
    } catch (error) {
      showErrorToast(error);
    }
    setFormData({
      limit: "",
      category: "",
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div className="dark">
      <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl ">
        Plan Your Budget
      </h1>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-5">
            <label
              htmlFor="limit"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Budget Limit
            </label>
            <input
              type="number"
              id="limit"
              value={formData.limit}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="budget limit..."
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
              htmlFor="end_date"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Budget End Date
            </label>
            <input
              type="date"
              id="start_date"
              value={formData.start_date}
              min={today}
              onChange={handleInputChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="end_date"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Budget End Date
            </label>
            <input
              type="date"
              id="end_date"
              value={formData.end_date}
              min={today}
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
          Add Budget
        </button>
      </form>
    </div>
  );
};

export default AddBudget;
