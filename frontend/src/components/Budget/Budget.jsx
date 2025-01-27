import React, { useEffect, useState } from 'react'
import { FiEye, FiEdit } from "react-icons/fi";
import { editBudget, getBudgets } from '../../services/budgetServices'
import ReusableTable from '../ui/ReusableTable';
import { getCategory } from '../../services/categoryServices';

const Budget = () => {
  const [budgets, setBudgets]=useState([])
  const [modalOpen, setModalOpen]=useState(false)
  const [isEditing, setIsEditing]=useState(false)
  const [selectedBudget, setSelectedBudget]=useState([])
   const [formData, setFormData] = useState({
      limit: "",
      category_id: "",
      start_date: "",
      end_date: "",
    });
  const [categories, setCategories]=useState([])



const openEditModal =(row)=>{
    setModalOpen(true)
    setIsEditing(true)
    setSelectedBudget(row)
    setFormData(row)
    console.log(row);
    
  }

  const openDetailModal =(row)=>{
    setModalOpen(true)
    setIsEditing(false)
    setSelectedBudget(row)
  }

  const closeModal =()=>{
    setModalOpen(false);
    setSelectedBudget(null);
    setIsEditing(false);
    setFormData({});
  }
  const handleInputChange =(e)=>{
    const {name, value}=e.target
    setFormData({...formData, [name]:value})
  }

  const handleFormSubmit = async () => {
    const formattedFormData={...formData,category:parseInt(formData.category_id)}
    console.log(formattedFormData);
    // const updatedBudget = {
    //   ...selectedBudget,
    //   ...formData,
    //   category_name: selectedBudget
    //     ? selectedBudget.name
    //     : selectedBudget.category_name, 
    // };
  // console.log(updatedBudget);

  //   const updatedBudgets = budgets.map((budget) =>
  //     budget.id === selectedBudget.id ? updatedBudget : budget
  //   );
  //   setBudgets(updatedBudgets);

    await editBudget(selectedBudget.id, formattedFormData);
    closeModal();
  };

  useEffect(() => {
      const fetchBudgets = async () => {
        try {
          const response = await getBudgets();
          
          const formattedDate=response.map((budget)=>{
            const startDate=new Date(budget.start_date)
            const endDate=new Date(budget.end_date)
            const formattedStartDate=startDate.toISOString().split("T")[0]
            const formattedEndDate=endDate.toISOString().split("T")[0]

            return { ...budget, start_date:formattedStartDate, end_date:formattedEndDate}
          })
          setBudgets(formattedDate)
        } catch (error) {
          console.error('Failed to fetch categories:', error);
        }
      };
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

      fetchCategories()
      fetchBudgets();
    }, []);

      const columns = [
            { header: "Category", accessor: "category_name" },
            { header: "Limit", accessor: "limit" },
            { header: "Start Date", accessor: "start_date" },
            { header: "End Date", accessor: "end_date" },
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
    <div className='container'>
    {budgets &&(
        <ReusableTable
        columns={columns}
        records={budgets}
        addAddress={"/budget/add"}
        title={"Budgets"}
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
                    <label className="block font-semibold mb-1">Budget Limit</label>
                    <input
                      type="text"
                      name="limit"
                      value={formData.limit || ""}
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
                      name="category_id"
                      value={formData.category_id || ""} // Use category_id
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
                    <label className="block font-semibold mb-1">Budget Start Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date || ""}
                      onChange={handleInputChange}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Budget End Date</label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date || ""}
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
              ):(
                selectedBudget &&(
                  <div className="space-y-4">
                  <p>
                    <strong>Category Name:</strong> {selectedBudget.category_name}
                  </p>
                  <p>
                    <strong>Limit Amount:</strong> {selectedBudget.limit}
                  </p>
                  <p>
                    <strong>Budget Start Date:</strong> {selectedBudget.start_date}
                  </p>
                  <p>
                    <strong>Budget End Date:</strong> {selectedBudget.end_date}
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
  )
}

export default Budget
