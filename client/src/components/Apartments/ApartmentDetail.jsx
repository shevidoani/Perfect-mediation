import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ApartmentDetail = () => {
    const { id } = useParams(); 
    const [apartment, setApartment] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3336/api/apartments/${id}`)
            .then(response => response.json())
            .then(data => setApartment(data))
            .catch(error => console.error('Error fetching apartment:', error));
    }, []); 

    if (!apartment) {
        return <p>Loading...</p>;
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:3336/api/apartments/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
           
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete apartment');
            }
            console.log(`Apartment with ID ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting apartment:', error.message);
        }
    }

    // function updateTodo(updatedObj) {
    //     console.log(updatedObj);
    //      fetch(`http://localhost:3336/todos/${todo.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             "Content-type": "application/json",
    //         },
    //         body: JSON.stringify(updatedObj),
           
    //     })
    //         .then((response) => response.json())
    //         .then((json) => console.log(json));
    // }
    
    async function handleApprove(id) {
        try {
            // let updatedObj = apartment;
            // updatedObj.isApproved=1;
            const { image, type, ...filteredApartment } = apartment;
            filteredApartment.isApproved=1;
            console.log(filteredApartment);
            const updatedObj = {toUpdate:'isApproved',value:1}
            const response = await fetch(`http://localhost:3336/api/apartments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(filteredApartment)
            });
            if (!response.ok) {
                throw new Error('Failed to delete apartment');
            }
            console.log(`Apartment with ID ${id} update successfully`);
        } catch (error) {
            console.error('Error deleting apartment:', error.message);
        }
    }
    return (
        <div>
            <h2>{apartment.city}, {apartment.neighborhood}</h2>
            <p>Street: {apartment.street}</p>
            {apartment.image ? (
                <img
                    src={`data:${apartment.image.contentType};base64,${apartment.image.data}`}
                    alt={apartment.city}
                    style={{ width: '200px', height: 'auto' }}
                />
            ) : (
                <p>No image available</p>
            )}
            <div>
                <button onClick={() => handleDelete(apartment.id)}>Delete</button>
                <button onClick={() => handleApprove(apartment.id)}>Approve</button>
            </div>
        </div>
    );
};

export default ApartmentDetail;

