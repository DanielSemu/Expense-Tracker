import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Categories from '../components/Categories/Categories'
import AddCategory from '../components/Categories/AddCategory'

const CategoryPage = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Categories/>}/>
            <Route path='/add' element={<AddCategory/>}/>
        </Routes>
    </div>
  )
}

export default CategoryPage