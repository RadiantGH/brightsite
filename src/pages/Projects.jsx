import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectArticle from '../components/ProjectArticle.jsx';

const Projects = function() {
    return (
        <div className='main-content'>
            <div>
                I haven't had the time to write about all of my projects yet, I'll write about each one more over time!
            </div>

            <div>
                <ProjectArticle
                    article={'shard'}
                    title={'Treasure Seeker'}
                    details={`This project had it's humble origins as a simple discord bot serving over 40,000 concurrent users daily 
                    before eventually being converted into a fully realized game in Unity.`}
                />

                <ProjectArticle
                    article={'lint'}
                    title={'SeeQR'}
                    details={`SeeQR (aka The Amazon Rainforest) is a convenient one-stop shop for efficient SQL database manipulation
                    and performance testing. SeeQR can be used throughout the database life cycle, from creation to testing.`}
                />

                <ProjectArticle
                    article={'worm'}
                    title={'Nydus'}
                    details={`Nydus is a tag-based media organization app made built using Blazor, ASP.NET, and DynamoDB. It was an experimental dive into C# based webapp building.`}
                />

                <ProjectArticle
                    article={'zanthium'}
                    title={'Foresight'}
                    details={`Based on Nydus- Foresight is a vscode extension meant to replace hardcoded URLs and filepaths dynamic keys provided by the application. I made it because filepaths annoy me.`}
                />

                <ProjectArticle
                    article={'rabbit'}
                    title={'Rabbit Hole'}
                    details={`A simple chrome extension game. Start from a random article and make your way to your assigned destination. Chart a path through the Wikipedia rabbit hole.`}
                />  
            </div>
        </div> 
    );
}

export default Projects;