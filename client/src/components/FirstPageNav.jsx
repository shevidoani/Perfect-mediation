import { NavLink, Outlet } from 'react-router-dom'

export default function FirstPageNav() {

    return (
        <>
            <nav className='firstPageNav'>
                <NavLink  to="/login">Login</NavLink>
            </nav>
            <Outlet />
        </>
    )}
