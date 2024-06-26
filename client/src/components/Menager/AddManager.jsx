

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import  '../Signup/Signup.css';
export default function AddManager() {
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState('');
    const navigate = useNavigate();
    async function handleAddManager() {
        const type=['manager','user']
        const newUser = { name, email, password,type};
        if (password === verifyPassword) {
            try {
                const response = await fetch('http://localhost:3336/api/signup', {
                    method: 'POST',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                    },
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.error || 'Network response was not ok');
                }

                const user = await response.json();
                setSignUpSuccess('add manager successful!');
                // navigate(`/users/${user.id}`);
                setSignUpError('');  
            } catch (error) {
                setSignUpError('Error: ' + error.message); 
                console.log('Error:', error);
                setSignUpSuccess('');  
            }
        } else {
            setSignUpError('Passwords do not match. Please try again.');  
            setSignUpSuccess('');  
        }
    }

    return (
        <div className='loginOrRegistration'>
            <div>
                <h2 className='titleSignup'>Add manager⬇</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="Verify Password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                />
                {signUpError && <p id="sign_up_error" style={{ color: 'red' }}>{signUpError}</p>}
                {signUpSuccess && <p id="sign_up_success" style={{ color: 'green' }}>{signUpSuccess}</p>}
                <button onClick={handleAddManager}>Send</button>
            </div>
        </div>
    );
}

