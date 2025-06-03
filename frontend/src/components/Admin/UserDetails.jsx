import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { FiArrowLeft, FiMail, FiHome, FiUser } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/admin/${id}`);
        setUser(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch user', err);
        setError('Failed to load user details');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
        <Link to="/admin/list" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-2" /> Back to users list
        </Link>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">User not found</p>
            </div>
          </div>
        </div>
        <Link to="/admin/list" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
          <FiArrowLeft className="mr-2" /> Back to users list
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/admin/list" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <FiArrowLeft className="mr-2" /> Back to users list
      </Link>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-700 px-6 py-4">
          <div className="flex items-center">
            <div
              className="bg-white rounded-full w-16 h-16 flex items-center justify-center text-blue-700 text-2xl font-bold mr-4"
              aria-label={`Avatar for ${user.name}`}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.name}</h2>
              <p className="text-blue-100">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <FiUser className="mr-2" /> Basic Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-600">Full Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Email Address</p>
                  <p className="font-medium flex items-center">
                    <FiMail className="mr-2 text-blue-500" /> {user.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Role</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      user.role === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <FiHome className="mr-2" /> Address Information
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-blue-600">Address</p>
                  <p className="font-medium flex items-center">
                    <FiHome className="mr-2 text-blue-500" /> {user.address || 'Not specified'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {user.rating !== null && user.rating !== undefined && (
            <div className="mt-6 bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <FaStar className="mr-2" /> Store Rating
              </h3>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) =>
                    i < Math.round(Number(user.rating)) ? (
                      <FaStar key={i} className="text-yellow-500 h-5 w-5" />
                    ) : (
                      <FaRegStar key={i} className="text-gray-300 h-5 w-5" />
                    )
                  )}
                </div>
                <span className="ml-2 text-gray-700">{Number(user.rating).toFixed(1)}/5.0</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
