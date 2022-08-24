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
import Article_Lint from './pages/projectpages/Lint.jsx';


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
        <Route path='lint' element={<Article_Lint/>} />

        <Route path='/*' element={
          <div className='main-content'>
            <p>404 | The light does not reach this place.</p>
          </div>
        } />
      </Routes>
      <SiteFooter/>
    </BrowserRouter>
  </React.StrictMode>
);
