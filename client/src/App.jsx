import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./components/Login/Login";
import NavBar from "./components/NavBar";
import Welcome from "./components/Welcome";
import FirstPageNav from "./components/FirstPageNav";
import ForSale from "./components/ForSale/ForSale";
import ForRent from "./components/ForRent/ForRent";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes >
          <Route path="*" element={<h1>error</h1>} />
          <Route path="/" element={<FirstPageNav />}>
            <Route path="" element={<Welcome />} />
            <Route path="login" element={<LogIn />} />
          </Route>
          <Route path="/users/:id" element={<NavBar />} >
            <Route index element={<Home />} />
            <Route path="forSale" >
              <Route index element={<ForSale />} />
              {/* <Route path=":postId/comments" element={<Comments />} /> */}
            </Route>
            <Route path="forRent" >
              <Route index element={<ForRent />} />
              {/* <Route path=":postId/comments" element={<Comments />} /> */}
            </Route>
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="home" element={<Home />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
