import React from 'react';
import ReactDOM from 'react-dom/client';
  
const Home = function() {
    return (
        <div id='home-body'>
            <p>
                I'm Ian (aka Radiant). I'm the primary developer for <a href='/projects' className='url'>Treasure Seeker</a>, a cardgame based on the late Runescape: Chronicle. 
                I'm originally from the Philippines and now live in LA County, California. I'm passionate about teaching Computer Science to aspiring developers, camping, abandoned places, and playing fighting games with a keyboard.
                <br/><br/>
                My latest projects include SeeQR, a SQL query analytics and optimization tool I worked on under OSLabs - and Nydus, my tag based media organization app inspired by Hydrus Network.
                <br/><br/>
                I was recently invited by SingleSprout to give a <a href='/talks' className='url'>talk on TypeScript</a> - and I'm hoping to do more in the future!
            </p>
        </div>
    );
}

export default Home;