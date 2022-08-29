import React from 'react';
import ReactDOM from 'react-dom/client';
  
const Home = function() {
    return (
        <div className='main-content'>
            <div id='home-body'>
            <p>
                I'm Ian (aka Radiant). I'm the primary developer for <a href='/shard' className='url'>Treasure Seeker</a>, a cardgame based on the late Runescape: Chronicle. 
                I'm originally from the Philippines and now live around Los Angeles, California. I'm passionate about teaching Computer Science to aspiring developers, camping, abandoned places, and playing fighting games with a keyboard.
                <br/><br/>
                My latest projects include <a href='/lint' className='url'>SeeQR</a>, a SQL query analytics and optimization tool I worked on under OSLabs - and <a href='/worm' className='url'>Nydus</a>, my tag based media organization app.
                <br/><br/>
                I was recently invited by SingleSprout to give a <a href='/talks' className='url'>talk on TypeScript</a> - and I'm hoping to do more in the future!
            </p>
            </div>
        </div>
        
    );
}

export default Home;