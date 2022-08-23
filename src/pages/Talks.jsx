import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactAudioPlayer from 'react-audio-player';

const Talks = function() {
    return (
        <div id='talk-body'>
            <p>
                June 2022 - Sponsored by SingleSprout <br/>
                JavaScript Is A Problem TypeScript Solved
                <ReactAudioPlayer
                src='api/assets/talk_typescript.mp3'
                controls
                />
            </p>
        </div>
    );
}

export default Talks;