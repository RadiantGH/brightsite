import React from 'react';
import ReactDOM from 'react-dom/client';

const Article_Shard = function() {
    return (
        <div className='article-content'>
            <h2>Treasure Seeker</h2>
            <p>
                Treasure Seeker is a card game based on the late Runescape: Chronicle, made in Unity. At the game's current state, the game is a fully functional multiplayer CCG with
                P2P direct challenge multiplayer, ELO-based server matchmaking, mod compatability, and configurable game AI. 
                Preventing the game's release are a lack of intuitive UI/UX, a lack of meaningful singleplayer content, and a lack of theme. Though most core functionality for the 
                game is in place, the idea and premise the game is based around is in the process of some reimagination.
            </p>

            <p>
                For privacy reasons I won't show any code here like the other projects but I will talk a lot about the my system design challenges throughout 
                the development of this project.
            </p>

            <strong>Table of Contents</strong>
            <ol>
                <li><a href='#the_rules' className='url'>The Rules</a></li>
                <li><a href='#origin' className='url'>Origin</a></li>
                <li><a href='#40k' className='url'>40,000 Users vs "50 Requests Per Second"</a></li>
                <li><a href='#cards' className='url'>Cards, Effects, and the Turnloop</a></li>
                <li><a href='#robots' className='url'>Can Robots Play Cards?</a></li>
                <li><a href='#network' className='url'>Connecting Players</a></li>
            </ol>

            <h3 id='the_rules'>The Rules</h3>
            <p>
                None of this will make sense without at least a brief overview of how the game works. A game of Treasure Seeker consists of two players, internally referred to as 
                mu1 and mu2. Each player has a set of properties like; 'Life', 'Armor', 'Power', 'Money', as well as the cards in their deck and hand. "Turns" are taken simultaneously. 
                Each player can place up to four cards from their hand onto the board, hidden from the opposing player, and declare their ready state when they're done. Once both 
                players are ready, the cards they placed are revealed and each player will "encounter" the cards that they placed for themselves. Each card represents an encounter- 
                think of it like mapping out a journey for yourself. These cards could be battles that sapped your life or even trade encounters that required a player to have a set amount 
                of Money. Should a player successfully resolve the encounters they set for themselves, they are rewarded by that card's effects.
            </p>

            <p>
                This is contrary to most other card games where players take turns one at a time and usually play cards to the detrement of the opposing player rather than to 
                themselves- which made Treasure Seeker an interesting challenge, both technically and design-wise.
            </p>

            <h3 id='origin'>Origin</h3>
            <p>
                Treasure Seeker started out as a spite project, a little discord bot made because someone told me it takes "a real professional to learn how to make a discord bot". 
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

            <h3 id='40k'>40,000 Users vs "50 Requests Per Second"</h3>
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
            
            <h3 id='cards'>Cards, Effects, and the Turnloop</h3>
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

            <p>
                Cards provided basic information on the encounter it represented. If it was a battle how tough was it? If it was a trade how expensive is it? These determined 
                whether or not a player would successfully be able to resolve it and reap it's benefits- the effects. Effects on their own were extremely simple. They had a value and 
                an Effect Type that determined what the game would do with the value. For example: an effect with an Effect Type of "Damage Source", meant that it would deal damage to the 
                source of the card (the person who played it) based on the effect's provided value. Effects just made simple modifications to the properties of their affected player targets. 
            </p>

            <p>
                Looking at examples of other card games at the time, it wasn't uncommon for more complex cards to have specific functions written just for them. However as someone 
                who got their start from modding, I wanted to ensure that my players would have access to robust yet easy to understand tools- and opening up the game to hardcode functions 
                for cards was definitely a hurdle I didn't want to force upon the community. The first step in modularizing effects was changing the "value" of effects from a set number 
                to a mathematical expression. Additionaly, one would be able to define properties of the game (Like what turn it is or how much money a player has) as variables for their 
                formula. This allowed for simple mathematical effects like "Gaining money equal to half your missing life" or "Dealing damage to your opponent equal to twice their hand size." 
                This enabled a breadth of dynamic effects that players could easily write without worrying about code- and it made creating my backlog of card effects much easier as well! I 
                had the peace of mind knowing that if anything broke- I almost never had to change any actual code, most fixes were just a few JSON file changes away. 
            </p>

            <p>
                The number of possibilities skyrocketed with the inclusion of Statuses. Statuses are bundles of effects that would fire when certain conditions were met. 
                Whenever a potential status event is detected, the Turnloop Manager would pause its functions and inform the Status Manager of the event. 
                Should the event meet the criteria of any waiting Statuses, the Status Manager will add a set of effects from that Status into the waiting Effect Stack 
                for the Turnloop Manager to execute once it hears back.
            </p>

            <p>
                At the end of a Turnloop, the results are spat out and distributed to the match's two players. Then it waits for the next turn to begin, starting the cycle over.
            </p>

            <h3 id='robots'>Can Robots Play Cards?</h3>
            <p>
                A digital card game isn't complete without a computer opponent, and I wanted to ensure that players could still entertain themselves without an internet connection. 
                <br/>
                Making this AI I had three goals. 
                <ul>
                    <li>The AI should try to win.</li>
                    <li>The AI should have variable competency.</li>
                    <li>The AI should have configurable behavior.</li>
                </ul>
            </p>

            <h4>The AI Should Try to Win</h4>
            <p>
                First, the AI should try to win. Obviously. But it isn't such a simple goal. While telling the AI that it should try and reduce their opponent's Life to zero 
                is easy enough, it's difficult for it to understand exactly how to go about it. To facilitate this, I built a calculation for the "value" of card effects. Gaining 
                Life or Money, dealing damage, and drawing cards all generated a certain amount of value. The value of these decisions varied depending on the state of the game. If an 
                opponent has lower Life, reducing their Life further nets higher value than reducing their life while it's full. Also taken into consideration was the difficulty of encounters. 
                If a combat card would incur a heavy cost (losing a lot of Life in order to accomplish it) then the value of playing that card is greatly diminished. It's a simple system, 
                but a good start.
                <br/><br/>
                Next was considering combinations of cards. A simple example is a "trade" card that requires 5 Money to activate it's effects. If the AI doesn't have 
                enough money it would completely ignore this card, but if it knows it can get enough Money by playing other cards before this one, it should do so. The game wouldn't be 
                decided by the value of one card at a time, so it didn't make sense for the AI to analyze the game in this way either. Instead the AI would now consider the value of 
                combinations of cards rather than each individual one. This had it's own host of problems, particularly with performance. Calculating the total value of each combination of 
                cards in the AI's hand was costly. If a player had a hand of 5 cards which they could play in any order of 4, that's 625 combinations, excluding the possibility of 
                placing only 1-3 cards instead. Assessing the values of individual cards was still necesarry if only for the purpose of figuring out which cards the AI should prioritize. 
                So instead of assessing every possible combination, the AI would now "fish" for combos existing in their hand. If a certain card would produce a high value effect, the AI 
                it would increase the value of cards that allowed it to play that paticular card.
                <br/><br/>
                Finally the AI had to consider probability. Computers have an easy time working with highly stable games that can be solved through calculation. Think about games 
                like chess or go. But when randomness is involved, how does a computer handle the element of chance? Could believing in the heart of the cards be calculated? 
                <a href='https://ncatlab.org/nlab/show/Bayesian+reasoning' className='url'> Kind of.</a> You'd think it's simple statistics. If the AI knows that it's win condition 
                has a high chance of being drawn, then it'll keep trying to draw cards to fish for that combo, right? I tried that and the AI ended up dumber. There were various reasons why 
                that didn't work out but the primary reason was because the AI wouldn't consider it's place in the game. Even if something has a 70% chance of working, is the risk worth it 
                if you'd lose otherwise?
                <br/><br/>
                Risk vs Reward is complex even for humans to grasp. But by making the AI consider it's status alongside chance, it was able to make more thoughtful 
                wagers and decisions. If the AI was winning it wouldn't try to risk it all by waiting for the right card to show up- it would continue to play consistently with what it had. If 
                the AI was about to lose then it might consider playing riskier to make up the difference. Essentialy the AI knew the cards in it's deck and the chances of drawing 
                each one. Based on the conditions of high value cards in it's deck the AI would formulate a sort of gameplan to enable them. For example, if their deck has a 
                lot of powerful cards that need a lot of Money to use, then the AI would place higher value in playing cards that generated Money. This was naturally born out of 
                applying the card combo formula to the entire deck!
            </p>

            <h4>The AI should have variable competency</h4>
            <p>
                Like their human counterparts, not all AI are created equal. The topic of Risk/Reward is a complex subject, even just relating to games. It's safe to say that the 
                average card game player, whether that be Poker, Blackjack, or Magic the Gathering, does not consider Risk/Reward when making decisions. So it stands to reason that 
                the average AI wouldn't do so as well! So for the game's "medium" level AI I disabled the probability module so the AI would only consider the 
                options in it's hand. Easy mode was even simpler- the AI would pick only the second highest value option out of a set. I'd experimented with removing the AI's combo 
                module but I'd gotten so used to it building up to play big cards that watching it just play whichever cards for no paticular reason was kind of sad. The most important 
                part of AI, after all, is the illusion of intelligence. So long as the AI made combinations of cards worked- it looked smart! Even if behind the scenes it had a much 
                more optimal play in hand.
            </p>

            <h4>The AI should have configurable behavior</h4>
            <p>
                By far the most important piece of the puzzle. The game's AI wasn't meant to be used for just random offline matches- the game had a story mode! The AI was meant 
                to represent characters that the player would face off against and their personalities had to shine through play. Hot headed characters would play reckless, old and 
                wise characters would play reserved, and particularly mischievous characters should try to annoy you as much as possible. Giving each character unique decks 
                was a start but it wasn't enough. They had to make decisions that only they would. 
            </p>

            <p>
                I decided to create a system that allowed modifiers to be applied for certain calculations the AI made. For example, I could configure it so that the value 
                a card gains for generating Money is multiplied by 1.15, making the AI more likely to focus on generating Money. One could also configure the AI so that it 
                enforces a heavier penalty for difficult combat encounters, making the AI appear to be more cautious when it comes to strong monsters. By simply manipulating 
                values, specific instances of AI can be made to appear to have habits and preferences. If the goal of game AI is to sell the illusion of intelligence- then the goal 
                of my AI was to sell the illusion of personality. Now, no matter what type of deck you gave a character, they would play a certain way to really show their personality. 
                The preferences of each AI was also easily configurable without code, allowing potential modders the ability to design their own playstyles for whatever singleplayer content 
                they could choose to make.
            </p>

            <p>
                And this system ended up being a success! One aggressive, reckless, risk taking configuration even gained a reputation among my testers as a monster of a 
                character, eliminating all who stood in it's path.
            </p> 

            <h3 id='network'>Connecting Players</h3>

            <p>
                For multiplayer, players establish a TCP Connection with a .NET Core game server. A local MySQL server was also used as a database.
            </p>

            <p>
                When the game clients or server finishes receiving a message, they begin by reading the first four bytes as an integer. 
                This integer would translate to a codes representing the purpose of that message. Most messages would actually end here, as they could be 
                messages like "100" which meant "Ping", which didn't require the receiver to process any more data. If there was any more data, however, it would read the 
                next four bytes to determine the length of the next set of bytes to deserialize. Based on the initial code, the receiver would know what type of data to 
                convert the next set of bytes into. For example, code "204" stood for "Turnloop Data", which meant the client was receiving the results of the last 
                turnloop. It would then read the next set of bytes as that player's Life, then their opponent's Life, then that player's Armor, etc etc. 
                Once everything has been read, the receiver will then fellow any instructions associated with the code they received. 
                In the case of "Ping", the receiver would immediately send a response. Pong.
            </p>

            <p>
                Aside from interfacing player credentials with Steam, the server had one primary function: handling match logic. Treasure Seeker had two types of matches. 
                Strict matches, which are handled by the server, and Unrestricted matches, which are handled by the player's client.
            </p>

            <h4>Strict Matches</h4>
            <p>
                Strict matches are any matches joined via the server's matchmaking or direct matches with the strict option enabled. 
                Strict matches are server curated matches with game logic running completely on the server. The user's game client only serves to display information and 
                send user input to the server. Players are only sent information that would be displayed. Their hand, their stat values, the number of cards in 
                their deck, the number of cards in their opponent's hand, and their opponent's stat values. The purpose of this is to create a stable, cheater-free gameplay 
                environment. 
                <br/><br/>
                When players choose which cards to place on the board and hit ready, that information is sent to the server to be verified. The server then checks- does the player 
                have these cards in their hand? Do they have the right amount? If everything checks out, it waits for the other player to send their choices and runs the 
                Turnloop when both players are ready. The results of the Turnloop are then returned to the players to be displayed. A small issue I initially ran into was 
                conealing card draws. Since a player had to know what cards they drew in order to add them to their hand, that information was technically available to the 
                opponent through the Turnloop Results, even if they couldn't see it directly. To be on the extra safe side, Turnloop Results were cleaned of sensitive information 
                before being sent off to each player. Now player 1 would only see the cards drawn by player 1. If player 2 happened to also draw cards, player 1 would only see 
                the amount of cards that they drew rather than what they actually were.
                <br/><br/>
                The downside of running gamelogic completely on the server however is that it would be unable to process any custom client data- such as mods. The only game 
                that exists in Strict matches is the game that exists in the server. Vanilla. Fortunately Unrestricted matches exist for those who want to play how they like.
            </p>

            <h4>Unrestricted Matches</h4>
            <p>
                Unrestricted matches are direct matches between two players through P2P, or singleplayer matches. Unrestricted matches have nothing to do with the server, 
                running game logic completely off each player's game clients. The purpose of this is to allow the game to function without reliance on the server. Because 
                unrestricted matches are only reliant on the client, mods can function seamlessly in both singleplayer and direct P2P matches. When two players begin a match, 
                they send each other a list of their installed Packages or mods. If the clients detect any differences the players will be warned, but are free to continue if 
                they wish. 
                <br/><br/>
                A huge issue with these client-centric matches is missing information- one player's client does not have access to the other's data. This means that if a card has 
                an effect like "Draw cards equal to the amount of Pirate cards in your hand", the information of "How many pirate cards do you have in your hand" may or may not be 
                available. I initially considered the approach of assigning one player as the "master" of the match, retaining all information and executing all game logic for that 
                match, acting as if they were a server for themselves and their opponent. But this was confusing design and left the weight of credibility completely on one player's 
                side. Instead I opted for a sort of split responsibility in which each player was responsible for sending the other certain effects. During a Turnloop, should an 
                effect require information only available to one player, that player would execute that effect and send the result to their opponent, and vice versa. 
                <br/><br/>
                Though this system manages to continue to conceal information, it doesn't stop cheating, it just makes it a little harder. I'd considered just making the information 
                of both players available for everyone, which would allow game clients to cross reference and ensure there isn't any funny business going on- but this would introduce 
                the undetectable issue of players possibly peer into their opponent's previously concealed data. Neither choice is perfect but I've chosen to leave it as it is for 
                the time being. If players want to cheat, they will cheat, and without the server to mediate there's nothing I can do about that. The goal of the P2P match system 
                is to allow multiplayer matches to be played with mods and any other custom data. That goal is accomplished so I'm happy with the results.
            </p>

            <h4>A note on Steam</h4>
            <p>
                I had considered utilizing Steam's own <a href='https://partner.steamgames.com/doc/api/ISteamNetworkingSockets' className='url'>Networking API</a> for my game server but 
                I didn't want to rely on the Steam servers as a middleman when push came to shove- not to mention I didn't know if I even wanted to release the game purely through 
                Steam so I wanted to keep my options open. Since I was testing the game through Steam, however, it was still the server's responsibility to initially validate user 
                Credentials through the Steam API just to keep things nice and simple.
            </p>
        </div>
    );
}

export default Article_Shard;