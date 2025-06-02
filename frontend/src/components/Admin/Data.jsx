import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';

const Data = () => {
  const [userdata, setUserdata] = useState(null); // set to null initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/dashboard');
        setUserdata(response.data); // assuming response.data = { totalUsers, totalStores, totalRatings }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []); // ✅ dependency array to run once on mount

  if (!userdata) {
    return <p className='text-center mt-4'>Loading dashboard data...</p>;
  }

  return (
    <div className='w-full bg-white p-6 rounded-xl shadow-sm'>
  {/* Header Section */}
  <div className='mb-8 text-center'>
    <h1 className='text-3xl font-bold text-blue-800'>Admin Data Management</h1>
    <p className='text-blue-600 mt-2'>Overview of platform statistics</p>
  </div>

  {/* Stats Cards */}
  <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
    {/* Total Users Card */}
    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='flex items-center justify-center mb-4'>
        <div className='p-3 bg-blue-100 rounded-full'>
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
      <h2 className='text-lg font-semibold text-blue-800 text-center mb-1'>Total Users</h2>
      <p className='text-3xl font-bold text-blue-900 text-center'>{userdata.totalUsers}</p>
    </div>

    {/* Total Stores Card */}
    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='flex items-center justify-center mb-4'>
        <div className='p-3 bg-blue-100 rounded-full'>
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
      <h2 className='text-lg font-semibold text-blue-800 text-center mb-1'>Total Stores</h2>
      <p className='text-3xl font-bold text-blue-900 text-center'>{userdata.totalStores}</p>
    </div>

    {/* Total Ratings Card */}
    <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <div className='flex items-center justify-center mb-4'>
        <div className='p-3 bg-blue-100 rounded-full'>
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        </div>
      </div>
      <h2 className='text-lg font-semibold text-blue-800 text-center mb-1'>Total Ratings</h2>
      <p className='text-3xl font-bold text-blue-900 text-center'>{userdata.totalRatings}</p>
    </div>
  </div>
</div>
  );
};

export default Data;
