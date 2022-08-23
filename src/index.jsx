import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import SiteHeader from './components/SiteHeader.jsx';
import SiteFooter from './components/SiteFooter.jsx';
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
import Article_Shard from './pages/projectpages/Shard.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SiteHeader/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='projects' element={<Projects />} />
        <Route path='contact' element={<Contact />} />
        <Route path='talks' element={<Talks />} />

        {/* Articles */}
        <Route path='shard' element={<Article_Shard/>} />

        <Route path='/*' element={<p>404 | The light does not reach this place.</p>} />
      </Routes>
      <SiteFooter/>
    </BrowserRouter>
  </React.StrictMode>
);
