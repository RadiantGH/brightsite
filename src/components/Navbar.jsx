import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  
const Navbar = function() {
    return (
        <div>
            <p>
                <Link to="/contact" className="routeLink">Contact</Link> | <Link to="/projects" className="routeLink">Projects</Link> | <Link to="/talks" className="routeLink">Talks</Link>
            </p>
        </div>
    );
}

export default Navbar;