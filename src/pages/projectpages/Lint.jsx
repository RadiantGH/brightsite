import React from 'react';

const Article_Lint = function() {
    return (
        <div className='article-content'>
            <h2>SeeQR</h2>
            <p>
                SeeQR is a query analytics tool for Postgres and recently MySQL. It was built using with React and Electron with a Node.JS backend. 
                My team and I focused our efforts on implementing MySQL and laying the groundwork for adding future RDBMS. I particularly focused on app integrity 
                with further testing with Jest, snapshot testing, and implementing Circle CI. I was also responsible for creating the abstracted querying layer to 
                prepare the app for scaling with other RDBMS as well as guiding the team through TypeScript.
                <br/>
                This journal is incomplete...
            </p>

            <strong>Table of Contents</strong>
            <ol>
                <li><a href='#testing' className='url'>Living on the Edge</a></li>
                <li><a href='#abstract' className='url'>Setting up for MySQL</a></li>
            </ol>

            <h3 id='testing'>Living on the Edge</h3>
            <p>
                TDD is an aspiration- but rare in practice. This makes sense, since developers are excited to get their hands dirty building things. But 
                sometimes we get careless, and people build out entire systems without writing a single test. You could say SeeQR is filled with very excited developers. 
                With barely any tests the app was prone to breaking at the most random changes- one change in one part of the codebase often had catastrophic effects somewhere else. 

                At this point I was double, triple, quadrouple checking every time I wanted to make a change- as well as calling everyone up to take a look and make sure nothing was 
                out of place. And while the regular code reviews were helpful and healthy, this was too much paranoia for me to handle. I took the initiative to setup the missing tests 
                for every part of the codebase.

                There honestly isn't much to be said about how writing the tests went, just a lot of manual labor. I used snapshots to make sure our UI was always in place, 
                and used Jest's mocking features to mock databases to parse through. I guess that was the annoying bit, making a fake database with Jest to test. I had to hold this 
                off until I finished abstracting the querying logic, but we were at a loss on how to handle this. SeeQR specializes in visualizing query analysis for complex databases, 
                and I wanted my tests to reflect that. We thought about creating a separate database purely for testing purposes, reset at the start of each test... But scrapped the idea 
                when I realized that it's not like we needed to test if the database itself was working, because it wasn't our problem if it wasn't. Some other people made Postgres and MySQL, 
                we just had to test if their returned data worked with our app. So we forgot about mocking a database and just mimicked the data we would've recieved and tested to ensure we 
                handled it properly.
            </p>

            <h3 id='testing'>Setting up for MySQL</h3>
            <p>
                All querying functionality was hardcoded to work with postgres, which is fine for the original scope of the app, but we had to rebuild it. I wish I had discovered 
                Prisma or some other ORM back in the day because it would've made the job a lot easier, but instead we decided to set up our infastructure manually. We created 
                a Query Resolver to interface with whatever database type was selected, allowing the actual app to make calls with single functions, while the resolver worked out 
                what queries to make. We had to parse the data to return everything in the same format as well. For some reason Postgres tends to give us data as objects while 
                MySQL sends everything out in an array.

                Between translating queries and ensuring all our data could be returned the same way- it was a pain in the ass. It's never a good idea to reinvent the wheel, but 
                it was a good experience. Next time though I'd definitely do a bit more research before tackling a problem like this.
            </p>
        </div>
    );
}

export default Article_Lint;