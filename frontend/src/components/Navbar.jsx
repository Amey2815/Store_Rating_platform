import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiStar, 
  FiShoppingBag, 
  FiAward, 
  FiInfo, 
  FiLogIn, 
  FiLogOut, 
  FiUserPlus 
} from 'react-icons/fi';
const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
<nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-white shadow-lg">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    
    <div className="flex items-center space-x-4">
      <Link 
        to="/" 
        className="flex items-center space-x-2 group"
      >
        <div className="bg-blue-500 p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
          <FiStar className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
          StoreRatings
        </span>
      </Link>
    </div>

    

    
    <div className="flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
              {user.name?.charAt(0) || 'U'}
            </div>
            <span className="text-gray-300">{user.name || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <FiLogOut className="mr-1" />
            <span>Logout</span>
          </button>
        </div>
      ) : (
        <>
          <Link 
            to="/" 
            className="hidden md:inline-flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
          >
            <FiLogIn className="mr-1" />
            <span>Login</span>
          </Link>
          <Link 
            to="/register" 
            className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors shadow-md"
          >
            <FiUserPlus className="mr-1" />
            <span>Register</span>
          </Link>
        </>
      )}
    </div>

    
  </div>

  
</nav>
  );
};

export default Navbar;
