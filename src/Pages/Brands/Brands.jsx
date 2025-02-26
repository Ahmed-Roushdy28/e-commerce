import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function getBrands() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      setBrands(response.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  function openModal(brand) {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  return (
    <>
      <h1 className='text-center pt-5 text-5xl font-bold text-green-600'>All Brands</h1>
      <div className="row flex flex-wrap">
        {brands?.map((brand) => (
          <div key={brand._id} className="w-full lg:w-1/3 md:w-1/2 p-4">
            <div
              className="inner border hover:shadow-[0_0_5px_2px_rgba(34,197,94,0.6)] transition-all duration-500 rounded-lg cursor-pointer"
              onClick={() => openModal(brand)}
            >
              <img src={brand.image} className="w-full h-[250px]" alt={brand.name} />
              <h3 className="text-center pt-3 pb-8 font-semibold text-xl">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
{/* Modal */}
{isModalOpen && (
  <div 
    className="fixed inset-0 flex justify-center items-start pt-20 bg-black bg-opacity-50"
    onClick={closeModal} // Closes modal when clicking outside
  >
    <div 
      className="bg-white p-6 rounded-lg w-[600px] h-[400px] flex flex-col justify-between shadow-lg mx-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close (X) Button */}
      <div className="w-full text-right border-b pb-2">
        <button 
          className="text-gray-600 hover:text-gray-900 text-2xl"
          onClick={closeModal}
        >
          &times;
        </button>
      </div>

      {/* Modal Content */}
      <div className="flex flex-grow w-full">
        {/* Left Side (Text) */}
        <div className="w-1/2 flex flex-col justify-center px-6">
          <h2 className="text-3xl font-bold italic text-green-600 pb-5">
            {selectedBrand?.name}
          </h2>
          <p className="text-gray-600 font-bold text-lg">
            {selectedBrand?.name}
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-1/2 flex items-center justify-center">
          <img 
            src={selectedBrand?.image} 
            alt={selectedBrand?.name} 
            className="w-[300px] h-[190px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Close Button at Bottom (inside modal) */}
      <div className="border-t pt-4 flex justify-center">
        <button 
          className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>
  );
}
