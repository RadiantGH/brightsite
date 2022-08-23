import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectArticle from '../components/ProjectArticle.jsx';

const Projects = function() {
    return (
        <div>
            <ProjectArticle
                article={'shard'}
                title={'Treasure Seeker'}
                details={`This project had it's humble origins as a simple discord bot serving over 40,000 concurrent users daily 
                before eventually being converted into a fully realized game in Unity.`}
            />
        </div>
    );
}

export default Projects;