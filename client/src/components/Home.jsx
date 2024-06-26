
import React from "react";
import logo from '../images/logo.png';
import './Home.css'; // קובץ ה־CSS שהגדרנו
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [ifCurrentUser, setIfCurrrentUser] = useState(false);
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        setIfCurrrentUser(true)
    }
    return (
        <>
            <div className="home-container">
                <h1>hi {currentUser.name}</h1>
            </div>
        </>
    );
}