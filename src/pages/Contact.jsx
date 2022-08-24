import React from 'react';
import ReactDOM from 'react-dom/client';
  
const Contact = function() {
    return (
        <div className='main-content'>
            <div>
            <p>
                Find me on <a href='https://github.com/RadiantGH' className='url'>Github</a>
                <br/>
                Or my <a href='https://www.linkedin.com/in/ian-grepo/' className='url'>LinkedIn</a>
            </p>
            <br/>
            Feel free to email me at <a href='mailto:iangrapeo@gmail.com' className='url'>iangrapeo@gmail.com</a>
            </div>
        </div> 
    );
}

export default Contact;