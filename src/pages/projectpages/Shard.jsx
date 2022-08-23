import React from 'react';
import ReactDOM from 'react-dom/client';

const Article_Shard = function() {
    return (
        <div className='article-content'>
            <h2>Treasure Seeker</h2>
            <p>
                Treasure Seeker is a card game based on the late Runescape: Chronicle, made in Unity. At the game's current state, the game is a fully functional multiplayer CCG with
                P2P direct challenge multiplayer, ELO-based server matchmaking, mod compatability, and unused enemy AI functionality (more details on this below). 
                Preventing the game's release are a lack of intuitive UI/UX, a lack of meaningful singleplayer content, and a lack of theme. Though most core functionality for the 
                game is in place, the idea and premise the game is based around is in the process of some reimagination.
            </p>

            <p>
                Though the codebase itself will remain private for the time being, as I'm not sure what I want to do with the eventual finished product, 
                in this page I will cover the primary challenges I faced during this project's development 
                and the solutions I found to each one.
            </p>

            <h3>Humble Origins</h3>
            <p>
                Treasure Seeker started out spite project, a little discord bot made because someone told me it takes "a real professional to learn how to make a discord bot". 
                While there have definitely been some impressive creations since that time (This project being one of them), it was a silly idea at the time when most discord bots were just 
                YouTube API interfaces with anime profile pictures.
            </p>

            <p>
                It was from that implied challenge that the original idea of Treasure Seeker was born. It started out as a trading card collection chatbot, handing out silly ms paint cards 
                designed by various volunteer artists at random intervals. Eventually the cards gained purpose. Stats. Effects. Then there were rules and mechanics- and soon enough you could 
                make decks and challenge players from all across discord just by communicating with this one little bot. We'll save the actual gameplay details when we talk about the Unity 
                implementation further down this page, for this bit I want to focus on the challenge of making a game through Discord of all things. And I have to say- it was hard. Harder than 
                if I had just made it with Unity in the first place, I think.
            </p>

            <h3>40,000 Users vs "50 Requests Per Second"</h3>
            <p>
                The Discord Bot was made in C#, initially utilizing <a href='https://github.com/discord-net/Discord.Net' className='url'>Foxbot's .NET wrapper for Discord</a>, but 
                eventually moving to my own implementation after delving deeper in to the Discord API. Despite being a Discord Bot, most of the gamelogic actually connected to an external 
                .NET Core console application that functioned as a pseudo-server. Since the gamelogic worked off my own custom-built server, everything worked flawlessly on that end, it 
                even meant that different sharded instances of the bot would still be able to connect to each other! But the real issue was making sure everything worked on Discord's end.  
            </p>

            <p>
                The game worked off a simple user feedback loop during matches. It would send a message displaying the user's hand and stats and await input from the user. During this 
                phase the user could place cards on the board and declare a ready state (since the game has simultaneous player turns). Once both players are ready, the discord bot would 
                send the information of both players to the server, verify it's integrity, and calculate the results. An image would be processed in the server and sent to show a visual summary of 
                the result of that paticular turn. It was a simple enough system that worked on paper, but the sheer number of Discord API Requests the bot made caused multiple hangups.
            </p>

            <p>
                According to Discord's official documentation, bots can make 50 requests to the Discord API every second. This includes things like sending messages,
                 editing messages, and even reacting to messages. I'm not sure how true this is now, but back in 2019-2020 it was definitely not entirely truthful. Short disclaimer; I was unable 
                 to get any meaningful responses from Discord's engineers so the information I provide here may be inaccurate or outdated. The 50 requests per second rule seems to be 
                 roughly true, but it wasn't that simple. From my testing there seemed to be a "global rate limit" and a "local rate limit", with local being per-server. The Global Rate limit worked 
                 off things like direct messages and creating/deleting servers, while the local rate limit was based on messages sent in a server or deleting/creating channels in a server. However the 
                 local rate limit seemed far lesser than the global one- being only 5 or so requests per second.
            </p>

            <p>
                Naturally these rate limits posed a significant challenge when designing the game. I'd already accounted for rate limits when initially desinging the gameloop, setting it 
                up so that the bot would send the minimum amount of messages to function- but even this wasn't enough. A key part of card games is the idea of concealed information. One player 
                knows something the other doesn't- namely their own cards. But concealing information over discord required the bot to send information through direct messages- which was an impossible 
                medium due to the global rate limit. Thankfully the local rate limit provided some hope, despite having a cap of 5ish requests per second. It turned out that the 5 requests weren't tied to 
                the server- but the channel! The actual local rate limit was more or less still around 50 per second, but each channel had it's own limit of 5 per second as well.
            </p>

            <p>
                Realizing that, I quickly got to work on implementing a method of concealing information when sending messages in a server. In the end I constructed a match hosting system that 
                servers could opt in to. Server owners could opt-in to host matches on their server. This meant that when players used the bot to start games on a server, the bot would create a 
                private channel only accessible to that player which they could use to interface with the bot in private without fear. This also meant that they could spam commands to their hearts 
                content since they were working within the confines of their own channel-based rate limit. With this new system in place, I also realized that there was no reason to limit the 
                game to only work with users in the same server- and so cross-server matches became a feature.
            </p>

            <p>
                But even with the rate limiting problems solved, Discord was still a troublesome medium to make a videogame in. It wasn't long before I eventually abandoned the 
                idea and set to work on porting the game into Unity, right and proper.
            </p>
            
            <h3>Cards, Effects, and Jelly</h3>
            <p>
                Getting used to Unity aside, I should probably talk about how the game itself actually worked. Card games always fascinated but I never really understood how I was 
                supposed to start building one. At some point I even looked up leaked Hearthstone sourcecode (I didn't use it I swear). By the time I finally started working on the 
                project I was lost, zero clue how to go about making this work. Even the plentiful Unity tutorials at the time were useless, as the card game tutorials 
                were all pretty badly hardcoded and wouldn't be able to function with the scale of the game I envisioned. So I set out to build my own system.
            </p>

            <p>
                My only experience with game systems at the time was mild experience modding WarCraft III and StarCraft II. I tried making Monopoly in StarCraft II when I was 12. 
                It didn't really work, but clearly I learned a lot. Granted I didn't know how it actually worked but I vaguely recalled that each ability in StarCraft didn't actually 
                do anything. They were just pretty pictures with extremely basic data like "this ability targets a unit" or "this ability is aoe". It was a set of effects attached to 
                them that really made the magic spark. So with that as my only reference I did the only thing I could- I started copying.
                Though there wasn't really much to copy. StarCraft II is a real time strategy game- I was trying to make a card game. The only thing I could reference was that idea of 
                separating a card and it's effects. In hindsight it was a great method. By separating cards and effects, numerous effects could be generalized and reused for 
                multiple cards, saving a ridiculous amount of time and effort in the long run.
            </p>

            <p>
                So starting out with building this system I had two goals. Make a card that damaged a player by five when they used it. Yes, damage themselves. It was a simple enough 
                goal and it would give me a generic effect to play with at the end of it. So I got to work on setting up the framework of the game. 
                There was the 'Player' class with it's various properties, including health, and the 'Card' class with it's various properties, including an array of potential effect IDs.
            </p>
        </div>
    );
}

export default Article_Shard;