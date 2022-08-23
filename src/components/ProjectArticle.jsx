import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  
const ProjectArticle = function({article, title, details}) {
    return (
        <div>
            <a href={`/${article}`} className='article-title'>{title}</a>
            <br/>
            {details}
        </div>
    );
}

export default ProjectArticle;