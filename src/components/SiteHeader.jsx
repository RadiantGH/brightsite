import React from 'react';
import Navbar from "./Navbar.jsx";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const SiteHeader = function() {
    return (
        <div id="header">
            <p> <Link to="/" id="top-title">Ian</Link></p>
            <Navbar/>
        </div>
    );
}

export default SiteHeader;