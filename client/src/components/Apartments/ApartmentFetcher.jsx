

import React, { useState, useEffect } from 'react';
import ApartmentList from './ApartmentList';

const ApartmentFetcher = () => {
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await fetch('http://localhost:3336/api/apartments/isApproved/false');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log("API response data:", data); 
                if (!Array.isArray(data)) {
                    throw new Error('API did not return an array.');
                }
                setApartments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApartments();
    }, []);

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ApartmentList apartments={apartments} />
            )}
        </div>
    );
};

export default ApartmentFetcher;



