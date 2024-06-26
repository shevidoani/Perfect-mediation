import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logInError, setLogInError] = useState('');
    const navigate = useNavigate();

     function findPermissionWithId(permissionArray, id) {
        return permissionArray.find(permission => permission.idPermission === id);
    }

    async function handleLogIn() {
        const loginUser = { email, password };

        try {
            const response = await fetch('http://localhost:3336/api/login', {
                method: 'POST',
                body: JSON.stringify(loginUser),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }

            const jsonResponse = await response.json();
            console.log(`jsonResponse: ${JSON.stringify(jsonResponse)}`);

            if (jsonResponse.permissions.length > 0) {
                const permission = findPermissionWithId(jsonResponse.permissions, 1);
                if (permission !== null && permission !== undefined) {
                    setLogInError('');
                    sessionStorage.setItem("currentUser", JSON.stringify(jsonResponse));
                    navigate(`/users/${jsonResponse.id}`);
                } else {
                    setLogInError('You must be logged in');
                }
            } else {
                setLogInError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setLogInError('Error logging in. Please try again later.');
        }
    }

    return (
        <div className='loginOrRegistration'>
            <div>
                <h1 id='titleLogin'>To Login⬇</h1>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {logInError && <p id="log_in_error" style={{ color: 'red' }}>{logInError}</p>}
                <button onClick={handleLogIn}>Send</button>
            </div>
            <NavLink to="/signup">
                Sign Up
            </NavLink>
        </div>
    );
}

