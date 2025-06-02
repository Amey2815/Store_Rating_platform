import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
const UserList = () => {

  const [userdata, setUserdata] = useState(null); // set to null initially

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/list');
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
    <div className="min-h-screen bg-blue-50 p-6">
  <div className="max-w-6xl mx-auto">
    <h1 className='text-3xl font-bold text-center mb-8 text-blue-800'>User Management</h1>
    
    {/* Header Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-blue-600 text-white rounded-t-lg shadow-md">
      <h3 className="font-semibold">Name</h3>
      <h3 className="font-semibold">Email</h3>
      <h3 className="font-semibold">Address</h3>
      <h3 className="font-semibold">Role</h3>
    </div>
    
    {/* User Rows */}
    <div className="divide-y divide-blue-200">
      {userdata.map((user) => (
        <div 
          key={user._id} 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white hover:bg-blue-50 transition-colors duration-200"
        >
         
          <div className="flex items-center">
            <span className=" w-8 h-8 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-3">
              {user.name.charAt(0)}
            </span>
            <h3 className="font-medium text-blue-900">{user.name}</h3>
          </div>
          <p className="text-blue-800 flex items-center">{user.email}</p>
          <p className="text-blue-700 flex items-center">{user.address || 'N/A'}</p>
          <div className="flex items-center">
            <span className={`px-3 py-1 rounded-full text-sm ${
              user.role === 'admin' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-blue-50 text-blue-600'
            }`}>
              {user.role}
            </span>
          </div>
        </div>
      ))}
    </div>
    
    {/* Footer */}
    <div className="bg-blue-600 text-white p-3 rounded-b-lg shadow-md text-center">
      <p>{userdata.length} users found</p>
    </div>
  </div>
</div>
  )
}

export default UserList
