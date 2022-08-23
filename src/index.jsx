import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SiteHeader from './components/SiteHeader.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Talks from './pages/Talks.jsx';
import './style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <div id="main-content">
      <SiteHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="contact" element={<Contact />} />
        <Route path="talks" element={<Talks />} />
      </Routes>
    </div>
    </BrowserRouter>
  </React.StrictMode>
);
