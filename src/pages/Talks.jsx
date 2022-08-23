import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactAudioPlayer from 'react-audio-player';

const Talks = function() {
    return (
        <div>
            <p> 2022 - JavaScript is a problem TypeScript Solved (Sponsored by SingleSprout) </p>
            <ReactAudioPlayer
            src='../assets/talk_typescript.mp3'
            controls
            />
        </div>
    );
}

export default Talks;