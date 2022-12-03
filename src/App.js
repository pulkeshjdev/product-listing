import React, { useState } from 'react';
import '../src/css/App.css';
import ProductList from './components/productList';
import Sidenav from './components/sidenav';

export default function App() {

  let [categories, setCategories] = useState([]);
  let [brands, setBrands] = useState([]);
  let [filter, setFilter] = useState({ "category": [], "brand": [], "sort": "" });

  const updateFilter = (uniqueCategory, uniqueBrand) => {
    setCategories(uniqueCategory);
    setBrands(uniqueBrand);
  }

  const updateFilters = (category, brand, sort = "") => {
    setFilter({ category: [...category], brand: [...brand], sort: sort });
  }

  return (
    <main>
      <Sidenav
        className="sidenav"
        categories={categories}
        brands={brands}
        updateFilters={updateFilters}
      />
      <ProductList
        updateFilter={updateFilter}
        filter={filter}
      />
    </main>
  )
}
