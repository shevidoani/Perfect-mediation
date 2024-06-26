// import React from "react"
// import { NavLink, useNavigate } from 'react-router-dom';
// import './Manager.css'
// export default function Menager() {
//     const navigate = useNavigate();
//     return (
//         <div className="manager-container">
//             <h2 className="manager-title">manaegr</h2>
//             <nav className="manager-nav">
//             <NavLink
//                 to='addManager'
//                 className="manager-link"
//             >
//                 add manager
//             </NavLink>
//             <NavLink
//                 to='approveApartments'
//                 className="manager-link"
//             >
//                 approve Apartments
//             </NavLink>
//             </nav>
//         </div>);
// }

import React from "react";
import { NavLink } from 'react-router-dom';
import './Manager.css';

export default function Manager() {
    return (
        <div className="manager-container">
            <h2 className="manager-title">Manager</h2>
            <nav className="manager-nav">
                <NavLink
                    to='addManager'
                    className="manager-link"
                >
                    Add Manager
                </NavLink>
                <NavLink
                    to='approveApartments'
                    className="manager-link"
                >
                    Approve Apartments
                </NavLink>
            </nav>
        </div>
    );
}
