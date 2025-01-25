import React, { useEffect, useState } from 'react';
import { editCategory, getCategory } from '../../services/categoryServices';
import { FiEye, FiEdit } from "react-icons/fi";
import ReusableTable from '../ui/ReusableTable'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen]=useState(false)
  const [isEditing, setIsEditing] = useState(false);
  const [selectCategory, setSelectedCategory]=useState([])
  const [formData, setFormData] = useState({});
  


  const openDetailModal = (row) => {
    setSelectedCategory(row);
    setIsEditing(false); // Open in detail mode
    setModalOpen(true);
  };
  const openEditModal = (row) => {
    setSelectedCategory(row);
    setFormData(row); // Use category.id
    setIsEditing(true); // Open in edit mode
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
    setIsEditing(false);
    setFormData({});
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFormSubmit = async () => {
    try {
      await editCategory(selectCategory.id, formData);
  
      // Update the category locally in the state
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectCategory.id ? { ...category, ...formData } : category
        )
      );
  
      closeModal(); // Close the modal
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategory();
        setCategories(response);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const columns = [
        { header: "Name", accessor: "name" },
        { header: "Category Type", accessor: "category_type" },
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
    <div className="container">
      {categories &&(
        <ReusableTable
        columns={columns}
        records={categories}
        addAddress={"/categories/add"}
        title={"Categories"}
      />
      )}
      {
        modalOpen &&(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? "Edit Category" : "Category Details"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>
            </div>
            
            {
              isEditing?(
                <form onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-1">Category Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
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
                      Category_Type
                    </label>
                    <select
                      name="category_type"
                      value={formData.category_type || ""} 
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                    >
                      <option value="" disabled>Select Category Type</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
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
              ):(
                selectCategory &&(
                  <div className="space-y-4">
                  <p>
                    <strong>Category Name:</strong> {selectCategory.name}
                  </p>
                  <p>
                    <strong>Category Type:</strong> {selectCategory.category_type}
                  </p>
                </div>
                )
              )
            }

            </div>
          </div>
        )
      }

    </div>
  );
};

export default Categories;
