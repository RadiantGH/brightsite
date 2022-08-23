import React from 'react';
import ReactDOM from 'react-dom/client';
  
const Home = function() {
    return (
        <div>
            <p className='text-body'>
                I'm Ian (aka Radiant). I'm the primary developer for Treasure Seeker, a cardgame based on the late Runescape: Chronicle. 
                I'm originally from the Philippines and now live in LA County, California. I'm passionate about teaching Computer Science to aspiring developers, camping, abandoned places, and playing fighting games with a keyboard.
                <br/><br/>
                Lately I've been assisting OSLabs with SeeQR, a SQL query analytics tool for developers.
                <br/>
                I'm also working on Nydus, a tag based media organization app inspired by Hydrus Network.
                <br/><br/>
                I was recently invited by SingleSprout to give a talk on TypeScript - and I'm hoping to do more in the future!
            </p>
        </div>
    );
}

export default Home;