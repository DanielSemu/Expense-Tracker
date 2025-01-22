import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";
import { Route, Routes } from "react-router-dom";
import ExpensePage from "../pages/ExpensePage";
import CategoryPage from "../pages/CategoryPage";
import TransactionPage from "../pages/TransactionPage";
import IncomePage from "../pages/IncomePage";
import BudgetPage from "../pages/BudgetPage";

const MainRoute = () => {
  return (
    <>
      <Navbar/>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <Routes>
            <Route path="/expenses/*" element={<ExpensePage />} />
            <Route path="/categories/*" element={<CategoryPage />} />
            <Route path="/transactions/*" element={<TransactionPage />} />
            <Route path="/income/*" element={<IncomePage/>} />
            <Route path="/budget/*" element={<BudgetPage/>} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default MainRoute;
