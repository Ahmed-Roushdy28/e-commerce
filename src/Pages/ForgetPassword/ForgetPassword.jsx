import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', { email });
      localStorage.setItem('resetEmail', email); // Store email for verification step
      navigate('/verify');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h1 className='text-3xl pb-5'>Please enter your Email</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          className="border border-green-600 p-2 rounded w-full" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <button type="submit" className="mt-3 bg-green-700 text-white px-5 py-2 rounded">Submit</button>
      </form>
    </div>
  );
}
