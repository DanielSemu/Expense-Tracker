import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Categories from '../components/Categories/Categories'

const CategoryPage = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Categories/>}/>
        </Routes>
    </div>
  )
}

export default CategoryPage