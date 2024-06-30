import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import FirstPageNav from "./components/FirstPageNav";
import ForSale from "./components/ForSale/ForSale";
import ForRent from "./components/ForRent/ForRent";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Menager from "./components/Menager/Menager";
import AddManager from "./components/Menager/AddManager";
import ApartmentFetcher from "./components/Apartments/ApartmentFetcher";
import AddApartment from "./components/Apartments/AddApartment";
import ApartmentDetail from "./components/Apartments/ApartmentDetail";
import ApartmentForSaleDetail from "./components/ForSale/ApartmentFotSaleDetail";
import ApartmentForRentDetail from "./components/ForRent/ApartmentForRentDetail";
import '@fortawesome/fontawesome-free/css/all.css';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="*" element={<h1>error</h1>} />
          <Route path="/" element={<FirstPageNav />}>
            <Route path="" element={<Welcome />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<Signup />} />
          </Route>
          <Route path="/users/:id" element={<NavBar />} >
            <Route index element={<Home />} />
            <Route path="forSale" >
              <Route index element={<ForSale />} />
              <Route path="apartmentForSaleDetail/:id" element={<ApartmentForSaleDetail />} />
              <Route path="addApartment/:type" element={<AddApartment />} />
            </Route>
            <Route path="forRent" >
              <Route index element={<ForRent />} />
              <Route path="apartmentForRentDetail/:id" element={<ApartmentForRentDetail />} />
              <Route path="addApartment/:type" element={<AddApartment />} />
            </Route>
            <Route path="manager" >
              <Route index element={<Menager />} />
              <Route path="addManager" element={<AddManager />} />
              <Route path="apartmentFetcher" >
              <Route index element={<ApartmentFetcher />} />
              <Route path="apartmentDetail/:id" element={<ApartmentDetail />} />
              </Route>
            </Route>
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="home" element={<Home />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
