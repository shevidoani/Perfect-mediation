

import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Signup.css';
export default function SignUp() {
    const [password, setPassword] = useState('');
    const [ifPassword, setIfPassword] = useState(false);
    const [checkPassword, setCheckPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState('');
    const [allDigits, setAllDigits] = useState(0);
    const [idTempPassword, setIdTempPassword] = useState('')
    const [inputs, setInputs] = useState(['', '', '', '', '']);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, inputs.length).map((_, i) => inputRefs.current[i] || React.createRef());
    }, [inputs.length]);
    async function handleChange(index, value) {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
        if (value.match(/^[0-9]$/) && index < inputs.length - 1) {
            inputRefs.current[index + 1].focus();
        }
        const allDigit = newInputs.join('');
        setAllDigits(allDigit);
        if (allDigit.length === 5) {
            completeSignup(allDigit);
        }
    };
    async function handleSignup() {
        const type = ['user']
        const newUser = { name, email, password, type };
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

                const idTempPassword = await response.json();
                setIdTempPassword(idTempPassword);
                // setSignUpSuccess('Sign up successful!');
                // navigate(`/users/${user.id}`);
                setIfPassword(true);
                setSignUpError('');
                // sessionStorage.setItem('currentUser', JSON.stringify(user));
                // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
                // console.log(`Current user: ${JSON.stringify(currentUser)}`);
            } catch (error) {
                setSignUpError('Error: ' + error.message);
                console.log('Error:', error);
                setSignUpSuccess('');
            }
        } else {
            setSignUpError('Passwords do not match. Please try again.');  // הצגת הודעת שגיאה אם הסיסמאות לא תואמות
            setSignUpSuccess('');
        }
    }

    async function completeSignup(digits) {
        console.log(`Complete signup with digits: ${digits}`);
        const complete = { 'id': idTempPassword, "email": email, "checkPassword": digits }
        // Add any logic to handle after completing the 5 digit input
        try {
            const response = await fetch('http://localhost:3336/api/completeSignup', {
                method: 'POST',
                body: JSON.stringify(complete),
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Network response was not ok');
            }

            const user = await response.json();
            console.log(user);
            setSignUpSuccess('Sign up successful!');
            navigate(`/users/${user.id}`);
            setIfPassword(true);
            setSignUpError('');
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            console.log(`Current user: ${JSON.stringify(currentUser)}`);
        } catch (error) {
            setSignUpError('Error: ' + error.message);
            console.log('Error:', error);
            setSignUpSuccess('');
        }
    };

    return (
        <div className='loginOrRegistration'>
            <div>
                <h2 className='titleSignup'>To Sign Up⬇</h2>
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
                <button onClick={handleSignup}>Send</button>
                {ifPassword && <div>
                    <h3>enter password</h3>
                    <div className="number-inputs">
                        {inputs.map((input, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                value={input}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        ))}
                    </div>

                </div>}
            </div>
            <NavLink to="/login">
                Log In
            </NavLink>
        </div>
    );
}

