import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  
const ProjectArticle = function({article}) {
    return (
        <div>
            <a href={`/${article}`} className='url'><h1>Article title goes here</h1></a>
            <p>Article details go here...</p>
        </div>
    );
}

export default ProjectArticle;