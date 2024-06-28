// import React from "react"
// import { useNavigate } from "react-router-dom";
// export default function ForSale() {
//     const navigate = useNavigate();
//     async function addApartmentForSale(){
//         navigate('addApartmentForSale')
//     }
//     return (<>
//         <h2>for sale</h2> 

//         <button onClick={addApartmentForSale}>Adding an apartment for sale</button>
//     </>);
// }



import React, { useState, useEffect } from 'react';
import ForSaleList from './ForSaleList';
import { useNavigate } from "react-router-dom";
const ForSale = () => {
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const type='for sale'
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

    async function addApartmentForSale() {
        navigate('addApartmentForSale')
    }

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ForSaleList apartments={apartments} />
            )}
            <button onClick={addApartmentForSale}>Adding an apartment for sale</button>
        </div>
    );
};

export default ForSale;






