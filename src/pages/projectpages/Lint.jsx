import React from 'react';

const Article_Lint = function() {
    return (
        <div className='article-content'>
            <h2>SeeQR</h2>
            <p>
                SeeQR is a query analytics tool for Postgres and recently MySQL. It was built using with React and Electron with a Node.JS backend. 
                My team and I focused our efforts on implementing MySQL and laying the groundwork for adding future RDBMS. I particularly focused on app integrity 
                with further testing with Jest, snapshot testing, and implementing Circle CI. I was also responsible for creating the abstracted querying layer to 
                prepare the app for scaling with other RDBMS as well as guiding the team through TypeScript.
            </p>

            <strong>Table of Contents</strong>
            <ol>
                <li><a href='#hardcoded' className='url'>The Jungle</a></li>
            </ol>

            <h3 id='hardcoded'>The Jungle</h3>
            <p>
                My team and I were in the jungle here as most of the project's more senior developers had moved on to other work. To be candid, there was zero documentation and 
                we were fending for ourselves. 
            </p>
        </div>
    );
}

export default Article_Lint;