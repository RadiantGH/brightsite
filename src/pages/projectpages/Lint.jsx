import React from 'react';
import ReactDOM from 'react-dom/client';

const Article_Lint = function() {
    return (
        <div className='article-content'>
            <h2>SeeQR</h2>
            <p>
                SeeQR is a query analytics tool for Postgres and recently MySQL. My team and I focused our efforts on implementing MySQL and laying the groundwork 
                for adding future RDBMS. 
            </p>

            <strong>Table of Contents</strong>
            <ol>
                <li><a href='#hardcoded' className='url'>The Existing Implementation</a></li>
            </ol>

            <h3 id='hardcoded'>The Existing Implementation</h3>
            <p>
                Content
            </p>
        </div>
    );
}

export default Article_Lint;