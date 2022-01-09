import React from 'react';
import { useEffect, useMemo, useState } from "react";
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";
import Title from './Title';
import { useMoralis } from "react-moralis";
require('dotenv').config();

var hash = require('hash.js')


function useQuery() {
const { search } = useLocation();
  
return useMemo(() => new URLSearchParams(search), [search]);
}
  
const CodeContest = ({text, size}) => {

	const { Moralis, authenticate, isAuthenticated, user} = useMoralis();
	const [discordName, setDiscordName] = useState("")
    const [discordStatus, setDiscordStatus] = useState("")
    const [discordRole, setDiscordRole] = useState("")
	const [solution, setSolution] = useState("")

	const submitEntry = async (e) => {

		e.preventDefault();

	const Dalgona = Moralis.Object.extend("Dalgona");
	const dalgona = new Dalgona();
	console.log(discordName, discordRole, solution)
	dalgona.set("discordName", discordName)
	dalgona.set("discordRole", discordRole)
	dalgona.set("codeLink", solution)
	
	dalgona.save()
	.then((elf) => {
	  // Execute any logic that should take place after the object is saved.
	  console.log('Object updated with objectId: ' + elf.id );
	}, (error) => {
	  // Execute any logic that should take place if the save fails.
	  // error is a Moralis.Error with an error code and message.
	  console.log('Failed to create new object, with error code: ' + error.message);
	});

}


	

    const query = useQuery();
    const code = query.get("code");

    const dev = false;

    const discordLink = dev ? "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read" :
                              "https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=https%3A%2F%2Fwww.ethernalelves.com%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read"
    
    const redirectURI = dev ? "http://localhost:3000/whitelist" : "https://ethernalelves.com/whitelist"



    const clientId = "926731918790258708"
    const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET
                         
    useEffect(async () => {
        if(code){
            await getWL()
        }
    }, [code])

const getWL = async () => {
    if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: redirectURI,
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
	
			const oauthData = await oauthResult.json();

          	const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userID = await userResult.json()

            setDiscordName(userID.username)


			const userGuildsResult = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let userGuilds = await userGuildsResult.json()

			for (const [key, value] of Object.entries(userGuilds)) {
				if(value.id.toString() === "914739959271944233"){
					setDiscordStatus("User is member of the Ethernal Elves Guild. Fetching server roles...")
				}			
				
			  }

			  const guildsRoles = await fetch('https://discord.com/api/users/@me/guilds/914739959271944233/member', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			let guildRoles = await guildsRoles.json()

			let roleIds = guildRoles.roles

			//let roleSentinelOg = "923088191353937940"
			//let roleOGWl = "923088235465437205"
			//let roleWl = "923088451887304704"

			const WLroles = {
				"sentinel"  : "923088191353937940",
				"whitelist"   : "923088451887304704",
				"ogwhitelist" : "923088235465437205",
				"reserved" : "923079068222623764"
			}

			let roleForMint
            let roleForMintName
		
				  roleIds.map((roleid) => {

					if(roleid === WLroles.whitelist){
						roleForMintName = "Whitelist"
                        roleForMint = 1
					}
                    if(roleid === WLroles.ogwhitelist){
						roleForMintName = "OG Whitelist"
                        roleForMint = 2
					}
                    if(roleid === WLroles.sentinel){
						roleForMintName = "SENTINEL OG Whitelist"
                        roleForMint = 3
					}
					if(roleid === WLroles.reserved){
						roleForMintName = "SENTINEL RESERVE"
                        roleForMint = 4
					}

				  })

			

                  setDiscordRole(`User has ${roleForMintName} role.`)
			
			//console.log(userGuilds);

			
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

}
	




    ///https://discord.com/api/oauth2/authorize?client_id=926731918790258708&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwhitelist&response_type=code&scope=identify%20guilds%20guilds.members.read
   

    
    return (
    
        <>

      
		<Title text={discordName} />

        <p>
        {discordStatus}
        </p>
        <p>
        {discordRole}
        </p>
		<p>
		{discordName && hash.sha256().update(discordName).digest('hex')}
		</p>

        <button variant="primary" 
        onClick={(e) => {
            e.preventDefault();
            window.location.href=discordLink;
            }}
        >Authenticate with Discord</button>

<br></br>
<br></br>
<br></br>

<li> 1. Authenticate with Discord </li>
<li> 2. Solve puzzle/code game</li>
<li> 3. enter link to solution on jsFiddle below</li>
<li> 4. click submit</li>

<input	type="text"	name="solution"	placeholder="Paste link to solution here"	onChange={(e) => setSolution(e.target.value)}	/>


{discordName && 
<button variant="primary" 
        onClick={submitEntry}
        >Submit Entry</button>
}


        </>         
      );
    };
    
    export default CodeContest;
    
    
    