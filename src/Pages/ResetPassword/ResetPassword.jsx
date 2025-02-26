import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const email = localStorage.getItem('resetEmail');

  async function handleReset(e) {
    e.preventDefault();
    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email,
        newPassword: password
      });
      localStorage.removeItem('resetEmail');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className='text-3xl pb-5'>Enter Your New Password</h1>
      <form onSubmit={handleReset}>
        <input 
          type="password" 
          className="border border-green-600 p-2 rounded w-full" 
          placeholder="New Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit" className="mt-3 bg-green-700 text-white px-5 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
