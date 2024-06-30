



import React, { useState, useEffect } from 'react';
import ForRentList from './ForRentList';
import { useNavigate } from "react-router-dom";
const ForRent = () => {
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const type='for rent'
                const response = await fetch(`http://localhost:3336/api/apartments/typeApartment/${type}`);
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

    async function addApartmentForRent() {
        const type='rent';
        navigate(`addApartment/${type}`);
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ForRentList apartments={apartments} />
            )}
            <button onClick={addApartmentForRent}>Adding an apartment for rent</button>
        </div>
    );
};

export default ForRent;






