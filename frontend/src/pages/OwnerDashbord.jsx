import React from 'react'
import { Route, Routes } from 'react-router-dom'
import OwnerStoreDetails from '../components/Owner/OwnerStoreDetails'
import OwnerAddStore from '../components/AddStore/OwnerAddStore'
const OwnerDashbord = () => {

    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className='flex' >
            <div className='w-[400px] min-h-screen bg-blue-900 flex flex-col'>
                
                <div className='p-6 border-b border-blue-700 flex items-center space-x-3'>
                    <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <h1 className='text-2xl font-bold text-white'>Store Dashboard</h1>
                </div>

                
                <nav className='p-4 flex-1'>
                    <ul className='space-y-2'>
                        <li>
                            <a href="/owner" className='flex items-center p-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-all duration-200 group'>
                                <svg className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className='font-medium'>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="/owner/addstore" className='flex items-center p-3 text-blue-100 hover:bg-blue-800 rounded-lg transition-all duration-200 group'>
                                <svg className="w-5 h-5 mr-3 text-blue-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                                <span className='font-medium'>Add Store</span>
                            </a>
                        </li>
                    </ul>
                </nav>

            
            </div>

            <div className='w-full bg-gradient-to-tl from-blue-300 via-blue-50 to-blue-300' >
                <Routes>
                    <Route path='/' element={<OwnerStoreDetails/>} />
                    <Route path='/addstore' element={<OwnerAddStore/>} />
                </Routes>
            </div>

        </div>
  )
}

export default OwnerDashbord
