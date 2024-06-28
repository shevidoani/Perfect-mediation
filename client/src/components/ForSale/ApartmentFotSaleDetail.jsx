// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ApartmentForSaleDetail = () => {
//     const { id } = useParams();
//     const [apartment, setApartment] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:3336/api/apartments/${id}`)
//             .then(response => response.json())
//             .then(data => setApartment(data))
//             .catch(error => console.error('Error fetching apartment:', error));
//     }, []);

//     if (!apartment) {
//         return <p>Loading...</p>;
//     }


    
//     return (
//         <div>
//             <h2>{apartment.city}</h2>
//             <h2> {apartment.neighborhood}</h2>
//             <p>Street: {apartment.street}</p>
//             <p>size:{apartment.size}</p>
//             <p>price:{apartment.price}</p>
//             <p>numberOfRooms:{apartment.numberOfRooms}</p>
//             <p>description:{apartment.description}</p>
//             <p>hasElevator:{apartment.hasElevator}</p>
//             <p>hasParking:{apartment.hasParking}</p>
//             <p>hasBars:{apartment.hasBars}</p>
//             <p>hasStorage:{apartment.hasStorage}</p>
//             <p>hasAirConditioning:{apartment.hasAirConditioning}</p>
//             <p>hasBalcony:{apartment.hasBalcony}</p>
//             <p>hasMamad:{apartment.hasMamad}</p>
//             <p>isAccessible:{apartment.isAccessible}</p>
//             <p>isFurnished:{apartment.isFurnished}</p>
//             {apartment.image ? (
//                 <img
//                     src={`data:${apartment.image.contentType};base64,${apartment.image.data}`}
//                     alt={apartment.city}
//                     style={{ width: '200px', height: 'auto' }}
//                 />
//             ) : (
//                 <p>No image available</p>
//             )}
//             <div>
//                 {/* <button onClick={() => handleDelete(apartment.id)}>Delete</button>
//                 <button onClick={() => handleApprove(apartment.id)}>Approve</button> */}
//             </div>
//         </div>
//     );
// };

// export default ApartmentForSaleDetail;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

// const ApartmentForSaleDetail = () => {
//     const { id } = useParams();
//     const [ifEmailUser, setIfEmailUser] = useState(false);
//     const [user, setUser] = useState('');
//     const [apartment, setApartment] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:3336/api/apartments/${id}`)
//             .then(response => response.json())
//             .then(data => setApartment(data))
//             .catch(error => console.error('Error fetching apartment:', error));
//     }, [id]);

//     if (!apartment) {
//         return <p>Loading...</p>;
//     }

//     async function handleK(id) {
//         try {
//             const response = await fetch(`http://localhost:3336/api/users/${id}`);
            
//             if (!response.ok) {
//                 throw new Error('Failed to fetch user');
//             }
    
//             const data = await response.json();
//             setUser(data[0]);
//             setIfEmailUser(true);
//             console.log(data[0].email);
//             console.log(`User with ID ${id} successfully fetched`);
//         } catch (error) {
//             console.error('Error fetching user:', error.message);
//         }
//     }
    

//     return (
//         <div className="apartment-details-container">
//             <div className="apartment-details">
//                 <div className="apartment-image">
//                     {apartment.image ? (
//                         <img
//                             src={`data:${apartment.image.contentType};base64,${apartment.image.data}`}
//                             alt={apartment.city}
//                             className="apartment-img"
//                         />
//                     ) : (
//                         <p className="no-image">No image available</p>
//                     )}
//                 </div>
//                 <div className="apartment-info">
//                     <h2 className="apartment-title">{apartment.city}</h2>
//                     <h3 className="apartment-subtitle">{apartment.neighborhood}</h3>
//                     <p className="info-item"><strong>Street:</strong> {apartment.street}</p>
//                     <p className="info-item"><strong>Size:</strong> {apartment.size}</p>
//                     <p className="info-item"><strong>Price:</strong> {apartment.price}</p>
//                     <p className="info-item"><strong>Number of Rooms:</strong> {apartment.numberOfRooms}</p>
//                     <p className="info-item"><strong>Description:</strong> {apartment.description}</p>
//                     <div className="features">
//                         <p className="feature">{apartment.hasElevator ? <i className="fas fa-elevator icon"></i> : <i className="fas fa-ban icon"></i>} Elevator</p>
//                         <p className="feature">{apartment.hasParking ? <i className="fas fa-parking icon"></i> : <i className="fas fa-ban icon"></i>} Parking</p>
//                         <p className="feature">{apartment.hasBars ? <i className="fas fa-glass-martini-alt icon"></i> : <i className="fas fa-ban icon"></i>} Bars</p>
//                         <p className="feature">{apartment.hasStorage ? <i className="fas fa-box-open icon"></i> : <i className="fas fa-ban icon"></i>} Storage</p>
//                         <p className="feature">{apartment.hasAirConditioning ? <i className="fas fa-snowflake icon"></i> : <i className="fas fa-ban icon"></i>} Air Conditioning</p>
//                         <p className="feature">{apartment.hasBalcony ? <i className="fas fa-door-open icon"></i> : <i className="fas fa-ban icon"></i>} Balcony</p>
//                         <p className="feature">{apartment.hasMamad ? <i className="fas fa-shield-alt icon"></i> : <i className="fas fa-ban icon"></i>} Mamad</p>
//                         <p className="feature">{apartment.isAccessible ? <i className="fas fa-wheelchair icon"></i> : <i className="fas fa-ban icon"></i>} Accessible</p>
//                         <p className="feature">{apartment.isFurnished ? <i className="fas fa-couch icon"></i> : <i className="fas fa-ban icon"></i>} Furnished</p>
//                     </div>
//                     <button onClick={() => handleK(apartment.idUser)}>צור קשר</button>
//                     {ifEmailUser&&<h2>{user.email}</h2>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ApartmentForSaleDetail;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faElevator, faParking, faGlassMartiniAlt, faBoxOpen, faSnowflake, faDoorOpen, faShieldAlt, faWheelchair, faCouch, faBan } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

const ApartmentForSaleDetail = () => {
    const { id } = useParams();
    const [ifEmailUser, setIfEmailUser] = useState(false);
    const [user, setUser] = useState('');
    const [apartment, setApartment] = useState(null);
    const [coordinates, setCoordinates] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3336/api/apartments/${id}`)
            .then(response => response.json())
            .then(data => {
                setApartment(data);
                const address = `${data.street} ${data.city}`;
                console.log('Fetching coordinates for address:', address); // Add this line
                fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAPS_API_KEY}`)
                    .then(response => response.json())
                    .then(geoData => {
                        if (geoData.results.length > 0) {
                            const location = geoData.results[0].geometry.location;
                            setCoordinates({ lat: location.lat, lng: location.lng });
                        } else {
                            console.error('No results found for address:', address); // Add this line
                        }
                    })
                    .catch(error => console.error('Error fetching geocode:', error));
            })
            .catch(error => console.error('Error fetching apartment:', error));
    }, [id]);

    if (!apartment) {
        return <p>Loading...</p>;
    }

    async function handleK(id) {
        try {
            const response = await fetch(`http://localhost:3336/api/users/${id}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
    
            const data = await response.json();
            setUser(data[0]);
            setIfEmailUser(true);
            console.log(data[0].email);
            console.log(`User with ID ${id} successfully fetched`);
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }
    }

    return (
        <div className="apartment-details-container">
            {coordinates && (
                <LoadScript googleMapsApiKey={MAPS_API_KEY}>
                    <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '400px' }}
                        center={coordinates}
                        zoom={15}
                    >
                        <Marker position={coordinates} />
                    </GoogleMap>
                </LoadScript>
            )}
            <div className="apartment-details">
                <div className="apartment-image">
                    {apartment.image ? (
                        <img
                            src={`data:${apartment.image.contentType};base64,${apartment.image.data}`}
                            alt={apartment.city}
                            className="apartment-img"
                        />
                    ) : (
                        <p className="no-image">No image available</p>
                    )}
                </div>
                <div className="apartment-info">
                    <h2 className="apartment-title">{apartment.city}</h2>
                    <h3 className="apartment-subtitle">{apartment.neighborhood}</h3>
                    <p className="info-item"><strong>Street:</strong> {apartment.street}</p>
                    <p className="info-item"><strong>Size:</strong> {apartment.size}</p>
                    <p className="info-item"><strong>Price:</strong> {apartment.price}</p>
                    <p className="info-item"><strong>Number of Rooms:</strong> {apartment.numberOfRooms}</p>
                    <p className="info-item"><strong>Description:</strong> {apartment.description}</p>
                    <div className="features">
                        <p className="feature">{apartment.hasElevator ? <FontAwesomeIcon icon={faElevator} /> : <FontAwesomeIcon icon={faBan} />} Elevator</p>
                        <p className="feature">{apartment.hasParking ? <FontAwesomeIcon icon={faParking} /> : <FontAwesomeIcon icon={faBan} />} Parking</p>
                        <p className="feature">{apartment.hasBars ? <FontAwesomeIcon icon={faGlassMartiniAlt} /> : <FontAwesomeIcon icon={faBan} />} Bars</p>
                        <p className="feature">{apartment.hasStorage ? <FontAwesomeIcon icon={faBoxOpen} /> : <FontAwesomeIcon icon={faBan} />} Storage</p>
                        <p className="feature">{apartment.hasAirConditioning ? <FontAwesomeIcon icon={faSnowflake} /> : <FontAwesomeIcon icon={faBan} />} Air Conditioning</p>
                        <p className="feature">{apartment.hasBalcony ? <FontAwesomeIcon icon={faDoorOpen} /> : <FontAwesomeIcon icon={faBan} />} Balcony</p>
                        <p className="feature">{apartment.hasMamad ? <FontAwesomeIcon icon={faShieldAlt} /> : <FontAwesomeIcon icon={faBan} />} Mamad</p>
                        <p className="feature">{apartment.isAccessible ? <FontAwesomeIcon icon={faWheelchair} /> : <FontAwesomeIcon icon={faBan} />} Accessible</p>
                        <p className="feature">{apartment.isFurnished ? <FontAwesomeIcon icon={faCouch} /> : <FontAwesomeIcon icon={faBan} />} Furnished</p>
                    </div>
                    <button onClick={() => handleK(apartment.idUser)}>Contact</button>
                    {ifEmailUser && <h2>{user.email}</h2>}
                </div>
            </div>
        </div>
    );
};

export default ApartmentForSaleDetail;




