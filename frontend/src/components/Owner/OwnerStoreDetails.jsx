import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FiStar , FiSettings } from 'react-icons/fi';
import { useAuth } from '../../auth/AuthContext';
const OwnerStoreDetails = () => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get('/api/store/owner/mystore');
        setStoreData(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load store data');
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;
  if (!storeData) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
 
  <div className="text-center mb-8">
    <h2 className="text-3xl font-bold text-gray-800">My Store Dashboard</h2>
    <p className="text-gray-600 mt-2">Manage and view your store performance</p>
  </div>

 
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{storeData?.store || 'My Store'}</h3>
          <div className="mt-2 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`h-5 w-5 ${
                    i < Math.floor(Number(storeData?.averageRating) || 0) 
                      ? 'text-yellow-500 fill-yellow-500' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-700 font-medium">
              {typeof storeData?.averageRating === 'number' 
                ? storeData.averageRating.toFixed(1) 
                : '0.0'} average rating 
              ({storeData?.ratings?.length || 0} reviews)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Customer Ratings</h3>
        <div className="text-sm text-gray-500">
          Sorted by: <span className="font-medium">Most Recent</span>
        </div>
      </div>

      {!storeData?.ratings || storeData.ratings.length === 0 ? (
        <div className="text-center py-8">
          <FiStar className="mx-auto h-12 w-12 text-gray-300" />
          <h4 className="mt-2 text-lg font-medium text-gray-700">No ratings yet</h4>
          <p className="mt-1 text-gray-500">Your store hasn't received any ratings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {storeData.ratings.map((rating, index) => (
            <div key={index} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {rating?.user?.charAt(0) || 'U'}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">{rating.user || 'Anonymous'}</h4>
                    <span className="text-xs text-gray-500">
                      {rating.date ? new Date(rating.date).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{rating.email || ''}</p>
                  <div className="mt-1 flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FiStar 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < (Number(rating.rating) || 0) 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-700">
                      {typeof rating.rating === 'number' 
                        ? rating.rating.toFixed(1) 
                        : '0.0'}
                    </span>
                  </div>
                  {rating.comment && (
                    <p className="mt-2 text-gray-700 italic">"{rating.comment}"</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h4 className="text-sm font-medium text-gray-500">Total Ratings</h4>
      <p className="text-2xl font-bold text-gray-800">
        {storeData?.ratings?.length || 0}
      </p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h4 className="text-sm font-medium text-gray-500">Average Rating</h4>
      <p className="text-2xl font-bold text-gray-800">
        {typeof storeData?.averageRating === 'number' 
          ? storeData.averageRating.toFixed(1) 
          : '0.0'}/5
      </p>
    </div>
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h4 className="text-sm font-medium text-gray-500">5-Star Ratings</h4>
      <p className="text-2xl font-bold text-gray-800">
        {storeData?.ratings?.filter(r => Number(r.rating) === 5).length || 0}
      </p>
    </div>
  </div>
</div>
  );
};

export default OwnerStoreDetails;
