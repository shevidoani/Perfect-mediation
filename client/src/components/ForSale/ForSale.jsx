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
import { useNavigate } from "react-router-dom";
const ForSale = ({ id }) => {
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchApartment = async () => {
            try {
                const response = await fetch(`http://localhost:3336/api/apartments/15`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch apartment');
                }
                const data = await response.json();
                setApartment(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchApartment();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    async function addApartmentForSale(){
                navigate('addApartmentForSale')
            }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!apartment) {
        return <p>Apartment not found</p>;
    }

    return (
        <div>
            <h2>Apartment Details</h2>
            <p>City: {apartment.city}</p>
            <p>Neighborhood: {apartment.neighborhood}</p>
            <p>Street: {apartment.street}</p>
            <p>Size: {apartment.size}</p>
            <p>Price: {apartment.price}</p>
            <p>Description: {apartment.description}</p>
            <img src={`data:image/png;base64,${apartment.image.data}`} alt="Apartment" className='image'/>
            <button onClick={addApartmentForSale}>Adding an apartment for sale</button>
        </div>
    );
};

export default ForSale;


