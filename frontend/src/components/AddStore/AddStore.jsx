import React, { useState } from 'react'
import axios from '../../utils/axios';
const AddStore = () =>  {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await axios.post('/api/store/add', formData);
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        address: '',
        ownerId: ''
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong';
      setError(errorMsg);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
  <div className="text-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Create New Store</h2>
    <p className="text-gray-500 mt-1">Fill in your store details below</p>
  </div>

  
  {message && (
    <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 rounded">
      <div className="flex items-center">
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {message}
      </div>
    </div>
  )}
  {error && (
    <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
      <div className="flex items-center">
        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {error}
      </div>
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-5">
    
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Store Name <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="name"
          type="text"
          name="name"
          placeholder="My Awesome Store"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
    </div>

    
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Contact Email <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="email"
          type="email"
          name="email"
          placeholder="store@example.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
    </div>

    
    <div>
      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
        Store Address <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="address"
          type="text"
          name="address"
          placeholder="123 Business St, City"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>
    </div>

    
    <div>
      <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
        Owner ID <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          id="ownerId"
          type="text"
          name="ownerId"
          placeholder="USER12345"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          value={formData.ownerId}
          onChange={handleChange}
          required
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
        </div>
      </div>
    </div>

    <div className="pt-2">
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md"
      >
        Create Store
        <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>
    </div>
  </form>
</div>
  );
};

export default AddStore
