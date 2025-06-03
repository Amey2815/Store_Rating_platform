import React, { useState } from 'react';
import axios from '../../utils/axios';
import { FiStar } from 'react-icons/fi';

const RateStore = ({ storeId, currentRating, refresh }) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const submitRating = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/store/${storeId}`, { rating });
      setMessage('Rating submitted!');
      refresh(); // trigger parent to refetch
    } catch (err) {
      setMessage('Error submitting rating');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className={`h-6 w-6 cursor-pointer ${
              (hover || rating) >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <button
        onClick={submitRating}
        disabled={loading || rating === 0}
        className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Rating'}
      </button>
      {message && <p className="text-sm mt-1">{message}</p>}
    </div>
  );
};

export default RateStore;
