// import React, { useState } from "react";
// // import { FileUpload } from 'primereact/fileupload';
// import './addApartment.css'
// export default function AddApartmentForSale() {
//     const [city, setCity] = useState('');
//     const [neighborhood, setNeighborhood] = useState('');
//     const [street, setStreet] = useState('');
//     const [size, setSize] = useState('');
//     const [price, setPrice] = useState('');
//     const [numberOfRooms, setNumberOfRooms] = useState('');
//     const [description, setDescription] = useState('');
//     const [hasElevator, setHasElevator] = useState(false);
//     const [hasParking, setHasParking] = useState(false);
//     const [hasBars, setHasBars] = useState(false);
//     const [hasStorage, setHasStorage] = useState(false);
//     const [hasAirConditioning, setHasAirConditioning] = useState(false);
//     const [hasBalcony, setHasBalcony] = useState(false);
//     const [hasMamad, setHasMamad] = useState(false);
//     const [isAccessible, setIsAccessible] = useState(false);
//     const [isFurnished, setIsFurnished] = useState(false);
// const [selectImage,setSelectedImage] = useState(''); 
//     async function handleSubmit(e) {
//         try {
//             e.preventDefault();
//             const type = 'for sale';
//             const isApproved = false;
//             const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//             const idUser = currentUser.id;
//             // const apartmentData = {
//             //     idUser,
//             //     city,
//             //     neighborhood,
//             //     street,
//             //     size,
//             //     price,
//             //     numberOfRooms,
//             //     description,
//             //     hasElevator,
//             //     hasParking,
//             //     hasBars,
//             //     hasStorage,
//             //     hasAirConditioning,
//             //     hasBalcony,
//             //     hasMamad,
//             //     isAccessible,
//             //     isFurnished,
//             //     isApproved,
//             //     type,
//             //     // selectImage,
//             // };
//             const apartmentData = new FormData();
//             apartmentData.append('idUser', idUser);
//             apartmentData.append('city', city);
//             apartmentData.append('neighborhood', neighborhood);
//             apartmentData.append('street', street);
//             apartmentData.append('size', size);
//             apartmentData.append('price', price);
//             apartmentData.append('numberOfRooms', numberOfRooms);
//             apartmentData.append('description', description);
//             apartmentData.append('hasElevator', hasElevator);
//             apartmentData.append('hasParking', hasParking);
//             apartmentData.append('hasBars', hasBars);
//             apartmentData.append('hasStorage', hasStorage);
//             apartmentData.append('hasAirConditioning', hasAirConditioning);
//             apartmentData.append('hasBalcony', hasBalcony);
//             apartmentData.append('hasMamad', hasMamad);
//             apartmentData.append('isAccessible', isAccessible);
//             apartmentData.append('isFurnished', isFurnished);
//             apartmentData.append('isApproved', isApproved);
//             apartmentData.append('type', type);
//             if (selectImage) {
//                 apartmentData.append('image', selectImage);
//             }
//             const response = await fetch('http://localhost:3336/api/apartments', {
//                 method: 'POST',
//                 body: JSON.stringify(apartmentData),
//                 headers: {
//                     'Content-Type': 'application/json; charset=UTF-8',
//                 },
//             });

//             if (!response.ok) {
//                 const errorResponse = await response.json();
//                 throw new Error(errorResponse.error || 'Network response was not ok');
//             }
//             const jsonResponse = await response.json();
//             console.log(`jsonResponse: ${JSON.stringify(jsonResponse)}`);
//             console.log(apartmentData);
//         }
//         catch (error) {
//             throw error;
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (file.type !== 'image/jpeg' && file.type !== "image/png" && file.type !== "image/gif") {
//             alert('Please select a image file');
//             return;
//         }
//         setSelectedImage(file);
//     };


//     return (
//         <>
//             <h2>addApartmentForSale</h2>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
//                 <input type="text" placeholder="Neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
//                 <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
//                 <input type="number" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
//                 <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
//                 <input type="number" placeholder="Number of Rooms" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
//                 <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
//                 <label>
//                     <input type="checkbox" checked={hasElevator} onChange={(e) => setHasElevator(e.target.checked)} />
//                     Has Elevator
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasParking} onChange={(e) => setHasParking(e.target.checked)} />
//                     Has Parking
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasBars} onChange={(e) => setHasBars(e.target.checked)} />
//                     Has Bars
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasStorage} onChange={(e) => setHasStorage(e.target.checked)} />
//                     Has Storage
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasAirConditioning} onChange={(e) => setHasAirConditioning(e.target.checked)} />
//                     Has Air Conditioning
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasBalcony} onChange={(e) => setHasBalcony(e.target.checked)} />
//                     Has Balcony
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={hasMamad} onChange={(e) => setHasMamad(e.target.checked)} />
//                     Has Mamad
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={isAccessible} onChange={(e) => setIsAccessible(e.target.checked)} />
//                     Is Accessible
//                 </label>
//                 <label>
//                     <input type="checkbox" checked={isFurnished} onChange={(e) => setIsFurnished(e.target.checked)} />
//                     Is Furnished
//                 </label>

//                 <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} />
//                 <button type="submit">Add Apartment</button>
//             </form>
//         </>
//     );
// }
import React, { useState } from "react";
import './addApartment.css'

export default function AddApartmentForSale() {
    const [city, setCity] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [size, setSize] = useState('');
    const [price, setPrice] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState('');
    const [description, setDescription] = useState('');
    const [hasElevator, setHasElevator] = useState(false);
    const [hasParking, setHasParking] = useState(false);
    const [hasBars, setHasBars] = useState(false);
    const [hasStorage, setHasStorage] = useState(false);
    const [hasAirConditioning, setHasAirConditioning] = useState(false);
    const [hasBalcony, setHasBalcony] = useState(false);
    const [hasMamad, setHasMamad] = useState(false);
    const [isAccessible, setIsAccessible] = useState(false);
    const [isFurnished, setIsFurnished] = useState(false);
    const [selectImage, setSelectedImage] = useState(null);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const type = 'for sale';
            const isApproved = false;
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            const idUser = currentUser.id;

            const apartmentData = new FormData();
            apartmentData.append('idUser', idUser);
            apartmentData.append('city', city);
            apartmentData.append('neighborhood', neighborhood);
            apartmentData.append('street', street);
            apartmentData.append('size', size);
            apartmentData.append('price', price);
            apartmentData.append('numberOfRooms', numberOfRooms);
            apartmentData.append('description', description);
            apartmentData.append('hasElevator', hasElevator);
            apartmentData.append('hasParking', hasParking);
            apartmentData.append('hasBars', hasBars);
            apartmentData.append('hasStorage', hasStorage);
            apartmentData.append('hasAirConditioning', hasAirConditioning);
            apartmentData.append('hasBalcony', hasBalcony);
            apartmentData.append('hasMamad', hasMamad);
            apartmentData.append('isAccessible', isAccessible);
            apartmentData.append('isFurnished', isFurnished);
            apartmentData.append('isApproved', isApproved);
            apartmentData.append('type', type);
            if (selectImage) {
                apartmentData.append('image', selectImage);
            }

            const response = await fetch('http://localhost:3336/api/apartments', {
                method: 'POST',
                body: apartmentData,
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log(`jsonResponse: ${JSON.stringify(jsonResponse)}`);
            console.log(apartmentData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== "image/png" && file.type !== "image/gif") {
            alert('Please select a valid image file');
            return;
        }
        setSelectedImage(file);
    };

    return (
        <>
            <h2>Add Apartment For Sale</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                <input type="text" placeholder="Neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} />
                <input type="text" placeholder="Street" value={street} onChange={(e) => setStreet(e.target.value)} />
                <input type="number" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="number" placeholder="Number of Rooms" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label>
                    <input type="checkbox" checked={hasElevator} onChange={(e) => setHasElevator(e.target.checked)} />
                    Has Elevator
                </label>
                <label>
                    <input type="checkbox" checked={hasParking} onChange={(e) => setHasParking(e.target.checked)} />
                    Has Parking
                </label>
                <label>
                    <input type="checkbox" checked={hasBars} onChange={(e) => setHasBars(e.target.checked)} />
                    Has Bars
                </label>
                <label>
                    <input type="checkbox" checked={hasStorage} onChange={(e) => setHasStorage(e.target.checked)} />
                    Has Storage
                </label>
                <label>
                    <input type="checkbox" checked={hasAirConditioning} onChange={(e) => setHasAirConditioning(e.target.checked)} />
                    Has Air Conditioning
                </label>
                <label>
                    <input type="checkbox" checked={hasBalcony} onChange={(e) => setHasBalcony(e.target.checked)} />
                    Has Balcony
                </label>
                <label>
                    <input type="checkbox" checked={hasMamad} onChange={(e) => setHasMamad(e.target.checked)} />
                    Has Mamad
                </label>
                <label>
                    <input type="checkbox" checked={isAccessible} onChange={(e) => setIsAccessible(e.target.checked)} />
                    Is Accessible
                </label>
                <label>
                    <input type="checkbox" checked={isFurnished} onChange={(e) => setIsFurnished(e.target.checked)} />
                    Is Furnished
                </label>

                <input id="file-upload" type="file" accept="image/jpeg, image/png, image/gif" onChange={handleFileChange} />
                <button type="submit">Add Apartment</button>
            </form>
        </>
    );
}
