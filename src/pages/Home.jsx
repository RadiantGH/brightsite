import React from 'react';
import ReactDOM from 'react-dom/client';
  
const Home = function() {
    return (
        <div className='main-content'>
            <div id='home-body'>
            <p>
                I'm Ian. I'm a software engineer, ramen chef, dungeon master, and competitive fighting game player. I was born in the Philippines and now live in the Los Angeles area. 
                I'm passionate about teaching programming to aspiring developers, camping, abandoned places, and learning dumb things.
                <br/><br/>
                My latest projects include <a href='/lint' className='url'>SeeQR</a>, a SQL query analytics and optimization tool I worked on under OSLabs - and <a href='/shard' className='url'>Treasure Seeker</a>, a cardgame based on the late Runescape: Chronicle.
                <br/><br/>
                I was recently invited by SingleSprout to give a <a href='/talks' className='url'>talk on TypeScript</a> - and I'm hoping to do more in the future!
            </p>
            </div>
        </div>
        
    );
}

export default Home;