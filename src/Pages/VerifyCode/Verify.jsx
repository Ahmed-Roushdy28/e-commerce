import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  async function handleVerify(e) {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: code });
      navigate('/resetpassword');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className='text-3xl pb-5'>Enter Verification Code</h1>
      <form onSubmit={handleVerify}>
        <input 
          type="text" 
          className="border border-green-600 p-2 rounded w-full" 
          placeholder="Verification Code" 
          value={code} 
          onChange={(e) => setCode(e.target.value)} 
          required 
        />
        <button type="submit" className="mt-3 bg-green-700 text-white px-5 py-2 rounded">Verify</button>
      </form>
    </div>
  );
}
