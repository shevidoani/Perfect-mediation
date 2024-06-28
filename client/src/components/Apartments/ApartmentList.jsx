

import React from 'react';
import { Link } from 'react-router-dom';

const ApartmentList = ({ apartments }) => {
    return (
        <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
            {apartments.length === 0 ? (
                <p>No apartments found.</p>
            ) : (
                apartments.map((apartment, index) => (
                    <div key={apartment.id || index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                        <Link to={`apartmentDetail/${apartment.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h2>{apartment.city}</h2>
                            <p>{apartment.neighborhood}</p>
                            <p>{apartment.street}</p>
                            <p>{apartment.type}</p>
                            {apartment.image ? (
                                <img
                                    src={`data:${apartment.image.contentType};base64,${apartment.image.data}`}
                                    alt={apartment.city}
                                    style={{ width: '200px', height: 'auto' }}
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default ApartmentList;




// import React from 'react';
// import { Link } from 'react-router-dom';

// const ApartmentsList = ({ apartments }) => {
//     return (
//         <div style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
//             <h2>Apartments List</h2>
//             {apartments.length === 0 ? (
//                 <p>No apartments found.</p>
//             ) : (
//                 <ul>
//                     {apartments.map(apartment => (
//                         <li key={apartment.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
//                             <Link to={`apartmentDetail/${apartment.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                 <h3>{apartment.city}, {apartment.neighborhood}</h3>
//                                 <p>Street: {apartment.street}</p>
//                                 {apartment.image ? (
//                                     <img
//                                         src={`http://localhost:3336/api/apartments/image/${apartment.id}`} // שנה כאן לכתובת המתאימה בשרת שלך
//                                         alt={apartment.city}
//                                         style={{ width: '200px', height: 'auto' }}
//                                     />
//                                 ) : (
//                                     <p>No image available</p>
//                                 )}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default ApartmentsList;





