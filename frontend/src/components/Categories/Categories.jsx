import React, { useEffect, useState } from 'react';
import { getCategory } from '../../services/categoryServices';
import { FiEye, FiEdit } from "react-icons/fi";
import ReusableTable from '../ui/ReusableTable'

const Categories = () => {
  const [categories, setCategories] = useState([]);

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
    <div className="section container">
      {categories &&(
        <ReusableTable
        columns={columns}
        records={categories}
        addAddress={"/categories/add"}
        title={"Categories"}
      />
      )}
      

    </div>
  );
};

export default Categories;
