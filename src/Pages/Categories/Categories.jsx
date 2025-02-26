import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => setCategories(response.data.data))
      .catch((err) => console.error(err));
  }

  function getSubCategories(categoryId) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${categoryId}`)
      .then((response) => setSubCategories(response.data.data))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className='row '>
        {categories?.map((category) => (
          <div key={category._id} className="w-full lg:w-1/3 md:w-1/2 px-6 py-4">
            <div
              className="category shadow-lg transition-all duration-300 hover:shadow-green-300 flex flex-col border items-center justify-center cursor-pointer"
              onClick={() => {
                setSelectedCategory(category);
                getSubCategories(category._id);
              }}
            >
              <img className='w-full h-[300px] object-cover' src={category.image} alt={category.name} />
              <h2 className='text-3xl font-semibold text-green-600 text-center pt-2 pb-4'>{category.name}</h2>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="py-6 text-green-600 text-center">
          <h2 className='text-4xl font-semibold'>{selectedCategory.name} Subcategories</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {subCategories.length > 0 ? (
              subCategories.map((sub) => (
                <div key={sub._id} className="border p-4 rounded-lg shadow-md w-1/4 text-center">
                  <h3 className="text-xl font-medium">{sub.name}</h3>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-500">No subcategories found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
