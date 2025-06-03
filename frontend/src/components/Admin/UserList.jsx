import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
const UserList = () => {

  const [userdata, setUserdata] = useState(null); 

  const [copied, setCopied] = useState(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(user._id).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); 
  });
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/list');
        setUserdata(response.data); 
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, []); 

  if (!userdata) {
    return <p className='text-center mt-4'>Loading dashboard data...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
  <div className="max-w-6xl mx-auto">
    <h1 className='text-3xl font-bold text-center mb-8 text-blue-800'>User Management</h1>
    
    
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-blue-600 text-white rounded-t-lg shadow-md">
      <h3 className="font-semibold text-center ">Name</h3>
      <h3 className="font-semibold text-center ">Email</h3>
      <h3 className="font-semibold text-center ">Address</h3>
      <h3 className="font-semibold text-center ">Role</h3>
      <h3 className="font-semibold text-center ">id</h3>
    </div>
    
   
    <div className="divide-y divide-blue-200">
      {userdata.map((user) => (
        <div 
          key={user._id} 
          className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-white hover:bg-blue-50 transition-colors duration-200"
        >
         
          <div className="flex items-center cursurpointer">
            <a className='flex items-center' href={`/admin/list/${user._id}`}>
            
            <h3 className="font-medium text-blue-900">{user.name}</h3>
            </a>
            
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
          <p className="text-blue-800 flex items-center">{user._id}</p>
        </div>
      ))}
    </div>
    
    
    <div className="bg-blue-600 text-white p-3 rounded-b-lg shadow-md text-center">
      <p>{userdata.length} users found</p>
    </div>
  </div>
</div>
  )
}

export default UserList
