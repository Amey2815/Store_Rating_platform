import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', password: '', role: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', formData);
      navigate('/');
    } catch (err) {
      setError('Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSignup} className="space-y-4">
        <input name="name" placeholder="Name" className="w-full p-2 border" value={formData.name} onChange={handleChange} required minLength={20} maxLength={60} />
        <input name="email" type="email" placeholder="Email" className="w-full p-2 border" value={formData.email} onChange={handleChange} required />
        <input name="address" placeholder="Address" className="w-full p-2 border" value={formData.address} onChange={handleChange} required maxLength={400} />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 border" value={formData.password} onChange={handleChange} required pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}" />

        <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border" required>
          <option value="" disabled>Select Role</option>
          <option value="user">User</option>
          <option value="owner">Store Owner</option>
        </select>

        <button type="submit" className="bg-green-600 text-white px-4 py-2">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;