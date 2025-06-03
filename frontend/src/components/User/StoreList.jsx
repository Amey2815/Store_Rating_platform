import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { FiStar, FiHome } from 'react-icons/fi';
import RateStore from './RateStore';

const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState('');
    const [searchAddress, setSearchAddress] = useState('');
    const [error, setError] = useState(null);

    const fetchStores = async () => {
        try {
            const res = await axios.get('/api/store/details', {
                params: {
                    name: searchName,
                    address: searchAddress
                }
            });
            setStores(res.data.enriched);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch store details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchStores();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Explore Stores</h2>

            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="border rounded px-3 py-2 w-1/2"
                />
                <input
                    type="text"
                    placeholder="Search by address"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    className="border rounded px-3 py-2 w-1/2"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </form>

            {loading ? (
                <p>Loading stores...</p>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : stores.length === 0 ? (
                <p>No stores found.</p>
            ) : (
                <div className="space-y-4">
                    {stores.map((store) => (
                        <div key={store._id} className="bg-white shadow rounded p-4">
                            <h3 className="text-xl font-semibold">{store.name}</h3>
                            <p className="text-gray-600 flex items-center">
                                <FiHome className="mr-1" /> {store.address}
                            </p>
                            <div className="mt-2 flex items-center">
                                <span className="text-yellow-500 flex items-center mr-4">
                                    <FiStar className="mr-1" />
                                    Avg: {store.averageRating}/5
                                </span>
                                <span className="text-gray-500">
                                    {store.userRatings}
                                </span>
                            </div>
                            

                            <RateStore
                                storeId={store._id}
                                currentRating={store.userRatings}
                                refresh={fetchStores}
                            />

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StoreList;
