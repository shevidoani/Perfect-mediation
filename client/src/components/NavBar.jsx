
// import { Outlet, NavLink, useNavigate } from 'react-router-dom';
// import './NavBar.css';
// import logo from '../images/logo.png'; 
// import React, { useState, useEffect } from 'react';
// export default function NavBar() {
//     const [manager, setManager] = useState(false);
//     const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
//     const navigate = useNavigate();
//     const activeStyle = {
//         fontWeight: 'bold',
//         textDecoration: 'underline',
//         color: 'red',
//     };
//     const logOutFunc = () => {
//         sessionStorage.removeItem('currentUser');
//         window.history.replaceState(null, '', '/');
//         navigate('/login', { replace: true });
//     };

//     function findPermissionWithId(permissionArray, id) {
//         return permissionArray.find(permission => permission.idPermission === id);
//     }

//     async function LoginAdministrator() {
//         console.log(currentUser);
//         if (currentUser.permissions.length > 0) {
//             const permission = findPermissionWithId(currentUser.permissions, 2);
//             if (permission !== null && permission !== undefined) {
//                 setManager(true);
//             } else {
//                 setManager(false);
//                 console.log('errorrrrrrrrr');
//             }
//         } else {
//             console.log('Invalid email or password. Please try again.');
//         }
//     }

//     useEffect(() => {
//         if (currentUser) {
//             LoginAdministrator();
//         }
//     }, [currentUser]);

//     return (
//         <>
//         {/* {LoginAdministrator()} */}
//             <header>
//                 <nav className='navbar'>
//                     <img src={logo} alt='Logo' className='logo' />
//                     {manager && <NavLink
//                         to="manager"
//                         style={({ isActive }) => (isActive ? activeStyle : null)}

//                         className='links'>Manager</NavLink>
//                     }
//                         <NavLink
//                             to='forSale'
//                             style={({ isActive }) => (isActive ? activeStyle : null)}
//                             className='links'
//                         >
//                             For Sale
//                         </NavLink>
//                         <NavLink
//                             to='forRent'
//                             style={({ isActive }) => (isActive ? activeStyle : null)}
//                             className='links'
//                         >
//                             For Rent
//                         </NavLink>
//                         <NavLink
//                             to='aboutUs'
//                             style={({ isActive }) => (isActive ? activeStyle : null)}
//                             className='links'
//                         >
//                             About Us
//                         </NavLink>
//                         <NavLink
//                             to='home'
//                             style={({ isActive }) => (isActive ? activeStyle : null)}
//                             className='links'
//                         >
//                             Home
//                         </NavLink>
//                         <NavLink
//                             to='/login'
//                             onClick={logOutFunc}
//                             style={({ isActive }) => (isActive ? activeStyle : null)}
//                             className='links'
//                         >
//                             Log Out
//                         </NavLink>
//                     </nav>
//             </header>
//             <main>
//                 <Outlet />
//             </main>
//         </>
//     );
// }
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../images/logo!.png'; 
import React, { useState, useEffect } from 'react';

export default function NavBar() {
    const [manager, setManager] = useState(false);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const navigate = useNavigate();

    const logOutFunc = () => {
        sessionStorage.removeItem('currentUser');
        window.history.replaceState(null, '', '/');
        navigate('/login', { replace: true });
    };

    function findPermissionWithId(permissionArray, id) {
        return permissionArray.find(permission => permission.idPermission === id);
    }

    async function LoginAdministrator() {
        if (currentUser && currentUser.permissions.length > 0) {
            const permission = findPermissionWithId(currentUser.permissions, 2);
            setManager(permission !== null && permission !== undefined);
        }
    }

    useEffect(() => {
        if (currentUser) {
            LoginAdministrator();
        }
    }, [currentUser]);

    return (
        <>
            <header>
                <nav className='navbar'>
                    <img src={logo} alt='Logo' className='logo' />
                    {manager && (
                        <NavLink
                            to="manager"
                            className={({ isActive }) => isActive ? 'links active' : 'links'}
                        >
                            Manager
                        </NavLink>
                    )}
                    <NavLink
                        to='forSale'
                        className={({ isActive }) => isActive ? 'links active' : 'links'}
                    >
                        For Sale
                    </NavLink>
                    <NavLink
                        to='forRent'
                        className={({ isActive }) => isActive ? 'links active' : 'links'}
                    >
                        For Rent
                    </NavLink>
                    <NavLink
                        to='aboutUs'
                        className={({ isActive }) => isActive ? 'links active' : 'links'}
                    >
                        About Us
                    </NavLink>
                    <NavLink
                        to='home'
                        className={({ isActive }) => isActive ? 'links active' : 'links'}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='/login'
                        onClick={logOutFunc}
                        className={({ isActive }) => isActive ? 'links active' : 'links'}
                    >
                        Log Out
                    </NavLink>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}
