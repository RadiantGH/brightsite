import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactAudioPlayer from 'react-audio-player';

const Talks = function() {
    return (
        <div className='main-content'>
            <div id='talk-body'>
            <p>
                June 2022 - Sponsored by SingleSprout <br/>
                JavaScript Is A Problem TypeScript Solved
                <ReactAudioPlayer
                src='https://files.catbox.moe/lyo8x0.mp3'
                controls
                />
            </p>
            </div>
        </div>
        
    );
}

export default Talks;